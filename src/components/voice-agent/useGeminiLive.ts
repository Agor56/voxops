import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { supabase } from '@/integrations/supabase/client';
import { AudioRecorder, AudioPlayer } from './audio-utils';
import type { VoiceAgentState } from './types';

interface UseGeminiLiveProps {
  systemInstruction: string;
  onError?: (error: string) => void;
}

export function useGeminiLive({ systemInstruction, onError }: UseGeminiLiveProps) {
  const [state, setState] = useState<VoiceAgentState>({
    status: 'idle',
    isMuted: false
  });

  const sessionRef = useRef<any>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);
  const playerRef = useRef<AudioPlayer | null>(null);
  const aiRef = useRef<GoogleGenAI | null>(null);
  const isMutedRef = useRef(false);
  const isConnectingRef = useRef(false);

  // Keep isMutedRef in sync with state
  useEffect(() => {
    isMutedRef.current = state.isMuted;
  }, [state.isMuted]);

  const updateStatus = useCallback((status: VoiceAgentState['status']) => {
    setState(prev => ({ ...prev, status }));
  }, []);

  const connect = useCallback(async () => {
    // Prevent multiple simultaneous connection attempts
    if (isConnectingRef.current || sessionRef.current) {
      console.log('Already connecting or connected, skipping...');
      return;
    }
    
    isConnectingRef.current = true;
    
    try {
      updateStatus('connecting');
      console.log('Fetching Gemini session credentials...');

      // Fetch API key from edge function
      const { data, error } = await supabase.functions.invoke('gemini-session');
      
      if (error || !data?.apiKey) {
        const errorMsg = error?.message || 'Failed to get session credentials';
        console.error('Session error:', errorMsg);
        setState(prev => ({ ...prev, status: 'error', errorMessage: errorMsg }));
        onError?.(errorMsg);
        isConnectingRef.current = false;
        return;
      }

      console.log('Initializing Gemini Live API with model:', data.model);

      // Initialize the AI client
      aiRef.current = new GoogleGenAI({ apiKey: data.apiKey });

      // Initialize audio player with callbacks
      playerRef.current = new AudioPlayer({
        onPlaybackStart: () => updateStatus('speaking'),
        onPlaybackEnd: () => {
          if (sessionRef.current) {
            updateStatus('listening');
          }
        }
      });
      await playerRef.current.init();

      // Connect to the Gemini Live API
      const session = await aiRef.current.live.connect({
        model: data.model,
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: systemInstruction,
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: data.voiceName
              }
            }
          }
        },
        callbacks: {
          onopen: () => {
            console.log('Connected to Gemini Live API');
            updateStatus('listening');
          },
          onmessage: (message: any) => {
            console.log('Received message:', message.type || 'serverContent');
            
            // Handle audio data
            if (message.serverContent?.modelTurn?.parts) {
              for (const part of message.serverContent.modelTurn.parts) {
                if (part.inlineData?.data) {
                  playerRef.current?.addToQueue(part.inlineData.data);
                }
              }
            }
          },
          onerror: (error: any) => {
            console.error('Gemini Live API error:', error);
            const errorMsg = error?.message || 'Connection error';
            setState(prev => ({ ...prev, status: 'error', errorMessage: errorMsg }));
            onError?.(errorMsg);
          },
          onclose: () => {
            console.log('Disconnected from Gemini Live API');
            if (sessionRef.current) {
              sessionRef.current = null;
              updateStatus('idle');
            }
          }
        }
      });

      sessionRef.current = session;

      // Initialize audio recorder - wrapped in try/catch for environments without microphone
      try {
        recorderRef.current = new AudioRecorder((audioData) => {
          if (sessionRef.current && !isMutedRef.current) {
            sessionRef.current.sendRealtimeInput({
              audio: {
                data: audioData,
                mimeType: 'audio/pcm;rate=16000'
              }
            });
          }
        });

        await recorderRef.current.start();
        console.log('Audio recorder started');
      } catch (micError) {
        console.warn('Microphone not available:', micError);
        // Continue without microphone - user can still use suggestion buttons
      }

      isConnectingRef.current = false;

    } catch (error) {
      console.error('Failed to connect:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to connect';
      setState(prev => ({ ...prev, status: 'error', errorMessage: errorMsg }));
      onError?.(errorMsg);
      isConnectingRef.current = false;
    }
  }, [systemInstruction, onError, updateStatus]);

  const disconnect = useCallback(() => {
    console.log('Disconnecting...');
    
    isConnectingRef.current = false;
    
    if (recorderRef.current) {
      recorderRef.current.stop();
      recorderRef.current = null;
    }

    if (playerRef.current) {
      playerRef.current.close();
      playerRef.current = null;
    }

    if (sessionRef.current) {
      try {
        sessionRef.current.close();
      } catch (e) {
        console.error('Error closing session:', e);
      }
      sessionRef.current = null;
    }

    aiRef.current = null;
    updateStatus('idle');
  }, [updateStatus]);

  const toggleMute = useCallback(() => {
    setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  }, []);

  const sendSuggestion = useCallback(async (text: string) => {
    if (!sessionRef.current) return;
    
    try {
      // Stop any current playback
      playerRef.current?.stop();
      
      // Send text as user input
      await sessionRef.current.sendClientContent({
        turns: [{ role: 'user', parts: [{ text }] }],
        turnComplete: true
      });
      
      console.log('Sent suggestion:', text);
    } catch (error) {
      console.error('Error sending suggestion:', error);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    state,
    connect,
    disconnect,
    toggleMute,
    sendSuggestion
  };
}

/**
 * Audio utilities for Gemini Live API
 * Input: 16-bit PCM, 16kHz, mono
 * Output: 24-bit PCM, 24kHz, mono
 */

export class AudioRecorder {
  private stream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;

  constructor(private onAudioData: (audioData: string) => void) {}

  async start(existingStream?: MediaStream): Promise<void> {
    try {
      this.stream =
        existingStream ??
        (await navigator.mediaDevices.getUserMedia({
          audio: {
            sampleRate: 16000,
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        }));

      this.audioContext = new AudioContext({ sampleRate: 16000 });
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      this.source = this.audioContext.createMediaStreamSource(this.stream);
      // iOS Safari tends to behave better with smaller buffers
      this.processor = this.audioContext.createScriptProcessor(2048, 1, 1);

      let frameCount = 0;
      this.processor.onaudioprocess = (e) => {
        frameCount += 1;
        if (frameCount === 1) console.log('🎤 Recorder frames flowing...');
        if (frameCount % 50 === 0) console.log('🎤 Recorder frames:', frameCount);

        const inputData = e.inputBuffer.getChannelData(0);
        const base64Audio = this.encodeAudioForAPI(new Float32Array(inputData));
        this.onAudioData(base64Audio);
      };

      this.source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      throw error;
    }
  }

  stop(): void {
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  private encodeAudioForAPI(float32Array: Float32Array): string {
    const int16Array = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    const uint8Array = new Uint8Array(int16Array.buffer);
    let binary = '';
    const chunkSize = 0x8000;
    
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length));
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    
    return btoa(binary);
  }
}

export class AudioPlayer {
  private audioContext: AudioContext;
  private queue: Uint8Array[] = [];
  private isPlaying = false;
  private onPlaybackStart?: () => void;
  private onPlaybackEnd?: () => void;
  private currentSource: AudioBufferSourceNode | null = null;

  constructor(callbacks?: { onPlaybackStart?: () => void; onPlaybackEnd?: () => void }) {
    // Create AudioContext immediately during user gesture
    this.audioContext = new AudioContext({ sampleRate: 24000 });
    this.onPlaybackStart = callbacks?.onPlaybackStart;
    this.onPlaybackEnd = callbacks?.onPlaybackEnd;
  }

  async init(): Promise<void> {
    // Resume context if suspended (browsers may suspend until user gesture)
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  async addToQueue(base64Audio: string): Promise<void> {
    const binaryString = atob(base64Audio);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    this.queue.push(bytes);
    
    if (!this.isPlaying) {
      this.onPlaybackStart?.();
      await this.playNext();
    }
  }

  private async playNext(): Promise<void> {
    if (this.queue.length === 0) {
      this.isPlaying = false;
      this.onPlaybackEnd?.();
      return;
    }

    // Ensure context is running
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    this.isPlaying = true;
    const audioData = this.queue.shift()!;

    try {
      const wavData = this.createWavFromPCM(audioData);
      // Create a new ArrayBuffer copy to satisfy TypeScript
      const arrayBuffer = new ArrayBuffer(wavData.byteLength);
      new Uint8Array(arrayBuffer).set(wavData);
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      
      this.currentSource = this.audioContext.createBufferSource();
      this.currentSource.buffer = audioBuffer;
      this.currentSource.connect(this.audioContext.destination);
      
      this.currentSource.onended = () => this.playNext();
      this.currentSource.start(0);
    } catch (error) {
      console.error('Error playing audio:', error);
      this.playNext();
    }
  }

  private createWavFromPCM(pcmData: Uint8Array): Uint8Array {
    const int16Data = new Int16Array(pcmData.length / 2);
    for (let i = 0; i < pcmData.length; i += 2) {
      int16Data[i / 2] = (pcmData[i + 1] << 8) | pcmData[i];
    }
    
    const wavHeader = new ArrayBuffer(44);
    const view = new DataView(wavHeader);
    
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    const sampleRate = 24000;
    const numChannels = 1;
    const bitsPerSample = 16;
    const blockAlign = (numChannels * bitsPerSample) / 8;
    const byteRate = sampleRate * blockAlign;
    const dataSize = int16Data.byteLength;

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    writeString(36, 'data');
    view.setUint32(40, dataSize, true);

    const wavArray = new Uint8Array(wavHeader.byteLength + int16Data.byteLength);
    wavArray.set(new Uint8Array(wavHeader), 0);
    wavArray.set(new Uint8Array(int16Data.buffer as ArrayBuffer), wavHeader.byteLength);
    
    return wavArray;
  }

  stop(): void {
    if (this.currentSource) {
      try {
        this.currentSource.stop();
      } catch (e) {
        // Ignore if already stopped
      }
      this.currentSource = null;
    }
    this.queue = [];
    this.isPlaying = false;
  }

  close(): void {
    this.stop();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface AppointmentSlot {
  id: string;
  time: string;
  doctor: string;
  available: boolean;
}

export interface ToolCallLog {
  name: string;
  args: any;
  result: any;
  timestamp: Date;
}

export enum ConnectionState {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  ERROR = 'error',
}

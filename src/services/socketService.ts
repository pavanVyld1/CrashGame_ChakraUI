// socketService.ts
import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';


type GameState = 'starting' | 'started' | 'crashed' | 'waiting';

interface SessionStartData {
  sessionId: string;
  maxCrashValue: number;
}

interface SessionStateData {
  state: GameState;
}

interface TickData {
  value: number;
}

interface CrashData {
  crashValue: number;
}

interface PayoutData {
  amount: number;
}

interface LostData {
  message: string;
}

interface BetPlacedData {
  sessionId: string;
}

interface WithdrawSuccessData {
  multiplier: number;
  payout: number;
}

interface SessionInfoData {
  state: GameState;
  [key: string]: any;
}

class SocketService {
  private socket: Socket | null = null;

  connect(token: string) {
    if (this.socket) return;

    this.socket = io('http://3.108.122.141', {
      auth: { token },
    });
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }

  on<T = any>(event: string, callback: (data: T) => void) {
    this.socket?.on(event, callback);
  }

  off(event: string) {
    this.socket?.off(event);
  }

  emit(event: string, data?: any) {
    this.socket?.emit(event, data);
  }

  getSocketId(): string | null {
    return this.socket?.id ?? null;
  }

   isConnected(): boolean {
    return !!this.socket?.connected;
  }
}

export default new SocketService();

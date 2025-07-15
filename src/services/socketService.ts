// src/services/SocketService.ts
import { io, Socket } from "socket.io-client";

// export type GameState = 'waiting' | 'starting' | 'started' | 'crashed';
export type GameState =
  | "init"
  | "ready"
  | "waiting_for_bet"
  | "starting"
  | "started"
  | "running"
  | "crashed"
  | "end";

type GameEventCallback = (...args: any[]) => void;

export interface SessionStartData {
  sessionId: string;
  maxCrashValue: number;
}

export interface TickData {
  value: number;
}

export interface CrashData {
  crashValue: number;
}

export interface WithdrawSuccessData {
  multiplier: number;
  payout: number;
}

export interface PayoutData {
  amount: number;
}

export interface BetPlacedData {
  sessionId: string;
}

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private token: string = "";

  private callbacks: Map<string, GameEventCallback[]> = new Map();

  private constructor() {}

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  connect(token: string, url: string = "ws://3.108.122.141") {
    if (this.socket) return;

    this.token = token;
    this.socket = io(url, {
      auth: { token },
      transports: ['websocket']
    });
    console.log("Socket connecting ");
    this.socket.on("connect", () => console.log(`✅ Connected: ${this.socket?.id}`));
    this.socket.on("error", (msg) => console.error(`⚠️ Socket error: ${msg}`));
    this.socket.on("disconnect", (reason) => {
      console.warn("Socket disconnected:", reason);
    // You can trigger a callback or an event emitter here if needed
    });
  }

  //Register to callback
  onSessionStart(callback: (data: SessionStartData) => void) {
    console.log("Socket Service : OnSessionStart");
    this.socket?.on("session_start", callback);
  }

  onSessionState(callback: (state: GameState) => void) {
    this.socket?.on("session_state", ({ state }) => callback(state));
    this.socket?.on("session_update", ({ state }) => callback(state));
  }

  onSessionInfo(callback: (data: any) => void) {
    console.log("Received session Info: ");
    this.socket?.on("session_info", callback);
  }

  onTick(callback: (data: TickData) => void) {
    this.socket?.on("tick", callback);
  }

  onCrash(callback: (data: CrashData) => void) {
    this.socket?.on("crash", callback);
  }

  onPayout(callback: (data: PayoutData) => void) {
    this.socket?.on("payout", callback);
  }

  onLost(callback: (data: { message: string }) => void) {
    this.socket?.on("lost", callback);
  }

  onBetPlaced(callback: (data: BetPlacedData) => void) {
    this.socket?.on("bet_placed", callback);
  }

  onWithdrawSuccess(callback: (data: WithdrawSuccessData) => void) {
    this.socket?.on("withdraw_success", callback);
  }

  onErrorCallBack(callback: (data: string) => void) {
    this.socket?.on("error", callback);
  }

//DeRegister Callbacks
  offSessionStart(callback: (data: SessionStartData) => void) {
    this.socket?.off("session_start", callback);
  }

  offSessionState(callback: (state: GameState) => void) {
    // Note: Only works if the exact same callback reference was used in `onSessionState`
    this.socket?.off("session_state", callback);
    this.socket?.off("session_update", callback);
  }

  offSessionInfo(callback: (data: any) => void) {
    this.socket?.off("session_info", callback);
  }

  offTick(callback: (data: TickData) => void) {
    this.socket?.off("tick", callback);
  }

  offCrash(callback: (data: CrashData) => void) {
    this.socket?.off("crash", callback);
  }

  offPayout(callback: (data: PayoutData) => void) {
    this.socket?.off("payout", callback);
  }

  offLost(callback: (data: { message: string }) => void) {
    this.socket?.off("lost", callback);
  }

  offBetPlaced(callback: (data: BetPlacedData) => void) {
    this.socket?.off("bet_placed", callback);
  }

  offWithdrawSuccess(callback: (data: WithdrawSuccessData) => void) {
    this.socket?.off("withdraw_success", callback);
  }

  offErrorCallBack(callback: (data: string) => void) {
    this.socket?.off("error", callback);
  }

  placeBet(amount: number) {
    if (!this.socket) return console.error("Socket not initialized");
    this.socket.emit("place_bet", { amount });
  }

  withdraw() {
    if (!this.socket) return console.error("Socket not initialized");
    this.socket.emit("withdraw", {});
  }

  disconnect() {
    if(this.socket){
      console.log("Disconnecting..");
      this.socket?.disconnect();
      this.socket = null;
    }
  }

  isConnected(): boolean {
    return !!this.socket?.connected;
  }

  getSocketId(): string | null {
    return this.socket?.id ?? null;
  }

}

export default SocketService.getInstance();

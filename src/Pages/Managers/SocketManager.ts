
// src/managers/SocketManager.ts
import SocketService, {
  SessionStartData,
  GameState,
  TickData,
  CrashData,
  PayoutData,
  WithdrawSuccessData,
  BetPlacedData,
} from "../../services/socketService";

type Callback<T> = (data: T) => void;

class SocketManager {
  private static instance: SocketManager;
  private sessionStartCallbacks: Callback<SessionStartData>[] = [];
  private sessionStateCallbacks: Callback<GameState>[] = [];
  private tickCallbacks: Callback<TickData>[] = [];
  private crashCallbacks: Callback<CrashData>[] = [];
  private payoutCallbacks: Callback<PayoutData>[] = [];
  private lostCallbacks: Callback<{ message: string }>[] = [];
  private betPlacedCallbacks: Callback<BetPlacedData>[] = [];
  private withdrawSuccessCallbacks: Callback<WithdrawSuccessData>[] = [];
  private sessionInfoCallbacks: Callback<any>[] = [];
  private sessionErrorCallbacks: Callback<any>[] = [];

  private constructor() {}

  static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  initSocket(token: string ,url: string = "ws://3.108.122.141") {
    SocketService.connect(token, url);

    SocketService.onSessionStart((data) => this.sessionStartCallbacks.forEach(cb => cb(data)));
    SocketService.onSessionState((state) => this.sessionStateCallbacks.forEach(cb => cb(state)));
    SocketService.onTick((data) => this.tickCallbacks.forEach(cb => cb(data)));
    SocketService.onCrash((data) => this.crashCallbacks.forEach(cb => cb(data)));
    SocketService.onPayout((data) => this.payoutCallbacks.forEach(cb => cb(data)));
    SocketService.onLost((data) => this.lostCallbacks.forEach(cb => cb(data)));
    SocketService.onBetPlaced((data) => this.betPlacedCallbacks.forEach(cb => cb(data)));
    SocketService.onWithdrawSuccess((data) => this.withdrawSuccessCallbacks.forEach(cb => cb(data)));
    SocketService.onSessionInfo((data) => this.sessionInfoCallbacks.forEach(cb => cb(data)));
    SocketService.onErrorCallBack((data) => this.sessionErrorCallbacks.forEach(cb => cb(data)));
}

  // 🎯 Subscribe Methods
  onSessionStart(callback: Callback<SessionStartData>) {
    this.sessionStartCallbacks.push(callback);
  }

  onSessionState(callback: Callback<GameState>) {
    this.sessionStateCallbacks.push(callback);
  }

  onTick(callback: Callback<TickData>) {
    this.tickCallbacks.push(callback);
  }

  onCrash(callback: Callback<CrashData>) {
    this.crashCallbacks.push(callback);
  }

  onPayout(callback: Callback<PayoutData>) {
    this.payoutCallbacks.push(callback);
  }

  onLost(callback: Callback<{ message: string }>) {
    this.lostCallbacks.push(callback);
  }

  onBetPlaced(callback: Callback<BetPlacedData>) {
    this.betPlacedCallbacks.push(callback);
  }

  onWithdrawSuccess(callback: Callback<WithdrawSuccessData>) {
    this.withdrawSuccessCallbacks.push(callback);
  }

  onSessionInfo(callback: Callback<any>) {
    this.sessionInfoCallbacks.push(callback);
  }

  OnError(callback: Callback<any>){
    this.sessionErrorCallbacks.push(callback);
  }

  // 💰 Emit Methods
  placeBet(amount: number) {
    SocketService.placeBet(amount);
  }

  withdraw() {
    SocketService.withdraw();
  }

  disconnect() {
    SocketService.disconnect();
  }

  isConnected(): boolean {
    return SocketService.isConnected();
  }

  getSocketId(): string | null {
    return SocketService.getSocketId();
  }
}

export default SocketManager.getInstance();

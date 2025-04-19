
export interface Player {
  id: string;
  name: string;
  bet: number;
  cashout: number | null;
  multiplier: number | null;
  isCashedOut: boolean;
  isWinner: boolean;
}

export interface GameState {
  status: 'waiting' | 'running' | 'crashed';
  currentMultiplier: number;
  crashPoint: number | null;
  betAmount: number;
  autoCashoutValue: number;
  isAutoCashout: boolean;
  userBalance: number;
}

export interface WinHistoryItem {
  id: string;
  date: Date;
  betAmount: number;
  cashoutMultiplier: number;
  winAmount: number;
}

import { GameConstants } from "../types/projectTypes";

export const DATACONSTANTS = {
  BETAMOUNT_1 : 'betamount1',
  BETAMOUNT_2 : 'betamount2',
  MULTIPLIER_1 : 'multiplier1',
  MULTIPLIER_2 : 'multiplier2',
};

// src/services/DataService.ts

export interface PlayerData {
  id: string;
  name: string;
  email: string;
  wallet: number;
}

export interface BetData {
  amount: number;
  multiplier: number;
  autoCashout: boolean;
}

export class DataService {
  private static instance: DataService;

  private playerData: PlayerData | null = null;
  private bets: Record<number, BetData> = {}; // e.g., { 1: { amount, multiplier }, 2: { ... } }
  private maxMultiplier : number = 1.0;
  private maxBetValue : number = 100;

  private constructor() {}

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  // ------------------------------
  // Player data
  // ------------------------------
  public setPlayerData(data: PlayerData): void {
    this.playerData = data;
    localStorage.setItem('user', JSON.stringify(data));
    window.dispatchEvent(new Event('walletUpdated'));
  }

  public getPlayerData(): PlayerData | null {
    if (this.playerData) return this.playerData;

    const stored = localStorage.getItem('user');
    if (stored) {
      this.playerData = JSON.parse(stored);
      return this.playerData;
    }

    return null;
  }

  public updateWallet(amount: number): void {
    if (this.playerData) {
      this.playerData.wallet = amount;
      this.setPlayerData(this.playerData);
    }
  }

  // ------------------------------
  // Bet data (for multiple bets)
  // ------------------------------

  public updateBetAmount(betId: number, amount: number): void {
    if (!this.bets[betId]) {
      this.bets[betId] = { amount: 0, multiplier: 1.0, autoCashout: false };
    }
    this.bets[betId].amount = amount;
  }

  public updateMultiplier(betId: number, multiplier: number, autoCashout = false): void {
    if (!this.bets[betId]) {
      this.bets[betId] = { amount: 0, multiplier: 1.0, autoCashout: false };
    }
    this.bets[betId].multiplier = multiplier;
    this.bets[betId].autoCashout = autoCashout;
  }

  public getBetData(betId: number): BetData | undefined {
    return this.bets[betId];
  }

  public cancelBet(betId: number): void {
    if (this.bets[betId]) {
      const refundAmount = this.bets[betId].amount;

      if (this.playerData) {
        this.updateWallet(this.playerData.wallet + refundAmount);
      }

      delete this.bets[betId];
    }
  }

  public getAllBets(): Record<number, BetData> {
    return this.bets;
  }

  public clear(): void {
    this.playerData = null;
    this.bets = {};
    localStorage.removeItem('user');
  }

  public setMaxMultiplier(multiplierVal: number) {
    this.maxMultiplier = multiplierVal;
  }

  public setMaxBet(maxBetValue: number) {
    this.maxBetValue = maxBetValue;
  }

  public getMaxBetValue(): number {
    return GameConstants.MAX_BET;
    // return this.maxBetValue;
  }

  public getMaxMultiplierValue(): number {
    return GameConstants.MAX_MULTIPLIER;
    // return this.maxMultiplier;
  }
}

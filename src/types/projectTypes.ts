export enum BetButtonState {
  Idle = 0,
  WaitingForBet = 1,
  BetPlaced = 2,
  Collect = 3,
  Disabled = 4,
}

export const LABELS = {
  GAME_LABEL : "KingFisher",
  PLACE_BET: "Place your bet",
  CANCEL_BET: "Cancel",
  CONFIRM: "Confirm",
  SUBMIT: "Submit",
  RESET: "Reset",
  PLAYER_NAME: "Player",
  BET_AMOUNT: "Bet Amount",
  WIN_AMOUNT: "Win",
  BET : "Bet",
  AUTO :"Auto",
  COLLECT: "Collect",
  NO_DATA: "No data available",
  LOGIN : "Login",
  NAME : "Name",
  EMAIL : "Email Address",
  REGISTER : "REGISTER",
  LOGOUT: "Log Out",
  SIGN_IN_HEADER : "Sign in to your account",
  SIGN_UP_HEADER : "Create an account",
  PASSWORD : "Password",

};

export class GameConstants {
  static readonly GAME_NAME: string = 'CrashGame';
  static readonly MAX_BET: number = 100;
  static readonly MIN_BET: number = 1;
  static readonly ONE: number = 1;
  static readonly FIVE: number = 5;
  static readonly TEN: number = 10;
  static readonly ALLIN: number = 100;
  static readonly MIN_MULTIPLIER: number = 1.0;
  static readonly MAX_MULTIPLIER: number = 10.0;
  static readonly MULTIPLIER_INCREMENTOR: number = 0.01;
  static readonly BET_INCREMENTOR: number = 5.0;
}
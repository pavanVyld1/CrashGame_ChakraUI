import Phaser from "phaser";
import * as States from "../states/Index";
import { StateMachine } from "../StateMachine";
import UIButton from "../ui/Components/UIButton";
import { GAME_CONFIG } from "../Utils/GameConstants";
import GameUtils from "../Utils/GameUtils";
import BaseScene from "../scenes/BaseScene";
import Player from "../userdata/PlayerData";

export default class GameManager {

    private static instance: GameManager;
    private gameInstanceRef?: Phaser.Game;
    private gameSceneRef?: BaseScene;

    private playerRef! : Player;

    private stateMachine?: StateMachine;

    private paused = false;
    public isWin?: boolean = true;

    private betAmt: number = GAME_CONFIG.MIN_BET;

    public multiplier: number = 1.0;
    public isCrashed: boolean = false;
    public isBetPlaced: boolean = false;
    public isCashedOut: boolean = false;
    public crashPoint: number = Math.random() * 5 + 2;
    public cashedOutMultiplier: number = 1.0;
    public leaderboard: { name: string; winnings: number }[] = [];
    public elapsedTime!: number;
    // Private constructor to prevent external instantiation
    private constructor() {
      console.log("GameManager created");
    }
  
    // Accessor for the single instance
    public static getInstance(): GameManager {
      if (!this.instance) {
        this.instance = new GameManager();
      }
      return this.instance;
    }
  
    // Example method
    public log(message: string) {
      console.log(`[GameManager]: ${message}`);
    }
    
    public init(game: Phaser.Game) {
      if(this.gameInstanceRef)
        return;
      this.gameInstanceRef = game;
      this.betAmt = GAME_CONFIG.MIN_BET

      this.initPlayer(new Player(GameUtils.generatePlayerId(),GAME_CONFIG.TEST_PLAYER_NAME,GAME_CONFIG.INITIAL_BALANCE));
    }

    public initPlayer (curplayer : Player){
      if(this.playerRef)
        return;
      this.playerRef = curplayer;
      console.log("Player Data : " + this.playerRef.ID);
    }

    public registerScene(curScene : BaseScene){
      this.gameSceneRef = curScene;
    }
    
    public get game(): Phaser.Game | undefined {
        return this.gameInstanceRef;
    }

    public get player(): Player {
      return this.playerRef;
  }

    public get activeScene(): BaseScene | undefined {
       if(this.gameSceneRef !== null)
          return this.gameSceneRef;
        else
          return this.gameInstanceRef?.scene.getScenes(true)[0] as BaseScene;
    }

    public async initialiseStates(): Promise<void> {
      console.log("Creating states Game Manager")
      this.createStates(true);
      await this.stateMachine?.run();
    }

    private createStates(gamble: boolean): void {
      const states = [
        States.PreloadState,
        States.PreloadDoneState,
        States.IntroState,
        States.ReadyState,
        States.WaitingForBetState,
        States.GameStartState,
        States.GameRunningState,
        States.GameCrashedState,
        States.ResultWinState,
        States.ResultLossState,
        States.SettleBetState,
        States.ExitState,
      ];

      this.stateMachine = new StateMachine(
        [...states],
        new States.PreloadState()
      );
    }

    public getBetAmout() : number {
       return this.betAmt;
    }

    public increaseBet() : void{
       if(this.betAmt < GAME_CONFIG.MAX_BET) {
          this.betAmt+= GAME_CONFIG.BET_TICK;
       } else {
        console.log("Max bet reached");
       }
       console.log("Bet value : " + this.betAmt);
       console.log("Scene : " + this.gameInstanceRef?.scene.getScene('CrashGameMainScene'));
    }

    public decreaseBet(): void{
      if(this.betAmt > GAME_CONFIG.MIN_BET) {
        this.betAmt-= GAME_CONFIG.BET_TICK;
     } else {
      console.log("Min bet reached");
     }
     console.log("Bet value : " + this.betAmt);
    }

    public placebet() : boolean{
      if(this.isBetPlaced)
        return false;
      if(this.player.Balance < this.betAmt)
        return false;
      this.isCrashed = false;
      this.isBetPlaced = true;
      this.isCashedOut = false;
      this.isWin = false;
      this.multiplier = 1.0;
      this.cashedOutMultiplier = 0.0;
      this.playerRef.addLoss(this.betAmt);
      this.crashPoint = GameUtils.getRandomFloatBetween(1.0,10.0);
      return true;
    }

    public cancelbet() : boolean{
      if(!this.isBetPlaced)
        return false;
      this.isCrashed = false;
      this.isBetPlaced = false;
      this.isCashedOut = false;
      this.isWin = false;
      this.cashedOutMultiplier = 0.0;
      this.multiplier = 1.0;
      this.playerRef.addWin(this.betAmt);
      return true;
    }

   public cashout() : boolean {
    if(this.isBetPlaced && !this.isCashedOut && !this.isCrashed){
      this.isCashedOut = true;
      this.cashedOutMultiplier = this.multiplier;
      const winnings = (this.betAmt * this.cashedOutMultiplier).toFixed(2);
      console.log(`Cashed out at ${this.multiplier.toFixed(2)}x with $${winnings}`);
      this.leaderboard.push({ name: "Player", winnings: parseFloat(winnings) });
      //this.isCrashed = true;
      this.isWin = true;
      return true;
    }
    return false;
  }

    public crashed() : void {
      this.isWin = this.isCashedOut;
      this.isCrashed = true;
      this.isBetPlaced = false;
      this.isCashedOut = false;
    }

    public update(_time:number, _delta: number): void {
      if(this.stateMachine){
        this.stateMachine.update(_time,_delta);
      }
    }

    public shouldCrash() : boolean {
      return this.multiplier >= this.crashPoint
    }

    public updatePlayerbalance() : void{
      if(this.isWin){
        this.playerRef.addWin(this.betAmt * this.cashedOutMultiplier);
      } else {
        // this.playerRef.addLoss(this.betAmt);
      }
    }

    public resetGameValues(){
      this.isBetPlaced = false;
      this.isCashedOut = false;
      this.isCrashed = false;
      this.isWin = false;
      this.cashedOutMultiplier = 0.0;
      this.multiplier = 1.0;
    }
  }

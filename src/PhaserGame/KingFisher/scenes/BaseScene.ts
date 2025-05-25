import Phaser from "phaser";
import { CanvasScaler, ScaleMode, ScreenMatchMode } from "../ui/CanvasScaler";
import { GAME_CONFIG } from "../Utils/GameConstants";
import GameManager from "../Managers/GameManager";
// import { GAME_REF } from "../Main";

export default class BaseScene extends Phaser.Scene {

  protected bg!: Phaser.GameObjects.Image;
  constructor(key: string) {
    super(key);
  }

  preload() {
    this.load.image("background", "assets/background.png");
    this.load.image("plane", "assets/plane.png");
    this.load.image("button", "assets/button.png");
  }

  create() {
    //Initialising the Game Managaer with the Game reference
    // GameManager.getInstance().initialise(GAME_REF);
    console.log("Base Scene Create");
  }

  init() {

  }

  createBackground() {
    // this.bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "background")
    //   .setOrigin(0.5)
    //   .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    console.log("createBackground");
  }

  public update(_time:number, _delta: number): void {
    GameManager.getInstance().update(_time,_delta);
  }

  public onPreparingGame() : void {
    console.log("Base Scene Preparing is called");
  }

  public onGameReady() : void {
    console.log("Base Scene OnGameReady is called");
  }

  public onWaitingForBet() : void {
    console.log("Base Scene onWaitingForBet is called");
  }

  public onBetIsPlaced() : void {
    console.log("Base Scene onWaitingForBet is called");
  }

  public onGameStarting() : void {
    console.log("Base Scene onGameStarting is called");
  }

  public onGameRunning() : void {
    console.log("Base Scene onGameRunning is called");
  }

  public onUserCashedOut() : void {
    console.log("Base Scene onUserCashedOut is called");
  }

  public onGameCrashed() : void {
    console.log("Base Scene onGameCrashed is called");
  }
}

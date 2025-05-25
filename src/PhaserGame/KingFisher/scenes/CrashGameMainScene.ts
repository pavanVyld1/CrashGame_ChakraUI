import BaseScene from "./BaseScene";

import GameManager from "../Managers/GameManager";
import UIButton from "../ui/Components/UIButton";
import PlaneManager from "../Managers/PlaneManager";
import { GAME_CONFIG } from "../Utils/GameConstants";
import GameUtis from "../Utils/GameUtils";
import { GameLayer, UiLayer } from "../Utils/GameUILayers";

export default class CrashGameMainScene extends BaseScene {

    private planeManager!: PlaneManager;
    private betButton!: UIButton;
    private cashoutButton!: UIButton;
    private cancelButton!: UIButton;
    private increaseButton!: UIButton;
    private decreaseButton!: UIButton;
    private buttonGroup!: Phaser.GameObjects.Container;

    private playerBalanceText!: Phaser.GameObjects.Text;
    private betAmountText!: Phaser.GameObjects.Text;
    private multiplierText!: Phaser.GameObjects.Text;
    private leaderboardText!: Phaser.GameObjects.Text;

    private curveTween !: Phaser.Tweens.Tween;
    private birdImage !: Phaser.GameObjects.Image;
    private frizbeeImage !: Phaser.GameObjects.Image;

    private curve!: Phaser.Curves.QuadraticBezier;
    private gameStartTime: number = 0; 

    private tile_bg!: Phaser.GameObjects.TileSprite;
    private tile_fog!: Phaser.GameObjects.TileSprite;
    private tile_fg!: Phaser.GameObjects.TileSprite;
    private tile_tree!: Phaser.GameObjects.TileSprite;

    private mainCam!: Phaser.Cameras.Scene2D.Camera;
    private bgCam!: Phaser.Cameras.Scene2D.Camera;
    private uiCam!: Phaser.Cameras.Scene2D.Camera;

    private bezierCurves: Phaser.Curves.QuadraticBezier[] = [];

    //Layers are used to Group the Objects
    private bgLayer!: Phaser.GameObjects.Layer;
    private playerLayer!: Phaser.GameObjects.Layer;
    private uiLayer!: Phaser.GameObjects.Layer;

    private playerContainer!: Phaser.GameObjects.Container;

    constructor() {
        super("CrashGameMainScene");
        GameManager.getInstance().registerScene(this);
        console.log("CrashGameMainScene construct");
    }

    override preload(): void {
        super.preload();
        this.load.image("bird","assets/kingbird.png");
        this.load.image("frizbee","assets/frisbee.png");

        //Load the Tile Images
        this.load.image("tile_Bg","assets/tileImages/background.png");
        this.load.image("tile_fog","assets/tileImages/fog.png")
        this.load.image("tile_fg","assets/tileImages/foreground.png")
        this.load.image("tile_tree","assets/tileImages/trees.png")

        //Adding the Spline
        this.load.image('apple_img','assets/spine/apple.png');
        this.load.spineAtlas('apple_atlas','/assets/spine/apple.atlas');
        this.load.spineJson('apple_json','/assets/spine/apple.json');
    }

    override create(): void {
        super.create();
        console.log("CrashGameMainScene create");
        //Assigning the game to Manager
        this.initialiseStates();
        this.startTime = this.time.now;
    }

    override init() : void {
        super.init();
    }

    private hovertime: number = 0.0;
    private startTime: number = 0.0;

    private initialEndPoint!: Phaser.Math.Vector2; 
    
    override update(_time: number, _delta: number): void {
        super.update(_time,_delta);

        // const wave = Math.sin(this.hovertime);
        // this.birdImage.y = baseY + Math.sin(this.hovertime) * 10;

        if(this.curve && this.curve.active) {

          const elapsed = (_time - this.gameStartTime);///1000;
          this.hovertime += _delta * 0.005;
          // console.log("Hover time : " + this.hovertime + " elap : " + elapsed);
          // const wave = Math.sin(elapsed);
          const wave = Math.sin(elapsed * 0.005);
          // let mulval = GameManager.getInstance().multiplier;
          // const wave = Math.sin(GameManager.getInstance().multiplier);
          // console.log("Multiplier : " + mulval + " Wave : " + wave);

          const baseY = this.initialEndPoint.y;
          // this.curve.p2.y = this.initialEndPoint.y + wave;//Phaser.Math.Clamp(this.initialEndPoint.y + wave, this.initialEndPoint.y + 1 , this.initialEndPoint.y );
          this.curve.p2.y = Phaser.Math.Clamp(this.initialEndPoint.y + wave * 20, this.initialEndPoint.y - 50, this.initialEndPoint.y + 50);
          this.curve.p2.x = Phaser.Math.Clamp(this.initialEndPoint.x + wave * 10, this.initialEndPoint.x - 50, this.initialEndPoint.x + 50);
          
          const graphics = this.add.graphics();
          graphics.lineStyle(2, 0xffffff, 1);
          this.curve.draw(graphics);

          this.tryZoomingCamera();
        }
    }

    override onPreparingGame(): void {
        super.onPreparingGame();
    }

    override onGameReady(): void {
        super.onGameReady();
    }

    override onWaitingForBet(): void {
        super.onWaitingForBet();
        // this.increaseButton.enableButton();
        // this.decreaseButton.enableButton();
        // this.betButton.enableButton();
        // this.cancelButton.disbaleButton(false);
        // this.cashoutButton.disbaleButton(true);
        this.showCountdown(GAME_CONFIG.MAX_BET_WAIT_TIME/1000);
        // this.updatePlayerBetText();
        // this.updateMultiplier();
        this.curve = Phaser.Utils.Array.GetRandom(this.bezierCurves);
        this.initialEndPoint = this.curve.p2.clone();
        this.curve.active = false;
        this.children.list.forEach(child => {
          if (child instanceof Phaser.GameObjects.Graphics) {
            child.clear();
          }
        });
        const graphics = this.add.graphics();
        graphics.lineStyle(2, 0xffffff, 1);
        this.curve.draw(graphics);

        console.log("End point : " + this.initialEndPoint.y);
    }

    override onBetIsPlaced(): void {
        // this.betButton.disbaleButton(false);
        // this.cancelButton.enableButton();
        // this.updatePlayerBetText();
    }

    onCancelBet(): void {
        console.log("On Cancel bet is pressed");
        // this.betButton.enableButton(true);
        // this.cancelButton.disbaleButton(false);
        // this.updatePlayerBetText();
    }

    override onGameStarting(): void {
        super.onGameStarting();
        if(this.curve) {
          this.curve.active = true;
        }
        this.resetBird();
        // this.betButton.disbaleButton(true);
        // this.cancelButton.disbaleButton(false);
        // this.increaseButton.disbaleButton();
        // this.decreaseButton.disbaleButton();
        // if(GameManager.getInstance().isBetPlaced){
        //     this.cashoutButton.enableButton(true);
        //     // this.cashoutButton.visible = true;
        // }
        // this.updatePlayerBetText();
        this.gameStartTime = this.time.now;
    }

    override onGameRunning(): void {
        super.onGameRunning();
        // this.updateMultiplier();
    }

    override onUserCashedOut(): void {
        super.onUserCashedOut();
        // this.betButton.disbaleButton(true);
        // this.cancelButton.disbaleButton(false);
        // if(GameManager.getInstance().isBetPlaced && GameManager.getInstance().isCashedOut){
        //     this.cashoutButton.disbaleButton(true);
        //     // this.cashoutButton.visible = true;
        // }
        // this.updatePlayerBetText();
    }

    override onGameCrashed(): void {
        super.onGameCrashed();
        this.curve.active = false;
        this.frizbeeImage.setPosition(50,-5);
        this.moveOutOfScreen(()=>{
          this.updateLeaderboardUI();
          // this.betButton.disbaleButton();
          // this.cancelButton.disbaleButton();
          this.resetBird();
          // this.updatePlayerBetText();
        });
    }

    initialiseStates() : void {
        console.log("Scene Name : " + GameManager.getInstance().activeScene);
        
        this.initialiseUI();
        this.createTileSprites();
        GameManager.getInstance().initialiseStates();
    }

    createTileSprites(){
      const { width, height} = this.scale;

      this.tile_fog = this.addTileWithScale("tile_fog",width,height);
      this.tile_fog.setDepth(GameLayer.Foreground+1);

      this.tile_bg = this.addTileWithScale("tile_Bg",width ,height);
      this.tile_bg.setDepth(GameLayer.Background);
      this.tile_fg = this.addTileWithScale("tile_fg",width,height);
      this.tile_fg.setDepth(GameLayer.Foreground);
      this.tile_tree = this.addTileWithScale("tile_tree",width,height)
      this.tile_tree.setDepth(GameLayer.Foreground-10);

      this.bgLayer.add([this.tile_bg,this.tile_fg,this.tile_fog,this.tile_tree]);

    }

    addTileWithScale(textureName : string, width: number, height: number) : Phaser.GameObjects.TileSprite{
      let newWidth = width * 2;
      let newhieight= height * 1;
      const tile = this.add.tileSprite(0,0, newWidth,newhieight,textureName).setOrigin(0,0);
      let tex = this.textures.get(textureName).getSourceImage() as Phaser.GameObjects.RenderTexture;
      const {scalex, scaley} = GameUtis.getScaleValue(tex, newWidth, newhieight);
      tile.setTileScale(scalex,scaley);
      return tile;
    }

    addTileWithAtBottomScale(textureName : string, width: number, height: number) : Phaser.GameObjects.TileSprite{
      const tile = this.add.tileSprite(0,height, width,height * 0.2,textureName).setOrigin(0,1);
      let tex = this.textures.get(textureName).getSourceImage() as Phaser.GameObjects.RenderTexture;
      const {scalex, scaley} = GameUtis.getScaleValue(tex, width, height);

      const rect = this.add.rectangle(0,height, width, height * 0.2).setOrigin(0,1);
      rect.setDepth(GameLayer.Foreground);
      rect.setStrokeStyle(4, 0xffffff);
      // tile.setTileScale(scalex,scaley);
      return tile;
    }

    scrollTiles(multipler : number){
      this.tile_bg.tilePositionX += (multipler * 0.3);
      this.tile_tree.tilePositionX += (multipler * 0.35);
      this.tile_fg.tilePositionX += (multipler * 0.5);
      this.tile_fog.tilePositionX += (multipler * 0.8);
    }

    initialiseUI() : void {

        this.bgLayer = this.add.layer();
        this.playerLayer = this.add.layer();
        this.uiLayer = this.add.layer();

        this.createBackground();
        this.createCurves();
        
        this.buttonGroup = this.add.container(700,500);

        this.buttonGroup.setSize(500,400);

        this.birdImage = this.add.image(0 ,0,"bird").setOrigin(0.5);
        this.birdImage.setScale(0.03);
        // this.birdImage.setDepth(GameLayer.Game);
        // this.resetBird();

        this.frizbeeImage = this.add.image(100 ,-35,"frizbee").setOrigin(0.5);
        this.frizbeeImage.setScale(0.1);
        // this.frizbeeImage.setDepth(GameLayer.Game);

        
        this.playerContainer = this.add.container(-150 ,this.scale.height - this.scale.height * 0.2);
        this.playerContainer.setDepth(GameLayer.Game);

        this.playerLayer.add([this.birdImage,this.frizbeeImage, this.playerContainer]);
        
        this.playerContainer.add([this.birdImage, this.frizbeeImage]);
        const displayRect = this.add.rectangle(0 ,0,this.playerContainer.width, this.playerContainer.height).setOrigin(0.5);
        // Optional: Add a border
        displayRect.setStrokeStyle(4, 0xffffff);

        this.playerContainer.add(displayRect);
        this.playerContainer.setDepth(GameLayer.Game);

        // this.add.existing(this.playerContainer);

        // this.betButton = new UIButton(this,0.4,1-0.1,75,50,"button","BET",()=>{
        //     console.log("Bet ammount clicked");
        //     let placed = GameManager.getInstance().placebet();
        //     if(placed){
        //         this.resetBird();
        //         this.onBetIsPlaced();
        //         this.multiplierText.setColor("#000000");
        //     }
        // },15).setDepth(UiLayer.GameUi).setScrollFactor(0);;

        // this.betButton.disbaleButton();
        // this.uiLayer.add(this.betButton);

        // this.cancelButton = new UIButton(this,0.4,1-0.1,75,50,"button","cancel",()=>{
        //     console.log("cancel ammount clicked");
        //     let placed = GameManager.getInstance().cancelbet();
        //     if(placed){
        //         this.onCancelBet();
        //         this.multiplierText.setColor("#000000");
        //     }
        // },15).setDepth(UiLayer.GameUi).setScrollFactor(0);;
        // this.cancelButton.disbaleButton();
        // this.uiLayer.add(this.cancelButton);

        // this.cashoutButton = new UIButton(this,1-0.4,1-0.1,100,50,"button","CASH OUT",()=>{
        //     console.log("cash out clicked");
        //     let placed = GameManager.getInstance().cashout();
        //     if(placed) {
        //         this.cashoutButton.disbaleButton(true);
        //         this.updateLeaderboardUI();
        //     }
        // },15).setDepth(UiLayer.GameUi).setScrollFactor(0);;
        // this.cashoutButton.disbaleButton();
        // this.uiLayer.add(this.cashoutButton);

        // this.decreaseButton = new UIButton(this,1-0.4,1-0.2,75,50,"button"," + ",()=>{
        //     console.log(" Add clicked");
        //     GameManager.getInstance().increaseBet();
        //     this.betAmountText.setText("Bet : " + GameManager.getInstance().getBetAmout());
        // },40).setDepth(UiLayer.GameUi).setScrollFactor(0);
        // this.decreaseButton.disbaleButton();
        // this.uiLayer.add(this.decreaseButton);

        // this.increaseButton = new UIButton(this,0.4,1-0.2,75,50,"button"," - ",()=>{
        //     console.log(" Reduce clicked");
        //     GameManager.getInstance().decreaseBet();
        //     this.betAmountText.setText("Bet : " + GameManager.getInstance().getBetAmout());
        // },40).setDepth(UiLayer.GameUi).setScrollFactor(0);;
        // this.increaseButton.disbaleButton();
        // this.uiLayer.add(this.increaseButton);

        // this.betAmountText = this.add.text(300, this.cameras.main.height -200, "Bet : "+ GameManager.getInstance().getBetAmout(), {
        //     fontSize: `${this.cameras.main.width * 0.02}px`,
        //     color: "##000000",
        //     fontStyle: "bold"
        //   }).setOrigin(0.5).setDepth(UiLayer.GameUi).setScrollFactor(0);;
        //   this.uiLayer.add(this.betAmountText);

        //   this.multiplierText = this.add.text(300, this.cameras.main.height -250, "1.00x", {
        //     fontSize: `${this.cameras.main.width * 0.02}px`,
        //     color: "##000000",
        //     fontStyle: "bold"
        //   }).setOrigin(0.5).setDepth(UiLayer.GameUi).setScrollFactor(0);;
        //   this.uiLayer.add(this.multiplierText);

        //   this.leaderboardText = this.add.text(20, 20, "Leaderboard:\n", {
        //     fontSize: "18px",
        //     color: "##000000",
        //     fontStyle: "bold"
        //   }).setOrigin(0).setDepth(UiLayer.GameUi).setScrollFactor(0);;
        //   this.uiLayer.add(this.leaderboardText);

          // this.playerBalanceText = this.add.text(this.cameras.main.width - 200, this.cameras.main.height -200, "Balance : "+ GameManager.getInstance().player.getBalance(), {
          //   fontSize: `${this.cameras.main.width * 0.02}px`,
          //   color: "##000000",
          //   fontStyle: "bold"
          // }).setOrigin(0.5).setDepth(UiLayer.GameUi).setScrollFactor(0);;
          // this.uiLayer.add(this.playerBalanceText);
      

        // this.scale.on("resize", this.resizeGame, this);

        // const displayRect = this.add.rectangle(0, 0, this.buttonGroup.width, this.buttonGroup.height);
        // Optional: Add a border
        // displayRect.setStrokeStyle(4, 0xffffff);

        // this.buttonGroup.add([this.betButton, this.cashoutButton, this.increaselButton, this.decreaseButton, displayRect]);

        // this.cancelButton = new UIButton(this,0.5,0.3,300,150,"button","cancel",()=>{
        //     console.log("cancel pressed");
        // });
        // this.time.addEvent({ delay: 100, loop: true, callback: this.updateMultiplier, callbackScope: this });

        // this.cameras.main.startFollow(this.birdImage,true,0.1,0,200,0);

        this.bgCam = this.cameras.add(0, 0, this.scale.width, this.scale.height);
        this.bgCam.ignore([this.playerLayer, this.bgLayer, this.uiLayer]);
        this.bgCam.setScroll(0, 0); 
        this.bgCam.setRoundPixels(true);
        
        this.uiCam = this.cameras.add(0, 0, this.scale.width, this.scale.height);
        this.uiCam.ignore([this.playerLayer, this.bgLayer]);
        this.uiCam.setScroll(0, 0); 
        this.uiCam.setRoundPixels(true);


        this.mainCam = this.cameras.main;
        // this.mainCam.startFollow(this.birdImage,false,0.2,0.001, 1,0.1);

        this.mainCam.setZoom(1.0);

        if(this.mainCam){
          this.mainCam.startFollow(this.playerContainer);
          this.mainCam.setBounds(0, 0, this.scale.width, this.scale.height);
          this.mainCam.ignore([this.uiLayer]);
        }
        
        this.cameras.cameras = [
          this.bgCam,
          this.mainCam,
          this.uiCam
        ];

        const appleSpine = this.add.spine(this.scale.width / 2, this.scale.height - 100, 'apple_json','apple_atlas').setOrigin(0.5, 0.5).setScale(0.5);

        appleSpine.animationState.addAnimation(0,'win',true,0);
    }

    private resizeGame(gameSize: Phaser.Structs.Size) {
        console.log("Resized to:", gameSize.width, gameSize.height);

        const { width, height } = gameSize;

        const scaleFactor = Math.min(width / GAME_CONFIG.BASE_RESOLUTION.width, height / GAME_CONFIG.BASE_RESOLUTION.height);

        const configWidth = Number(this.game.config.width);
        const configHeight = Number(this.game.config.height);

        let scrolX = -this.scale.gameSize.width / 2 + configWidth / 2;
        let scroly = -this.scale.gameSize.height / 2 + configHeight / 2;
        
        this.mainCam.setScroll(scrolX,scroly);
        this.bgCam.setScroll(scrolX,scroly);
        this.uiCam.setScroll(scrolX,scroly);

        // this.buttonGroup.setScale(scaleFactor);
    }
    

    updateMultiplier() {
        if (!GameManager.getInstance().isCrashed) {
            // GameManager.getInstance().multiplier += GAME_CONFIG.MULTIPLIER_TICK;
            this.moveBird(GameManager.getInstance().multiplier);
            this.scrollTiles(GameManager.getInstance().multiplier);
        //   this.multiplierText.setText(GameManager.getInstance().multiplier.toFixed(2) + "x");
        //   this.multiplierText.setAlpha(0.9 + Math.sin(GameManager.getInstance().multiplier * 2) * 0.1);
        this.updateMultiplierDisplay();
        if (GameManager.getInstance().shouldCrash()) {
             this.multiplierText.setColor("#ff0000");
          }
        } 
    }

    updateLeaderboardUI() {
        if (this.leaderboardText) {
        
            GameManager.getInstance().leaderboard.sort((a, b) => b.winnings - a.winnings);
            const leaderboardStr = GameManager.getInstance().leaderboard.map((entry, index) => `${index + 1}. ${entry.name}: $${entry.winnings}`).join("\n");
            this.leaderboardText.setText("Leaderboard:\n" + leaderboardStr);
        }
    }

    startmovingTheBird() {
        let tween = this.tweens.add({
            targets: this.birdImage,
            x: this.cameras.main.width - 300,
            y: 200,
            duration: 2000,
            ease: 'Linear',
            onUpdate: () => {
              if (GameManager.getInstance().isCrashed) {
                tween.stop(); // Stop it right here
              }
            }
          });
    }

    createCurve() {
        this.curve = new Phaser.Curves.QuadraticBezier(
                        new Phaser.Math.Vector2(300, 500),
                        new Phaser.Math.Vector2(this.cameras.main.width - 700, 400),
                        new Phaser.Math.Vector2(this.cameras.main.width - 500, 200),
                      );
        const graphics = this.add.graphics();
          graphics.lineStyle(2, 0xffffff, 1);
          this.curve.draw(graphics);
    }

    moveBird(multiplierVal: number) {
        // let progress = Phaser.Math.Clamp(multiplierVal / (GAME_CONFIG.MAX_MULTIPLIER /2), 0, 1);
        let progress = Phaser.Math.Clamp(GameManager.getInstance().elapsedTime/(GAME_CONFIG.MAX_MULTIPLIER /2), 0 ,1);
        console.log("Multiplayer : " + multiplierVal + "Progress : " + progress);

        // const zoom = Phaser.Math.Linear(1.5, 1.0, multiplierVal);
        // if (this.mainCam){
        //   this.mainCam.setZoom(Phaser.Math.Interpolation.Linear([this.cameras.main.zoom, zoom],0.1));
        // }
        // console.log("Zoom : " + this.cameras.main.zoom)
// const wave = Math.sin(this.hovertime);
        // this.birdImage.y = baseY + Math.sin(this.hovertime) * 10;

        // if(this.curve && this.curve.active) {

        //   // const elapsed = (_time - this.gameStartTime)/1000;
        //   // this.hovertime += _delta * 0.005;
        //   // console.log("Hover time : " + this.hovertime + " elap : " + elapsed);
        //   // const wave = Math.sin(elapsed);
        //   let mulval = GameManager.getInstance().multiplier;
        //   const wave = Math.sin(GameManager.getInstance().multiplier);
        //   console.log("Multiplier : " + mulval + " Wave : " + wave);

        //   const baseY = this.initialEndPoint.y;
        //   // this.curve.p2.y = this.initialEndPoint.y + wave;//Phaser.Math.Clamp(this.initialEndPoint.y + wave, this.initialEndPoint.y + 1 , this.initialEndPoint.y );
        //   this.curve.p2.y = Phaser.Math.Clamp(this.initialEndPoint.y + wave * 50, this.initialEndPoint.y - 200, this.initialEndPoint.y + 200);
        //   this.curve.p2.x = Phaser.Math.Clamp(this.initialEndPoint.x + wave * 25, this.initialEndPoint.x - 200, this.initialEndPoint.x + 200);
          
        //   const graphics = this.add.graphics();
        //   graphics.lineStyle(2, 0xffffff, 1);
        //   this.curve.draw(graphics);
        // }

      if (this.curve && this.curve.active) {
        console.log("Progress : " + progress);
        const point = this.curve.getPoint(progress);
        // this.birdImage.setPosition(point.x, point.y);
        this.playerContainer.setPosition(point.x,point.y);
      }
    }

    resetBird() {
        // this.birdImage.setPosition(-100 ,this.scale.height - this.scale.height * 0.2);
        this.birdImage.setPosition(0,0);
        this.frizbeeImage.setPosition(100 ,-35);
        this.playerContainer.setPosition(-150 ,this.scale.height - this.scale.height * 0.2);
    }

    public showCountdown(durationInSec: number): void {
        let countdown = durationInSec;
        const text = this.add.text(this.scale.width / 2, this.scale.height / 2, `Starting in ${countdown}..`, {
          fontSize: '48px',
          color: '#ffffff',
        }).setOrigin(0.5).setDepth(UiLayer.GameUi);
        this.uiLayer.add(text);
        const timer = this.time.addEvent({
          delay: 1000, // 1 second
          repeat: durationInSec - 1,
          callback: () => {
            countdown--;
            text.setText(`Starting in ${countdown}..`);

            if (countdown === 0) {
              text.destroy(); // remove the text when countdown ends
            }
          }
        });
      }

      private updateMultiplierDisplay() {
        this.multiplierText.setText(`${GameManager.getInstance().multiplier.toFixed(2)}x`);
        
        // Color gradient based on multiplier
        if (GameManager.getInstance().multiplier >= 10) {
          this.multiplierText.setColor('#ff0000');
        } else if (GameManager.getInstance().multiplier >= 5) {
          this.multiplierText.setColor('#ff00ff');
        } else if (GameManager.getInstance().multiplier >= 2) {
          this.multiplierText.setColor('#00ffff');
        } else {
          this.multiplierText.setColor('#ffffff');
        }
        
        // Scale text based on multiplier
        const scale = Math.min(1.5, 1 + (GameManager.getInstance().multiplier - 1) * 0.05);
        this.multiplierText.setScale(scale);
      }

    //   updateMultipler() {
    //     if (GameManager.getInstance().isBetPlaced && !GameManager.getInstance().isCrashed) {
    //         GameManager.getInstance().multiplier += GAME_CONFIG.MULTIPLIER_TICK;
    //         this.moveBird(GameManager.getInstance().multiplier);
    //         this.updateMultiplierDisplay();
    //     //   this.multiplierText.setText(GameManager.getInstance().multiplier.toFixed(2) + "x");
    //     //   this.multiplierText.setAlpha(0.9 + Math.sin(GameManager.getInstance().multiplier * 2) * 0.1);
    //       if (GameManager.getInstance().multiplier >= GameManager.getInstance().crashPoint) {
    //          GameManager.getInstance().crashed();
    //          this.multiplierText.setColor("#ff0000");
    //       }
    //     } 
    // }
      
    private updatePlayerBetText(){
        this.playerBalanceText.setText(`Balance : ${GameManager.getInstance().player.getBalance()}`);
    }

    private createCurves() {
            const curve1 = new Phaser.Curves.QuadraticBezier(
                            new Phaser.Math.Vector2(-10, this.cameras.main.height - this.cameras.main.height * 0.2),
                            new Phaser.Math.Vector2(this.cameras.main.width/3 ,this.cameras.main.height - this.cameras.main.height * 0.2 ),
                            new Phaser.Math.Vector2(this.cameras.main.width -  this.cameras.main.width/3  , this.cameras.main.height/3),
                          );
            // const graphics = this.add.graphics();
            // graphics.lineStyle(2, 0xffffff, 1);
            // this.curve.draw(graphics);
            this.bezierCurves.push(curve1);
            const curve2 = new Phaser.Curves.QuadraticBezier(
                new Phaser.Math.Vector2(-10, this.cameras.main.height * 0.2),
                new Phaser.Math.Vector2(this.cameras.main.width/3 ,this.cameras.main.height - this.cameras.main.height * 0.2 ),
                new Phaser.Math.Vector2(this.cameras.main.width -  this.cameras.main.width/3  , this.cameras.main.height/3),
              );
              this.bezierCurves.push(curve2);
              const curve3 = new Phaser.Curves.QuadraticBezier(
                new Phaser.Math.Vector2(-10, this.cameras.main.height ),
                new Phaser.Math.Vector2(this.cameras.main.width/3 ,this.cameras.main.height - this.cameras.main.height * 0.2 ),
                new Phaser.Math.Vector2(this.cameras.main.width -  this.cameras.main.width/3 , this.cameras.main.height/3),
              );
    
            this.bezierCurves.push(curve3);
        }

        moveOutOfScreen(oncompleteCallback : ()=> void) {
          this.tweens.add({
              targets: this.playerContainer,
              x : this.scale.width + 100,
              y: this.scale.height * 0.1,//-this.birdImage.y,
              duration: 800,
              yoyo: false,
              // ease: 'Sine.easeInOut',
              onComplete: () => {
                  oncompleteCallback();
                }
          });
      }

      tryZoomingCamera(){
              const screenHeight = this.scale.height;
              const midY = screenHeight / 2;
      
              const birdY = this.playerContainer.y;
      
        // Clamp progress between 0 (at midY) and 1 (at bottom)
              const zoomProgress = Phaser.Math.Clamp((birdY - midY) / (screenHeight - midY), 0, 1);
      
        // Interpolate from 1.0 to 1.5
              const targetZoom = Phaser.Math.Linear(1.0, 2.0, zoomProgress);
      
              this.mainCam.setZoom(targetZoom);
      
          }

    
}
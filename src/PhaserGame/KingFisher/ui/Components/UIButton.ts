import Phaser from "phaser";

import {IButton, IResizable} from "./UIInterfaces";
import { GAME_CONFIG } from "../../Utils/GameConstants";

export default class UIButton extends Phaser.GameObjects.Container implements IButton , IResizable{
    private background: Phaser.GameObjects.Image;
    private label: Phaser.GameObjects.Text;
    private onClickCallBack: Function;

    // private baseResolution = { width: 800, height: 600 }; // Base size for scaling
    private baseResolution = GAME_CONFIG.BASE_RESOLUTION;
    private anchor: { x: number; y: number }; // Position based on screen percent

    private originalSize: { w: number; h: number}; //Stores the size of the Object in {800,600}

    private displayRect!: Phaser.GameObjects.Rectangle;

    private currentScaleFactor!: number;
    constructor(
        scene: Phaser.Scene,
        anchorX: number,
        anchorY: number,
        width: number,
        height: number,
        texture: string,  // Button background texture
        text: string,     // Button text
        callback: Function, // Click callback function
        fontSize: number = 24
    ) {
        super(scene, 0, 0);

        this.onClickCallBack = callback;

        this.anchor = { x: anchorX, y: anchorY };
        this.originalSize = {w : width, h: height};
        this.setScale(1.0);
        // Button Background (Image)
        this.background = scene.add.image(0, 0, texture);//.setInteractive({ useHandCursor: true });


        // Button Label (Text)
        this.label = scene.add.text(0, 0, text, {
            fontSize: `${fontSize}px`,
            color: "#ffffff",
            fontFamily: "Arial",
            align: "center",
        }).setOrigin(0.5);

        // Add elements to the container
        this.add([this.background, this.label]);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height),Phaser.Geom.Rectangle.Contains);
        this.setUpInteractions();
        //Adding to Scene
    

        // Handle resizing
        // scene.scale.on("resize", this.onResize, this);
        this.onResize(scene.scale.gameSize); // Call once initially
        this.setSize(this.originalSize.w,this.originalSize.h);

        this.displayRect = this.scene.add.rectangle(0, 0, this.width, this.height);
        this.background.setDisplaySize(this.width-10, this.height - 10);
        // Optional: Add a border
        this.displayRect.setStrokeStyle(4, 0xffffff);
        this.add(this.displayRect);

        // const rect = this.scene.add.rectangle(0, 0, this.width, this.height,0xff0000);
        // // this.background.setDisplaySize(width, height);
        // // Optional: Add a border
        // rect.setStrokeStyle(4, 0xffffff);
        // this.add(rect);
        scene.add.existing(this);
    }

    private setUpInteractions(){
        this.on("pointerdown", () => this.onPress());
        this.on("pointerup", () => this.onRelease());
        this.on("pointerover", () => this.onHoverEnter());
        this.on("pointerout", () => this.onHoverExit());
    }
    
    public onPress() {
        this.setScale(this.currentScaleFactor - 0.05); // Press effect
        if (this.onClickCallBack) this.onClickCallBack();
        setTimeout(() => this.setScale(this.currentScaleFactor), 200);
    }

    public onRelease() {
        this.setScale(this.currentScaleFactor);
        // if (this.onClickCallBack) this.onClickCallBack(); // Call the assigned function
    }

    private onHoverEnter() {
        this.background.setTint(0xaaaaaa); // Change color on hover
    }

    private onHoverExit() {
        this.background.clearTint(); // Reset color on exit
    }

    onResize(gameSize: Phaser.Structs.Size): void {
        const { width, height } = gameSize;

        const scaleFactor = Math.min(width / this.baseResolution.width, height / this.baseResolution.height);

        console.log("Resize Scale : " + scaleFactor);
        this.currentScaleFactor = scaleFactor;
        this.setScale(this.currentScaleFactor);
        //this.setSize(this.originalSize.w * scaleFactor,this.originalSize.h * scaleFactor);
        // this.displayWidth = this.originalSize.w * scaleFactor;
        // this.displayHeight = this.originalSize.h * scaleFactor;

        console.log("Resize Scale width : " + this.displayWidth + " Height : " +  this.displayHeight);
        // Position based on screen %
        this.x = width * this.anchor.x;
        
        this.y = height * this.anchor.y;    
    }

    enableButton(isVisible: boolean = true) {
        this.active = true;
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height),Phaser.Geom.Rectangle.Contains);
        this.setAlpha(1.0);
        this.setVisible(isVisible);
    }

    disbaleButton(isVisible: boolean = true) {
        this.active = false;
        this.setAlpha(0.5);
        this.disableInteractive()
        this.setVisible(isVisible);
    }

}

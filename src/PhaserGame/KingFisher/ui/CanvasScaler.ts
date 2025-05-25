import Phaser from "phaser";

export enum ScaleMode {
    ConstantPixelSize,
    ScaleWithScreenSize,
    ConstantPhysicalSize,
  }
  
  export enum ScreenMatchMode {
    MatchWidthOrHeight,
    Expand,
    Shrink,
  }
  
  export class CanvasScaler {
    private game: Phaser.Game;
    private scaleMode: ScaleMode;
    private referenceResolution: { width: number; height: number };
    private screenMatchMode: ScreenMatchMode;
    private match: number;
    private defaultDPI: number = 96;
    private fallbackScale: number = 1;
  
    constructor(config: {
      game: Phaser.Game;
      scaleMode?: ScaleMode;
      referenceResolution?: { width: number; height: number };
      screenMatchMode?: ScreenMatchMode;
      match?: number;
    }) {
      this.game = config.game;
      this.scaleMode = config.scaleMode ?? ScaleMode.ScaleWithScreenSize;
      this.referenceResolution = config.referenceResolution ?? { width: 1920, height: 1080 };
      this.screenMatchMode = config.screenMatchMode ?? ScreenMatchMode.MatchWidthOrHeight;
      this.match = config.match ?? 0.5;
  
      this.applyScale();
      window.addEventListener("resize", () => this.applyScale());
    }
  
    private applyScale() {
      const canvas = this.game.canvas;
      const parent = canvas.parentElement;
      if (!parent) {
        return;
      }
  
      const screenWidth = parent.clientWidth;
      const screenHeight = parent.clientHeight;
  
      let scaleX = screenWidth / this.referenceResolution.width;
      let scaleY = screenHeight / this.referenceResolution.height;
  
      let scale = 1;
  
      switch (this.scaleMode) {
        case ScaleMode.ConstantPixelSize:
          scale = 1;
          break;
  
        case ScaleMode.ScaleWithScreenSize:
          switch (this.screenMatchMode) {
            case ScreenMatchMode.MatchWidthOrHeight:
              scale = Phaser.Math.Linear(scaleX, scaleY, this.match);
              break;
            case ScreenMatchMode.Expand:
              scale = Math.min(scaleX, scaleY);
              break;
            case ScreenMatchMode.Shrink:
              scale = Math.max(scaleX, scaleY);
              break;
          }
          break;
  
        case ScaleMode.ConstantPhysicalSize:
          scale = this.getDPIScale();
          break;
      }
  
      const newWidth = this.referenceResolution.width * scale;
      const newHeight = this.referenceResolution.height * scale;
  
      this.game.scale.resize(newWidth, newHeight);
      canvas.style.width = `${newWidth}px`;
      canvas.style.height = `${newHeight}px`;
      console.log("Scale Value  : " + scale);
      // ✅ Update camera zoom to match the scale
      const mainCamera = this.game.scene.keys.default?.cameras?.main;
    //   const mainCamera = this.game.scene.getScenes(true)[0].cameras?.main;// this.game.scene.keys.default?.cameras?.main;
      console.log("Main Camera : " + mainCamera);
      if (mainCamera) {
        mainCamera.setZoom(scale);
        console.log("Camera Zoom: ApplyScale", mainCamera.zoom);
      }
    }
  
    private getDPIScale(): number {
      const dpi = this.getScreenDPI();
      return dpi ? dpi / this.defaultDPI : this.fallbackScale;
    }
  
    private getScreenDPI(): number | null {
      const div = document.createElement("div");
      div.style.width = "1in";
      div.style.height = "1in";
      div.style.position = "absolute";
      div.style.left = "-100%";
      document.body.appendChild(div);
      const dpi = div.offsetWidth;
      document.body.removeChild(div);
      return dpi || null;
    }
  }
  
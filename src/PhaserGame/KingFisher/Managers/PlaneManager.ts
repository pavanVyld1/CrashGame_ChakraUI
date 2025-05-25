import Phaser from "phaser";

export default class PlaneManager {
  private scene: Phaser.Scene;
  private plane!: Phaser.GameObjects.Image;
  private trailGraphics!: Phaser.GameObjects.Graphics;
  private previousPositions: { x: number; y: number }[] = [];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  createPlane() {
    this.plane = this.scene.add.image(this.scene.cameras.main.width / 2, this.scene.cameras.main.height * 0.6, "plane");
    this.trailGraphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xffd700 } });
    this.resizePlane();
  }

  resizePlane() {
    const planeMaxWidth = this.scene.cameras.main.width * 0.1;
    const planeMaxHeight = this.scene.cameras.main.height * 0.1;
    const aspectRatio = this.plane.width / this.plane.height;
    
    if (planeMaxWidth / aspectRatio <= planeMaxHeight) {
      this.plane.displayWidth = planeMaxWidth;
      this.plane.displayHeight = planeMaxWidth / aspectRatio;
    } else {
      this.plane.displayHeight = planeMaxHeight;
      this.plane.displayWidth = planeMaxHeight * aspectRatio;
    }
  }

  updateMovement(multiplier: number) {
    this.previousPositions.push({ x: this.plane.x, y: this.plane.y });
    if (this.previousPositions.length > 50) this.previousPositions.shift();

    this.plane.x += Math.pow(multiplier, 1.1);
    this.plane.y -= Math.pow(multiplier, 0.7);

    this.trailGraphics.clear();
    this.trailGraphics.beginPath();
    for (const pos of this.previousPositions) {
      this.trailGraphics.lineTo(pos.x, pos.y);
    }
    this.trailGraphics.strokePath();
  }

  resetPlane() {
    this.previousPositions = [];
    this.trailGraphics.clear();
    this.plane.setPosition(this.scene.cameras.main.width / 2, this.scene.cameras.main.height * 0.6);
  }
}

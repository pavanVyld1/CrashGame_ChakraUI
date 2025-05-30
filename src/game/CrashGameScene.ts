import Phaser from "phaser";

export default class CrashGameScene extends Phaser.Scene {
  private multiplierText!: Phaser.GameObjects.Text;
  private crashed: boolean = false;

  constructor() {
    super({ key: "CrashGameScene" });
  }

  preload(): void {
    // Load assets if needed
  }

  create(): void {
    this.crashed = false;

    this.add.text(300, 50, "Crash Game", {
      fontSize: "32px",
      color: "#ffffff",
    });

    this.multiplierText = this.add.text(350, 300, "1.00x", {
      fontSize: "64px",
      color: "#00ff00",
      fontFamily: "monospace",
    });

    this.cameras.main.setBackgroundColor("#121212");
  }

  startGame(): void {
    this.crashed = false;
    this.multiplierText.setText("1.00x");
    this.multiplierText.setColor("#00ff00");
  }

  updateMultiplier(multiplier: number): void {
    if (this.crashed) return;

    this.multiplierText.setText(`${multiplier.toFixed(2)}x`);

    if (multiplier >= 2.0) {
      this.multiplierText.setColor("#ffff00");
    }
    if (multiplier >= 3.0) {
      this.multiplierText.setColor("#ff6600");
    }
    if (multiplier >= 5.0) {
      this.multiplierText.setColor("#ff0000");
    }
  }

  onStateChange(state: string) {
    console.log("Phaser Scene received state change:", state);
    // Handle UI or animations based on game state
  }

  onCrash(): void {
    this.crashed = true;
    this.multiplierText.setText("💥 CRASHED 💥");
    this.multiplierText.setColor("#ff0000");
  }
}

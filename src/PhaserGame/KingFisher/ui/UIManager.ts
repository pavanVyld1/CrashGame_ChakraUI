import Phaser from "phaser";

export default class UIManager {
  private scene: Phaser.Scene;
  private multiplierText!: Phaser.GameObjects.Text;
  private betText!: Phaser.GameObjects.Text;
  private betButton!: Phaser.GameObjects.Image;
  private betButtonText!: Phaser.GameObjects.Text;
  private cashOutButton!: Phaser.GameObjects.Image;
  private cashOutButtonText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  createUI(betAmount: number) {
    const centerX = this.scene.cameras.main.width / 2;
    const centerY = this.scene.cameras.main.height / 2;

    this.multiplierText = this.scene.add.text(centerX, centerY - this.scene.cameras.main.height * 0.15, "1.00x", {
      fontSize: `${this.scene.cameras.main.width * 0.05}px`,
      color: "#fff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.betText = this.scene.add.text(centerX, centerY, `Bet: $${betAmount}`, {
      fontSize: `${this.scene.cameras.main.width * 0.03}px`,
      color: "#fff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.createButtons(centerX, centerY);
  }

  createButtons(centerX: number, centerY: number) {
    ({ button: this.betButton, text: this.betButtonText } = this.createButton(centerX - 120, centerY + 200, "Bet", () => {
      this.scene.events.emit("placeBet");
    }));

    ({ button: this.cashOutButton, text: this.cashOutButtonText } = this.createButton(centerX + 120, centerY + 200, "Cash Out", () => {
      this.scene.events.emit("cashOut");
    }));
  }

  createButton(x: number, y: number, label: string, callback: () => void) {
    const button = this.scene.add.image(x, y, "button").setInteractive();
    const text = this.scene.add.text(x, y, label, {
      fontSize: "24px",
      color: "#fff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    button.displayWidth = Math.max(text.width + 40, 100);
    button.displayHeight = button.displayWidth / (button.width / button.height);

    button.on("pointerdown", callback);

    return { button, text };
  }

  updateMultiplier(multiplier: number) {
    this.multiplierText.setText(multiplier.toFixed(2) + "x");
  }

  crashEffect() {
    this.multiplierText.setColor("#ff0000");
  }
}

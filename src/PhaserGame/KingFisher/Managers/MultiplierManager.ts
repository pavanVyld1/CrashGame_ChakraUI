export default class MultiplierManager {
    private multiplier: number = 1.0;
    private isCrashed: boolean = false;
    private crashPoint: number;
    private onMultiplierUpdate: (value: number) => void;
    private onCrash: () => void;
  
    constructor(onMultiplierUpdate: (value: number) => void, onCrash: () => void) {
      this.onMultiplierUpdate = onMultiplierUpdate;
      this.onCrash = onCrash;
      this.crashPoint = Math.random() * 5 + 2;
    }
  
    start() {
      this.isCrashed = false;
      this.multiplier = 1.0;
      this.crashPoint = Math.random() * 5 + 2;
    }
  
    update() {
      if (!this.isCrashed) {
        this.multiplier += 0.1 * this.multiplier;
        this.onMultiplierUpdate(this.multiplier);
  
        if (this.multiplier >= this.crashPoint) {
          this.isCrashed = true;
          this.onCrash();
        }
      }
    }
  
    getMultiplier(): number {
      return this.multiplier;
    }
  
    isGameCrashed(): boolean {
      return this.isCrashed;
    }
  }
  
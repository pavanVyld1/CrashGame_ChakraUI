import Phaser from 'phaser';

interface CrashSceneConfig {
  onMultiplierChange: (value: number) => void;
  onCrashed: (crashPoint: number) => void;
}

export default class CrashScene extends Phaser.Scene {
  private train!: Phaser.GameObjects.Sprite;
  private track!: Phaser.GameObjects.Graphics;
  private multiplierText!: Phaser.GameObjects.Text;
  
  private isRunning: boolean = false;
  private startTime: number = 0;
  private currentMultiplier: number = 1;
  private crashPoint: number = 0;
  private trainSpeed: number = 100;
  private trackPoints: Phaser.Math.Vector2[] = [];
  
  private callbacks: CrashSceneConfig;
  
  constructor(callbacks: CrashSceneConfig) {
    super('CrashScene');
    this.callbacks = callbacks;
  }
  
  preload() {
    this.load.image('train', 'lovable-uploads/40f2ac5e-04af-42cc-9cc7-25888291de4b.png');
    this.load.image('sky', '/assets/sky.png');
    this.load.image('mountain', '/assets/mountain.png');
    this.load.image('money_bag', '/assets/moneybag.png');

    this.load.image('apple_img','assets/spine/apple.png');
    this.load.spineAtlas('apple_atlas','/assets/spine/apple.atlas');
    this.load.spineJson('apple_json','/assets/spine/apple.json');
    // Create placeholder assets
    this.createPlaceholderAssets();
  }
  
  createPlaceholderAssets() {
    // Create sky
    const skyTexture = this.textures.createCanvas('sky', 800, 400);
    if(skyTexture){
    const skyCtx = skyTexture?.getContext();
    const skyGrd = skyCtx?.createLinearGradient(0, 0, 0, 400);
    skyGrd?.addColorStop(0, '#3498db');
    skyGrd?.addColorStop(1, '#87ceeb');
    if(skyCtx){
      skyCtx.fillStyle = skyGrd;
      skyCtx.fillRect(0, 0, 800, 400);
    }
    skyTexture?.refresh();
  }

    // Create mountain
    const mountainTexture = this.textures.createCanvas('mountain', 800, 200);
    if(mountainTexture){
    const mountainCtx = mountainTexture.getContext();
    mountainCtx.fillStyle = '#cd853f';
    
    // Draw mountains
    mountainCtx.beginPath();
    mountainCtx.moveTo(0, 200);
    mountainCtx.lineTo(0, 120);
    mountainCtx.lineTo(200, 60);
    mountainCtx.lineTo(400, 150);
    mountainCtx.lineTo(600, 70);
    mountainCtx.lineTo(800, 140);
    mountainCtx.lineTo(800, 200);
    mountainCtx.closePath();
    mountainCtx.fill();
    
    mountainTexture.refresh();
    }
    // Create money bag
    const bagTexture = this.textures.createCanvas('money_bag', 50, 50);
    if(bagTexture){
    const bagCtx = bagTexture.getContext();
    bagCtx.fillStyle = '#f1c40f';
    bagCtx.beginPath();
    bagCtx.arc(25, 25, 20, 0, Math.PI * 2);
    bagCtx.fill();
    
    bagCtx.strokeStyle = '#000';
    bagCtx.lineWidth = 2;
    bagCtx.beginPath();
    bagCtx.moveTo(25, 10);
    bagCtx.lineTo(25, 5);
    bagCtx.stroke();
    
    bagCtx.font = 'bold 20px Arial';
    bagCtx.fillStyle = '#000';
    bagCtx.textAlign = 'center';
    bagCtx.textBaseline = 'middle';
    bagCtx.fillText('$', 25, 25);
    
    bagTexture.refresh();
  }
  }
  
  create() {
    const { width, height } = this.scale;
    
    // Add sky background
    this.add.image(width / 2, height / 2 - 50, 'sky').setDisplaySize(width, height - 100);
    
    // Add mountains
    this.add.image(width / 2, height - 150, 'mountain').setDisplaySize(width, 200);

    const appleSpine = this.add.spine(width / 2, height - 100, 'apple_json','apple_atlas').setOrigin(0.5, 0.5).setScale(0.5);

    appleSpine.animationState.addAnimation(0,'win',true,0);
    
    // Create track
    this.track = this.add.graphics();
    this.generateTrackPoints();
    this.drawTrack();
    
    // Add money bag (goal)
    const moneyBag = this.add.image(width - 50, height - 175, 'money_bag').setScale(1);
    
    // Add train
    this.train = this.add.sprite(0, height - 160, 'train').setScale(0.3).setOrigin(0.5, 0.5);
    
    // Add multiplier text
    this.multiplierText = this.add.text(width / 2, height / 3, '1.0x', {
      fontFamily: 'Press Start 2P',
      fontSize: '64px',
      color: '#f1c40f',
      stroke: '#000000',
      strokeThickness: 6,
      shadow: { offsetX: 2, offsetY: 2, color: '#000000', blur: 5, stroke: true }
    }).setOrigin(0.5);
    
    // Reset the game
    this.reset();
    
    // Listen for window resize
    this.scale.on('resize', this.handleResize, this);
    
    console.log("CrashScene created and ready");
  }
  
  handleResize(gameSize: Phaser.Structs.Size) {
    const width = gameSize.width;
    const height = gameSize.height;
    
    // Regenerate track for new dimensions
    this.generateTrackPoints();
    
    // Update positions
    this.train.setY(height - 160);
    this.multiplierText.setPosition(width / 2, height / 3);
    
    // Redraw track
    this.drawTrack();
  }
  
  generateTrackPoints() {
    const { width, height } = this.scale;
    this.trackPoints = [];
    
    // Starting point
    this.trackPoints.push(new Phaser.Math.Vector2(0, height - 150));
    
    // Generate random points for a curved track
    const segments = 10;
    const segmentWidth = width / segments;
    
    for (let i = 1; i <= segments; i++) {
      const x = i * segmentWidth;
      // Make the track go slightly up and down
      const y = height - 150 + Math.sin(i * 0.5) * 20;
      this.trackPoints.push(new Phaser.Math.Vector2(x, y));
    }
  }
  
  drawTrack() {
    this.track.clear();
    
    // Draw track
    this.track.lineStyle(4, 0xC0C0C0);
    this.track.beginPath();
    
    this.track.moveTo(this.trackPoints[0].x, this.trackPoints[0].y);
    
    for (let i = 1; i < this.trackPoints.length; i++) {
      this.track.lineTo(this.trackPoints[i].x, this.trackPoints[i].y);
    }
    
    this.track.strokePath();
    
    // Draw sleepers (railroad ties)
    for (let i = 0; i < this.trackPoints.length - 1; i++) {
      const p1 = this.trackPoints[i];
      const p2 = this.trackPoints[i + 1];
      const distance = Phaser.Math.Distance.Between(p1.x, p1.y, p2.x, p2.y);
      const numSleepers = Math.floor(distance / 30);
      
      for (let j = 0; j < numSleepers; j++) {
        const t = j / numSleepers;
        const x = Phaser.Math.Interpolation.Linear([p1.x, p2.x], t);
        const y = Phaser.Math.Interpolation.Linear([p1.y, p2.y], t);
        
        this.track.lineStyle(8, 0x8B4513);
        this.track.beginPath();
        this.track.moveTo(x - 15, y + 5);
        this.track.lineTo(x + 15, y + 5);
        this.track.strokePath();
      }
    }
  }
  
  startGame() {
    console.log("CrashScene.startGame() called");
    if (this.isRunning) {
      console.log("Game already running, ignoring startGame call");
      return;
    }
    
    this.isRunning = true;
    this.startTime = Date.now();
    
    // Generate a crash point (between 1 and 10, with higher values being less likely)
    this.crashPoint = this.generateCrashPoint();
    console.log(`Game started with crash point: ${this.crashPoint.toFixed(2)}x`);
    
    // Reset train position
    this.train.setPosition(0, this.scale.height - 160);
    this.currentMultiplier = 1;
  }
  
  stopGame() {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    
    // Trigger crash event
    this.callbacks.onCrashed(this.crashPoint);
    
    // Add explosion effect
    this.addExplosion(this.train.x, this.train.y);
    
    console.log("Game stopped with crashPoint:", this.crashPoint);
  }
  
  reset() {
    this.isRunning = false;
    this.currentMultiplier = 1;
    this.train.setPosition(0, this.scale.height - 160);
    this.updateMultiplierText();
    console.log("Game reset");
  }
  
  update() {
    if (!this.isRunning) return;
    
    const now = Date.now();
    const elapsed = (now - this.startTime) / 1000;
    
    // Calculate the current multiplier using an exponential function
    this.currentMultiplier = Math.pow(Math.E, 0.06 * elapsed);
    
    // Update the multiplier display
    this.updateMultiplierText();
    
    // Move the train
    const progress = Math.min(this.currentMultiplier / this.crashPoint, 1);
    const { width } = this.scale;
    this.train.x = width * progress;
    
    // Interpolate train position along the track
    if (this.trackPoints.length > 1) {
      const trackSegment = Math.floor(progress * (this.trackPoints.length - 1));
      const segmentProgress = (progress * (this.trackPoints.length - 1)) - trackSegment;
      
      if (trackSegment < this.trackPoints.length - 1) {
        const p1 = this.trackPoints[trackSegment];
        const p2 = this.trackPoints[trackSegment + 1];
        
        this.train.x = Phaser.Math.Interpolation.Linear([p1.x, p2.x], segmentProgress);
        this.train.y = Phaser.Math.Interpolation.Linear([p1.y, p2.y], segmentProgress);
        
        // Rotate train to match track direction
        const angle = Phaser.Math.Angle.Between(p1.x, p1.y, p2.x, p2.y);
        this.train.rotation = angle;
      }
    }
    
    // Check if we've reached the crash point
    if (this.currentMultiplier >= this.crashPoint) {
      this.stopGame();
    }
    
    // Notify of multiplier change
    this.callbacks.onMultiplierChange(this.currentMultiplier);
  }
  
  updateMultiplierText() {
    this.multiplierText.setText(`${this.currentMultiplier.toFixed(1)}x`);
    
    // Scale the text based on the multiplier
    const scaleFactor = 1 + Math.min(this.currentMultiplier / 10, 0.5);
    this.multiplierText.setScale(scaleFactor);
    
    // Change color based on the multiplier
    if (this.currentMultiplier >= 5) {
      this.multiplierText.setStyle({ color: '#f39c12' }); // Orange
    } else if (this.currentMultiplier >= 2) {
      this.multiplierText.setStyle({ color: '#f1c40f' }); // Yellow
    } else {
      this.multiplierText.setStyle({ color: '#2ecc71' }); // Green
    }
  }
  
  generateCrashPoint() {
    // Use an exponential distribution to make higher crash points less likely
    const r = Math.random();
    // This gives crash points between 1 and potentially very high values
    // with a bias towards lower values
    return 1 + (-Math.log(1 - r * 0.95) / 0.25);
  }
  
  addExplosion(x: number, y: number) {
    // Add a flash effect
    const flash = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xffffff);
    flash.setAlpha(0.8);
    flash.setOrigin(0);
    
    this.tweens.add({
      targets: flash,
      alpha: 0,
      duration: 200,
      onComplete: () => {
        flash.destroy();
      }
    });
    
    // Shake camera effect
    this.cameras.main.shake(500, 0.01);
  }
  
  getCurrentMultiplier() {
    return this.currentMultiplier;
  }
}

import Phaser from "phaser";


export default class TestScrollScene extends Phaser.Scene {

      //Tile Scroll
        private tile_bg!: Phaser.GameObjects.TileSprite;
        private tile_fog!: Phaser.GameObjects.TileSprite;
        private tile_fg!: Phaser.GameObjects.TileSprite;
        private tile_tree!: Phaser.GameObjects.TileSprite;

    constructor() {
        super({ key: 'TestScrollScene' });
    }
    
    preload(){
        this.load.image("tile_Bg","assets/tileImages/background.png");
        this.load.image("tile_fog","assets/tileImages/fog.png")
        this.load.image("tile_fg","assets/tileImages/foreground.png")
        this.load.image("tile_tree","assets/tileImages/trees.png")

        //Adding the Spline
        this.load.image('apple_img','assets/spine/apple.png');
        this.load.spineAtlas('apple_atlas','/assets/spine/apple.atlas');
        this.load.spineJson('apple_json','/assets/spine/apple.json');
    }

    create() {
        this.createTileSprites();

        // const appleSpine = this.add.spine(this.scale.width / 2, this.scale.height - 100, 'apple_json','apple_atlas');//.setOrigin(0.5, 0.5).setScale(0.5);

        // appleSpine.animationState.addAnimation(0,'win',true,0);
        console.log("TestScroll Scene create called w : " + this.scale.width + "  h : " + this.scale.height);
        // this.scale.on("resize", this.resizeGame, this);
    }

    createTileSprites(){
          const { width, height} = this.scale;
    
          this.tile_fog = this.addTileWithScale("tile_fog",width,height);
          this.tile_fog.setDepth(100);
    
          this.tile_bg = this.addTileWithScale("tile_Bg",width ,height);
          this.tile_bg.setDepth(50);
          this.tile_fg = this.addTileWithScale("tile_fg",width,height);
          this.tile_fg.setDepth(90);
          this.tile_tree = this.addTileWithScale("tile_tree",width,height)
          this.tile_tree.setDepth(80);
        }
    
        addTileWithScale(textureName : string, width: number, height: number) : Phaser.GameObjects.TileSprite{
          let newWidth = width * 2;
          let newhieight= height * 1;
          const tile = this.add.tileSprite(0,0, newWidth,newhieight,textureName).setOrigin(0,0);
          let tex = this.textures.get(textureName).getSourceImage() as Phaser.GameObjects.RenderTexture;
          const {scalex, scaley} = this.getScaleValue(tex, newWidth, newhieight);
          tile.setTileScale(scalex,scaley);
          return tile;
        }

        getScaleValue(image : Phaser.GameObjects.RenderTexture , width : number, height : number) : {scalex: number, scaley : number}{
            return {scalex : width / image.width , scaley : height / image.height};
        }

    update(time: number, delta: number): void {
        
      this.tile_bg.tilePositionX += (0.3);
      this.tile_tree.tilePositionX += (0.35);
      this.tile_fg.tilePositionX += (0.5);
      this.tile_fog.tilePositionX += (0.8);
    }
    
    resize(width: number, height: number) {
      // Custom method, React will call this via reference
      console.log('Scene received resize:', width, height);

      console.log('Scene received Current size:', this.scale.width, this.scale.height);
      this.scale.resize(width, height); // Optional if React does it already
      this.cameras.resize(width, height);
      // Example: reposition game objects
      // this.mySprite.setPosition(width / 2, height / 2);
      this.tile_bg?.setDisplaySize(width,height);
      this.tile_tree?.setDisplaySize(width,height);
      this.tile_fog?.setDisplaySize(width,height);
      this.tile_fg?.setDisplaySize(width,height);
    }

    private resizeGame(gameSize: Phaser.Structs.Size) {
      console.log("Resized to:", gameSize.width, gameSize.height);
    }
}
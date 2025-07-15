import Phaser from "phaser";


export default class TestScrollScene extends Phaser.Scene {

      //Tile Scroll
        private tile_bg_1!: Phaser.GameObjects.TileSprite;
        private tile_bg_2!: Phaser.GameObjects.TileSprite;
        private tile_bg_3!: Phaser.GameObjects.TileSprite;
        private tile_fog!: Phaser.GameObjects.TileSprite;
        private tile_fg!: Phaser.GameObjects.TileSprite;
        private tile_tree!: Phaser.GameObjects.TileSprite;

    constructor() {
        super({ key: 'TestScrollScene' });
    }
    
    preload(){
        this.load.image("tile_Bg_1","assets/tileImages/bg_layer_1.png");
        this.load.image("tile_Bg_2","assets/tileImages/bg_layer_2.png");
        this.load.image("tile_Bg_3","assets/tileImages/bg_layer_3.png");

        this.load.image("tile_fog","assets/tileImages/fog.png")
        this.load.image("tile_fg","assets/tileImages/foreground.png")
        this.load.image("tile_tree","assets/tileImages/trees.png")

        //Adding the Spline
        this.load.image('apple_img','assets/spine/apple.png');
        this.load.spineAtlas('apple_atlas','/assets/spine/apple.atlas');
        this.load.spineJson('apple_json','/assets/spine/apple.json');
    }

    create(){
        this.createTileSprites();

        // const appleSpine = this.add.spine(this.scale.width / 2, this.scale.height - 100, 'apple_json','apple_atlas');//.setOrigin(0.5, 0.5).setScale(0.5);

        // appleSpine.animationState.addAnimation(0,'win',true,0);
        console.log("TestScroll Scene create called");

    }

    createTileSprites(){
          const { width, height} = this.scale;
    
          console.log("Scele : W" + width + " H : " + height);

          this.tile_fog = this.addTileWithScale("tile_fog",width,height);
          this.tile_fog.setDepth(100);
    
          this.tile_bg_1 = this.addTileWithScale("tile_Bg_1",width,height);
          this.tile_bg_1.setDepth(50);
          this.tile_bg_2 = this.addTileWithScale("tile_Bg_2",width,height);
          this.tile_bg_2.setDepth(52);
          this.tile_bg_3 = this.addTileWithScale("tile_Bg_3",width,height);
          this.tile_bg_3.setDepth(53);
          // this.tile_fg = this.addTileWithScale("tile_fg",width,height);
          // this.tile_fg.setDepth(90);
          // this.tile_tree = this.addTileWithScale("tile_tree",width,height)
          // this.tile_tree.setDepth(80);
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
          const scaleX = width / image.width;
  const scaleY = height / image.height;
  const scale = Math.min(scaleX, scaleY); // preserve aspect ratio
  return { scalex: scale, scaley: scale };  
        }

    update(time: number, delta: number): void {
        
      this.tile_bg_1.tilePositionX += (0.3);
      this.tile_bg_2.tilePositionX += (0.5);
      this.tile_bg_3.tilePositionX += (1.0);

      // this.tile_tree.tilePositionX += (0.35);
      // this.tile_fg.tilePositionX += (0.5);
      // this.tile_fog.tilePositionX += (0.8);
    }   
}
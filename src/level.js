import Skeleton from './skeleton.js';
import Archer from './archer.js';
import Player from './player.js';
import Potion from './potion.js';
import Bat from './bat.js';
import Worm from './worm.js';
import Wolf from './wolf.js';
import Necromancer from './necromancer.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level' });
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    

    this.map = this.make.tilemap({ 
      key: 'tilemap', 
      tileWidth: 32, 
      tileHeight: 32 
    });
    const fondo = this.add.image(0,0,'background').setOrigin(0);
    fondo.setScale(1.2);
    const castleMainSet = this.map.addTilesetImage('main_lev_build_rescaled', 'castleMain');
    const castleDecorativeSet = this.map.addTilesetImage('other_and_decorative_rescaled', 'castleDecorative');
    const forestMainSet = this.map.addTilesetImage('SET1_Mainlev_build_rescaled', 'forestMain');
    const forestSecundarySet = this.map.addTilesetImage('SET1_Main_bckgrdlev_build_rescaled', 'forestSecundary');
    const caveMainSet = this.map.addTilesetImage('caves_mainlev_build_rescaled', 'caveMain');
    const caveProps1Set = this.map.addTilesetImage('caves_props1_rescaled', 'caveProps1');
    const caveProps2Set = this.map.addTilesetImage('caves_props2_rescaled', 'caveProps2');
    
    
    this.Castlebg1 = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, '01_background');
    this.Castlebg1.setScrollFactor(0,0);
    this.Castlebg1.setOrigin(0,0);
    this.Castlebg2 = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, '02_background');
    this.Castlebg2.setScrollFactor(0,0);
    this.Castlebg2.setOrigin(0,0);
    this.Castlebg3 = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, '03_background_A');
    this.Castlebg3.setScrollFactor(0,0);
    this.Castlebg3.setOrigin(0,0);
    this.Castlebg4 = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, '04_background');
    this.Castlebg4.setScrollFactor(0,0);
    this.Castlebg4.setOrigin(0,0);
    this.Castlebg5 = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, '05_background');
    this.Castlebg5.setScrollFactor(0,0);
    this.Castlebg5.setOrigin(0,0);

    
    
    this.backWallLayer = this.map.createLayer('BackWall', [castleMainSet, forestMainSet]);
    this.groundLayer = this.map.createLayer('Ground', [castleMainSet, forestMainSet, caveMainSet]);
    this.wallLayer = this.map.createLayer('Wall', [castleMainSet, forestMainSet, caveMainSet]);
    this.decorativesLayer = this.map.createLayer('Decoratives', [castleDecorativeSet,forestMainSet, caveMainSet]);
    this.damageLayer = this.map.createLayer('Damage', [castleMainSet, castleDecorativeSet,forestMainSet, caveMainSet]);
    this.platformLayer = this.map.createLayer('Platform', [castleMainSet, forestMainSet, caveMainSet]);
    this.enemies = this.add.group();
    this.enemiesPlatformCol = this.add.group();
    this.batGroup = this.add.group();
    this.potions = this.add.group();
    //this.backGround4Layer.scrollFactorX = 0.3;
    //this.backGround3Layer.scrollFactorX = 0.2;
    //this.backGround2Layer.scrollFactorX = 0.1;
    //this.backGround1Layer.scrollFactorX = 0.05;
    
    //this.enemies.add(new Archer(this, 900, 610));
    //this.enemies.add(new Skeleton(this, 700, 610));
    let necromancerPosition;
    let enemyFromTiled;
    const necromancerSkeletons = [];
    const charactersLayer = this.map.getObjectLayer('Characters');
    charactersLayer.objects.forEach(charObj => {
      if(charObj.type === "Main")
      this.player = new Player(this, charObj.x, charObj.y);
      else if(charObj.type === "Skeleton"){
        enemyFromTiled = new Skeleton(this, charObj.x, charObj.y);
        this.enemies.add(enemyFromTiled);
        this.enemiesPlatformCol.add(enemyFromTiled);
      }
      else if(charObj.type === "Archer"){
        enemyFromTiled = new Archer(this, charObj.x, charObj.y);
        this.enemies.add(enemyFromTiled);
        this.enemiesPlatformCol.add(enemyFromTiled);
      }
      else if(charObj.type === "Necromancer")
        necromancerPosition = [charObj.x, charObj.y];
      else if(charObj.type === "NecromancerSkeleton")
         necromancerSkeletons.push([charObj.x, charObj.y, false]);
      else if(charObj.type === "Bat"){
        enemyFromTiled = new Bat(this, charObj.x, charObj.y)
        this.enemies.add(enemyFromTiled);
        this.batGroup.add(enemyFromTiled);
      }
      else if(charObj.type === "Wolf"){
        enemyFromTiled = new Wolf(this, charObj.x, charObj.y);
        this.enemies.add(enemyFromTiled);
        this.enemiesPlatformCol.add(enemyFromTiled);
      }
      else if(charObj.type === "Worm"){
        enemyFromTiled = new Worm(this, charObj.x, charObj.y);
        this.enemies.add(enemyFromTiled);
        this.enemiesPlatformCol.add(enemyFromTiled);
      }
      else if(charObj.type === "Potion"){
        this.potions.add(new Potion(this, charObj.x, charObj.y));
      }
        
    });
    //this.potions.add(new Potion(this, 7940, 1259));
    enemyFromTiled = new Necromancer(this, necromancerPosition[0], necromancerPosition[1], necromancerSkeletons);
    this.enemies.add(enemyFromTiled);
    this.enemiesPlatformCol.add(enemyFromTiled);



    //Phaser.Display.Align.In.Center(this.bg1, this.player);
    //this.enemies.add(new Skeleton(this, 560 , 556));
    

    //this.cameras.main.setBounds(0,0, 500, 1000);
    this.playerCamera = this.cameras.main.startFollow(this.player, false, 1, 1, 0, 75);
    //this.cameras.main.setZoom(0.1);
    this.fullscreenButton = this.add.image(1270, 10, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
    this.fullscreenButton.setScale(0.05);
    this.fullscreenButton.setScrollFactor(0,0);

    this.groundLayer.setCollisionByProperty({collides:true});
    this.wallLayer.setCollisionByProperty({collides:true});
    this.platformLayer.setCollisionByProperty({collides:true});
    this.damageLayer.setCollisionByProperty({collides:true});
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.enemies, this.groundLayer);
    this.physics.add.collider(this.potions, this.groundLayer);
    this.physics.add.collider(this.enemies, this.platformLayer);
    this.physics.add.collider(this.potions, this.platformLayer);
    this.physics.add.collider(this.player, this.wallLayer, (player, wall) => {player.touchingWall = true; player.lastWallX = wall.x});
    this.physics.add.collider(this.enemies, this.wallLayer);
    this.damageLayerCollider = this.physics.add.collider(this.player, this.damageLayer, (player, dmgLayer) => {player.getDamage(100);});
    
    
    
    
    /*this.platformLayer.layer.data.forEach(function (row) {
      row.forEach(function (tile) {
        //console.log(index)
        //index++;  
        tile.collideDown = false
        tile.collideLeft = false
        tile.collideRight = false
        tile.collideUp = true
        // or less verbosely:
        // tile.setCollision(false, false, true, false)
        
      })
    })*/

    this.platformLayer.forEachTile(function (tile) {
        //console.log(index)
        //index++;  
        tile.collideDown = false
        tile.collideLeft = false
        tile.collideRight = false
        tile.collideUp = true
        // or less verbosely:
        // tile.setCollision(false, false, true, false)
        
    });


    //this.platformLayerCollider = this.physics.add.collider(this.player, this.platformLayer);

    this.fullscreenButton.on('pointerup', function () {

            if (this.scale.isFullscreen)
            {
              this.fullscreenButton.setFrame(0);

                this.scale.stopFullscreen();
            }
            else
            {
              this.fullscreenButton.setFrame(1);

                this.scale.startFullscreen();
            }

        }, this);

  }

  update(){
    this.Castlebg1.tilePositionX = this.playerCamera.scrollX * 0.1;
    this.Castlebg2.tilePositionX = this.playerCamera.scrollX * 0.15;
    this.Castlebg3.tilePositionX = this.playerCamera.scrollX * 0.2;
    this.Castlebg4.tilePositionX = this.playerCamera.scrollX * 0.6;
    this.Castlebg5.tilePositionX = this.playerCamera.scrollX * 0.7;
    //this.bg1.tilePositionY = this.playerCamera.scrollY * 0;
    //this.bg3.tilePositionY = this.playerCamera.scrollY * 0;
  }

  /**
   * Genera una estrella en una de las bases del escenario
   * @param {Array<Base>} from Lista de bases sobre las que se puede crear una estrella
   * Si es null, entonces se crea aleatoriamente sobre cualquiera de las bases existentes
   */
 

  /**
   * Método que se ejecuta al coger una estrella. Se pasa la base
   * sobre la que estaba la estrella cogida para evitar repeticiones
   * @param {Base} base La base sobre la que estaba la estrella que se ha cogido
   */
 

  playerDeath() {
    this.add.image(640,360,'muerte').setScale(0.75).setScrollFactor(0,0);;
    this.time.delayedCall(4000, () => {
      this.scene.start('level');
    }
    ,
  [], this);
    //this.time.delayedCall(2000, () => {this.scene.start('end')}, [], this);
  }

  enemyKilled() {
    this.time.delayedCall(3000, () => {this.enemies.add(this.add.existing(new Skeleton(this, 700, 610)));
    }, [], this);
  }
}

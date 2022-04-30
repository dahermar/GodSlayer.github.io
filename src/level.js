import Skeleton from './skeleton.js';
import Archer from './archer.js';
import Player from './player.js';
import Potion from './potion.js';
import Bat from './bat.js';
import Worm from './worm.js';
import Wolf from './wolf.js';
import Necromancer from './necromancer.js';
import Collectible from './collectible.js';
import SproutBoss from './sproutBoss.js';
import CheckPoint from './checkPoint.js';

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

    this.isBossAlive = new Array(true, true, true);

    const fondo = this.add.image(0,0,'background').setOrigin(0);
    fondo.setScale(1.2);
    const castleMainSet = this.map.addTilesetImage('main_lev_build_rescaled', 'castleMain');
    const castleDecorativeSet = this.map.addTilesetImage('other_and_decorative_rescaled', 'castleDecorative');
    const forestMainSet = this.map.addTilesetImage('SET1_Mainlev_build_rescaled', 'forestMain');
    //const forestMainFixedSet = this.map.addTilesetImage('SET1_Mainlev_build_rescaled_fixed', 'forestMain_fixed');
    const forestSecundarySet = this.map.addTilesetImage('SET1_Main_bckgrdlev_build_rescaled', 'forestSecundary');
    const caveMainSet = this.map.addTilesetImage('caves_mainlev_build_rescaled', 'caveMain');
    const caveProps1Set = this.map.addTilesetImage('caves_props1_rescaled', 'caveProps1');
    const caveProps2Set = this.map.addTilesetImage('caves_props2_rescaled', 'caveProps2');
    const forestPropsRescaledSet = this.map.addTilesetImage('TX_Village_Props_rescaled', 'forestProps_rescaled');
    const forestPropsMediumSet = this.map.addTilesetImage('TX_Village_Props_medium', 'forestProps_medium');
    const forestBackObjSet = this.map.addTilesetImage('SET1_background_obj_rescaled', 'forestBackObjects');
    
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

    this.forestNightbg1 = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'forest_background_night_1');
    this.forestNightbg1.setScrollFactor(0,0);
    this.forestNightbg1.setOrigin(0,0);
    this.forestNightbg2 = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'forest_background_night_2');
    this.forestNightbg2.setScrollFactor(0,0);
    this.forestNightbg2.setOrigin(0,0);
    this.forestNightbg3 = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'forest_background_night_3');
    this.forestNightbg3.setScrollFactor(0,0);
    this.forestNightbg3.setOrigin(0,0);
    this.forestNightbg4 = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'forest_background_night_4');
    this.forestNightbg4.setScrollFactor(0,0);
    this.forestNightbg4.setOrigin(0,0);
    
    this.forestNightbg1.setDisplayOrigin

    this.Castlebg1.removeFromDisplayList();
    this.Castlebg2.removeFromDisplayList();
    this.Castlebg3.removeFromDisplayList();
    this.Castlebg4.removeFromDisplayList();
    this.Castlebg5.removeFromDisplayList();

    
    
    this.backWallLayer = this.map.createLayer('BackWall', [castleMainSet, castleDecorativeSet,forestMainSet, caveMainSet, forestPropsRescaledSet, forestPropsMediumSet, forestSecundarySet, forestBackObjSet]);
    this.groundLayer = this.map.createLayer('Ground', [castleMainSet, castleDecorativeSet,forestMainSet, caveMainSet, forestPropsRescaledSet, forestPropsMediumSet, forestSecundarySet,forestBackObjSet]);
    this.wallLayer = this.map.createLayer('Wall', [castleMainSet, castleDecorativeSet,forestMainSet, caveMainSet, forestPropsRescaledSet, forestPropsMediumSet, forestSecundarySet, forestBackObjSet]);
    this.decorativesBackLayer = this.map.createLayer('DecorativesBack', [castleMainSet, castleDecorativeSet,forestMainSet, caveMainSet, forestPropsRescaledSet, forestPropsMediumSet, forestSecundarySet, forestBackObjSet]);
    this.decorativesFrontLayer = this.map.createLayer('DecorativesFront', [castleMainSet, castleDecorativeSet,forestMainSet, caveMainSet, forestPropsRescaledSet, forestPropsMediumSet, forestSecundarySet, forestBackObjSet]);
    this.GrassLayer = this.map.createLayer('Grass', [forestMainSet]);
    this.damageLayer = this.map.createLayer('Damage', [castleMainSet, castleDecorativeSet,forestMainSet, caveMainSet, forestPropsRescaledSet, forestPropsMediumSet, forestSecundarySet, forestBackObjSet]);
    this.platformLayer = this.map.createLayer('Platform', [castleMainSet, castleDecorativeSet,forestMainSet, caveMainSet, forestPropsRescaledSet, forestPropsMediumSet, forestSecundarySet, forestBackObjSet]);
    this.enemies = this.add.group();
    this.enemiesPlatformCol = this.add.group();
    this.batGroup = this.add.group();
    this.interactible = this.add.group();
    this.checkPointGroup = this.add.group();
    //this.backGround4Layer.scrollFactorX = 0.3;
    //this.backGround3Layer.scrollFactorX = 0.2;
    //this.backGround2Layer.scrollFactorX = 0.1;
    //this.backGround1Layer.scrollFactorX = 0.05;
    
    //this.enemies.add(new Archer(this, 900, 610));
    //this.enemies.add(new Skeleton(this, 700, 610));

    
    this.playerLayer = this.map.getObjectLayer('Player');
    const playObj = this.playerLayer.objects[0];
    this.player = new Player(this, playObj.x, playObj.y);
   
    
    this.charactersLayer = this.map.getObjectLayer('Characters');
    this.createEnemies();

    /*
    const checkPointsLayer = this.map.getObjectLayer('CheckPoints');
    checkPointsLayer.objects.forEach(checkObj => {
      this.checkPointGroup.add(new CheckPoint(this, checkObj.x, checkObj.y));
    });*/

    const Collectible_list = [];

    const collectiblesLayer = this.map.getObjectLayer('Collectibles');

    collectiblesLayer.objects.forEach(collecObj => {
       //console.log(collecObj.properties[collecObj.type]);
        Collectible_list[collecObj.type]=  new Collectible(this, collecObj.x, collecObj.y, collecObj.name, collecObj.name, collecObj.properties[0].value, false );
        this.interactible.add(Collectible_list[collecObj.type]);
    });

  
    this.decorativesFrontLayer.forEachTile(tile =>{
      if(tile.properties.checkPoint){
        this.checkPointGroup.add(new CheckPoint(this, tile.x*32, tile.y*32));
      }
      
    });

    const messagesLayer = this.map.getObjectLayer('Messages');

    messagesLayer.objects.forEach(messaObj => {
      console.log(messaObj.properties[0].value);
    });
  

    //Phaser.Display.Align.In.Center(this.bg1, this.player);
    //this.enemies.add(new Skeleton(this, 560 , 556));
    

    //this.cameras.main.setBounds(0,0, 500, 1000);
    this.playerCamera = this.cameras.main.startFollow(this.player, false, 1, 1, 0, 75);
    //this.cameras.main.setZoom(0.75);
    
    this.fullscreenButton = this.add.image(1270, 10, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
    this.fullscreenButton.setScale(0.05);
    this.fullscreenButton.setScrollFactor(0,0);

    this.pauseButton = this.add.image(1100, 10, 'pause', 0).setOrigin(1, 0).setInteractive();
    this.pauseButton.setScale(0.1);
    this.pauseButton.setScrollFactor(0,0);

    this.deadImage = this.add.image(640,360,'muerte').setScale(0.75).setScrollFactor(0,0);
    this.deadImage.setVisible(false);

    this.groundLayer.setCollisionByProperty({collides:true});
    this.wallLayer.setCollisionByProperty({collides:true});
    this.platformLayer.setCollisionByProperty({collides:true});
    this.damageLayer.setCollisionByProperty({collides:true});
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.enemies, this.groundLayer);
    this.physics.add.collider(this.interactible, this.groundLayer);
    this.physics.add.collider(this.enemies, this.platformLayer);
    this.physics.add.collider(this.interactible, this.platformLayer);
    //this.physics.add.collider(this.player, this.wallLayer, (player, wall) => {player.touchingWall = true; player.lastWallX = wall.x});
    this.physics.add.collider(this.player, this.wallLayer);
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

    this.pauseButton.on('pointerup', function () {

      console.log("Pausa");
      this.scene.launch('menu',{collectible_list: Collectible_list});

      this.scene.pause();

    }, this);

  }

  createEnemies(){
    let necromancerPosition;
    let enemyFromTiled;
    const necromancerSkeletons = [];
    this.charactersLayer.objects.forEach(charObj => {
      if (charObj.type === "Skeleton"){
        enemyFromTiled = new Skeleton(this, charObj.x, charObj.y, charObj.name);
        this.enemies.add(enemyFromTiled);
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
        this.interactible.add(new Potion(this, charObj.x, charObj.y));
      }

      else if(charObj.type === "Sprout" && this.isBossAlive[0]){
        this.bossSprout = new SproutBoss(this, charObj.x, charObj.y);
      }
        
    });
    enemyFromTiled = new Necromancer(this, necromancerPosition[0], necromancerPosition[1], necromancerSkeletons);
    this.enemies.add(enemyFromTiled);
    this.enemiesPlatformCol.add(enemyFromTiled);
  }

  update(){
    this.Castlebg1.tilePositionX = this.playerCamera.scrollX * 0.1;
    this.Castlebg2.tilePositionX = this.playerCamera.scrollX * 0.15;
    this.Castlebg3.tilePositionX = this.playerCamera.scrollX * 0.2;
    this.Castlebg4.tilePositionX = this.playerCamera.scrollX * 0.6;
    this.Castlebg5.tilePositionX = this.playerCamera.scrollX * 0.7;

    this.forestNightbg1.tilePositionX = this.playerCamera.scrollX * 0.1;
    this.forestNightbg2.tilePositionX = this.playerCamera.scrollX * 0.3;
    this.forestNightbg3.tilePositionX = this.playerCamera.scrollX * 0.4;
    this.forestNightbg4.tilePositionX = this.playerCamera.scrollX * 0.6;

    //this.Castlebg1 = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'forest_background_night_1');
    
    
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
    this.deadImage.setVisible(true);
    this.time.delayedCall(4000, () => {
      this.restartLevel();
    }
    ,
  [], this);
    //this.time.delayedCall(2000, () => {this.scene.start('end')}, [], this);
  }
  
  restartLevel(){
    this.deadImage.setVisible(false);
    this.destroyEnemies();
    this.player.respawn();
  }

  destroyEnemies(){
    const len = this.enemies.getLength();
    for(let i = 0; i < len; i++) {
      this.enemies.getChildren()[0].destroy();
   }
    this.bossSprout.destroy();
    this.createEnemies();
  }

  enemyKilled() {
    this.time.delayedCall(3000, () => {this.enemies.add(this.add.existing(new Skeleton(this, 700, 610)));
    }, [], this);
  }
}

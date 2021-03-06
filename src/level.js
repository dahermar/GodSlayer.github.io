import Skeleton from './skeleton.js';
import Archer from './archer.js';
import Player from './player.js';
import Potion from './potion.js';
import Bat from './bat.js';
import Worm from './worm.js';
import WormBoss from './wormBoss.js';
import Wolf from './wolf.js';
import Necromancer from './necromancer.js';
import Collectible from './collectible.js';
import SproutBoss from './sproutBoss.js';
import CheckPoint from './checkPoint.js';
import TextBox from './textbox.js';
import PowerEarned from './powerEarned.js';

/**
 * Escena principal del juego. 
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
    this.creditsShown = false;

    const castleMainSet = this.map.addTilesetImage('main_lev_build_rescaled', 'castleMain');
    const castleDecorativeSet = this.map.addTilesetImage('other_and_decorative_rescaled', 'castleDecorative');
    const forestMainSet = this.map.addTilesetImage('SET1_Mainlev_build_rescaled', 'forestMain');
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

    this.Castlebg1.setDepth(-5);
    this.Castlebg2.setDepth(-5);
    this.Castlebg3.setDepth(-5);
    this.Castlebg4.setDepth(-5);
    this.Castlebg5.setDepth(-5);



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

    this.forestNightbg1.setDepth(-5);
    this.forestNightbg2.setDepth(-5);
    this.forestNightbg3.setDepth(-5);
    this.forestNightbg4.setDepth(-5);

    this.cavebg1 = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'cave_background_1');
    this.cavebg1.setScrollFactor(0,0);
    this.cavebg1.setOrigin(0,0);
    this.cavebg2 = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'cave_background_2');
    this.cavebg2.setScrollFactor(0,0);
    this.cavebg2.setOrigin(0,0);
    this.cavebg3 = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'cave_background_3');
    this.cavebg3.setScrollFactor(0,0);
    this.cavebg3.setOrigin(0,0);
    this.cavebg4 = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'cave_background_4A');
    this.cavebg4.setScrollFactor(0,0);
    this.cavebg4.setOrigin(0,0);

    this.cavebg1.setDepth(-5);
    this.cavebg2.setDepth(-5);
    this.cavebg3.setDepth(-5);
    this.cavebg4.setDepth(-5);

    const config = {
      mute: false,
      volume: 0.15,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    }; 

    this.sound_castle = this.sound.add("castle_soundtrack", config);
    this.sound_forest = this.sound.add("forest_soundtrack", config);
    this.sound_cave = this.sound.add("cave_soundtrack", config);
    this.sound_finalBoss = this.sound.add("finalBoss_soundtrack", config);

    
    this.currentBackGround = "";
    this.removeCastleBackGround();
    this.removeForestBackGround();

    this.addForestBackGround();
    
  
    

    
    
    this.backWallLayer = this.map.createLayer('BackWall', [castleMainSet, castleDecorativeSet,forestMainSet, caveMainSet, forestPropsRescaledSet, forestPropsMediumSet, forestSecundarySet, forestBackObjSet]);
    this.groundLayer = this.map.createLayer('Ground', [castleMainSet, castleDecorativeSet,forestMainSet, caveMainSet, forestPropsRescaledSet, forestPropsMediumSet, forestSecundarySet,forestBackObjSet]);
    this.wallLayer = this.map.createLayer('Wall', [castleMainSet, castleDecorativeSet,forestMainSet, caveMainSet, forestPropsRescaledSet, forestPropsMediumSet, forestSecundarySet, forestBackObjSet]);
    this.finalWallLayer = this.map.createLayer('FinalWall', [castleMainSet]);
    this.decorativesBackLayer = this.map.createLayer('DecorativesBack', [castleMainSet, castleDecorativeSet,forestMainSet, caveMainSet, forestPropsRescaledSet, forestPropsMediumSet, forestSecundarySet, forestBackObjSet]);
    this.decorativesFrontLayer = this.map.createLayer('DecorativesFront', [castleMainSet, castleDecorativeSet,forestMainSet, caveMainSet, forestPropsRescaledSet, forestPropsMediumSet, forestSecundarySet, forestBackObjSet]);
    this.GrassLayer = this.map.createLayer('Grass', [forestMainSet]);
    this.damageLayer = this.map.createLayer('Damage', [castleMainSet, castleDecorativeSet,forestMainSet, caveMainSet, forestPropsRescaledSet, forestPropsMediumSet, forestSecundarySet, forestBackObjSet]);
    this.platformLayer = this.map.createLayer('Platform', [castleMainSet, castleDecorativeSet,forestMainSet, caveMainSet, forestPropsRescaledSet, forestPropsMediumSet, forestSecundarySet, forestBackObjSet]);
    this.enemies = this.add.group();
    this.enemiesPlatformCol = this.add.group();
    this.batGroup = this.add.group();
    this.interactible = this.add.group();
    this.potionGroup = this.add.group();
    this.checkPointGroup = this.add.group();
    this.toCastleGroup = this.add.group();
    this.toForestGroup = this.add.group();
    this.toCaveGroup = this.add.group();

    const levelChangesLayer = this.map.getObjectLayer('LevelChanges');
    levelChangesLayer.objects.forEach(levelObj => {
      if(levelObj.type === "SproutFinish"){
        this.sproutFinish = this.add.zone(levelObj.x, levelObj.y, 200, 200);
        this.physics.add.existing(this.sproutFinish);
        this.sproutFinish.body.setAllowGravity(false); 
      }

      else if(levelObj.type === "SproutDeath"){
        this.sproutDeath = this.add.zone(levelObj.x, levelObj.y, 2000, 200);
        this.physics.add.existing(this.sproutDeath);
        this.sproutDeath.body.setAllowGravity(false); 
      }

      else if(levelObj.type === "Dash"){
        this.dashEarned = new PowerEarned(this, levelObj.x, levelObj.y, "dash", " Axelia te otorga el poder del \n viento por derrotar al Gran Árbol");
      }

      else if(levelObj.type === "Doble"){
        this.dobleEarned = new PowerEarned(this, levelObj.x, levelObj.y, "doble", " Axelia te otorga el doble salto \n por derrotar al Devorador Ígneo");
      }

      else if(levelObj.type === "ToCastle"){
        const toCas = this.add.zone(levelObj.x, levelObj.y, 300, 700);
        this.toCastleGroup.add(toCas);
        this.physics.add.existing(toCas);
        toCas.body.setAllowGravity(false); 
      }

      else if(levelObj.type === "ToForest"){
        const toFor = this.add.zone(levelObj.x, levelObj.y, 300, 700);
        this.toForestGroup.add(toFor);
        this.physics.add.existing(toFor);
        toFor.body.setAllowGravity(false); 
      }
      
      else if(levelObj.type === "ToCave"){
        const toCav = this.add.zone(levelObj.x, levelObj.y, 800, 700);
        this.toCaveGroup.add(toCav);
        this.physics.add.existing(toCav);
        toCav.body.setAllowGravity(false); 
      }

      else if(levelObj.type === "Credits"){
        this.creditZone = this.add.zone(levelObj.x, levelObj.y - 100, 300, 700);
        this.physics.add.existing(this.creditZone);
        this.creditZone.body.setAllowGravity(false); 
      }
    });

    this.toBoss = this.add.zone(38363, 3263, 300, 700);
        this.physics.add.existing(this.toBoss);
        this.toBoss.body.setAllowGravity(false);

    this.fromBoss = this.add.zone(37863, 3263, 300, 700);
        this.physics.add.existing(this.fromBoss);
        this.fromBoss.body.setAllowGravity(false);


    this.playerLayer = this.map.getObjectLayer('Player');
    const playObj = this.playerLayer.objects[0];
    this.player = new Player(this, playObj.x, playObj.y);
   
    
    this.charactersLayer = this.map.getObjectLayer('Characters');

    this.createEnemies();

    const Collectible_list = [];
    this.collectible_list = Collectible_list;

    const collectiblesLayer = this.map.getObjectLayer('Collectibles');

    collectiblesLayer.objects.forEach(collecObj => {
        Collectible_list[collecObj.type]=  new Collectible(this, collecObj.x, collecObj.y, collecObj.name, collecObj.name, collecObj.properties[0].value, false );
        this.interactible.add(Collectible_list[collecObj.type]);
    });

  
    this.decorativesFrontLayer.forEachTile(tile =>{
      if(tile.properties.checkPoint){
        this.checkPointGroup.add(new CheckPoint(this, tile.x*32, tile.y*32));
      }
      
    });

    const messagesLayer = this.map.getObjectLayer('Messages');
    
    
    this.afterCreditMessages = [];
    messagesLayer.objects.forEach(messaObj => {
      if(messaObj.type != "Credits"){
        new TextBox(this, messaObj.x, messaObj.y, messaObj.properties[0].value);
      }
      else{
        this.afterCreditMessages.push(new Array(messaObj.x, messaObj.y, messaObj.properties[0].value));
        
      }
    });

    this.playerCamera = this.cameras.main.startFollow(this.player, false, 1, 1, 0, 75);
    
    this.fullscreenButton = this.add.image(1270, 10, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
    this.fullscreenButton.setScale(0.05);
    this.fullscreenButton.setScrollFactor(0,0);

    this.deadImage = this.add.image(640,360,'muerte').setScale(0.75).setScrollFactor(0,0);
    this.deadImage.setVisible(false);

    this.groundLayer.setCollisionByProperty({collides:true});
    this.wallLayer.setCollisionByProperty({collides:true});
    this.finalWallLayer.setCollisionByProperty({collides:true});
    this.platformLayer.setCollisionByProperty({collides:true});
    this.damageLayer.setCollisionByProperty({collides:true});
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.enemies, this.groundLayer);
    this.physics.add.collider(this.interactible, this.groundLayer);
    this.physics.add.collider(this.enemies, this.platformLayer);
    this.physics.add.collider(this.interactible, this.platformLayer);
    this.physics.add.collider(this.player, this.wallLayer);
    this.physics.add.collider(this.enemies, this.wallLayer);
    this.finalWallCollider = this.physics.add.collider(this.player, this.finalWallLayer);
    this.damageLayerCollider = this.physics.add.collider(this.player, this.damageLayer, (player, dmgLayer) => {player.getDamage(100);});
  

    this.platformLayer.forEachTile(function (tile) {
        tile.collideDown = false
        tile.collideLeft = false
        tile.collideRight = false
        tile.collideUp = true
    });

    
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


  createEnemies(){
    let necromancerPositions = [];
    let enemyFromTiled;
    const necromancerSkeletons = [];
    this.charactersLayer.objects.forEach(charObj => {
      if (charObj.type === "Skeleton"){
        enemyFromTiled = new Skeleton(this, charObj.x, charObj.y, charObj.name);
        this.enemies.add(enemyFromTiled);
      }
      else if(charObj.type === "Archer"){
        enemyFromTiled = new Archer(this, charObj.x, charObj.y, parseInt(charObj.name));
        this.enemies.add(enemyFromTiled);
        this.enemiesPlatformCol.add(enemyFromTiled);
      }
      else if(charObj.type === "Necromancer"&& this.isBossAlive[2]){
        if(charObj.name == "Necromancer1"){
          necromancerPositions[0] = [charObj.x, charObj.y];
        }
        else if(charObj.name == "Necromancer2"&& this.isBossAlive[2]){
          necromancerPositions[1] = [charObj.x, charObj.y];

        }
        else if(charObj.name == "Necromancer3"&& this.isBossAlive[2]){
          necromancerPositions[2] = [charObj.x, charObj.y];

        }
        else if(charObj.name == "Necromancer4"&& this.isBossAlive[2]){
          necromancerPositions[3] = [charObj.x, charObj.y];

        }
      }
      else if(charObj.type === "NecromancerSkeleton" && this.isBossAlive[2])
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
        enemyFromTiled = new Worm(this, charObj.x, charObj.y,parseInt(charObj.name));
        this.enemies.add(enemyFromTiled);
        this.enemiesPlatformCol.add(enemyFromTiled);
      }
      else if(charObj.type === "WormBoss" && this.isBossAlive[1]){
        enemyFromTiled = new WormBoss(this, charObj.x, charObj.y,parseInt(charObj.name));
        this.enemies.add(enemyFromTiled);
        this.enemiesPlatformCol.add(enemyFromTiled);
      }
      else if(charObj.type === "Potion"){
        enemyFromTiled = new Potion(this, charObj.x, charObj.y)
        this.interactible.add(enemyFromTiled);
        this.potionGroup.add(enemyFromTiled);
      }

      else if(charObj.type === "Sprout" && this.isBossAlive[0]){
        this.bossSprout = new SproutBoss(this, charObj.x, charObj.y);
      }
        
    });
    if(this.isBossAlive[2]){
      enemyFromTiled = new Necromancer(this, necromancerPositions, necromancerSkeletons);
      this.enemies.add(enemyFromTiled);
      this.enemiesPlatformCol.add(enemyFromTiled);
    }
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

    this.cavebg1.tilePositionX = this.playerCamera.scrollX * 0.1;
    this.cavebg2.tilePositionX = this.playerCamera.scrollX * 0.3;
    this.cavebg3.tilePositionX = this.playerCamera.scrollX * 0.4;
    this.cavebg4.tilePositionX = this.playerCamera.scrollX * 0.6;
  }

  
  pause_function(){
    this.scene.launch('menu',{collectible_list: this.collectible_list});
    this.scene.pause();
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
    this.time.delayedCall(4000, () => {
      this.restartLevel();
    }
    ,
  [], this);
  }
  
  restartLevel(){
    this.destroyEnemies();
    this.player.respawn();
  }

  destroyEnemies(){
    const len = this.enemies.getLength();
    for(let i = 0; i < len; i++) {
      this.enemies.getChildren()[0].destroy();
   }
   const len2 = this.potionGroup.getLength();
   for(let j = 0; j < len2; j++) {
    this.potionGroup.getChildren()[0].destroy();
 }
    this.bossSprout.destroy();
    this.boss
    this.bossSprout.destroy();
    this.createEnemies();
  }

  enemyKilled() {
    this.time.delayedCall(3000, () => {this.enemies.add(this.add.existing(new Skeleton(this, 700, 610)));
    }, [], this);
  }

  removeForestBackGround(){
    this.forestNightbg1.removeFromDisplayList();
    this.forestNightbg2.removeFromDisplayList();
    this.forestNightbg3.removeFromDisplayList();
    this.forestNightbg4.removeFromDisplayList();
  }

  removeCastleBackGround(){
    this.Castlebg1.removeFromDisplayList();
    this.Castlebg2.removeFromDisplayList();
    this.Castlebg3.removeFromDisplayList();
    this.Castlebg4.removeFromDisplayList();
    this.Castlebg5.removeFromDisplayList();
  }

  removeCaveBackGround(){
    this.cavebg1.removeFromDisplayList();
    this.cavebg2.removeFromDisplayList();
    this.cavebg3.removeFromDisplayList();
    this.cavebg4.removeFromDisplayList();
  }

  addForestBackGround(){
    if(this.currentBackGround != "forest"){
      if(this.currentBackGround === "castle"){
        this.removeCastleBackGround();
        this.sound_castle.stop();
        this.sound_finalBoss.stop();
      }
      else if(this.currentBackGround === "cave"){
        this.removeCaveBackGround();
        this.sound_cave.stop();
      }
      this.currentBackGround = "forest";
      this.forestNightbg1.addToDisplayList();
      this.forestNightbg2.addToDisplayList();
      this.forestNightbg3.addToDisplayList();
      this.forestNightbg4.addToDisplayList();
      this.sound_forest.play();
    }
    this.sound_forest.setRate(1);
  }

  addCastleBackGround(){
    if(this.currentBackGround != "castle"){
      if(this.currentBackGround === "forest"){
        this.removeForestBackGround();
        this.sound_forest.stop();
      }
      else if(this.currentBackGround === "cave"){
        this.removeCaveBackGround();
        this.sound_cave.stop();
      }
      this.currentBackGround = "castle";
      this.Castlebg1.addToDisplayList();
      this.Castlebg2.addToDisplayList();
      this.Castlebg3.addToDisplayList();
      this.Castlebg4.addToDisplayList();
      this.Castlebg5.addToDisplayList();
      this.sound_castle.play();

    }
  }

  addCaveBackGround(){
    if(this.currentBackGround != "cave"){
      if(this.currentBackGround === "forest"){
        this.removeForestBackGround();
        this.sound_forest.stop();
      }
      else if(this.currentBackGround === "castle"){
        this.removeCastleBackGround();
        this.sound_castle.stop();
        this.sound_finalBoss.stop();
      }
      this.currentBackGround = "cave";
      this.cavebg1.addToDisplayList();
      this.cavebg2.addToDisplayList();
      this.cavebg3.addToDisplayList();
      this.cavebg4.addToDisplayList();
      this.sound_cave.play();

    }
  }

  addBossSong(){
    if(this.finalWallCollider.active && !this.sound_finalBoss.isPlaying){
      this.sound_castle.stop();
      this.sound_finalBoss.play();
    }
  }
  removeBossSong(){
    if(this.finalWallCollider.active &&this.sound_finalBoss.isPlaying){
      this.sound_castle.play();
      this.sound_finalBoss.stop();
    }
  }
  
  removeFinalWall(){
    this.finalWallLayer.setVisible(false);
    this.finalWallCollider.active = false;
  }

  
  showCredits(){
    this.creditsShown = true;
    this.afterCreditMessages.forEach(mess => {
      new TextBox(this, mess[0], mess[1], mess[2]);
    });
    
    this.player.kniveEnabled = true;
    this.scene.launch('credits');

    this.sound_castle.pause(); 
    this.scene.pause();
  }

}


    

    
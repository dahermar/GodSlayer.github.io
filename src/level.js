import Skeleton from './skeleton.js';
import Archer from './archer.js';
import Player from './player.js';
import Potion from './potion.js';

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
    const castleSet = this.map.addTilesetImage('main_lev_build_doble', 'castle');
    const castleDecorativeSet = this.map.addTilesetImage('other_and_decorative_doble', 'castleDecorative');
    const forestMainSet = this.map.addTilesetImage('TX Tileset Ground', 'forestMain');
    const background01Set = this.map.addTilesetImage('01 background', 'background01');
    const background03ASet = this.map.addTilesetImage('03 background A', 'background03A');
    const backgroundDay2Set = this.map.addTilesetImage('SET1_bakcground_day2', 'backgroundDay2');
    const backgroundDay3Set = this.map.addTilesetImage('SET1_bakcground_day3', 'backgroundDay3');
    const backgroundObjSet = this.map.addTilesetImage('SET1_background_obj', 'backgroundObj');
    

    this.backGround1Layer = this.map.createLayer('BackGround1', [background01Set]);
    this.backGround2Layer = this.map.createLayer('BackGround2', [backgroundDay2Set]);
    this.backGround3Layer = this.map.createLayer('BackGround3', [backgroundDay3Set]);
    this.backGround4Layer = this.map.createLayer('BackGround4', [backgroundObjSet]);
    this.backWallLayer = this.map.createLayer('BackWall', [castleSet]);
    this.groundLayer = this.map.createLayer('Ground', [castleSet, forestMainSet]);
    this.wallLayer = this.map.createLayer('Wall', castleSet);
    this.decorativesLayer = this.map.createLayer('Decoratives', castleDecorativeSet);
    this.platformLayer = this.map.createLayer('Platform', [castleSet, forestMainSet]);
  
    this.enemies = this.add.group();
    //this.backGround4Layer.scrollFactorX = 0.3;
    //this.backGround3Layer.scrollFactorX = 0.2;
    //this.backGround2Layer.scrollFactorX = 0.1;
    //this.backGround1Layer.scrollFactorX = 0.05;
    
    //this.enemies.add(new Archer(this, 900, 610));
    //this.enemies.add(new Skeleton(this, 700, 610));

    const charactersLayer = this.map.getObjectLayer('Characters');
    charactersLayer.objects.forEach(charObj => {
      if(charObj.type === "Main")
      this.player = new Player(this, charObj.x, charObj.y);
      else if(charObj.type === "Skeleton")
        this.enemies.add(new Skeleton(this, charObj.x, charObj.y));
      else if(charObj.type === "Archer")
        this.enemies.add(new Archer(this, charObj.x, charObj.y));
      });
    //this.enemies.add(new Skeleton(this, 560 , 556));
    this.potions = this.add.group();
    this.potions.add(new Potion(this, 450, 400));
    this.potions.add(new Potion(this, 1050, 200));

    //this.cameras.main.setBounds(0,0, 500, 1000);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(0.1);

    this.fullscreenButton = this.add.image(1270, 10, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
    this.fullscreenButton.setScale(0.05);
    this.fullscreenButton.setScrollFactor(0,0);

    this.groundLayer.setCollisionByProperty({collides:true});
    this.wallLayer.setCollisionByProperty({collides:true});
    this.platformLayer.setCollisionByProperty({collides:true});
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.enemies, this.groundLayer);
    this.physics.add.collider(this.potions, this.groundLayer);
    this.physics.add.collider(this.enemies, this.platformLayer);
    this.physics.add.collider(this.potions, this.platformLayer);
    this.physics.add.collider(this.player, this.wallLayer, (player, wall) => {player.touchingWall = true; player.lastWallX = wall.x});
    this.physics.add.collider(this.enemies, this.wallLayer);
    
    
    
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

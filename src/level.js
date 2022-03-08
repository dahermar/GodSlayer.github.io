import Enemy from './enemy.js';
import Platform from './platform.js';
import Player from './player.js';

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
    this.enemies = this.add.group();
    this.platforms = this.add.group();
    const fondo = this.add.image(500,250,'paisaje');
    fondo.setScale(1.2);
    this.player = new Player(this, 200, 400);
    this.enemies.add(new Enemy(this, 500, 500));
    this.platforms.add(new Platform(this, this.player, 150, 350));
    this.platforms.add(new Platform(this, this.player, 850, 350));
    this.platforms.add(new Platform(this, this.player, 500, 200));
    this.platforms.add(new Platform(this, this.player, 150, 100));
    this.platforms.add(new Platform(this, this.player, 850, 100));
    //this.cameras.main.setBounds(0,0, 500, 1000);
    //this.cameras.main.startFollow(this.player);
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
 

  damageReceived() {
      if (this.player.lives == 0) {
        this.scene.start('end');
      }
  }

  enemyKilled() {
    this.time.delayedCall(500, () => {this.enemies.add(this.add.existing(new Enemy(this, 500, 500)));
    }, [], this);
  }
}
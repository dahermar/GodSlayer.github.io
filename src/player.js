import Star from './star.js';
import Enemy from './enemy.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.score = 0;
    this.lives = 3;
    this.canMove = true;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    //this.body.bounce.setTo(1, 1);
    this.speed = 300;
    this.jumpSpeed = -400;
    this.dashSpeed = 2000;
    this.knockBackSpeed = 200;
    this.numJumps = 0;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
    this.w = this.scene.input.keyboard.addKey('W');
    this.a = this.scene.input.keyboard.addKey('A');
    this.s = this.scene.input.keyboard.addKey('S');
    this.d = this.scene.input.keyboard.addKey('D');
    this.shift = this.scene.input.keyboard.addKey('SHIFT');
    this.updateUI();
  }

  /**
   * El jugador ha recogido una estrella por lo que este método añade un punto y
   * actualiza la UI con la puntuación actual.
   */
  point() {
    this.score++;
    this.updateUI();
  }
 /**
   * El jugador ha sido atacado por un enemigo por lo que este método quita una vida y
   * actualiza la UI con la vida actual.
   */
  getDamage() {
    this.lives--;
    if(this.body.touching.right){
      this.body.setVelocityX(-this.knockBackSpeed);
    }
    else if(this.body.touching.left){
      this.body.setVelocityX(this.knockBackSpeed);
    }
    else{
      this.body.setVelocityX(-this.knockBackSpeed*2);
    }
    this.body.setVelocityY(-this.knockBackSpeed);
    this.canMove = false;
    this.updateUI();
    
    this.scene.time.delayedCall(250, () => {this.canMove = true;}, [], this);
    
  }

  enableKeys(enable){
    this.w.enabled = enable;
    this.a.enabled = enable;
    this.s.enabled = enable;
    this.d.enabled = enable;
    this.shift.enabled = enable;
  }
  
  /**
   * Actualiza la UI con la puntuación actual
   */
  updateUI() {
    this.label.text = 'Lives: ' + this.lives + '\nScore: ' + this.score;
  }
  

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);
    if(this.canMove){
      if(this.body.onFloor()){
        this.numJumps = 0;
      }
      if (Phaser.Input.Keyboard.JustDown(this.w)) { 
        if(this.body.onFloor()){
          this.numJumps = 0;
          this.body.setVelocityY(this.jumpSpeed);
        }
        else if(this.numJumps <= 0){
          this.body.setVelocityY(this.jumpSpeed);
          this.numJumps += 1;
        }
      }
      if (this.a.isDown) {
        if(Phaser.Input.Keyboard.JustDown(this.shift)){
          this.body.setVelocityX(-this.dashSpeed);
          this.canMove = false;
          this.scene.time.delayedCall(50, () => {this.canMove = true;}, [], this);
        }
        else{
          this.body.setVelocityX(-this.speed);
        }
      }
      else if (this.d.isDown) {
        if(Phaser.Input.Keyboard.JustDown(this.shift)){
          this.body.setVelocityX(this.dashSpeed);
          this.canMove = false;
          this.scene.time.delayedCall(50, () => {this.canMove = true;}, [], this);
        }
        else{
          this.body.setVelocityX(this.speed);
        }
      }
      else {
        this.body.setVelocityX(0);
      }
    }
  }
  
}

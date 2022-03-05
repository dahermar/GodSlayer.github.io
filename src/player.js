import Star from './star.js';
import Enemy from './enemy.js';
import Knive from './knive.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Container {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    super(scene, x, y);
    this.direction=1;
    this.score = 0;
    this.throwing_object=10;
    this.lives = 3;
    this.canMove = true;
    this.canThrow = true;
    this.canDealDamage = false;
    this.canAttack = true;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    var sprite = this.scene.add.sprite(32, 32, 'player');
    this.add(sprite);
    this.body.setSize(64,64);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();

    //Zone Arma
    this.weaponHitbox = this.scene.add.zone(90, 32, 50, 64);
    this.scene.physics.add.existing(this.weaponHitbox);
    this.weaponHitbox.body.setAllowGravity(false);

    this.add(this.weaponHitbox);


    //this.body.bounce.setTo(1, 1);ded
    this.speed = 300;
    this.jumpSpeed = -400;
    this.dashSpeed = 2000;
    this.knockBackSpeed = 200;
    this.numJumps = 0;
    this.attackSpeed = 1000;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
    this.w = this.scene.input.keyboard.addKey('W');
    this.a = this.scene.input.keyboard.addKey('A');
    this.s = this.scene.input.keyboard.addKey('S');
    this.d = this.scene.input.keyboard.addKey('D');
    this.j = this.scene.input.keyboard.addKey('J');
    this.shift = this.scene.input.keyboard.addKey('SHIFT');
    this.f = this.scene.input.keyboard.addKey('F');
    this.l = this.scene.input.keyboard.addKey('L');

    this.updateUI();
  }


  throw(){
    if(Phaser.Input.Keyboard.JustDown(this.l) && this.throwing_object >0 && this.canThrow){
      new Knive(this.scene,this.x,this.y,this.direction);
      this.canThrow = false;
      this.scene.time.delayedCall(2000, () => {this.canThrow = true;}, [], this);
      --this.throwing_object;
      this.updateUI();

    }
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
    this.scene.damageReceived();
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
    this.label.text = 'Lives: ' + this.lives + '\nScore: ' + this.score + '\nThrowable: '+ this.throwing_object;
  }
  

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */


  preUpdate(t,dt) {
    
    this.dealWeaponDamage();

    if(this.canMove){
      
      this.movePlayer();
      
      this.attack();
    }

    this.throw();
  }
  

  movePlayer(){
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
      this.weaponHitbox.setX(-25);
      this.direction = -1;
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
      this.direction = 1;
      this.weaponHitbox.setX(90);
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

  dealWeaponDamage(){
    this.scene.physics.add.overlap(this.weaponHitbox, this.scene.enemy,(hitbox, enemy) => {
      
      if(this.canDealDamage === true){
        enemy.getDamage();
        this.canDealDamage = false;
      }
    });
  }

  attack(){
    if(Phaser.Input.Keyboard.JustDown(this.f)){
      if(this.canAttack === true){
        this.canAttack = false;
        this.canDealDamage = true;
        this.scene.time.delayedCall(this.attackSpeed, () => {this.canAttack = true;}, [], this);
      }
    }
  }
}

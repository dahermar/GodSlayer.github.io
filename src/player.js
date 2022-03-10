import Enemy from './enemy.js';
import Platform from './platform.js';
import Knife from './knife.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */


  const MAX_VIDAS = 3;

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
    this.throwing_object=10;
    this.lives = MAX_VIDAS;
    this.potions = 5;
    this.canMove = true;
    this.canThrow = true;
    this.canAttack = true;
    this.canConsume=true;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.sprite = this.scene.add.sprite(32, 25, 'player');
    //sprite.setDisplaySize(100,100);
    this.sprite.setScale(2);
    this.add(this.sprite);
    this.body.setSize(44,70);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();

    //Zone Arma
    this.weaponHitbox = this.scene.add.zone(70, 25, 50, 50);
    this.scene.physics.add.existing(this.weaponHitbox);
    this.weaponHitbox.body.setAllowGravity(false);

    this.add(this.weaponHitbox);


    //this.body.bounce.setTo(1, 1);ded
    this.speed = 300;
    this.jumpSpeed = -400;
    this.dashSpeed = 2000;
    this.knockBackSpeedX = 200;
    this.knockBackSpeedY = -150;
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
    this.c = this.scene.input.keyboard.addKey('C');
    
    this.platformCollider = this.scene.physics.add.collider(this, this.scene.platforms, this.platformCollision);

    this.updateUI();
  }

  platformCollision(player, platform) {
      if(player.canMove){
        if(Phaser.Input.Keyboard.JustDown(player.s)){
          player.platformCollider.active = false;
          player.scene.time.delayedCall(200, () => {player.platformCollider.active = true;}, [], player);
        }
      }
    }

  throw(){
    if(Phaser.Input.Keyboard.JustDown(this.l) && this.throwing_object >0 && this.canThrow){
      new Knife(this.scene,this.x,this.y,this.direction);
      this.canThrow = false;
      this.scene.time.delayedCall(2000, () => {this.canThrow = true;}, [], this);
      --this.throwing_object;
      this.updateUI();

    }
  }

  consume(){
    if(Phaser.Input.Keyboard.JustDown(this.c)&&this.potions>0 && this.canConsume && this.lives< MAX_VIDAS){
          this.lives++;
          this.potions--;
          this.canConsume=false;
          this.scene.time.delayedCall(1000, () => {this.canConsume = true;}, [], this);
          this.updateUI();
  }
}

  /**
   * El jugador ha recogido una estrella por lo que este método añade un punto y
   * actualiza la UI con la puntuación actual.
   */
  
 /**
   * El jugador ha sido atacado por un enemigo por lo que este método quita una vida y
   * actualiza la UI con la vida actual.
   */
  getDamage() {
    this.lives--;
    if(this.body.touching.right){
      this.body.setVelocityX(-this.knockBackSpeedX);
    }
    else if(this.body.touching.left){
      this.body.setVelocityX(this.knockBackSpeedX);
    }
    else{
      this.body.setVelocityX(-this.knockBackSpeedX*2);
    }
    this.body.setVelocityY(this.knockBackSpeedY);
    this.canMove = false;
    this.updateUI();
    this.scene.damageReceived();
    this.scene.time.delayedCall(400, () => {this.canMove = true;}, [], this);
    
  }

  recivePotion(){
    this.potions++;
  }

  enableKeys(enable){
    this.w.enabled = enable;
    this.a.enabled = enable;
    this.s.enabled = enable;
    this.d.enabled = enable;
    this.shift.enabled = enable;
    this.l.enabled = enable;
    this.c.enabled = enable;
  }
  
  /**
   * Actualiza la UI con la puntuación actual
   */
  updateUI() {
    this.label.text = 'Lives: ' + this.lives  +'\nThrowable: '+ this.throwing_object +'\nPotions: '+ this.potions;
  }
  

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */


  preUpdate(t,dt) {
    //this.dealWeaponDamage();
    if(this.canMove){
      this.movePlayer();
      this.attack();
      this.throw();
      this.consume();
    }
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
      this.sprite.flipX = true;
      this.sprite.x = 12;
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
      this.weaponHitbox.setX(70);
      this.sprite.flipX = false;
      this.sprite.x = 32;
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
    this.scene.physics.overlap(this.weaponHitbox, this.scene.enemies,(hitbox, enemy) => {
      enemy.getDamage();
    });
  }

  attack(){
    if(Phaser.Input.Keyboard.JustDown(this.f)){
      if(this.canAttack === true){
        this.canAttack = false;
        this.dealWeaponDamage();
        this.scene.time.delayedCall(this.attackSpeed, () => {this.canAttack = true;}, [], this);
      }
    }
  }
}

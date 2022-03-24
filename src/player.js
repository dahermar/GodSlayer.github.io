import Enemy from './enemy.js';
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
    this.isOnAction = false;
    this.isInvulnerable = false;
    this.canAnimate = true;
    this.canThrow = true;
    this.canAttack = true;
    this.canConsume=true;
    this.scene.add.existing(this);
    this.healthlabel = this.scene.add.sprite(80, 80, 'emptybar');
    this.healthbar = this.scene.add.sprite(86, 80, 'bar');
    this.scene.physics.add.existing(this);
    this.sprite = this.scene.add.sprite(55, 36, 'player');
    
    
    //sprite.setDisplaySize(100,100);
    this.sprite.setScale(3);
    this.add(this.sprite);
    this.body.setSize(65,102);
    // Queremos que el jugador no se salga de los límites del mundo
    //this.body.setCollideWorldBounds();

    //Zone Arma
    this.weaponHitbox = this.scene.add.zone(100, 35, 70, 70);
    this.scene.physics.add.existing(this.weaponHitbox);
    this.weaponHitbox.body.setAllowGravity(false);

    this.add(this.weaponHitbox);


    //this.body.bounce.setTo(1, 1);
    //this.body.setMaxSpeed(500);
    this.speed = 400;
    this.jumpSpeed = -500;
    this.dashSpeed = 960;
    this.dashTime = 200;
    this.knockBackSpeedX = 250;
    this.knockBackSpeedY = -250;
    this.numJumps = 0;
    this.attackSpeed = 1000;
    this.lastVelocityY = -100;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
    this.w = this.scene.input.keyboard.addKey('W');
    this.a = this.scene.input.keyboard.addKey('A');
    this.s = this.scene.input.keyboard.addKey('S');
    this.d = this.scene.input.keyboard.addKey('D');
    this.shift = this.scene.input.keyboard.addKey('SHIFT');
    this.f = this.scene.input.keyboard.addKey('F');
    this.l = this.scene.input.keyboard.addKey('L');
    this.c = this.scene.input.keyboard.addKey('C');
    //this.j = this.scene.input.keyboard.addKey('J');
    
    this.platformCollider = this.scene.physics.add.collider(this, this.scene.platformLayer, this.platformCollision);

    //Fijar la interfaz grafica
    this.healthbar.setScrollFactor(0,0);
    this.healthlabel.setScrollFactor(0,0);
    this.label.setScrollFactor(0,0);

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
    if(!this.isInvulnerable){
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
      this.isInvulnerable = true;
      this.updateUI();

      //this.scene.events.on(this.body.onFloor(), () => {this.body.setVelocityX(0)});
      this.scene.time.delayedCall(400, () => {this.canMove = true;}, [], this);
      
      if(this.lives === 0){  
        this.death();
      }
      else{
        this.scene.time.delayedCall(400, () => {this.isInvulnerable = false;}, [], this);
        this.canAnimate = false;
        this.sprite.play('hurt_player',true).on('animationcomplete-hurt_player', () => {this.canAnimate = true;});
      }
      
    }
    
  }
  death(){
    this.sprite.play('death_player',true);
    this.canAnimate = false;
    this.enableKeys(false);
    this.scene.playerDeath();
  }

  recivePotion(){
    this.potions++;
  }

  enableKeys(enable){
    this.w.reset();
    this.w.enabled = enable;
    this.a.reset();
    this.a.enabled = enable;
    this.s.reset();
    this.s.enabled = enable;
    this.d.reset();
    this.d.enabled = enable;
    this.shift.reset();
    this.shift.enabled = enable;
    this.f.reset();
    this.f.enabled = enable;
    this.l.reset();
    this.l.enabled = enable;
    this.c.reset();
    this.c.enabled = enable;
  }
  
  /**
   * Actualiza la UI con la puntuación actual
   */
  updateUI() {
    this.label.text = 'Throwable: '+ this.throwing_object +'\nPotions: '+ this.potions;
    console.log(this.lives);
    // this.healthbar.setCrop(0,0,this.healthbar.totalx*((this.lives/ MAX_VIDAS)), 50);
    this.healthbar.setCrop(0,0,this.healthbar.width*((this.lives/ MAX_VIDAS)), 50);
  }
  

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */


  preUpdate(t,dt) {
   // this.sprite.preUpdate();
    //this.dealWeaponDamage();
    if(this.canMove && !this.isOnAction){
      this.movePlayer();
      this.attack();
      this.throw();
      this.consume();
    }
    this.animations();
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
      this.weaponHitbox.setX(-35);
      this.direction = -1;
      this.sprite.flipX = true;
      this.sprite.x = 10;
      if(Phaser.Input.Keyboard.JustDown(this.shift)){
        this.body.setVelocityX(-this.dashSpeed);
        this.isOnAction = true;
        this.canAnimate = false;
        this.sprite.play('dash_player',true)//.on('animationcomplete-dash_player', () => {this.canAnimate = true;});

        this.scene.time.delayedCall(this.dashTime, () => {
          if(this.sprite.anims.currentAnim.key === 'dash_player'){
            this.sprite.stop();
            this.canAnimate = true;
          }
          this.isOnAction = false;
        }, [], this);
      }
      else{
        this.body.setVelocityX(-this.speed);
      }
    }
    else if (this.d.isDown) {
      this.direction = 1;
      this.weaponHitbox.setX(100);
      this.sprite.flipX = false;
      this.sprite.x = 55;
      if(Phaser.Input.Keyboard.JustDown(this.shift)){
        this.body.setVelocityX(this.dashSpeed);
        this.isOnAction = true;
        this.canAnimate = false;
        this.sprite.play('dash_player',true)//.on('animationcomplete-dash_player', () => {this.canAnimate = true;});

        this.scene.time.delayedCall(this.dashTime, () => {
          if(this.sprite.anims.currentAnim.key === 'dash_player'){
            this.sprite.stop();
            this.canAnimate = true;
          }
          this.isOnAction = false;
        }, [], this);
      }
      else{
        this.body.setVelocityX(this.speed);
      }
    }
    else {
      this.body.setVelocityX(0);
    }
  }

  animations(){
    if(this.canAnimate){
      if(this.body.onFloor()){
        if(this.a.isDown || this.d.isDown){
          this.sprite.play('running_player',true);
        }
        else{
          this.sprite.play('standing_player',true); 
        }
        this.lastVelocityY = -100;
      }
      else{
        if(this.body.velocity.y < 0){
          this.sprite.play('jump_player', true);
        }
        else if (this.lastVelocityY < 0 && this.body.velocity.y >= 0){
          this.sprite.play('uptofall_player',true);
        }
        else if(!this.sprite.anims.isPlaying){
          this.sprite.play('fall_player',true);
        }
        this.lastVelocityY = this.body.velocity.y; 
      }
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
        this.canAnimate = false;
        this.isOnAction = true;
        this.sprite.play('attack2_player',true)//.on('animationcomplete-attack2_player', () => {this.canAnimate = true; this.isOnAction = false;});
        this.scene.time.delayedCall(1000, () => {
          this.sprite.stop();
          this.isOnAction = false;
          this.canAnimate = true;
        }, [], this);
        this.scene.time.delayedCall(this.attackSpeed, () => {this.canAttack = true;}, [], this);
      }
    }
  }
}


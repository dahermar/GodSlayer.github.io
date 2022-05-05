import Enemy from './enemy.js';
import Knife from './knife.js';

const MAX_VIDAS = 4;
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
    super(scene, x + 20, y - 102);
    this.direction=1;
    this.throwing_object=10;
    this.lives = MAX_VIDAS;
    this.spawnX = this.x;
    this.spawnY = this.y;
    this.canMove = true;
    this.isOnAction = false;
    this.isInvulnerable = false;
    this.canAnimate = true;
    this.canThrow = true;
    this.canAttack = true;
    this.touchingWall = false;
    this.wasTouchingWall = false;
    this.lastWallX = -1000;
    this.lastWallY = -1000;
    this.scene.add.existing(this);

    this.healthlabel = this.scene.add.sprite(180, 60, 'emptybar');
    this.healthbar = this.scene.add.sprite(205, 62, 'bar');
    this.heart = this.scene.add.sprite(49, 57, 'heart');

    this.heart.setScale(0.84);
    this.healthlabel.setScale(0.84);
    this.healthbar.setScale(0.84);

    this.heart.setDepth(6);
    this.healthlabel.setDepth(6);
    this.healthbar.setDepth(6);

    this.scene.physics.add.existing(this);
    this.sprite = this.scene.add.sprite(55, 36, 'player');

    
    
    
    //sprite.setDisplaySize(100,100);
    this.sprite.setScale(3);
    this.add(this.sprite);
    this.body.setSize(65,102);
    // Queremos que el jugador no se salga de los límites del mundo
    //this.body.setCollideWorldBounds();

    //Zone Arma
    this.weaponHitbox = this.scene.add.zone(100, 40, 110, 80);
    this.scene.physics.add.existing(this.weaponHitbox);
    this.weaponHitbox.body.setAllowGravity(false);

    this.add(this.weaponHitbox);


    //this.body.bounce.setTo(1, 1);
    //this.body.setMaxSpeed(500);
    //POWERS
    this.dashEnabled = false;
    this.maxJumps = 1;
    this.kniveEnabled = false;

    this.speed = 500;
    this.jumpSpeed = -600;
    this.dashSpeed = 1500;
    this.dashTime = 200;
    this.dashCoolDown = 1000;
    this.canDash = true;
    this.knockBackSpeedX = 250;
    this.knockBackSpeedY = -250;
    this.numJumps = 1;
    this.attackSpeed = 1000;
    this.lastVelocityY = -100;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    //this.label = this.scene.add.text(10, 10, "");
    this.w = this.scene.input.keyboard.addKey('W');
    this.a = this.scene.input.keyboard.addKey('A');
    this.s = this.scene.input.keyboard.addKey('S');
    this.d = this.scene.input.keyboard.addKey('D');
    this.e = this.scene.input.keyboard.addKey('E');
    this.shift = this.scene.input.keyboard.addKey('SHIFT');
    this.j = this.scene.input.keyboard.addKey('J');
    this.k = this.scene.input.keyboard.addKey('K');
    this.p = this.scene.input.keyboard.addKey('P');
    //this.j = this.scene.input.keyboard.addKey('J');
    
    this.platformCollider = this.scene.physics.add.collider(this, this.scene.platformLayer, this.platformCollision);
    //this.wallCollider = this.scene.physics.add.collider(this, this.scene.WallLayer, this.wallCollision);
    this.scene.physics.add.overlap(this, this.scene.checkPointGroup,(pl, checkp) => {
      if(Phaser.Input.Keyboard.JustDown(this.e)){
        this.spawnX = checkp.x + 80;
        this.spawnY = checkp.y -20;
        checkp.playAnimation();
        
        if(this.scene.physics.overlap(this, this.scene.dashEarned))
          this.scene.dashEarned.interact();
        
          if(this.scene.physics.overlap(this, this.scene.dobleEarned))
          this.scene.dobleEarned.interact();

        if(this.scene.physics.overlap(this, this.scene.creditZone)){
          if(!this.scene.creditsShown)
            this.scene.showCredits();
          else{
            this.x = 38191;
            this.y = 8420;
            this.spawnX = 38191;
            this.spawnY = 8420;
          }
        }
          
      }
    });
    //Para cambiar el fondo
    this.scene.physics.add.overlap(this, this.scene.toCastleGroup,() => {
      this.scene.addCastleBackGround();
    });

    this.scene.physics.add.overlap(this, this.scene.toForestGroup,() => {
      this.scene.addForestBackGround();
    });

    this.scene.physics.add.overlap(this, this.scene.toCaveGroup,() => {
      this.scene.addCaveBackGround();
    });

    this.scene.physics.add.overlap(this, this.scene.toBoss,() => {
      this.scene.addBossSong();
    });

    this.scene.physics.add.overlap(this, this.scene.fromBoss,() => {
      this.scene.removeBossSong();
    });
    

    //Fijar la interfaz grafica
    this.healthbar.setScrollFactor(0,0);
    this.healthlabel.setScrollFactor(0,0);
    this.heart.setScrollFactor(0,0);

    //this.label.setScrollFactor(0,0);
    
    const config = {
      mute: false,
      volume: 0.1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    }; // config es opcional

    
   //this.soud_ = this.scene.sound.add("", config);
    this.sound_damage_adventurer = this.scene.sound.add("damage_adventurer", config);
    this.sound_death_adventurer = this.scene.sound.add("death_adventurer", config);
    this.sound_doubleJump_dash_adventurer = this.scene.sound.add("doubleJump_dash_adventurer", config);
    this.sound_jump = this.scene.sound.add("jump", config);
    this.sound_attack_adventurer = this.scene.sound.add("attack_adventurer", config);
    this.sound_enemy_death = this.scene.sound.add("enemy_death", config);


    

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


   /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
    preUpdate(t,dt) {
     
      this.checkWallCollision();
      if(this.canMove && !this.isOnAction){
        this.move();
        this.attack();
        this.throw();
        this.make_pause();
      }
      this.animations();
      
    }
  
  make_pause(){
    if (Phaser.Input.Keyboard.JustDown(this.p)) { 
     this.scene.pause_function();
    }
  }

  

  checkWallCollision(){
    
    if(this.scene.wallLayer.hasTileAtWorldXY(this.x - 1, this.y + 51) || this.scene.wallLayer.hasTileAtWorldXY(this.x + 66, this.y + 51)){
      //this.body.setMaxVelocityY(200);
      this.touchingWall = true;
    }
    else{
      this.body.setMaxVelocityY(Number.MAX_SAFE_INTEGER);
      this.touchingWall = false;
    }
  }

  /*checkPowerOverlap(){
    if(this.scene.physics.overlap(this, this.scene.dashEnabled)){
      this.text_box.setVisible(true);
      this.text.setVisible(true);
  }
  else{
      this.text_box.setVisible(false);
      this.text.setVisible(false);
  }  
  }*/

  performJump(){
    this.body.setVelocityY(this.jumpSpeed);
    //this.sound_jump.play();

    if(this.touchingWall){
      //this.body.setMaxVelocityY(Number.MAX_SAFE_INTEGER);
      this.canMove = false;
      this.scene.time.delayedCall(200, () => {this.canMove = true;}, [], this);
      this.body.setVelocityY(this.jumpSpeed);
      if(this.scene.wallLayer.hasTileAtWorldXY(this.x - 1, this.y + 51)){
        this.direction = 1;
        this.weaponHitbox.setX(100);
        this.sprite.flipX = false;
        this.sprite.x = 55;
        this.body.setVelocityX(500);
      }
      else{
        this.weaponHitbox.setX(-35);
        this.direction = -1;
        this.sprite.flipX = true;
        this.sprite.x = 10;
        this.body.setVelocityX(-500);
      }
    }
  }

  move(){
    if (Phaser.Input.Keyboard.JustDown(this.w)) { 
      this.body.setMaxVelocityY(Number.MAX_SAFE_INTEGER);
      if(this.body.onFloor()){
        this.numJumps = 1;
        this.body.setVelocityY(this.jumpSpeed);
        
      }
      else if(this.touchingWall){
        this.numJumps = 1;
        this.performJump();
      }
      else if(this.numJumps <= this.maxJumps - 1){ 
        this.performJump();
        this.numJumps += 1;
      }
    }
    if(this.canMove){
      if (this.a.isDown) {
        this.weaponHitbox.setX(-35);
        this.direction = -1;
        this.sprite.flipX = true;
        this.sprite.x = 10;
        if(Phaser.Input.Keyboard.JustDown(this.shift) && this.dashEnabled){
          if(this.canDash){
            this.canDash = false;
            this.body.setVelocityX(-this.dashSpeed);
            this.isOnAction = true;
            this.canAnimate = false;
            this.sprite.play('dash_player',true);//.on('animationcomplete-dash_player', () => {this.canAnimate = true;});
            this.sound_doubleJump_dash_adventurer.play();

            this.scene.time.delayedCall(this.dashTime, () => {
              if(this.sprite.anims.currentAnim.key === 'dash_player'){
                this.sprite.stop();
                this.canAnimate = true;
              }
              this.isOnAction = false;
            }, [], this);
            this.scene.time.delayedCall(this.dashCoolDown, () => {this.canDash = true;}, [], this);
          }
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
        if(Phaser.Input.Keyboard.JustDown(this.shift) && this.dashEnabled){
          if(this.canDash){
            this.canDash = false;
            this.body.setVelocityX(this.dashSpeed);
            this.isOnAction = true;
            this.canAnimate = false;
            this.sprite.play('dash_player',true)//.on('animationcomplete-dash_player', () => {this.canAnimate = true;});
            this.sound_doubleJump_dash_adventurer.play();

            this.scene.time.delayedCall(this.dashTime, () => {
              if(this.sprite.anims.currentAnim.key === 'dash_player'){
                this.sprite.stop();
                this.canAnimate = true;
              }
              this.isOnAction = false;
            }, [], this);
            this.scene.time.delayedCall(this.dashCoolDown, () => {this.canDash = true;}, [], this);
          }
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

  

  throw(){
    if(Phaser.Input.Keyboard.JustDown(this.k) && this.kniveEnabled && this.throwing_object >0 && this.canThrow){
      new Knife(this.scene,this.x,this.y,this.direction);
      this.canThrow = false;
      this.scene.time.delayedCall(2000, () => {this.canThrow = true;}, [], this);
      --this.throwing_object;
      this.updateUI();
    }
  }


  
 /**
   * El jugador ha sido atacado por un enemigo por lo que este método quita una vida y
   * actualiza la UI con la vida actual.
   */
  getDamage(numDamage, isRight) {
    if(!this.isInvulnerable){
      this.lives -= numDamage;
      if(isRight){
        this.body.setVelocityX(-this.knockBackSpeedX);
      }
      else {
        this.body.setVelocityX(this.knockBackSpeedX);
      }
      this.body.setVelocityY(this.knockBackSpeedY);
      this.canMove = false;
      this.isInvulnerable = true;
      this.updateUI();

      //this.scene.events.on(this.body.onFloor(), () => {this.body.setVelocityX(0)});
      this.scene.time.delayedCall(400, () => {this.canMove = true;}, [], this);
      
      if(this.lives <= 0){  
        this.death();
      }
      else{
        this.scene.time.delayedCall(400, () => {this.isInvulnerable = false;}, [], this);
        this.canAnimate = false;
        this.sound_damage_adventurer.play();
        this.sprite.play('hurt_player',true).on('animationcomplete-hurt_player', () => {this.canAnimate = true; this.isOnAction = false;});
      }
      
    }
    
  }
  death(){
    this.sprite.play('death_player',true);
    this.sound_death_adventurer.play();
    this.canAnimate = false;
    this.enableKeys(false);
    this.scene.damageLayerCollider.active = false;
    this.scene.playerDeath();
  }

  recivePotion(){
    if(this.lives < MAX_VIDAS){
      this.lives++;
      this.updateUI();
}
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
    this.j.reset();
    this.j.enabled = enable;
    this.k.reset();
    this.k.enabled = enable;
    this.e.reset();
    this.e.enabled = enable;
    this.p.reset();
    this.p.enabled = enable;
  }
  
  /**
   * Actualiza la UI con la puntuación actual
   */
  updateUI() {
    

    console.log(this.healthbar.width);
    this.healthbar.setCrop(0,0,this.healthbar.width*((this.lives/ MAX_VIDAS)), 317);
    this.healthbar.isCropped = true;
    
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
      enemy.getDamage(1);
      if(enemy.lives>0){
        this.sound_attack_adventurer.play();
      }else{
        this.sound_enemy_death.play();
      }
    });
  }

  attack(){
    if(Phaser.Input.Keyboard.JustDown(this.j)){
      if(this.canAttack === true){
        this.body.setVelocityX(0); //TODO mirar si cambiarlo
        this.canAttack = false;
        this.scene.time.delayedCall(500, () => {this.dealWeaponDamage();}, [], this);
        this.canAnimate = false;
        this.isOnAction = true;
        this.sprite.play('attack2_player',true)//.on('animationcomplete-attack2_player', () => {this.canAnimate = true; this.isOnAction = false;});
        this.scene.time.delayedCall(1000, () => {
          //this.sprite.stop();
          this.isOnAction = false;
          if(this.lives > 0 && !this.isInvulnerable)
            this.canAnimate = true;
        }, [], this);
        this.scene.time.delayedCall(this.attackSpeed, () => {this.canAttack = true;}, [], this);
      }
    }
  }

  respawn(){
    this.x = this.spawnX;
    this.y = this.spawnY;
    this.direction=1;
    this.throwing_object=10;
    this.lives = MAX_VIDAS;
    this.canMove = true;
    this.isOnAction = false;
    this.isInvulnerable = false;
    this.canAnimate = true;
    this.canThrow = true;
    this.canAttack = true;
    this.touchingWall = false;
    this.wasTouchingWall = false;
    this.canDash = true;
    this.numJumps = 1;
    this.lastVelocityY = -100;
    this.enableKeys(true);
    this.scene.damageLayerCollider.active = true;
    this.updateUI();
  }

  /*checkWallCollisionWithJump(){
    
    if(this.touchingWall === true){
      if(!this.body.onFloor()){
        this.numJumps = 0;
        this.body.setMaxVelocityY(200);
      }
    }
    else if(!this.scene.wallLayer.hasTileAtWorldXY(this.x - 1, this.y + 51) && !this.scene.wallLayer.hasTileAtWorldXY(this.x + 66, this.y + 51)){
      this.numJumps = 1;
      this.body.setMaxVelocityY(Number.MAX_SAFE_INTEGER);
    }
    this.wasTouchingWall = this.touchingWall;
    this.touchingWall = false;
    
  }*/
  
  /*
  movePlayerWithWallJump(){  
    if (Phaser.Input.Keyboard.JustDown(this.w)) { 
      
      if(this.body.onFloor()){
        this.numJumps = 1;
        this.body.setMaxVelocityY(Number.MAX_SAFE_INTEGER);
        this.body.setVelocityY(this.jumpSpeed);
        
      }
      else if(this.numJumps <= 1){ 
        
        this.body.setVelocityY(this.jumpSpeed);
        if(this.body.maxVelocity.y === 200){
          this.body.setMaxVelocityY(Number.MAX_SAFE_INTEGER);
          this.canMove = false;
          this.scene.time.delayedCall(200, () => {this.canMove = true;}, [], this);
          this.body.setVelocityY(this.jumpSpeed);
          if(this.scene.wallLayer.hasTileAtWorldXY(this.x - 1, this.y + 51)){
            this.direction = 1;
            this.weaponHitbox.setX(110);
            this.sprite.flipX = false;
            this.sprite.x = 55;
            this.body.setVelocityX(500);
          }
          else{
            this.weaponHitbox.setX(-45);
            this.direction = -1;
            this.sprite.flipX = true;
            this.sprite.x = 10;
            this.body.setVelocityX(-500);
          }
        }
        this.numJumps += 1;
      }
    }
    if(this.canMove){
      if (this.a.isDown) {
        this.weaponHitbox.setX(-45);
        this.direction = -1;
        this.sprite.flipX = true;
        this.sprite.x = 10;
        if(Phaser.Input.Keyboard.JustDown(this.shift)){
          if(this.canDash){
            this.canDash = false;
            this.body.setVelocityX(-this.dashSpeed);
            this.isOnAction = true;
            this.canAnimate = false;
            this.sprite.play('dash_player',true);//.on('animationcomplete-dash_player', () => {this.canAnimate = true;});
    
            this.scene.time.delayedCall(this.dashTime, () => {
              if(this.sprite.anims.currentAnim.key === 'dash_player'){
                this.sprite.stop();
                this.canAnimate = true;
              }
              this.isOnAction = false;
            }, [], this);
            this.scene.time.delayedCall(this.dashCoolDown, () => {this.canDash = true;}, [], this);
          }
        }
        else{
          this.body.setVelocityX(-this.speed);
        }
      }
      else if (this.d.isDown) {
        this.direction = 1;
        this.weaponHitbox.setX(110);
        this.sprite.flipX = false;
        this.sprite.x = 55;
        if(Phaser.Input.Keyboard.JustDown(this.shift)){
          if(this.canDash){
            this.canDash = false;
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
            this.scene.time.delayedCall(this.dashCoolDown, () => {this.canDash = true;}, [], this);
          }
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
  */

  /*

  checkWallCollisionOld(){
    
    if(this.touchingWall === true){
      if(!this.body.onFloor()){
        this.body.setMaxVelocityY(200);
      }
    }
    else if(!this.scene.wallLayer.hasTileAtWorldXY(this.x - 1, this.y + 51) && !this.scene.wallLayer.hasTileAtWorldXY(this.x + 66, this.y + 51)){
      this.body.setMaxVelocityY(Number.MAX_SAFE_INTEGER);
    }
    this.wasTouchingWall = this.touchingWall;
    this.touchingWall = false;
    
  }
*/

/*
  movePlayerOld(){

    
    if (Phaser.Input.Keyboard.JustDown(this.w)) { 
      
      if(this.body.onFloor() || this.touchingWall === true){
        this.numJumps = 1;
        this.body.setMaxVelocityY(Number.MAX_SAFE_INTEGER);
        this.body.setVelocityY(this.jumpSpeed);
        
      }
      else if(this.numJumps <= -1){ //Numero = numero saltos -2
        
        this.body.setVelocityY(this.jumpSpeed);
        this.numJumps += 1;
      }
    }
    if(this.canMove){
      if (this.a.isDown) {
        this.weaponHitbox.setX(-45);
        this.direction = -1;
        this.sprite.flipX = true;
        this.sprite.x = 10;
        if(Phaser.Input.Keyboard.JustDown(this.shift)){
          if(this.canDash){
            this.canDash = false;
            this.body.setVelocityX(-this.dashSpeed);
            this.isOnAction = true;
            this.canAnimate = false;
            this.sprite.play('dash_player',true);//.on('animationcomplete-dash_player', () => {this.canAnimate = true;});
    
            this.scene.time.delayedCall(this.dashTime, () => {
              if(this.sprite.anims.currentAnim.key === 'dash_player'){
                this.sprite.stop();
                this.canAnimate = true;
              }
              this.isOnAction = false;
            }, [], this);
            this.scene.time.delayedCall(this.dashCoolDown, () => {this.canDash = true;}, [], this);
          }
        }
        else{
          this.body.setVelocityX(-this.speed);
        }
      }
      else if (this.d.isDown) {
        this.direction = 1;
        this.weaponHitbox.setX(110);
        this.sprite.flipX = false;
        this.sprite.x = 55;
        if(Phaser.Input.Keyboard.JustDown(this.shift)){
          if(this.canDash){
            this.canDash = false;
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
            this.scene.time.delayedCall(this.dashCoolDown, () => {this.canDash = true;}, [], this);
          }
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
  */
}





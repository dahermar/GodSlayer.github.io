import Enemy from "./enemy.js";

/**
 * Clase que representa a un enemigo basico del juego.
 */
 export default class Bat extends Enemy {

    constructor(scene, x, y) {
        //(scene, x, y, lives, speed, jumpSpeed, numJumps, fieldOfView, rangeAttack, attackSpeed, sprite_x, sprite_y , scale, damage) 

      super(scene, x + 50, y - 108, 1, 200, -700, 0, 500, 40, 500, 48, 44, 3, 2);

      this.oldX = 50;
      this.deadAnimationCompleted = false;

      this.body.setSize(100,50);
      this.body.setAllowGravity(false);

      this.weaponHitbox = this.scene.add.zone(175, 25, 30, 30);
      this.scene.physics.add.existing(this.weaponHitbox);
      this.weaponHitbox.body.setAllowGravity(false);

      this.scene.physics.add.collider(this, this.scene.groundLayer,(enemy, object) => {
        if(this.lives <= 0 && !this.deadAnimationCompleted){
          this.sprite.play('dead_bat_smash',true).on('animationcomplete-dead_bat_smash', () => {this.deadAnimationCompleted = true});
        }
      });

      this.platfCollision = this.scene.physics.add.collider(this, this.scene.platformLayer,(enemy, object) => {
        if(this.lives <= 0 && !this.deadAnimationCompleted){
          this.sprite.play('dead_bat_smash',true).on('animationcomplete-dead_bat_smash', () => {this.deadAnimationCompleted = true});
        }
      });

      this.batCollision = this.scene.physics.add.collider(this, this.scene.batGroup);

      this.platfCollision.active = false;
      
      this.add(this.weaponHitbox);
    }

   /**
     * @override
     */
    getDamage(numDamage) {
      if(this.lives > 0){
        this.lives -= numDamage;
        this.body.setVelocityX(0);
        this.sprite.x = this.oldX;
        this.hasBeenHurt = true;
  
        if(this.lives <= 0){
          this.isDead = true;
          this.death();
        }
        else{
          this.scene.time.delayedCall(1000, () => {this.hasBeenHurt = false;}, [], this);
          this.canAnimate = false;
          
        }
      }

    }


    /**
     * @override
     */
    death(){
      this.body.setAllowGravity(true);
      this.batCollision.active = false;
      this.body.drag = 0;
      this.sprite.play('dead_bat_start',true);
      
      this.canAnimate = false;
      this.scene.time.delayedCall(300, () => {this.sprite.play('dead_bat_fall',true); this.sprite.y -= 5}, [], this);
      this.scene.time.delayedCall(8000, () => {this.destroy();}, [], this);
      
      this.platfCollision.active = true;
      
    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t,dt) { 
      if(!this.isOnAction ){
        if(!this.attack()){
          this.move();
        }
      }
      this.animations();
    }

    

    /**
     * @override
     */
    move(){
      if(this.lives <= 0 ){
        this.body.setVelocityX(0);
        //this.body.setVelocityY(0);
        this.canAttack = false;
      }
      else{
        if(((this.x - this.fieldOfView < this.scene.player.x)  && (this.scene.player.x < this.x + this.fieldOfView) && (this.y - this.fieldOfView< this.scene.player.y)  && (this.scene.player.y < this.y + this.fieldOfView))){
            if((this.x -10 < this.scene.player.x)  && (this.scene.player.x < this.x + 10)){
                this.body.setVelocityX(0);
            }
            else if (this.scene.player.x<this.x) {
                this.weaponHitbox.setX(20);
                this.sprite.x = this.oldX = 50;  
                this.sprite.flipX = true; 
                this.body.setVelocityX(-this.speed); 
            }
            else if (this.scene.player.x>this.x) {
                this.weaponHitbox.setX(80);
                this.sprite.flipX = false;
                this.sprite.x = this.oldX = 50;
                this.body.setVelocityX(this.speed);
            }
            if (Math.abs(this.scene.player.y - this.y) <=2){
              this.body.setVelocityY(0);
            }
            else if (this.scene.player.y > this.y  ){
              this.body.setVelocityY(this.speed);
            }
            else if (this.scene.player.y < this.y ){
              this.body.setVelocityY(-this.speed);
            }
        }
        else{
          this.body.setVelocityX(0);
          this.body.setVelocityY(0);
        }
      } 
    }

    /**
     * @override
     */
    animations(){
      if(this.canAnimate){
        this.sprite.x = this.oldX;
        this.sprite.y = 20;
        this.sprite.play('idle_bat',true);
      }
    }

    /**
     * @override
     */
    dealWeaponDamage(){
      this.scene.physics.overlap(this.weaponHitbox, this.scene.player,(hitbox, player) => {
        let isRight = false;
        if(this.x > player.x)
          isRight = true;
        player.getDamage(this.damage ,isRight);
      });
    }

    /**
     * @override
     */
    attack(){
      if(this.scene.player.lives > 0 && (this.x - this.rangeAttack < this.scene.player.x)  && (this.scene.player.x < this.x + this.rangeAttack) && ( this.y - this.rangeAttack < this.scene.player.y)  && (this.scene.player.y < this.y + this.rangeAttack) && this.lives > 0){
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        if (this.scene.player.x<this.x) {
          this.weaponHitbox.setX(20);
          this.sprite.flipX = true;
          this.sprite.x = this.oldX = 41;  
          
        }
        else if (this.scene.player.x>this.x) {
          this.weaponHitbox.setX(80);
          this.sprite.flipX = false;
          this.sprite.x = this.oldX = 59;
        }
        if(this.canAttack === true && this.lives > 0){
          this.canAttack = false;
          this.scene.time.delayedCall(450, () => {if(!this.hasBeenHurt)this.dealWeaponDamage();}, [], this);
          this.canAnimate = false;
          this.isOnAction = true;
          this.oldX = 50;
          this.sprite.play('attack_bat',true).on('animationcomplete-attack_bat', () => {if(this.lives > 0){this.canAnimate = true;}});
        
          
          this.scene.time.delayedCall(1800, () => {
            this.isOnAction = false;
            
          }, [], this);
          this.scene.time.delayedCall(this.attackSpeed, () => {this.canAttack = true;}, [], this);
        }
        return true;
      }
      return false;
    }
  }
  
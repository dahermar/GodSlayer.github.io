import Enemy from "./enemy.js";

/**
 * Clase que representa a un enemigo basico del juego.
 */
 export default class Skeleton extends Enemy {

    constructor(scene, x, y, livesConst) {

      super(scene, x + 25, y - 108, livesConst, 200, -700, 0, 400, 150, 2500, 48, 44, 4, 1)

      this.oldX = 48;
    
      this.body.setSize(60,108);

      this.weaponHitbox = this.scene.add.zone(105, 45, 90, 126);
      this.scene.physics.add.existing(this.weaponHitbox);
      this.weaponHitbox.body.setAllowGravity(false);

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
        this.sprite.y = 44;
        this.hasBeenHurt = true;
  
        if(this.lives <= 0){
          this.death();
        }
        else{
          this.scene.time.delayedCall(1000, () => {this.hasBeenHurt = false;}, [], this);
          this.canAnimate = false;
          this.sprite.play('hit_skeleton',true).on('animationcomplete-hit_skeleton', () => {this.canAnimate = true;});
        }
      }

    }


    /**
     * @override
     */
    death(){
      this.sprite.play('dead_skeleton',true);
      this.canAnimate = false;
      //new Potion(this.scene,this.x,this.y);
      this.scene.time.delayedCall(8000, () => {this.destroy();}, [], this);
    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t,dt) { 
      //this.checkCollision();
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
    checkCollision(){
      this.scene.physics.collide(this, this.scene.player,(enemy, player) => {
        let isRight = false;
        if(this.x > player.x)
          isRight = true;
        player.getDamage(this.damage, isRight);
      });
    }

    /**
     * @override
     */
    move(){
      if(this.lives <= 0 ){
        this.body.setVelocityX(0);
        this.canAttack = false;
      }
      else{
        if((this.x - this.fieldOfView < this.scene.player.x)  && (this.scene.player.x < this.x + this.fieldOfView) && (this.y - this.fieldOfView< this.scene.player.y)  && (this.scene.player.y < this.y + this.fieldOfView )){
          if((this.x - 10 < this.scene.player.x)  && (this.scene.player.x < this.x + 10)){
             this.body.setVelocityX(0);
           }
           else if (this.scene.player.x<this.x && (this.scene.groundLayer.hasTileAtWorldXY(this.x -10, this.y + 110) || this.scene.platformLayer.hasTileAtWorldXY(this.x -10, this.y + 110)) && !this.scene.wallLayer.hasTileAtWorldXY(this.x -35, this.y + 50) && !this.scene.groundLayer.hasTileAtWorldXY(this.x -35, this.y + 50)) {
            this.weaponHitbox.setX(-45);
            this.sprite.flipX = true;
            this.sprite.x = this.oldX = 12;  
            this.body.setVelocityX(-this.speed);
            
          }
          else if (this.scene.player.x>this.x && (this.scene.groundLayer.hasTileAtWorldXY(this.x + 70, this.y + 109) || this.scene.platformLayer.hasTileAtWorldXY(this.x + 70, this.y + 109)) && !this.scene.wallLayer.hasTileAtWorldXY(this.x + 95, this.y + 50) && !this.scene.groundLayer.hasTileAtWorldXY(this.x + 95, this.y + 50)) {
            this.weaponHitbox.setX(105);
            this.sprite.flipX = false;
            this.sprite.x = this.oldX = 48;
            this.body.setVelocityX(this.speed);
          }
          else{
            this.body.setVelocityX(0);
          }

        }
        else{
          this.body.setVelocityX(0);
        }
      } 

     
    }

    /**
     * @override
     */
    animations(){
      if(this.canAnimate){
        this.sprite.x = this.oldX;
        this.sprite.y = 44;
        if(this.body.velocity.x != 0){      
          this.sprite.play('walk_skeleton',true);
        }
        else{  
          this.sprite.play('idle_skeleton',true);
        }
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
        player.getDamage(1 ,isRight);
      });
    }

    /**
     * @override
     */
    attack(){
      
      if(this.scene.player.lives > 0 && (this.x - this.rangeAttack < this.scene.player.x)  && (this.scene.player.x < this.x + this.rangeAttack) && ( this.y - this.rangeAttack < this.scene.player.y)  && (this.scene.player.y < this.y + this.rangeAttack) && this.lives > 0){
        this.body.setVelocityX(0);
        if (this.scene.player.x<this.x) {
          this.weaponHitbox.setX(-45);
          this.sprite.flipX = true;
          this.sprite.x = this.oldX = 12;  
          
        }
        else if (this.scene.player.x>this.x) {
          this.weaponHitbox.setX(105);
          this.sprite.flipX = false;
          this.sprite.x = this.oldX = 48;
        }
        if(this.canAttack === true && this.lives > 0){
          this.canAttack = false;
          this.scene.time.delayedCall(500, () => {if(!this.hasBeenHurt)this.dealWeaponDamage();}, [], this);
          this.canAnimate = false;
          this.isOnAction = true;
          this.sprite.play('attack_skeleton',true).on('animationcomplete-attack_skeleton', () => {if(this.lives > 0){this.canAnimate = true;}});
          this.oldX = this.sprite.x;
          if(this.sprite.flipX === false){
            this.sprite.x = 74;
          }
          else{
            this.sprite.x = -14;
          }
          this.sprite.y = 34;
          this.scene.time.delayedCall(1800, () => {this.isOnAction = false;}, [], this);
          this.scene.time.delayedCall(this.attackSpeed, () => {this.canAttack = true;}, [], this);
        }
        return true;
      }
      return false;
    }
  }
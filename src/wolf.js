import Enemy from "./enemy.js";

/**
 * Clase que representa a un enemigo basico del juego.
 */
 export default class Wolf extends Enemy {

    constructor(scene, x, y) {
        //scene, x, y, lives, speed, jumpSpeed, numJumps, fieldOfView, rangeAttack, attackSpeed, sprite_x, sprite_y , scale, damage)
      super(scene, x + 25, y - 108, 1, 450, -700, 0, 600, 100, 2500, 48, 44, 4, 2)

      this.oldX = 60;
      this.body.setSize(140,95);

      this.weaponHitbox = this.scene.add.zone(105, 45, 100, 70);
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
        this.hasBeenHurt = true;
  
        if(this.lives <= 0){
          this.death();
        }
      }

    }


    /**
     * @override
     */
    death(){
      this.sprite.play('dead_wolf',true);
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
           else if (this.scene.player.x<this.x && (this.scene.groundLayer.hasTileAtWorldXY(this.x, this.y + 110) || this.scene.platformLayer.hasTileAtWorldXY(this.x, this.y + 110)) && !this.scene.wallLayer.hasTileAtWorldXY(this.x -35, this.y + 50) && !this.scene.groundLayer.hasTileAtWorldXY(this.x -35, this.y + 50)) {
            this.weaponHitbox.setX(-15);
            this.sprite.flipX = true;
            this.sprite.x = this.oldX = 70;  
            this.body.setVelocityX(-this.speed);
            
          }
          else if (this.scene.player.x>this.x&& (this.scene.groundLayer.hasTileAtWorldXY(this.x + 135, this.y + 110) || this.scene.platformLayer.hasTileAtWorldXY(this.x + 135, this.y + 110)) && !this.scene.wallLayer.hasTileAtWorldXY(this.x + 175, this.y + 50) && !this.scene.groundLayer.hasTileAtWorldXY(this.x + 175, this.y + 50)) {
            this.weaponHitbox.setX(150);
            this.sprite.flipX = false;
            this.sprite.x = this.oldX = 70;
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
        this.sprite.y = 45;
        if(this.body.velocity.x != 0){      
          this.sprite.play('run_wolf',true);
        }
        else{  
          this.sprite.play('idle_wolf',true);
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
          this.weaponHitbox.setX(-15);
          this.sprite.flipX = true;
          this.sprite.x = this.oldX = 70;  
          
        }
        else if (this.scene.player.x>this.x) {
          this.weaponHitbox.setX(150);
          this.sprite.flipX = false;
          this.sprite.x = this.oldX = 60;
        }
        if(this.canAttack === true && this.lives > 0){
          this.canAttack = false;
          this.scene.time.delayedCall(400, () => {if(!this.hasBeenHurt)this.dealWeaponDamage();}, [], this);
          this.canAnimate = false;
          this.isOnAction = true;
          this.sprite.play('attack_wolf',true)//.on('animationcomplete-attack2_player', () => {this.canAnimate = true; this.isOnAction = false;});
          this.oldX = this.sprite.x;

          this.scene.time.delayedCall(1800, () => {
            //this.sprite.stop();
            this.isOnAction = false;
            if(this.lives > 0)
              this.canAnimate = true;
            
          }, [], this);
          this.scene.time.delayedCall(this.attackSpeed, () => {this.canAttack = true;}, [], this);
        }
        return true;
      }
      return false;
    }
  }
  
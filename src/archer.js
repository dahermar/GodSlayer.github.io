import Enemy from "./enemy.js";
import Arrow from "./arrow.js";


/**
 * Clase que representa a un enemigo basico del juego.
 */
 export default class Archer extends Enemy {

    constructor(scene, x, y) {

      super(scene, x + 5, y - 98, 1, 200, -700, 0, 1000, 700, 2500, 48, 44, 3.3, 2)

      this.body.setSize(80,98);
      this.direction = -1;
      this.runawayRange = 500;
      
    }

   /**
     * @override
     */
    getDamage(numDamage) {
      if(this.lives > 0){
        this.lives -= numDamage;
        this.body.setVelocityX(0);
        this.hasBeenHurt = true;
  
        if(this.lives <= 0){
          this.death();
        }
        else{

          this.scene.time.delayedCall(1000, () => {this.hasBeenHurt = false;}, [], this);
          this.canAnimate = false;
          //this.sprite.play('hit_skeleton',true).on('animationcomplete-hit_skeleton', () => {this.canAnimate = true;});
        }
      }

    }


    /**
     * @override
     */
    death(){
      this.sprite.play('dead_archer',true);
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
      if(!this.isOnAction){
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
      
      //else if((this.x - this.fieldOfView < this.scene.player.x)  && (this.scene.player.x < this.x + this.fieldOfView) && (this.y - this.fieldOfView< this.scene.player.y)  && (this.scene.player.y < this.y + this.fieldOfView )){
        
      else if((this.x - this.runawayRange < this.scene.player.x)  && (this.scene.player.x < this.x + this.runawayRange) && (this.y - this.runawayRange< this.scene.player.y)  && (this.scene.player.y < this.y + this.runawayRange )){
        if (this.scene.player.x<this.x && (this.scene.groundLayer.hasTileAtWorldXY(this.x + 70, this.y + 99) || this.scene.platformLayer.hasTileAtWorldXY(this.x + 70, this.y + 99)) && !this.scene.wallLayer.hasTileAtWorldXY(this.x + 100, this.y + 50) && !this.scene.groundLayer.hasTileAtWorldXY(this.x + 100, this.y + 50)) {
        
          this.sprite.flipX = false;
          this.direction = -1;
          this.body.setVelocityX(this.speed);
        
        }
        else if (this.scene.player.x>this.x && (this.scene.groundLayer.hasTileAtWorldXY(this.x +25, this.y + 99) || this.scene.platformLayer.hasTileAtWorldXY(this.x +25, this.y + 99)) && !this.scene.wallLayer.hasTileAtWorldXY(this.x - 5, this.y + 50) && !this.scene.groundLayer.hasTileAtWorldXY(this.x - 5, this.y + 50)) {
        
        this.sprite.flipX = true;
        this.direction = +1;
        this.body.setVelocityX(-this.speed);
        }
      }
        /*else{ //Codigo para que vaya hacia ti
          
          if((this.scene.player.x > this.x - 10)  && (this.scene.player.x < this.x + 10)){
            this.body.setVelocityX(0);
          }
          else if (this.scene.player.x<this.x) {
          
            this.sprite.flipX = true;
            this.direction = -1;
            this.body.setVelocityX(-this.speed);
          
          }
          else if (this.scene.player.x>this.x) {
          
          this.sprite.flipX = false;
          this.direction = +1;
          this.body.setVelocityX(+this.speed);
          }
        }*/
      //}
      else{
        this.body.setVelocityX(0);
      }
    }

    attack(){
      if((this.x - this.fieldOfView < this.scene.player.x)  && (this.scene.player.x < this.x + this.fieldOfView) && (this.y - this.fieldOfView< this.scene.player.y)  && (this.scene.player.y < this.y + this.fieldOfView ) && this.lives > 0){
        this.body.setVelocityX(0);
        if (this.scene.player.x<this.x) {
          
          this.sprite.flipX = true;
          this.direction = -1;
          
        }
        else if (this.scene.player.x>this.x) {
        
          this.sprite.flipX = false;
          this.direction = 1;
        }
        if(this.canAttack === true && this.lives > 0){
          this.canAttack = false;
          this.scene.time.delayedCall(750, () => {if(!this.hasBeenHurt)this.dealWeaponDamage();}, [], this);
          this.canAnimate = false;
          this.isOnAction = true;
          this.sprite.play('attack_archer',true)//.on('animationcomplete-attack2_player', () => {this.canAnimate = true; this.isOnAction = false;});
        

          this.scene.time.delayedCall(1800, () => {
            this.isOnAction = false;
            if(this.lives > 0)
              this.canAnimate = true;
            
          }, [], this);
          this.scene.time.delayedCall(this.attackSpeed, () => {this.canAttack = true;}, [], this);
          return true;
        }
        
      }
      return false;
    }

    /**
     * @override
     */
    animations(){
      if(this.canAnimate){
        if(this.body.velocity.x != 0){  
          this.sprite.play('walk_archer',true);
        }
        else{  
          this.sprite.play('idle_archer',true);
        }
      }
    }

    /**
     * @override
     */

    
    dealWeaponDamage(){
      
      new Arrow(this.scene,this.x,this.y,this.direction);

    }
    

    /**
     * @override
     */
    
  }
  
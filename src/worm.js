import Enemy from "./enemy.js";
import Fireball from "./fireball.js";
/**
 * Clase que representa a un enemigo basico del juego.
 */
 export default class Worm extends Enemy {

    constructor(scene, x, y) {

      super(scene, x + 25, y - 108, 3, 50, -700, 0, 1000, 500, 2500, 48, 44, 4, 1)
      this.oldX = 100;
      this.body.setSize(200,100);
      this.direction = -1;
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
          this.sprite.play('hit_worm',true).on('animationcomplete-hit_worm', () => {this.canAnimate = true;});
        }
      }

    }


    /**
     * @override
     */
    death(){
      this.sprite.play('dead_worm',true);
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
           else if (this.scene.player.x<this.x) {
            this.sprite.flipX = true;
            this.sprite.x = this.oldX = 100;  
            this.body.setVelocityX(-this.speed);
            this.direction = -1;
            
          }
          else if (this.scene.player.x>this.x) {
            this.sprite.flipX = false;
            this.sprite.x = this.oldX = 100;
            this.body.setVelocityX(this.speed);
            this.direction = +1;
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
          this.sprite.play('walk_worm',true);
        }
        else{  
          this.sprite.play('idle_worm',true);
        }
      }
    }

    /**
     * @override
     */

    /**
     * @override
     */
    attack(){
      if(this.scene.player.lives > 0 && (this.x - this.rangeAttack < this.scene.player.x)  && (this.scene.player.x < this.x + this.rangeAttack) && ( this.y - this.rangeAttack < this.scene.player.y)  && (this.scene.player.y < this.y + this.rangeAttack) && this.lives > 0){
        this.body.setVelocityX(0);
        if (this.scene.player.x<this.x) {
          this.sprite.flipX = true;
          this.sprite.x = this.oldX = 100;  
          this.direction = -1;
        }
        else if (this.scene.player.x>this.x+30) {
          this.sprite.flipX = false;
          this.sprite.x = this.oldX = 100;
          this.direction = 1;
        }
        if(this.canAttack === true && this.lives > 0){
          /*this.scene.time.delayedCall(750, () => {if(!this.hasBeenHurt)if(Math.random()<0.4){this.extra();} 
                                                                        else{this.basic();}
                                                                      }, [], this);*/
          this.scene.time.delayedCall(750, () => {if(!this.hasBeenHurt)this.normalAttack();}, [], this);
          this.canAttack = false;
          this.canAnimate = false;
          this.isOnAction = true;
          this.sprite.play('attack_worm',true)//.on('animationcomplete-attack2_player', () => {this.canAnimate = true; this.isOnAction = false;});
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

    extra(){
      if(this.direction == 1){
        new Fireball(this.scene,this.x+130,this.y-10,this.direction,1,'fireballBL');
        new Fireball(this.scene,this.x+130,this.y-10,this.direction,3,'fireballBL');
        new Fireball(this.scene,this.x+130,this.y-10,this.direction,4,'fireballBL');
      }
      else{
        new Fireball(this.scene,this.x-30,this.y-10,this.direction,1,'fireballBL');
        new Fireball(this.scene,this.x-30,this.y-10,this.direction,3,'fireballBL');
        new Fireball(this.scene,this.x-30,this.y-10,this.direction,4,'fireballBL');
      }
    }
    basic(){

      if(this.direction == 1){
        new Fireball(this.scene,this.x+130,this.y-10,this.direction,1,'fireball');
        new Fireball(this.scene,this.x+130,this.y-10,this.direction,2,'fireball');
        new Fireball(this.scene,this.x+130,this.y-10,this.direction,0,'fireball');
      }
      else{
        new Fireball(this.scene,this.x-30,this.y-10,this.direction,0,'fireball');
        new Fireball(this.scene,this.x-30,this.y-10,this.direction,1,'fireball');
        new Fireball(this.scene,this.x-30,this.y-10,this.direction,2,'fireball');
      }
    }

    normalAttack(){
      if(this.direction == 1){
        new Fireball(this.scene,this.x+130,this.y-10,this.direction,1,'fireBall_anim');
      }
      else{
        new Fireball(this.scene,this.x-30,this.y-10,this.direction,1,'fireBall_anim');
      }
    }
  }
  
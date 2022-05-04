import Enemy from "./enemy.js";
import Fireball from "./fireball.js";
/**
 * Clase que representa a un enemigo basico del juego.
 */
 export default class WormBoss extends Enemy {

    constructor(scene, x, y,range) {

      super(scene, x + 20, y -390, 4, 50, -700, 0, range, range, 3000, -100 , 200 , 4, 1);
  
      this.body.setSize(250,250);
      this.sprite.setScale(15);
      this.scene.physics.add.existing(this);
      this.body.setAllowGravity(false);
      this.invencible = false;
    
    }

   /**
     * @override
     */
    getDamage(numDamage) {
      
        if(this.lives > 0 && this.invencible===false){
          this.lives -= numDamage;
          this.canAnimate = false;
          this.sprite.play('hit_worm',true).on('animationcomplete-hit_worm', () => {this.canAnimate = true;});;
          this.invencible=true;
          this.scene.time.delayedCall(2000, () => {this.invencible=false;}, [], this);
          
       
        if(this.lives <= 0)
          this.death();
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
    
      if(!this.isOnAction ){
        this.attack();
      }
      this.animations();
    }

    /**
     * @override
     */
   


    /**
     * @override
     */
    animations(){
      if(this.canAnimate){

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
         
        }
        else if (this.scene.player.x>this.x+30) {
          this.sprite.flipX = false;
         
        }
        if(this.canAttack === true && this.lives > 0){
          this.scene.time.delayedCall(750, () => {if(this.lives>0){if(Math.random()>0.5){this.normalAttack();} 
                                                                        else{this.basic();}
                                                                      }}, [], this);
          this.canAttack = false;
          this.canAnimate = false;
          this.isOnAction = true;
          this.sprite.play('attack_worm',true)//.on('animationcomplete-attack2_player', () => {this.canAnimate = true; this.isOnAction = false;});
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

    basic(){
      new Fireball(this.scene,this.x+150,this.y+80,40,40,1,1,'fireBall_anim',4);
      new Fireball(this.scene,this.x+150,this.y+80,40,40,1,2,'fireBall_anim',4);
      new Fireball(this.scene,this.x+150,this.y+80,40,40,1,0,'fireBall_anim',4);
    }
   
    normalAttack(){
      new Fireball(this.scene,this.x+150,this.y+80,150,150,1,1,'fireBall_anim',15);
    }
  }
  
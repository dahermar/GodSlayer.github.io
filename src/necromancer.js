import Enemy from "./enemy.js";
import necromancerSkeleton from "./necromancerSkeleton.js";


/**
 * Clase que representa a un enemigo basico del juego.
 */
 export default class Necromancer extends Enemy {

    constructor(scene, x, y, skeletonList) {
        super(scene, x + 5, y - 140, 3, 200, -700, 0, 1000, 700, 2500, 44, -5, 2.7, 2)
        this.skeletons = skeletonList;
        this.body.setSize(90,138);
        this.direction = -1;
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
          this.sprite.play('hit_necromancer',true).on('animationcomplete-hit_necromancer', () => {this.canAnimate = true;});
        }
      }

    }


    /**
     * @override
     */
    death(){
      this.sprite.play('dead_necromancer',true);
      this.canAnimate = false;
      //new Potion(this.scene,this.x,this.y);
      this.isOnAction = true;
      this.scene.time.delayedCall(5000, () => {this.destroy();}, [], this);
      this.skeletons.forEach(charObj => {
        if(charObj[2]){
            charObj[3].getDamage(100);
        }
        });
    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t,dt) { 
      if(!this.isOnAction){
        this.spawnSkeleton();
        this.move();
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
        
      else if((this.x - this.fieldOfView < this.scene.player.x)  && (this.scene.player.x < this.x + this.fieldOfView) && (this.y - this.fieldOfView< this.scene.player.y)  && (this.scene.player.y < this.y + this.fieldOfView )){
       if(this.scene.player.x < this.x){
         this.sprite.flipX = true;
       }
       else{
        this.sprite.flipX = false;
      }
      }
      
    }

    /*attack(){
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
          this.scene.time.delayedCall(750, () => {if(!this.hasBeenHurt)this.spawnSkeleton();}, [], this);
          this.canAnimate = false;
          this.isOnAction = true;
          this.sprite.play('spawn_necromancer',true)//.on('animationcomplete-attack2_player', () => {this.canAnimate = true; this.isOnAction = false;});
        

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
    }*/

    /**
     * @override
     */
    animations(){
      if(this.canAnimate){
        if(this.body.velocity.x != 0){  
          this.sprite.play('walk_necromancer',true);
        }
        else{  
          this.sprite.play('idle_necromancer',true);
        }
      }
    }

    /**
     * @override
     */

    
    spawnSkeleton(){
        if(this.lives>0){
            let cont= 0;
            this.skeletons.forEach(charObj => {
            if(!charObj[2] && this.scene.player.x>charObj[0]-225 && this.scene.player.x<charObj[0]+275 && this.scene.player.y>charObj[1]-250 && this.scene.player.y<charObj[1]+250){
              this.canAnimate = false; 
              this.isOnAction = true;         
              this.sprite.play('spawn_necromancer',true).on('animationcomplete-spawn_necromancer', () => {this.canAnimate = true; this.isOnAction = false; 
                });;
              this.contAux = cont;
              this.scene.time.delayedCall(1000, () => {
                         
              this.skeletons[this.contAux][3]=new necromancerSkeleton(this.scene, this.skeletons[this.contAux][0], this.skeletons[this.contAux][1], this.contAux, this);
                this.scene.enemies.add(this.skeletons[this.contAux][3]);
                this.scene.enemiesPlatformCol.add(this.skeletons[this.contAux][3]);
              }, [], this);

              
              this.skeletons[cont][2] = true;

              return ;
            }
            cont++;
            });
        }        
    }
    

    canRespawn(position){
        this.skeletons[position][2]=false;
    }

  }
  
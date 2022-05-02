import Enemy from "./enemy.js";
import necromancerSkeleton from "./necromancerSkeleton.js";
import NecromancerSpell from "./necromancerSpell.js";

/**
 * Clase que representa a un enemigo basico del juego.
 */
 export default class Necromancer extends Enemy {

    constructor(scene, necromancerPositions, skeletonList) {
        super(scene, necromancerPositions[0][0] + 5, necromancerPositions[0][1] - 140, 4, 200, -700, 0, 2000, 700, 2500, 44, -5, 2.7, 2)
        this.necromancerPositions = necromancerPositions;
        this.skeletons = skeletonList;
        this.body.setSize(90,138);
        this.direction = -1;
        this.canAttackStrong=true;
        this.canGetDamage = true;
        this.fieldOfViewX = 1000;
        this.i=0;
    }

   /**
     * @override
     */
    getDamage(numDamage) {
      if(this.lives > 0 && this.canGetDamage){
        this.canGetDamage=false;
        this.lives -= numDamage;
        this.body.setVelocityX(0);
        this.hasBeenHurt = true;
        this.i++;
  
        if(this.lives <= 0){
          this.death();
        }
        else{

          this.scene.time.delayedCall(1000, () => {this.hasBeenHurt = false;}, [], this);
          this.canAnimate = false;
          this.sprite.play('hit_necromancer',true);
          this.scene.time.delayedCall(1000, () => {this.canAnimate = true;
            this.setX(this.necromancerPositions[this.i][0] + 5);
            this.setY(this.necromancerPositions[this.i][1] - 140);
            this.canGetDamage = true;}, [], this);
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
      this.scene.isBossAlive[2] = false;
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
        if(this.canAnimate && this.canAttack){
          this.attack();
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
        
      else if((this.x - this.fieldOfView < this.scene.player.x)  && (this.scene.player.x < this.x + this.fieldOfView) && (this.y - this.fieldOfView< this.scene.player.y)  && (this.scene.player.y < this.y + this.fieldOfView )){
       if(this.scene.player.x < this.x){
         this.sprite.flipX = true;
       }
       else{
        this.sprite.flipX = false;
      }
      }
      
    }

    attack(){
      if((this.x - this.fieldOfViewX < this.scene.player.x)  && (this.scene.player.x < this.x + this.fieldOfViewX) && (this.y - this.fieldOfView< this.scene.player.y)  && (this.scene.player.y < this.y + this.fieldOfView ) && this.lives > 0 && this.scene.player.lives >0){
        if (this.scene.player.x<this.x) {
          
          this.sprite.flipX = true;
          this.direction = -1;
          
        }
        else if (this.scene.player.x>this.x) {
          this.sprite.flipX = false;
          this.direction = 1;
        }
        if(this.canAttack === true && this.lives > 0){
          
          if((this.x - (this.fieldOfViewX/2) < this.scene.player.x)  && (this.scene.player.x < this.x + (this.fieldOfViewX/2)) && (this.y - (this.fieldOfView/2)< this.scene.player.y)  && (this.scene.player.y < this.y + (this.fieldOfView/2) ) && this.lives > 0 && this.canAttackStrong){
            this.canAttack = false;
            this.canAttackStrong = false;
            this.scene.time.delayedCall(750, () => {if(!this.hasBeenHurt)this.dealWeaponDamageStrong();}, [], this);
            this.canAnimate = false;
            this.isOnAction = true;
            this.sprite.play('attack_necromancer',true);
            
            this.scene.time.delayedCall(1000, () => {
              this.isOnAction = false;
              if(this.lives > 0)
                this.canAnimate = true;
              
            }, [], this);

            this.scene.time.delayedCall(this.attackSpeed, () => {this.canAttack = true;}, [], this);
            this.scene.time.delayedCall(10000, () => {this.canAttackStrong = true;}, [], this);

            return true;
          }
          if(this.canAttack){
          this.canAttack = false;
          this.scene.time.delayedCall(750, () => {if(!this.hasBeenHurt)this.dealWeaponDamage();}, [], this);
          this.canAnimate = false;
          this.isOnAction = true;
          this.sprite.play('attack2_necromancer',true);
          
          this.scene.time.delayedCall(1000, () => {
            this.isOnAction = false;
            if(this.lives > 0)
              this.canAnimate = true;
            
          }, [], this);

          this.scene.time.delayedCall(this.attackSpeed, () => {this.canAttack = true;}, [], this);
          return true;
          }
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
        if(this.lives>0 && this.scene.player.lives>0){
            let cont= 0;
            this.skeletons.forEach(charObj => {
            if(!charObj[2] && this.scene.player.x>charObj[0]-225 && this.scene.player.x<charObj[0]+275 && this.scene.player.y>charObj[1]-250 && this.scene.player.y<charObj[1]+250){
              this.canAnimate = false; 
              this.isOnAction = true;         
              this.sprite.play('spawn_necromancer',true);
              this.scene.time.delayedCall(1000, () => {
                this.isOnAction = false;
                if(this.lives > 0)
                  this.canAnimate = true;
                
              }, [], this);

              this.contAux = cont;
              //this.scene.time.delayedCall(1000, () => {
                         
              this.skeletons[this.contAux][3]=new necromancerSkeleton(this.scene, this.skeletons[this.contAux][0], this.skeletons[this.contAux][1], this.contAux, this);
                this.scene.enemies.add(this.skeletons[this.contAux][3]);
                this.scene.enemiesPlatformCol.add(this.skeletons[this.contAux][3]);
              //}, [], this);

              
              this.skeletons[cont][2] = true;

              return ;
            }
            cont++;
            });
        }        
    }
    
    dealWeaponDamage(){
      if(this.lives > 0 && this.scene.player.lives >0)
        new NecromancerSpell(this.scene,this.scene.player.x,this.scene.player.y);

    }

    dealWeaponDamageStrong(){
      if((this.x - this.fieldOfView < this.scene.player.x)  && (this.scene.player.x < this.x + this.fieldOfView) && (this.y - this.fieldOfView< this.scene.player.y)  && (this.scene.player.y < this.y + this.fieldOfView ) && this.lives > 0 && this.scene.player.lives >0){
        let playerX = this.scene.player.x;
        let playerY = this.scene.player.y;
        let playerDirection = this.scene.player.direction;

        new NecromancerSpell(this.scene,playerX-(100*playerDirection),playerY);
        this.scene.time.delayedCall(250, () => {new NecromancerSpell(this.scene,playerX,playerY);}, [], this);
        this.scene.time.delayedCall(500, () => {new NecromancerSpell(this.scene,playerX+(100*playerDirection),playerY);}, [], this);
      }
    }

    canRespawn(position){
        this.skeletons[position][2]=false;
    }

  }
  
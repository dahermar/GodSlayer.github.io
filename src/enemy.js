import Potion from "./potion.js";

/**
 * Clase que representa a un enemigo basico del juego.
 */
 export default class Enemy extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
      super(scene, x, y);
      this.lives = 2;
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      //this.body.setCollideWorldBounds();
      this.speed = 200;
      this.jumpSpeed = -700;
      this.numJumps = 0;
      this.oldX = 48;
      this.canAnimate = true;
      this.canAttack = true;
      this.isOnAction = false;
      this.hasBeenHurt = false;

      this.fieldOfView = 400;
      this.rangeAttack = 150;
      this.attackSpeed =2500;

      /*this.spriteIdle = this.scene.add.sprite(48, 44, 'skeletonIdle');
      this.spriteWalk = this.scene.add.sprite(48, 44, 'skeletonWalk');
      this.spriteAttack = this.scene.add.sprite(48, 44, 'skeletonAttack');
      this.spriteHit = this.scene.add.sprite(48, 44, 'skeletonHit');
      this.spriteDead = this.scene.add.sprite(48, 44, 'skeletonDead');
      this.spriteWalk.setVisible(false);
      this.spriteAttack.setVisible(false);
      this.spriteHit.setVisible(false);
      this.spriteDead.setVisible(false);*/
      
      this.sprite = this.scene.add.sprite(48, 44);
      this.sprite.setScale(4);
      this.add(this.sprite);
      /*this.sprite = this.spriteIdle;
      this.spriteIdle.setScale(4);
      this.spriteWalk.setScale(4);
      this.spriteAttack.setScale(4);
      this.spriteHit.setScale(4);
      this.spriteDead.setScale(4);
      this.add(this.spriteIdle);
      this.add(this.spriteWalk);
      this.add(this.spriteAttack);
      this.add(this.spriteHit);
      this.add(this.spriteDead);*/
      this.body.setSize(60,108);

      this.weaponHitbox = this.scene.add.zone(105, 45, 90, 126);
      this.scene.physics.add.existing(this.weaponHitbox);
      this.weaponHitbox.body.setAllowGravity(false);

      this.add(this.weaponHitbox);
        

      this.cursors = this.scene.input.keyboard.createCursorKeys();
      this.space = this.scene.input.keyboard.addKey('SPACE');
      

      //this.hpText = this.scene.add.text(this.x, this.y - 140, `HP: ${this.lives}`).setOrigin(0.5);
      this.hpText = this.scene.add.text(1090, 15, `HP: ${this.lives}`);
      this.hpText.setScrollFactor(0,0);
      this.updateUI();

    }
  

    updateUI() {
      if(this.lives >= 0)
        this.hpText.text = 'Enemy lives: ' + this.lives + '\n';
    }

    getDamage(numDamage) {
      if(this.lives > 0){
        this.lives -= numDamage;
        this.updateUI();
        
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

    death(){
      this.sprite.play('dead_skeleton',true);
      this.canAnimate = false;
      this.hpText.destroy();
      this.scene.enemyKilled();
      //new Potion(this.scene,this.x,this.y);
      this.scene.time.delayedCall(8000, () => {this.destroy();}, [], this);
    }

    /*flipSprites(flip){
      this.spriteIdle.flipX = flip;
      this.spriteWalk.flipX = flip;
      this.spriteAttack.flipX = flip;
      this.spriteHit.flipX = flip;
      this.spriteDead.flipX = flip;
    }*/
    
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

    checkCollision(){
      this.scene.physics.collide(this, this.scene.player,(enemy, player) => {
        let isRight = false;
        if(this.x > player.x)
          isRight = true;
        player.getDamage(1, isRight);
      });
    }

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
            this.weaponHitbox.setX(-45);
            this.sprite.flipX = true;
            this.sprite.x = this.oldX = 12;  
            this.body.setVelocityX(-this.speed);
            
          }
          else if (this.scene.player.x>this.x) {
            this.weaponHitbox.setX(105);
            this.sprite.flipX = false;
            this.sprite.x = this.oldX = 48;
            this.body.setVelocityX(this.speed);
          }
        }
        else{
          this.body.setVelocityX(0);
        }
      } 

      /*
      if(this.body.onFloor()){
        this.numJumps = 0;
      }
      if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) { 
        if(this.body.onFloor()){
          this.numJumps = 0;
          this.body.setVelocityY(this.jumpSpeed);
        }
        else if(this.numJumps <= 0){
          this.body.setVelocityY(this.jumpSpeed);
          this.numJumps += 1;
        }
      }
      if (this.cursors.left.isDown) {
        this.weaponHitbox.setX(-45);
        this.sprite.flipX = true;
        this.sprite.x = this.oldX = 12;  
        this.body.setVelocityX(-this.speed);
        
      }
      else if (this.cursors.right.isDown) {
        this.weaponHitbox.setX(105);
        this.sprite.flipX = false;
        this.sprite.x = this.oldX = 48;
        this.body.setVelocityX(this.speed);
      }
      else {
        this.body.setVelocityX(0);
      }*/
    }

    animations(){
      if(this.canAnimate){
        this.sprite.x = this.oldX;
        this.sprite.y = 44;
        if(this.cursors.left.isDown || this.cursors.right.isDown){      
          this.sprite.play('walk_skeleton',true);
        }
        else{  
          this.sprite.play('idle_skeleton',true);
        }
      }
    }

    /*changeSprite(newSprite){
      this.sprite.setVisible(false);
      newSprite.flipX = this.sprite.flipX;
      newSprite.x = this.sprite.x;
      this.sprite = newSprite;
      this.sprite.setVisible(true);
    }*/

    dealWeaponDamage(){
      this.scene.physics.overlap(this.weaponHitbox, this.scene.player,(hitbox, player) => {
        let isRight = false;
        if(this.x > player.x)
          isRight = true;
        player.getDamage(1 ,isRight);
      });
    }

    attack(){
      if((this.x - this.rangeAttack < this.scene.player.x)  && (this.scene.player.x < this.x + this.rangeAttack) && ( this.y - this.rangeAttack < this.scene.player.y)  && (this.scene.player.y < this.y + this.rangeAttack)){
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
          this.scene.time.delayedCall(750, () => {if(!this.hasBeenHurt)this.dealWeaponDamage();}, [], this);
          this.canAnimate = false;
          this.isOnAction = true;
          this.sprite.play('attack_skeleton',true)//.on('animationcomplete-attack2_player', () => {this.canAnimate = true; this.isOnAction = false;});
          this.oldX = this.sprite.x;
          if(this.sprite.flipX === false){
            this.sprite.x = 74;
          }
          else{
            this.sprite.x = -14;
          }
          this.sprite.y = 34;
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
  
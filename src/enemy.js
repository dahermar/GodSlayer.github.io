import Potion from "./potion.js";

/**
 * Clase que representa a un enemigo basico del juego
 * 
 */
 export default class Enemy extends Phaser.GameObjects.Container {
    constructor(scene, x, y, lives, speed, jumpSpeed, numJumps, fieldOfView, rangeAttack, attackSpeed, sprite_x, sprite_y , scale, damage) {
      super(scene, x, y);

      this.lives = lives;
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);

      this.speed = speed;
      this.jumpSpeed = jumpSpeed;
      this.numJumps = numJumps;

      this.canAnimate = true;
      this.canAttack = true;
      this.isOnAction = false;
      this.hasBeenHurt = false;

      this.fieldOfView = fieldOfView;
      this.rangeAttack = rangeAttack;
      this.attackSpeed = attackSpeed;

      this.damage = damage
      
      this.sprite = this.scene.add.sprite(sprite_x, sprite_y);
      this.sprite.setScale(scale);
      this.add(this.sprite);

    }
  
    updateUI() {
      if(this.lives >= 0)
        this.hpText.text = 'Enemy lives: ' + this.lives + '\n';
    }

    getDamage(numDamage) {}

    death(){}
    
    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t,dt){}

    checkCollision(){}

    move(){}

    animations(){}

    /*changeSprite(newSprite){
      this.sprite.setVisible(false);
      newSprite.flipX = this.sprite.flipX;
      newSprite.x = this.sprite.x;
      this.sprite = newSprite;
      this.sprite.setVisible(true);
    }*/

    dealWeaponDamage(){}

    attack(){}
  }
  
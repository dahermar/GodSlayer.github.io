import Projectile from './projectile.js';

/**
 * Clase que representa las flechas que lanza el arquero. 
 */

export default class Fireball extends Projectile {

    constructor(scene, x, y,tamX,tamY,direction,mode,sprite,scale) {
        super(scene, x, y, tamX, tamY, direction, false, 44, 25, scale, 600, 2, 5000, sprite);
        this.sprite.destroy();
        this.sprite = this.scene.add.sprite(0,0);
        if(direction == -1 ){
            this.sprite.flipX = true;
            this.x += 44;
        }
        this.sprite.setScale(scale);
        this.add(this.sprite);
        this.speed = 100;
        this.mode=mode;
        this.scene.physics.add.collider(this, this.scene.player,(object, player) => {
            let isRight = false;
            if(this.x > player.x)
                isRight = true;
            player.getDamage(this.damage, isRight);
            player.getDamage(this.damage);
            object.destroy();
        });
        if(mode==0){
            this.body.setVelocityY( this.speed+100);
        }
        else if(mode==1){
            this.body.setVelocityY(0);
        }
        else if(mode==2){
            this.body.setVelocityY(-this.speed-100);
        }
    }
    
    preUpdate(t,dt) {
        this.sprite.play('fireBall_anim',true);
    }

} 
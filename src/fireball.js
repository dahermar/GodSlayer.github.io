import Projectile from './projectile.js';

/**
 * Clase que representa las flechas que lanza el arquero. 
 */

export default class Fireball extends Projectile {

    constructor(scene, x, y,direction,mode,sprite) {
        super(scene, x, y, 20, 20, direction, false, 44, 25, 2, 600, 2, 2000, sprite);
        this.speed = 100;
        this.mode=mode;
        this.cambio=true;
        this.scene.physics.add.collider(this, this.scene.player,(object, player) => {
            let isRight = false;
            if(this.x > player.x)
                isRight = true;
            player.getDamage(this.damage, isRight);
            player.getDamage(this.damage);
            object.destroy();
        });
        if(mode==0){
            this.body.setVelocityY( this.speed);
        }
        else if(mode==1){
            this.body.setVelocityY(0);
        }
        else if(mode==2){
            this.body.setVelocityY(-this.speed);
        }
    }
    
    preUpdate(t,dt) {
        this.sprite.play('fireBall_anim',true);
        if(this.mode==3){
            this.body.setVelocityY(this.speed);
            if(this.cambio==true){
            this.cambio=false;
            this.scene.time.delayedCall(2000, () => {this.cambioArriba();
                                                    this.cambio=true;}, [], this);
           }
        }
        if(this.mode==4){
            this.body.setVelocityY(-this.speed);
            if(this.cambio==true){
             this.cambio=false;
             this.scene.time.delayedCall(2000, () => {this.cambioArriba();
                                                     this.cambio=true;}, [], this);
            }
         }
    }

    cambioArriba(){
        this.speed=this.speed*-1;
    }
} 
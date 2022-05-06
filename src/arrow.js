import Projectile from './projectile.js';

export default class Arrow extends Projectile {

    constructor(scene, x, y,direction) {

        super(scene, x, y, 60, 10, direction, true, 44, 25, 2, 800, 2, 2500, 'arrow');
        this.scene.physics.add.collider(this, this.scene.player,(object, player) => {
            let isRight = false;
            if(this.x > player.x)
                isRight = true;
            player.getDamage(this.damage, isRight);
            player.getDamage(this.damage);
            object.destroy();
        });
    }
    
    preUpdate(t,dt) {
        
    }
} 
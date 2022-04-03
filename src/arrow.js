import Projectile from './projectile.js';

/**
 * Clase que representa los cuchillos que lanza el jugador. El jugador los tira con la "L".
 * Como atributos tiene la velocidad de los cuchillos.
 */

export default class Arrow extends Projectile {

    constructor(scene, x, y,direction) {

        super(scene, x, y, direction, 44, 25, 2, 800, 2,'arrow');
        this.scene.physics.add.collider(this, this.scene.player,(object, player) => {
            player.getDamage(this.damage);
            object.destroy();
        });
    }
    
    preUpdate(t,dt) {
        
    }
} 
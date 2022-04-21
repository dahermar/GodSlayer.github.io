import Projectile from './projectile.js';

/**
 * Clase que representa los cuchillos que lanza el jugador. El jugador los tira con la "L".
 * Como atributos tiene la velocidad de los cuchillos.
 */

export default class Knife extends Projectile {

    constructor(scene, x, y,direction) {

        super(scene, x, y, 40, 10,direction, true, 44, 25, 0.1, 600, 1,'knife');
        
        this.scene.physics.add.collider(this, this.scene.enemies,(object, enemy) => {
            enemy.getDamage(this.damage);
            this.destroy();
        });
    }
    
    preUpdate(t,dt) {
        
    }
} 
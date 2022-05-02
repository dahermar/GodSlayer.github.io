import Skeleton from './skeleton.js';

/**
 * Clase que representa los cuchillos que lanza el jugador. El jugador los tira con la "L".
 * Como atributos tiene la velocidad de los cuchillos.
 */

export default class necromancerSkeleton extends Skeleton {

    constructor(scene, x, y, position, necro) {
        
        super(scene, x, y, 1);
        this.necromancer = necro;
        this.pos = position;
    }
    
    /**
     * @override
     */
     death(){
        this.sprite.play('dead_skeleton',true);
        this.canAnimate = false;
        this.scene.time.delayedCall(5000, () => {this.destroy(); this.necromancer.canRespawn(this.pos)}, [], this);
        
    }

} 
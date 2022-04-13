import Skeleton from './skeleton.js';

/**
 * Clase que representa los cuchillos que lanza el jugador. El jugador los tira con la "L".
 * Como atributos tiene la velocidad de los cuchillos.
 */

export default class necromancerSkeleton extends Skeleton {

    constructor(scene, x, y, position, knekro) {
        
        super(scene, x, y);
        this.necromancer = knekro;
        this.pos = position;
    }
    
    /**
     * @override
     */
     death(){
         console.log("sa muerto");
        this.sprite.play('dead_skeleton',true);
        this.canAnimate = false;
        //new Potion(this.scene,this.x,this.y);
        this.scene.time.delayedCall(5000, () => {this.destroy(); this.necromancer.canRespawn(this.pos)}, [], this);
        
    }

} 
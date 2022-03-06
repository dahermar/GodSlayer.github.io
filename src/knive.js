/**
 * Clase que representa los cuchillos que lanza el jugador. El jugador los tira con la "L".
 * Como atributos tiene la velocidad de los cuchillos.
 */

export default class Knive extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y,direction) {
        super(scene, x, y, 'knive');
        this.speed =400;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setVelocityX(direction*this.speed);
        this.scene.physics.add.collider(this, this.scene.enemies,(object, enemy) => {
            enemy.getDamage();
            this.destroy();
        });
    }
    
    preUpdate(t,dt) {
        
    }
}
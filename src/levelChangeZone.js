export default class LevelChangeZone extends Phaser.GameObjects.Zone { 
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
   
  
    constructor(scene, x, y, width, height) {
        super(scene, x, y, width, height);
        this.scene
        this.weaponHitbox = this.scene.add.zone(110, 40, 90, 80);
    this.scene.physics.add.existing(this.weaponHitbox);
    this.weaponHitbox.body.setAllowGravity(false);

    }

}
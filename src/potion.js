/**
 * Clase que representa las pociones que aparecen si el jugador mata a un enemigo. El jugador las consume con la "C".
 */


export default class Potion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'potion');
        this.setScale(0.1);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(true);
        this.scene.physics.add.overlap(this, this.scene.player,(object, player) => {
            player.recivePotion();
            player.updateUI();
            this.destroy();
          });
    }
    
    preUpdate(t,dt) {
        
    }
}
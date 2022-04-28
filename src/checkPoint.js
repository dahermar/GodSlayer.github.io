

export default class CheckPoint extends Phaser.GameObjects.Container { 

    constructor(scene, x, y) {
        super(scene, x, y + 80);
        this.setSize(300, 160);
        this.scene
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.sprite = this.scene.add.sprite(0,0);
        this.add(this.sprite);
        this.sprite.setScale(scale);

    }

}
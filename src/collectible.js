
export default class Collectible extends Phaser.GameObjects.Sprite { 



    constructor(scene, x, y, texture, name, desc, owned){

        super(scene, x-50, y-50, texture);

        this.name = name;
        this.desc = desc;
        this.owned = owned;
        this.setScale(1.3);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.scene.physics.add.overlap(this.scene.player, this,(player, object) => {
            object.owned = true;
            object.setVisible(false);
        });
    }
}

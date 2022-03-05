export default class Knive extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y,direction) {
        super(scene, x, y, 'knive');
        this.speed =400;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setVelocityX(direction*this.speed);
    }
    
    preUpdate(t,dt) {
        this.scene.physics.add.collider(this, this.scene.enemy,(object, enemy) => {
            enemy.getDamage();
            this.destroy();
        });
    }
}
export default class Projectile extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, direction, distance_x, distance_y, scale, speed, damage, sprite) {

        super(scene, x, y + distance_y, sprite);
        if(direction == 1){
            this.flipX = true;
            this.x += distance_x;
        }
        this.setScale(scale);
        this.speed =speed;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setVelocityX(direction*this.speed);
        this.damage = damage;

        
    }
    
    preUpdate(t,dt) {
        
    }
}
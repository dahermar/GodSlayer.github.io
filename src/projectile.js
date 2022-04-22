export default class Projectile extends Phaser.GameObjects.Container {

    constructor(scene, x, y, sizeX, sizeY, direction, isLeft, distance_x, distance_y, scale, speed, damage, destroyTime, spriteName) {

        super(scene, x, y + distance_y);
        this.setSize(sizeX, sizeY);
        this.sprite = this.scene.add.sprite(0,0,spriteName);
        if((direction == 1 && isLeft) || (direction == -1 && !isLeft)){
            this.sprite.flipX = true;
            this.x += distance_x;
        }
        
        this.sprite.setScale(scale);
        this.speed =speed;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setVelocityX(direction*this.speed);
        this.damage = damage;
        this.add(this.sprite);
        this.scene.physics.add.collider(this, this.scene.groundLayer, this.worldCollision);
        this.scene.physics.add.collider(this, this.scene.wallLayer, this.worldCollision);
        this.scene.time.delayedCall(destroyTime, () => {this.destroy();}, [], this);
    }


    preUpdate(t,dt) { }

    worldCollision(proj, worldObj){
        proj.destroy();
    }
}
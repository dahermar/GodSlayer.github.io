

export default class SproutBoss extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x + 200, y-250);

        this.scene.add.existing(this);
        this.sprite = this.scene.add.sprite(0, 0);
        this.sprite.setScale(8);
        this.add(this.sprite);
        //this.scene.physics.add.existing(this);
        this.hasFalled = false;
        this.canAnimate = true;
        this.speed = 500;
        this.setSize(400,500);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.groundCollision = this.scene.physics.add.collider(this.scene.groundLayer, this);
        this.playerCollision = this.scene.physics.add.collider(this.scene.player, this, (player, tree) => {player.getDamage(100);this.playerCollision.active = false; this.canAnimate = false;this.body.setVelocityX(0);});
        this.scene.time.delayedCall(200, () => {this.timePassed = true;}, [], this);

      } 

      preUpdate(t,dt) {
        this.move();
        this.animations()
      }

      move(){
          /*if(this.timePassed && !this.onAir && !this.body.onFloor()){
            this.onAir = true;
        }
        if(this.timePassed &&this.onAir && this.body.onFloor()){
            console.log("Toco suelo");
            this.body.setAllowGravity(false);
            this.groundCollision.active = false;
        }
        if(this.scene.player.x > this.x + 400  && this.scene.player.x < this.x + 1000 && this.scene.player.y > this.y && this.scene.player.y < this.y + 1500){
            this.body.setVelocityX(500);
            this.sprite.play('run_sprout',true);
        }*/
        if(this.scene.player.x > this.x  && !this.hasFalled && this.scene.player.x < this.x + 1000 && this.scene.player.y > this.y && this.scene.player.y < this.y + 1500){
            this.body.setAllowGravity(true);
        }
        if(this.body.onFloor() && !this.hasFalled && this.canAnimate){
            this.hasFalled = true;
            this.body.setVelocityX(this.speed);
            this.body.setAllowGravity(false);
            this.groundCollision.active = false;
        }
      }

      animations(){
        if(this.canAnimate)
            this.sprite.play('run_sprout',true);
        else
            this.sprite.play('idle_sprout',true);
      }

}
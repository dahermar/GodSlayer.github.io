

export default class SproutBoss extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x + 200, y-250);

        this.scene.add.existing(this);
        this.sprite = this.scene.add.sprite(0, 0);
        this.sprite.setScale(9);
        this.add(this.sprite);
        this.hasFalled = false;
        this.canAnimate = true;
        this.hasFinished = false;
        this.hasDied = false;
        this.stopAnimation = false;
        this.speed = 450;
        this.setSize(430,550);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.groundCollision = this.scene.physics.add.collider(this.scene.groundLayer, this);
        this.scene.physics.add.overlap(this.scene.player, this, (player, tree) => {
            player.getDamage(100);
            this.canAnimate = false;
            this.body.setVelocityX(0);
            this.scene.cameras.main.stopFollow();
            this.scene.cameras.main.startFollow(this.scene.player, false, 1, 1, 0, 75);

        });
        this.scene.physics.add.overlap(this, this.scene.sproutFinish, () => {
            if(!this.hasFinished){
                this.hasFinished = true;
                this.scene.sound_forest.setRate(1);
                this.body.setAllowGravity(true);
                this.scene.player.enableKeys(false);
                this.body.setVelocityX(this.body.velocity.x / 5);
                
                this.scene.isBossAlive[0] = false;
                this.scene.time.delayedCall(4000, () => {
                    this.scene.cameras.main.stopFollow();
                    this.scene.cameras.main.startFollow(this.scene.player, false, 1, 1, 0, 75);
                    this.scene.player.enableKeys(true);
                    this.destroy();
                }, [], this);
                
            }
        });

        this.scene.physics.add.overlap(this, this.scene.sproutDeath, () => {
            if(!this.hasDied){
                this.hasDied = true;
                this.body.setAllowGravity(false);
                this.body.setVelocityX(0);
                this.body.setVelocityY(0);                
            }
        });

      } 

      preUpdate(t,dt) {
        this.move();
        this.animations()
      }

      move(){
          
        if(this.scene.player.x > this.x  && !this.hasFalled && this.scene.player.x < this.x + 1000 && this.scene.player.y > this.y && this.scene.player.y < this.y + 1500){
            this.body.setAllowGravity(true);
            this.scene.sound_forest.setRate(1.3);
            
        }
        if(this.body.onFloor() && !this.hasFalled && this.canAnimate){
            this.hasFalled = true;
            this.body.setVelocityX(this.speed);
            this.body.setAllowGravity(false);
            this.groundCollision.active = false;
            this.scene.cameras.main.stopFollow();
            this.scene.cameras.main.startFollow(this, false, 1, 1, -420, -90);

        }
      }

      animations(){
        if(this.hasDied){
            if(!this.stopAnimation){
                this.sprite.play('dead_sprout',true);
                this.stopAnimation = true;
            }
        }     
        else if(this.canAnimate)
            this.sprite.play('run_sprout',true);
        else
            this.sprite.play('idle_sprout',true);
      }

}
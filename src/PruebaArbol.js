

export default class PruebaArbol extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y-250);

        this.scene.add.existing(this);
        this.sprite = this.scene.add.sprite(150, 250);
        //this.scene.physics.add.existing(this);
        this.timePassed = false;
        this.onAir = false;
        this.speed = 100;
        this.setSize(300,500);
        this.scene.physics.add.existing(this);
        //this.body.setAllowGravity(false);
        this.groundCollision = this.scene.physics.add.collider(this.scene.groundLayer, this);
        this.playerCollision = this.scene.physics.add.collider(this.scene.player, this, (player, tree) => {player.getDamage(100);this.playerCollision.active = false});
        this.scene.time.delayedCall(200, () => {this.timePassed = true;}, [], this);
      } 

      preUpdate(t,dt) {
          console.log(this.onAir);
        if(this.timePassed && !this.onAir && !this.body.onFloor()){
            this.onAir = true;
        }
        if(this.timePassed &&this.onAir && this.body.onFloor()){
            console.log("Toco suelo");
            this.body.setAllowGravity(false);
            this.groundCollision.active = false;
        }
        if(this.scene.player.x > this.x + 600  && this.scene.player.x < this.x + 1000 && this.scene.player.y > this.y && this.scene.player.y < this.y + 1000){
            this.body.setVelocityX(300);
            this.sprite.play('run_sprout',true);
        }
            
        
      }

}
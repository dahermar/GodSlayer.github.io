

export default class CheckPoint extends Phaser.GameObjects.Container { 

    constructor(scene, x, y) {
        super(scene, x, y + 80);
        this.setSize(300, 160);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.sprite = this.scene.add.sprite(0,0);
        this.sprite.setScale(2);
        this.add(this.sprite);
        this.playAnim = false;
   
    }

    preUpdate(t,dt) {
        if(this.playAnim){
            this.sprite.play('fireBall_anim',true);
        }
        
    }

    playAnimation(){
        this.playAnim = true;
    }

}
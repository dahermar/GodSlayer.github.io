

export default class CheckPoint extends Phaser.GameObjects.Container { 

    constructor(scene, x, y) {
        super(scene, x, y + 80);
        this.setSize(300, 160);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.sprite = this.scene.add.sprite(0, -100);
        this.sprite.setScale(2);
        this.add(this.sprite);
        this.playAnim = false;
        this.onCoolDown = false;
        this.scene.add.existing(this);
    }

    preUpdate(t,dt) {
        
        
        
    }

    playAnimation(){
        if(!this.onCoolDown){
            this.onCoolDown = true;
            this.sprite.setVisible(true);
            this.sprite.play('checkPoint_anim',true).on('animationcomplete-checkPoint_anim', () => {this.sprite.setVisible(false);});
            this.scene.time.delayedCall(2000, () => {this.onCoolDown = false;}, [], this);
        }
        
    }

}
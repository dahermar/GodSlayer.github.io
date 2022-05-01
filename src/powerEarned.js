export default class PowerEarned extends Phaser.GameObjects.Container { 

    constructor(scene, x, y, powerString) {
        super(scene, x + 38, y - 85);
        this.power = powerString;
        this.setSize(300, 160);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.playAnim = false;
        this.onCoolDown = false;
        this.text_box = this.scene.add.image(x+50, y-270, 'text_box');
        this.text_box.setScale(0.5);

        this.text = this.scene.add.text(x-38, y-252, "La Madre te otorga el poder del viento por derrotar al Gran Árbol");

        this.text_box.setVisible(false);
        this.text.setVisible(false);
        this.scene.add.existing(this);
        
    }

    preUpdate(t,dt) {
        
        
    }

    interact(){
        if(this.power === "dash"){
            this.scene.player.dashEnabled = true;
            this.text_box.setVisible(true);
            this.text.setVisible(true);

            this.scene.time.delayedCall(5000, () => {
                this.text_box.setVisible(false);
                this.text.setVisible(false);
            }, [], this);

        }
            
    }

}
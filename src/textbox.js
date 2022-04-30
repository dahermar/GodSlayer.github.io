


export default class TextBox extends Phaser.GameObjects.Container { 

    constructor(scene, x, y, text) {
        super(scene, x- 150, y -150 );

        this.text_box = this.scene.add.image(x+50, y-70, 'text_box');
        this.text_box.setScale(0.5);

        this.text = this.scene.add.text(x-38, y-52, text);

        this.text_box.setVisible(false);
        this.text.setVisible(false);
        this.scene.physics.add.existing(this);
        this.body.setSize(400, 200);
        this.body.setAllowGravity(false);

        this.scene.physics.add.overlap(this, this.scene.player,(text, pl) => {

            this.text_box.setVisible(true);
            this.text.setVisible(true);   

            this.scene.time.delayedCall(3000, () => { 
                this.text_box.setVisible(false);
                this.text.setVisible(false);  

            }, [], this);
            
        });

    }

    preUpdate(t,dt) {
    }

}



export default class TextBox extends Phaser.GameObjects.Container { 

    constructor(scene, x, y, text) {
        super(scene, x- 250, y -150 );

        this.text_box = this.scene.add.image(x+50, y-70, 'text_box');
        this.text_box.setScale(0.5);

        this.text = this.scene.add.text(x-38, y-52, text,{fontFamily: 'GeneralFont '});

        this.text_box.setVisible(false);
        this.text.setVisible(false);
        this.scene.physics.add.existing(this);
        this.body.setSize(600, 400);
        this.body.setAllowGravity(false);
        this.setVisible = false;
        this.scene.add.existing(this);
    }


    preUpdate(t,dt) {
        if(this.scene.physics.overlap(this, this.scene.player)){
            this.text_box.setVisible(true);
            this.text.setVisible(true);
        }
        else{
            this.text_box.setVisible(false);
            this.text.setVisible(false);
        }  
        this.text.setFontFamily("CommonFont")
    } 
}




export default class TextBox extends Phaser.GameObjects.Container { 

    constructor(scene, x, y, text) {
        super(scene, x- 250, y -150 );

        

        this.text_box = this.scene.add.image(x+58, y-70, 'text_box');
        this.text_box.setScale(0.44);

        this.map = this.countRepeatedWords(text);

        this.text = this.scene.add.text(x-32, y-56, text,{fontFamily:'GeneralFont '});

        if(this.map["\n"] > 0){
            this.text.setY(y- (52 +(this.map["\n"]*(10))));
            this.text_box.setScale(0.54);
            this.text.setX(x-54);
        }
        

        this.text_box.setVisible(false);
        this.text.setVisible(false);
        this.scene.physics.add.existing(this);
        this.body.setSize(600, 400);
        this.body.setAllowGravity(false);
        this.setVisible = false;
        this.scene.add.existing(this);
    }

    countRepeatedWords(sentence) {
        let words = sentence.split(" ");
        let wordMap = {};
      
        for (let i = 0; i < words.length; i++) {
          let currentWordCount = wordMap[words[i]];
          let count = currentWordCount ? currentWordCount : 0;
          wordMap[words[i]] = count + 1;
        }
        return wordMap;
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
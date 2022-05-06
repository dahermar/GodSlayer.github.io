export default class PowerEarned extends Phaser.GameObjects.Container { 

    constructor(scene, x, y, powerString, text) {
        super(scene, x + 38, y - 85);
        this.power = powerString;
        this.setSize(300, 160);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.playAnim = false;
        this.onCoolDown = false;
        this.text_box = this.scene.add.image(x+50, y-270, 'text_box');
        this.text_box.setScale(0.5);

        this.text = this.scene.add.text(x-60, y-252, text, {fontFamily: 'GeneralFont '});

        this.map = this.countRepeatedWords(text);

        if(this.map["\n"] > 0){
            this.text.setY(y- (252 +(this.map["\n"]*(10))));
            this.text_box.setScale(0.54);
            //this.text.setX(x-47);
        }

        this.text_box.setVisible(false);
        this.text.setVisible(false);
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
        else if(this.power === "doble"){
            this.scene.player.maxJumps =2;
            this.text_box.setVisible(true);
            this.text.setVisible(true);

            this.scene.time.delayedCall(5000, () => {
                this.text_box.setVisible(false);
                this.text.setVisible(false);
            }, [], this);

        }
            
    }

}
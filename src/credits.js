/**
 * @extends Phaser.Scene
 */
 export default class Credits extends Phaser.Scene {


    constructor() {
        super({ key: 'credits' });
    }

    create() {
        const config = {
            mute: false,
            volume: 0.15,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
          }; 
         let aux_back = this.add.image(0,0, 'black_screen');
          aux_back.setScale(2,2);
        this.sound_credits = this.sound.add("credits_scene", config);

          this.creds = [];
          let txt = this.add.text(370, 400, 
            "                    Hecho por: \n\n                      Daniel\n\n                      Juan\n\n                      Pablo\n\n                      Julian", { align: 'center' });
        this.creds.push(this.add.image(640, 400, 'mainmenu'));
        this.creds.push(txt);

        this.Enter = this.input.keyboard.addKey('ENTER');
        this.sound_credits.play();
        this.time.delayedCall(5000, () => {
           this.startGame();
          }
          ,
        [], this);
        this.tweens.add({
            targets: this.creds,
            y: -800,
            ease: 'Power1',
            duration: 7000,
            delay: 1500,
          });
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.Enter)){
            this.startGame();
        }
    }

    startGame(){
        this.sound_credits.stop();
        
        this.scene.resume('level');
        var level_scene = this.scene.get('level');
            level_scene.sound_castle.play();

        this.scene.stop()
    }

}
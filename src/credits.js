/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
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
          }; // config es opcional
          
        this.sound_credits = this.sound.add("credits_scene", config);

          this.creds = [];
          //this.add.image(0,0, 'blackScreen')
          let txt = this.add.text(370, 400, 
            "                    Hecho por: \n\n                      Daniel\n\n                      Juan\n\n                      Pablo\n\n                      Julian", { align: 'center' });
        //this.generalTextShow.depth = 1;
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
        this.scene.stop()
    }

}
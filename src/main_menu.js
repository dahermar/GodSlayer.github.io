/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
 export default class Main_menu extends Phaser.Scene {


    constructor() {
        super({ key: 'main_menu' });

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
          this.sound_main_menu = this.sound.add("init_scene", config);

        this.add.image(640,300, 'mainmenu');
        this.startButton = this.add.text(450,580,'---Press Start---').setInteractive();
        this.startButton.setFontSize(40);
        this.startButton.on('pointerup', function () {
            this.scene.start('level');
            this.scene.remove();
            this.sound_main_menu.stop();

        }, this);
        this.sound_main_menu.play();

    }

    update(){
    }

}
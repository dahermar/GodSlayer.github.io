/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
 export default class Lore extends Phaser.Scene {


    constructor() {
        super({ key: 'lore' });
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
          
        this.sound_main_menu = this.sound.add("violin", config);

        this.Enter = this.input.keyboard.addKey('ENTER');

        this.startButton = this.add.text(0,0,' Tras años de terror bajo la tiranía del dios Haldohr, su implacable ejercito \n alcanza las tierras del norte.\n\n Destruyendo todo a su paso, las tropas arrasan con una oculta aldea en el \n bosque.\n\n Entre los restos se vislumbra un figura. La diosa Axelia observa a la joven junto a los cuerpos inertes de sus \n padres.\n\n Conmovida por su dolor, le ofrece su guía en la misión de\n devolver la paz a su reino',{fontFamily: 'GeneralFont '}).setFontSize(40);
        
        this.text = this.add.text(800, 600, 'Pulsa Enter',{fontFamily: 'GeneralFont '});

        this.text.setFontSize(50);
        
        this.sound_main_menu.play();
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.Enter)){
            this.startGame();
        }
    }

    startGame(){
        this.scene.start('level');
        this.sound_main_menu.stop();
    }

}
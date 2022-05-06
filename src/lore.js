/**
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
          };
          
        this.sound_main_menu = this.sound.add("violin", config);
        this.Enter = this.input.keyboard.addKey('ENTER');
        this.startButton = this.add.text(0,80,'          Tras años de terror bajo la tiranía del dios Haldohr, su implacable \n          ejercito alcanza las tierras del norte.\n\n          Destruyendo todo a su paso, las tropas arrasan con una oculta \n          aldea en el bosque.\n\n          Entre los restos se vislumbra un figura. La diosa Axelia observa \n          a la joven junto a los cuerpos inertes de sus padres.\n\n          Conmovida por su dolor, le ofrece su guía en la misión de devolver\n          la paz a su reino.',{fontFamily: 'GeneralFont '}).setFontSize(40);        
        this.text = this.add.text(950, 625, 'Pulsa Enter',{fontFamily: 'GeneralFont '}).setFontSize(50);
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
/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class menu extends Phaser.Scene {


    constructor() {
        super({ key: 'menu' });
    }

    create() {

        
        this.menuCollectiblesPanel = this.add.image(640,380,'menu_collectibles_panel');
        this.menuPanel = this.add.image(640,380,'menu_panel');
        this.simbadCollectible = this.add.image(500,500,'simbadCollectible');
        this.collectible_clicked = false;

        this.menuCollectiblesPanel.setVisible(false);
        this.simbadCollectible.setVisible(false);
        this.menuPanel.setVisible(true);

        // this.add.image(640,380,'menu_panel');
        this.button_x = 540;
        this.button_offset = 60;

        this.continueButton = this.add.text(this.button_x, 200,"Continue",{fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setInteractive();
        this.VolumeButton = this.add.text(this.button_x, this.continueButton.y + this.button_offset,"Volume",{fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setInteractive();
        this.collectible = this.add.text(this.button_x, this.VolumeButton.y + this.button_offset,"Collectible",{fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setInteractive();
        this.restart = this.add.text(this.button_x, this.collectible.y + this.button_offset,"Restart",{fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setInteractive();
        this.exitButton = this.add.text(this.button_x, this.restart.y + this.button_offset,"Exit",{fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setInteractive();

        this.continueButton.setFontSize(40);
        this.VolumeButton.setFontSize(40);
        this.collectible.setFontSize(40);
        this.restart.setFontSize(40);
        this.exitButton.setFontSize(40); 

        this.continueButton.on('pointerup', function () {
            this.scene.resume('level');
            this.scene.stop();
        }, this);

        this.collectible.on('pointerup', function () {
            this.menuPanel.setVisible(false);
            this.menuCollectiblesPanel.setVisible(true);
            this.menuCollectiblesPanel.depth = 2;

            this.continueButton.setVisible(false);
            this.VolumeButton.setVisible(false);
            this.collectible.setVisible(false);
            this.restart.setVisible(false);
            this.exitButton.setVisible(false);


            this.simbadCollectible.setVisible(true);
            this.simbadCollectible.setScale(0.13);
            this.simbadCollectible.depth =2 ;
            this.simbadCollectible.x = 450
            this.simbadCollectible.y = 380
            this.simbadCollectible.setInteractive().on('pointerup', function () { 
                if(this.collectible_clicked){
                    this.simbadCollectible.setScale(0.13);
                    this.simbadCollectible.x = 450
                    this.menuCollectiblesPanel.setScale(1);
                }
                else{
                    this.simbadCollectible.setScale(0.5);
                    this.simbadCollectible.x= 500;
                    this.menuCollectiblesPanel.setScale(1.6);
                    this.backarrowButton = this.add.image(640,380,'cross');
                    this.backarrowButton.depth = 2;

                }
                this.collectible_clicked=!this.collectible_clicked;

            },this);
            

            
        }, this);

        
    }

    update(){
    }

}
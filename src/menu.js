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

    init(data){
        this.collectible_list= data.collectible_list;
    }

    create() {

        
        this.menuCollectiblesPanel = this.add.image(640,380,'menu_collectibles_panel');
        this.menuPanel = this.add.image(640,380,'menu_panel');
        this.backarrowButton = this.add.image(370,330,'back_arrow').setInteractive();

        this.backarrowButton.setScale(3);
        this.backarrowButton.depth = 3;
       
        this.menuCollectiblesPanel.setScale(1.6);
        this.menuCollectiblesPanel.depth = 2;

        this.menuCollectiblesPanel.setVisible(false);
        this.menuPanel.setVisible(true);
        this.backarrowButton.setVisible(false);

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

        

        this.backarrowButton.on('pointerup', function () {
            this.menuPanel.setVisible(true);
            this.menuCollectiblesPanel.setVisible(false);
            this.continueButton.setVisible(true);
            this.VolumeButton.setVisible(true);
            this.collectible.setVisible(true);
            this.restart.setVisible(true);
            this.exitButton.setVisible(true);
            this.backarrowButton.setVisible(false);

        }, this);



        this.collectible.on('pointerup', function () {
            this.menuPanel.setVisible(false);
            this.menuCollectiblesPanel.setVisible(true);
            

            this.continueButton.setVisible(false);
            this.VolumeButton.setVisible(false);
            this.collectible.setVisible(false);
            this.restart.setVisible(false);
            this.exitButton.setVisible(false);

            this.collectible_list.forEach((collectible) => {
                let button;

                if(collectible.owned){
                    button = this.add.image(500,500,collectible.name);
                    button.setScale(0.13);
                    
                }
                else{
                    button = this.add.image(500,500,'Question_Mark');
                    this.add.existing(collectible);
                    //button.setScale(1);
                }
                collectible.depth=2;

                /*
                button.depth =2 ;
                button.x = 450
                button.y = 380
                */

                button.setInteractive().on('pointerup', function () { 
                    
                        if(collectible.owned){
                            button.setScale(0.5);
                        }
                        else{
                            button.setScale(2.3);
                        }

                        button.x= 500;
                        this.backarrowButton.setVisible(true);
                        
                },this);

            });


            

            
        }, this);

        
    }

    update(){
    }

}
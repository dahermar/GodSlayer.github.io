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

        const config = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
          }; // config es opcional
          this.sound_menu = this.sound.add("pause", config);


        
        this.menuCollectiblesPanel = this.add.image(640, 430,'menu_collectibles_panel');
        this.menuPanel = this.add.image(640,380,'menu_panel');
        this.menuPanel.setScale(1.3);

        this.backarrowButton = this.add.image(550,200,'back_arrow').setInteractive();
        this.cross = this.add.image(535, 165, 'cross').setInteractive();
        this.image_clicked = false;
        this.cross_clicked = false;
        

        this.backarrowButton.setScale(1.5);
        this.backarrowButton.depth = 3;
        this.cross.depth = 3;
        this.cross.setScale(1);
       
        this.menuCollectiblesPanel.setScale(1.2);
        this.menuCollectiblesPanel.depth = 2;

        this.menuCollectiblesPanel.setVisible(false);
        this.menuPanel.setVisible(true);
        this.backarrowButton.setVisible(false);
        this.cross.setVisible(false);

        this.button_x = 540;
        this.button_y= 260;
        this.button_offset = 60;
        this.image_offset = 120;
        this.first_image_x = 580;
        this.first_image_y = 210;
        const img_list = [];
        

        this.continueButton = this.add.text(this.button_x+25, this.button_y,"Continuar",{fontFamily: 'GeneralFont '}).setInteractive();
        this.VolumeButton = this.add.text(this.button_x+13, this.continueButton.y + this.button_offset,"Volumen On",{fontFamily: 'GeneralFont '}).setInteractive();
        this.collectible = this.add.text(this.button_x-10, this.VolumeButton.y + this.button_offset,"Coleccionables",{fontFamily: 'GeneralFont '}).setInteractive();
        this.restart = this.add.text(this.button_x+10, this.collectible.y + this.button_offset,"Reaparecer",{fontFamily: 'GeneralFont '}).setInteractive();
        this.exitButton = this.add.text(this.button_x+65, this.restart.y + this.button_offset,"Salir",{fontFamily: 'GeneralFont '}).setInteractive();

        this.continueButton.setFontSize(40);
        this.VolumeButton.setFontSize(40);
        this.collectible.setFontSize(40);
        this.restart.setFontSize(40);
        this.exitButton.setFontSize(40); 

        this.continueButton.on('pointerup', function () {
            this.scene.resume('level');
            this.scene.stop();
        }, this);

        this.restart.on('pointerup', function () {
            this.scene.resume('level');
            var level_scene = this.scene.get('level');
            level_scene.player.getDamage(100);
            this.scene.stop();

        }, this);

        this.collectible.on('pointerup', function () {
            this.menuPanel.setVisible(false);
            this.menuCollectiblesPanel.setVisible(true);
            


            this.continueButton.setVisible(false);
            this.VolumeButton.setVisible(false);
            this.collectible.setVisible(false);
            this.restart.setVisible(false);
            this.exitButton.setVisible(false);

            this.collectible_list.forEach((collectible, index) => {

                if(!this.cross_clicked){
                
                    if(collectible.owned){
                        img_list.push(this.add.image(500,500,collectible.name));
                        
                    }
                    else{
                        img_list.push(this.add.image(500,500,'Question_Mark'));
                    }
                    img_list[index].setScale(1);
                    img_list[index].depth=3;
                    this.cross.setVisible(true);

                    
                    img_list[index].x = (index % 2) * this.image_offset + this.first_image_x;
                    img_list[index].y = Math.floor(index / 2) * this.image_offset + this.first_image_y;


                    img_list[index].setInteractive().on('pointerup', function () { 

                        if(!this.image_clicked){

                            img_list.forEach((collectible_img) => {
                                collectible_img.setVisible(false);
                            });
                            
                            if(collectible.owned){
                                this.current_text = this.add.text(500, 500, collectible.desc, {fontFamily: 'GeneralFont '});
                            }
                            else{
                                this.current_text = this.add.text(500, 500, "Coleccionable no encontrado", {fontFamily: 'GeneralFont '});
                            }
                            img_list[index].setScale(2.3);
                            this.current_text.depth = 3 ;
                            img_list[index].x= 640;
                            img_list[index].y= 300;
                            img_list[index].setVisible(true);
                            this.cross.setVisible(false);
                            this.image_clicked=!this.image_clicked;

                            this.backarrowButton.setVisible(true);

                        }
                
                        
                    },this);
                }
                else{
                    this.cross.setVisible(true);
                    img_list[index].setVisible(true);
                }
            });
        }, this);
        

        this.VolumeButton.on('pointerup', function () {
            
            this.sound.mute = !this.sound.mute;
            if(this.sound.mute)
                this.VolumeButton.text = "Volumen On";
            else
                this.VolumeButton.text = "Volumen Off";
        }, this);


        this.exitButton.on('pointerup', function () {
            
            var level_scene = this.scene.get('level');
            level_scene.sound_castle.stop();
            level_scene.sound_forest.stop();
            level_scene.sound_finalBoss.stop();

            this.scene.stop('level');
            this.scene.start('main_menu');

        }, this);




        this.cross.on('pointerup', function () {
            this.menuPanel.setVisible(true);
            this.menuCollectiblesPanel.setVisible(false);

            this.continueButton.setVisible(true);
            this.VolumeButton.setVisible(true);
            this.collectible.setVisible(true);
            this.restart.setVisible(true);
            this.exitButton.setVisible(true);

            this.backarrowButton.setVisible(false);
            this.cross.setVisible(false);

            img_list.forEach((collectible_img) => {
                collectible_img.setVisible(false);
            });
            this.cross_clicked= true;

        }, this);

        

        this.backarrowButton.on('pointerup', function () {
            
            img_list.forEach((collectible_img, index) => {
                collectible_img.setVisible(true);
                
                
                    collectible_img.setScale(1);
                collectible_img.x = (index % 2) * this.image_offset + this.first_image_x;
                collectible_img.y = Math.floor(index / 2) * this.image_offset + this.first_image_y;
            });
            this.current_text.visible = false;
            this.cross.setVisible(true);
            this.image_clicked = false;
            this.backarrowButton.visible = false;

        }, this);

        this.sound_menu.play();

    }

    update(){
    }

}
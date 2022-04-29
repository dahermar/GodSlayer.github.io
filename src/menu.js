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
        this.cross = this.add.image(1000, 200, 'cross').setInteractive();
        this.image_clicked = false;
        this.cross_clicked = false;
        

        this.backarrowButton.setScale(3);
        this.backarrowButton.depth = 3;
        this.cross.depth = 3;
       
        this.menuCollectiblesPanel.setScale(1.6);
        this.menuCollectiblesPanel.depth = 2;

        this.menuCollectiblesPanel.setVisible(false);
        this.menuPanel.setVisible(true);
        this.backarrowButton.setVisible(false);
        this.cross.setVisible(false);

        this.button_x = 540;
        this.button_offset = 60;
        this.image_offset = 60;
        this.first_image_x = 450;
        this.first_image_y = 380;
        const img_list = [];
        

        this.continueButton = this.add.text(this.button_x, 200,"Continue",{fontFamily: 'Definety '}).setInteractive();
        this.VolumeButton = this.add.text(this.button_x, this.continueButton.y + this.button_offset,"Volume",{fontFamily: 'Andale Mono'}).setInteractive();
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
            


            this.continueButton.setVisible(false);
            this.VolumeButton.setVisible(false);
            this.collectible.setVisible(false);
            this.restart.setVisible(false);
            this.exitButton.setVisible(false);

            this.collectible_list.forEach((collectible, index) => {

                if(!this.cross_clicked){
                
                    if(collectible.owned){
                        img_list.push(this.add.image(500,500,collectible.name));
                        img_list[img_list.length-1].setScale(0.13);
                        
                    }
                    else{
                        img_list.push(this.add.image(500,500,'Question_Mark'));
                        img_list[img_list.length-1].setScale(1);
                    }

                    img_list[img_list.length-1].depth=3;
                    this.cross.setVisible(true);

                    
                    img_list[img_list.length-1].x = (index % 5) * this.image_offset + this.first_image_x;
                    img_list[img_list.length-1].y = (index % 5) * this.image_offset + this.first_image_y;

                    img_list[img_list.length-1].setInteractive().on('pointerup', function () { 

                        if(!this.image_clicked){

                            img_list.forEach((collectible_img) => {
                                collectible_img.setVisible(false);
                            });
                            
                            if(collectible.owned){
                                img_list[img_list.length-1].setScale(0.3);
                                this.current_text = this.add.text(640, 300, collectible.desc, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
                            }
                            else{
                                img_list[img_list.length-1].setScale(2.3);
                                this.current_text = this.add.text(640, 300, "No has encontrado este coleccionable todavía", {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
                            }
                            this.current_text.depth = 3 ;
                            img_list[img_list.length-1].x= 500;
                            img_list[img_list.length-1].setVisible(true);
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
                console.log(img_list);
                console.log(this.collectible_list);
                if(this.collectible_list[index].owned){
                    collectible_img.setScale(0.2);
                }
                else{
                    collectible_img.setScale(1);
                }
                collectible_img.x = (index % 5) * this.image_offset + this.first_image_x;
                collectible_img.y = (index % 5) * this.image_offset + this.first_image_y;
            });
            this.current_text.visible = false;
            this.cross.setVisible(true);
            this.image_clicked = false;
            this.backarrowButton.visible = false;

        }, this);
    }

    update(){
    }

}
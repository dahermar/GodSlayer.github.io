/**
 * Clase que representa a un enemigo basico del juego.
 */
 export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'enemy');
      this.lives = 3;
      this.flipX = true;
      this.lives = 3;
      this.setScale(0.2);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      //this.y -= this.height;
      this.scene.physics.add.existing(this);
      // Queremos que el jugador no se salga de los límites del mundo
      this.body.setCollideWorldBounds();
      //this.body.setImmovable(true);
      this.speed = 300;
      this.jumpSpeed = -400;
      this.numJumps = 0;
      

      this.cursors = this.scene.input.keyboard.createCursorKeys();
      this.space = this.scene.input.keyboard.addKey('SPACE');
      this.hpText = this.scene.add.text(this.x, this.y - 140, `HP: ${this.lives}`).setOrigin(0.5);
      this.updateUI();

    }
  

    updateUI() {
      this.hpText.text = 'Lives: ' + this.lives + '\n';
    }

    getDamage() {
      --this.lives;
      this.updateUI();
    }
    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t,dt) {

      super.preUpdate(t,dt);
      
      this.scene.physics.add.collider(this, this.scene.player,(enemy, player) => {
        player.getDamage();
        
      });

      // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
      // no se podrá ejecutar la animación del sprite. 
    if(this.body.onFloor()){
      this.numJumps = 0;
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) { 
      if(this.body.onFloor()){
        this.numJumps = 0;
        this.body.setVelocityY(this.jumpSpeed);
      }
      else if(this.numJumps <= 0){
        this.body.setVelocityY(this.jumpSpeed);
        this.numJumps += 1;
      }
    }
    if (this.cursors.left.isDown) {
      if(Phaser.Input.Keyboard.JustDown(this.space)){
        this.x -= 200;
      }
      else{
        this.body.setVelocityX(-this.speed);
      }
    }
    else if (this.cursors.right.isDown) {
      if(Phaser.Input.Keyboard.JustDown(this.space)){
        this.x += 200;
      }
      else{
        this.body.setVelocityX(this.speed);
      }
    }
    else {
      this.body.setVelocityX(0);
    }
    }
  }
  

 export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'enemy');
      this.flipX = true;
      this.setScale(0.2);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      //this.y -= this.height;
      this.scene.physics.add.existing(this);
      // Queremos que el jugador no se salga de los límites del mundo
      this.body.setCollideWorldBounds();
      this.speed = 300;
      this.jumpSpeed = -400;
      this.numJumps = 0;
      

      this.cursors = this.scene.input.keyboard.createCursorKeys();
      this.shift = this.scene.input.keyboard.addKey('SHIFT');

      this.scene.physics.add.collider(this, this.scene.player,(enemy, player) => {
        player.getDamage();
        
      });
    }
  
    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t,dt) {
      // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
      // no se podrá ejecutar la animación del sprite. 
      super.preUpdate(t,dt);
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
      if(Phaser.Input.Keyboard.JustDown(this.shift)){
        this.x -= 200;
      }
      else{
        this.body.setVelocityX(-this.speed);
      }
    }
    else if (this.cursors.right.isDown) {
      if(Phaser.Input.Keyboard.JustDown(this.shift)){
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
  
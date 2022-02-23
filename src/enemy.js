
 export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, base, x, y) {
      super(scene, x, y, 'enemigo');
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
      this.y -= this.height;
      this.base = base;
    }
  
    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate() {
      // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
      // no se podrá ejecutar la animación del sprite. 
      super.preUpdate();
      if (this.scene.physics.overlap(this.scene.player, this)) {
          // Delegamos en la escena para decidir qué hacer al 
          // haber cogido una estrella
          this.scene.F(this.base);
          this.destroy();
      }
    }
  }
  
/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.tilemapTiledJSON('tilemap', 'assets/map/map3.json')
    this.load.setPath('assets/sprites/');
    this.load.image('atlas', 'PlatformerSet1/main_lev_build_doble.png');
    this.load.image('atlas2', 'PlatformerSet1/other_and_decorative_doble.png');
    this.load.image('platform', 'plataforma.png');
    this.load.image('background', 'background720.jpg');
    this.load.image('enemy', 'skeleton.png');
    this.load.image('knife','knife.png');
    this.load.image('potion','potion.png');
    this.load.image('fullscreen', 'fullscreen_white.png');
    this.load.image('muerte', 'muerte.png');
    this.load.image('emptybar', 'emptybar.png');
    this.load.image('bar', 'bar.png');
    this.load.spritesheet('player', './Warrior/SpriteSheet/Warrior_Sheet-Effect.png', { frameWidth: 69, frameHeight: 44 })
    this.load.spritesheet('skeletonAttack', './Skeleton/SkeletonAttack.png', { frameWidth: 43, frameHeight: 37 })
    this.load.spritesheet('skeletonDead', './Skeleton/SkeletonDead.png', { frameWidth: 33, frameHeight: 32 })
    this.load.spritesheet('skeletonHit', './Skeleton/SkeletonHit.png', { frameWidth: 30, frameHeight: 32 })
    this.load.spritesheet('skeletonIdle', './Skeleton/SkeletonIdle.png', { frameWidth: 24, frameHeight: 32 })
    this.load.spritesheet('skeletonWalk', './Skeleton/SkeletonWalk.png', { frameWidth: 22, frameHeight: 33 })
  }
  

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  
  create() {
    this.scene.start('level');
    this.anims.create({key: 'standing_player', frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),frameRate: 6, repeat: -1 });
    this.anims.create({key: 'running_player', frames: this.anims.generateFrameNumbers('player', { start: 6, end: 13 }),frameRate: 10, repeat: -1 });
    this.anims.create({key: 'attack1_player', frames: this.anims.generateFrameNumbers('player', { start: 14, end: 25 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'death_player', frames: this.anims.generateFrameNumbers('player', { start: 26, end: 36 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'hurt_player', frames: this.anims.generateFrameNumbers('player', { start: 37, end: 40 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'jump_player', frames: this.anims.generateFrameNumbers('player', { start: 41, end: 43 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'uptofall_player', frames: this.anims.generateFrameNumbers('player', { start: 44, end: 45 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'fall_player', frames: this.anims.generateFrameNumbers('player', { start: 46, end: 48 }),frameRate: 10, repeat: -1 });
    this.anims.create({key: 'dash_player', frames: this.anims.generateFrameNumbers('player', { start: 69, end: 72 }),frameRate: 20, repeat: -1 });
    this.anims.create({key: 'attack2_player', frames: this.anims.generateFrameNumbers('player', { start: 76, end: 85 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'attack_skeleton', frames: this.anims.generateFrameNumbers('skeletonAttack', { start: 0, end: 17 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'dead_skeleton', frames: this.anims.generateFrameNumbers('skeletonDead', { start: 0, end: 14 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'hit_skeleton', frames: this.anims.generateFrameNumbers('skeletonHit', { start: 0, end: 7 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'idle_skeleton', frames: this.anims.generateFrameNumbers('skeletonIdle', { start: 0, end: 7 }),frameRate: 10, repeat: -1 });
    this.anims.create({key: 'walk_skeleton', frames: this.anims.generateFrameNumbers('skeletonWalk', { start: 0, end: 12 }),frameRate: 10, repeat: -1 });

  }
}
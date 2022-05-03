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
    // Con setPath podemos establecer el prefijo que se añadirá a todoslos  load que aparecen a continuación
    
    this.load.setPath('assets/sprites/');
    this.load.tilemapTiledJSON('tilemap', 'finalMap.json')
    this.load.image('castleMain', 'PlatformerSet1/main_lev_build_rescaled.png');
    this.load.image('castleDecorative', 'PlatformerSet1/other_and_decorative_rescaled.png');
    this.load.image('forestMain', 'Forest/SET1_Mainlev_build_rescaled.png');
    //this.load.image('forestMain_fixed', 'Forest/SET1_Mainlev_build_rescaled_fixed.png');
    this.load.image('forestSecundary', 'Forest/SET1_Main_bckgrdlev_build_rescaled.png');
    this.load.image('forestBackObjects', 'Forest/SET1_background_obj_rescaled.png');
    this.load.image('forestProps_rescaled', 'Forest_Segundo/TX_Village_Props_rescaled.png');
    this.load.image('forestProps_medium', 'Forest_Segundo/TX_Village_Props_medium.png');
    
    this.load.image('caveMain', 'Caves/caves_mainlev_build_rescaled.png');
    this.load.image('caveProps1', 'Caves/caves_props1_rescaled.png');
    this.load.image('caveProps2', 'Caves/caves_props2_rescaled.png');
    
    this.load.image('01_background', 'Background/01 background_rescaled.png');
    this.load.image('02_background', 'Background/02 background_rescaled.png');
    this.load.image('03_background_A', 'Background/03 background A_rescaled.png');
    this.load.image('04_background', 'Background/04 background_rescaled.png');
    this.load.image('05_background', 'Background/05 background_rescaled.png');

    this.load.image('forest_background_night_1', 'Background/SET1_bakcground_day1_rescaled.png');
    this.load.image('forest_background_night_2', 'Background/SET1_bakcground_day2_rescaled.png');
    this.load.image('forest_background_night_3', 'Background/SET1_bakcground_day3_rescaled.png');
    this.load.image('forest_background_night_4', 'Background/SET1_bakcground_night4_rescaled.png');

    this.load.image('enemy', 'skeleton.png');
    this.load.image('knife','knife.png');
    this.load.image('arrow','./Archer/projectile.png');
    this.load.image('potion','potion.png');
    this.load.image('fullscreen', 'fullscreen_white.png');
    this.load.image('pause', 'pause.png');
    this.load.image('cross', 'back_arrow.png');
    this.load.image('back_arrow', 'back_arrow.png');

    this.load.image('Simbad','Collectibles/Simbad.png');
    this.load.image('Question_Mark','./Collectibles/Question_Mark.png');

    this.load.image('menu_panel', './Menu/menu_panel2.png');
    this.load.image('menu_collectibles_panel', './Menu/menu_collectibles_panel2.png');
    this.load.image('text_box', './Menu/text_box.png');
    this.load.image('mainmenu', 'MainMenu.png');


    this.load.image('muerte', 'muerte.png');
    this.load.image('emptybar', 'emptybar.png');
    this.load.image('bar', 'bar.png');
    
    this.load.spritesheet('player', './Warrior/SpriteSheet/Warrior_Sheet-Effect.png', { frameWidth: 69, frameHeight: 44 });
    
    this.load.spritesheet('archer', './Archer/SpriteSheet/spritesheet.png', { frameWidth: 64, frameHeight: 64 });
    
    this.load.spritesheet('skeletonAttack', './Skeleton/SkeletonAttack.png', { frameWidth: 43, frameHeight: 37 });
    this.load.spritesheet('skeletonDead', './Skeleton/SkeletonDead.png', { frameWidth: 33, frameHeight: 32 });
    this.load.spritesheet('skeletonHit', './Skeleton/SkeletonHit.png', { frameWidth: 30, frameHeight: 32 });
    this.load.spritesheet('skeletonIdle', './Skeleton/SkeletonIdle.png', { frameWidth: 24, frameHeight: 32 });
    this.load.spritesheet('skeletonWalk', './Skeleton/SkeletonWalk.png', { frameWidth: 22, frameHeight: 33 });

    this.load.spritesheet('necromancer', './Necromancer/Necromancer_creativekind-Sheet.png', { frameWidth: 160, frameHeight: 128 });
    this.load.spritesheet('necromancer_spell', './Necromancer/Necromancer_spell.png', { frameWidth: 140, frameHeight: 93 });


    this.load.spritesheet('batAttack', './Bat/noBKG_BatAttack_strip.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('batDead', './Bat/noBKG_BatDeath_strip.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('batIdle', './Bat/noBKG_BatFlight_strip.png', { frameWidth: 64, frameHeight: 64 });

    this.load.spritesheet('wormAttack', './FireWorm/Attack.png', { frameWidth: 90, frameHeight: 90 });
    this.load.spritesheet('wormDead', './FireWorm/Death.png', { frameWidth: 90, frameHeight: 90 });
    this.load.spritesheet('wormIdle', './FireWorm/Idle.png', { frameWidth: 90, frameHeight: 90 });
    this.load.spritesheet('wormHit', './FireWorm/Get_Hit.png', { frameWidth: 90, frameHeight: 90 });
    this.load.spritesheet('wormWalk', './FireWorm/Walk.png', { frameWidth: 90, frameHeight: 90 });

    this.load.spritesheet('wolfAttack', './Wolf/WolfAttack.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('wolfDead', './Wolf/WolfDeath.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('wolfIdle', './Wolf/WolfIdle.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('wolfRun', './Wolf/WolfRun.png', { frameWidth: 64, frameHeight: 64 });

    this.load.spritesheet('fireBallAnim', './FireWorm/FireBall.png', { frameWidth: 46, frameHeight: 46 });

    this.load.image('fireball', './FireWorm/MoveSprite.png');
    this.load.image('fireballBL', './FireWorm/Attack2.png');


    this.load.image('fireball', './FireWorm/MoveSprite.png');

    this.load.spritesheet('sproutAttack', './Sprout/Attack/Sprout_attack.png', { frameWidth: 96, frameHeight: 96 });
    this.load.spritesheet('sproutDead', './Sprout/Death/Sprout_death.png', { frameWidth: 96, frameHeight: 96 });
    this.load.spritesheet('sproutHit', './Sprout/Damage/Sprout_damage.png', { frameWidth: 96, frameHeight: 96 });
    this.load.spritesheet('sproutIdle', './Sprout/Idle/Sprout_idle.png', { frameWidth: 96, frameHeight: 96 });
    this.load.spritesheet('sproutWalk', './Sprout/Move/Sprout_move.png', { frameWidth: 96, frameHeight: 96 });

    this.load.audio("attack_adventurer", "./audio/attack_adventurer.wav");
    this.load.audio("damage_adventurer", "./audio/damage_adventurer.wav");
    this.load.audio("death_adventurer", "./audio/death_adventurer.wav");
    this.load.audio("doubleJump_dash_adventurer", "./audio/doubleJump_dash_adventurer.wav");
    this.load.audio("init_scene", "./audio/pantallaInicial.wav");
    this.load.audio("pause", "./audio/pause.wav");
    this.load.audio("jump", "./audio/jump.wav");
    this.load.audio("enemy_death", "./audio/enemy_death.wav");


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
   
    this.anims.create({key: 'attack_skeleton', frames: this.anims.generateFrameNumbers('skeletonAttack', { start: 0, end: 17 }),frameRate: 15, repeat: 0 });
    this.anims.create({key: 'dead_skeleton', frames: this.anims.generateFrameNumbers('skeletonDead', { start: 0, end: 14 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'hit_skeleton', frames: this.anims.generateFrameNumbers('skeletonHit', { start: 0, end: 7 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'idle_skeleton', frames: this.anims.generateFrameNumbers('skeletonIdle', { start: 0, end: 7 }),frameRate: 10, repeat: -1 });
    this.anims.create({key: 'walk_skeleton', frames: this.anims.generateFrameNumbers('skeletonWalk', { start: 0, end: 12 }),frameRate: 10, repeat: -1 });
    
    this.anims.create({key: 'attack_archer', frames: this.anims.generateFrameNumbers('archer', { start: 24, end: 30 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'dead_archer', frames: this.anims.generateFrameNumbers('archer', { start: 8, end: 15 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'idle_archer', frames: this.anims.generateFrameNumbers('archer', { start: 40, end: 43 }),frameRate: 8, repeat: -1 });
    this.anims.create({key: 'walk_archer', frames: this.anims.generateFrameNumbers('archer', { start: 0, end: 7 }),frameRate: 10, repeat: -1 });
    this.anims.create({key: 'roll_archer', frames: this.anims.generateFrameNumbers('archer', { start: 16, end: 14 }),frameRate: 10, repeat: 0 });
    
    this.anims.create({key: 'idle_necromancer', frames: this.anims.generateFrameNumbers('necromancer', { start: 0, end: 7 }),frameRate: 8, repeat: -1 });
    this.anims.create({key: 'attack_necromancer', frames: this.anims.generateFrameNumbers('necromancer', { start: 34, end: 46 }),frameRate: 10, repeat: 0 });//
    this.anims.create({key: 'dead_necromancer', frames: this.anims.generateFrameNumbers('necromancer', { start: 102, end: 111 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'walk_necromancer', frames: this.anims.generateFrameNumbers('necromancer', { start: 17, end: 24 }),frameRate: 10, repeat: -1 });
    this.anims.create({key: 'hit_necromancer', frames: this.anims.generateFrameNumbers('necromancer', { start: 85, end: 89 }),frameRate: 10, repeat: 0 });

    this.anims.create({key: 'spawn_necromancer', frames: this.anims.generateFrameNumbers('necromancer', { start: 68, end: 84 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'attack2_necromancer', frames: this.anims.generateFrameNumbers('necromancer', { start: 51, end: 63 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'spell_necromancer', frames: this.anims.generateFrameNumbers('necromancer_spell', { start: 0, end: 15 }),frameRate: 20, repeat: 0 });


    this.anims.create({key: 'idle_bat', frames: this.anims.generateFrameNumbers('batIdle', { start: 0, end: 7 }),frameRate: 8, repeat: -1 });
    this.anims.create({key: 'attack_bat', frames: this.anims.generateFrameNumbers('batAttack', { start: 0, end: 9 }),frameRate: 20, repeat: 0 });
    this.anims.create({key: 'dead_bat_start', frames: this.anims.generateFrameNumbers('batDead', { start: 0, end: 2 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'dead_bat_fall', frames: this.anims.generateFrameNumbers('batDead', { start: 3, end: 3 }),frameRate: 1, repeat: -1 });
    this.anims.create({key: 'dead_bat_smash', frames: this.anims.generateFrameNumbers('batDead', { start: 4, end: 9 }),frameRate: 10, repeat: 0 });
  
    this.anims.create({key: 'attack_worm', frames: this.anims.generateFrameNumbers('wormAttack', { start: 0, end: 31 }),frameRate: 13, repeat: 0 });
    this.anims.create({key: 'dead_worm', frames: this.anims.generateFrameNumbers('wormDead', { start: 0, end: 7 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'hit_worm', frames: this.anims.generateFrameNumbers('wormHit', { start: 0, end: 2 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'idle_worm', frames: this.anims.generateFrameNumbers('wormIdle', { start: 0, end: 8 }),frameRate: 10, repeat: -1 });
    this.anims.create({key: 'walk_worm', frames: this.anims.generateFrameNumbers('wormWalk', { start: 0, end: 8 }),frameRate: 10, repeat: -1 });
    
    this.anims.create({key: 'fireBall_anim', frames: this.anims.generateFrameNumbers('fireBallAnim', { start: 0, end: 5 }),frameRate: 10, repeat: -1 });

    this.anims.create({key: 'attack_wolf', frames: this.anims.generateFrameNumbers('wolfAttack', { start: 0, end: 15 }),frameRate: 20, repeat: 0 });
    this.anims.create({key: 'dead_wolf', frames: this.anims.generateFrameNumbers('wolfDead', { start: 0, end: 17 }),frameRate: 10, repeat: 0 });
    this.anims.create({key: 'idle_wolf', frames: this.anims.generateFrameNumbers('wolfIdle', { start: 0, end: 11 }),frameRate: 10, repeat: -1 });
    this.anims.create({key: 'run_wolf', frames: this.anims.generateFrameNumbers('wolfRun', { start: 0, end: 7 }),frameRate: 5, repeat: -1 });

    this.anims.create({key: 'run_sprout', frames: this.anims.generateFrameNumbers('sproutWalk', { start: 0, end: 4 }),frameRate: 8, repeat: -1 });
    this.anims.create({key: 'idle_sprout', frames: this.anims.generateFrameNumbers('sproutIdle', { start: 0, end: 3 }),frameRate: 4, repeat: -1 });
    this.anims.create({key: 'dead_sprout', frames: this.anims.generateFrameNumbers('sproutDead', { start: 0, end: 7 }),frameRate: 8, repeat: 0 });
    

    this.anims.create({key: 'checkPoint_anim', frames: this.anims.generateFrameNumbers('fireBallAnim', { start: 0, end: 5 }),frameRate: 10, repeat: 0 });
  }
}
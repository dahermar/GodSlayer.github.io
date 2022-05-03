export default class NecromancerSpell extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {

        super(scene, x+40, y+20);
        this.setSize(70, 180);
        this.sprite = this.scene.add.sprite(5,-60);
        
        this.sprite.setScale(3.3);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.damage = 2;
        this.add(this.sprite);
        this.canDamage = false;
        this.scene.time.delayedCall(350, () => {this.canDamage=true;}, [], this);
        this.scene.time.delayedCall(800, () => {this.canDamage=false;}, [], this);
        this.scene.time.delayedCall(1000, () => {this.destroy();}, [], this);
        
        this.scene.physics.add.overlap(this.scene.player, this, (player, spell) => {
            if(this.canDamage){
                player.getDamage(1);
                this.canDamage=false;
            
            }
          });

    }

    preUpdate(t,dt) {
        this.sprite.play('spell_necromancer',true);//.on('animationcomplete-spell_necromancer', () => {this.destroy();});
    }

}
import Boot from './boot.js';
import End from './end.js';
import Level from './level.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    parent: 'parent',
    
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1280,
        height: 720,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    scene: [Boot, Level, End],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    }
};


new Phaser.Game(config);

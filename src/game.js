import Boot from './boot.js';
import End from './end.js';
import Level from './level.js';
import Menu from './menu.js';
import MMenu from './main_menu.js';
import Credits from './credits.js';
import Lore from './lore.js';

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
    scene: [Boot, MMenu, Lore, Level, Menu, End, Credits],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1300 },
            debug: true,
            TILE_BIAS: 32,
            fps: 120
        }
    }
};


new Phaser.Game(config);

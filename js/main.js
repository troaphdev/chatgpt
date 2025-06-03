import GameManager from './GameManager.js';

const container = document.getElementById('game-container');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const restartWinBtn = document.getElementById('restart-win-btn');

const game = new GameManager(container);
game.init();

const keys = {};

function loop() {
    game.update(keys);
    requestAnimationFrame(loop);
}

startBtn.addEventListener('click', () => game.start());
restartBtn.addEventListener('click', () => game.restart());
restartWinBtn.addEventListener('click', () => game.restart());

window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'p') {
        game.phone.toggle();
    }
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

loop();

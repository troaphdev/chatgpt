import Player from './Player.js';
import Phone from './Phone.js';
import GameState from './GameState.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const menu = document.getElementById('menu');
const gameDiv = document.getElementById('game');

const player = new Player(400, 300);
const phone = new Phone();
const state = new GameState(menu, gameDiv);
state.player = player;

let lastTime = 0;

function gameLoop(timestamp) {
    const delta = timestamp - lastTime;
    lastTime = timestamp;

    if (state.isPlaying()) {
        player.update(delta);
        state.update(delta, phone);
        draw();
    }

    requestAnimationFrame(gameLoop);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'p' || e.key === 'P') {
        phone.toggle();
    }
    state.handleInput(e.key, true);
});

window.addEventListener('keyup', (e) => {
    state.handleInput(e.key, false);
});

startBtn.addEventListener('click', () => {
    state.start();
});

requestAnimationFrame(gameLoop);

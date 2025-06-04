import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';
import { PointerLockControls } from 'https://unpkg.com/three@0.155.0/examples/jsm/controls/PointerLockControls.js?module';
import PhoneUI from './PhoneUI.js';
import Events from './Events.js';
import MazeGenerator from './MazeGenerator.js';
import NPCManager from './NPCManager.js';
import GoalObject from './GoalObject.js';

export default class GameManager {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.clock = new THREE.Clock();

        this.phone = new PhoneUI(this);
        this.events = new Events(this);

        this.maze = null;
        this.npcs = null;
        this.goal = null;

        this.screenTime = 0;
        this.maxScreenTime = 100;
        this.bar = document.getElementById('screen-fill');
        this.menu = document.getElementById('menu');
        this.gameOverScreen = document.getElementById('game-over');
        this.victoryScreen = document.getElementById('victory');
        this.state = 'menu';
    }

    /** Setup Three.js scene and basic room */
    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        this.controls = new PointerLockControls(this.camera, document.body);

        this.generateLevel();

        window.addEventListener('resize', () => this.onResize());
    }

    /** Build maze, NPCs and goal */
    generateLevel() {
        this.maze = new MazeGenerator(this.scene);
        const endPos = this.maze.generate();
        this.npcs = new NPCManager(this.scene, this.maze.cells);
        this.goal = new GoalObject(this.scene, endPos);
        this.camera.position.set(0, 1.6, 0);
    }

    /** Start the game and reset values */
    start() {
        this.state = 'playing';
        this.menu.classList.add('hidden');
        document.getElementById('screen-time').classList.remove('hidden');
        this.controls.lock();
    }

    /** Main update called every frame */
    update(keys = {}) {
        const delta = this.clock.getDelta() * 1000;
        if (this.state !== 'playing') {
            this.renderer.render(this.scene, this.camera);
            return;
        }

        this.phone.update(delta);
        this.npcs.update(this.controls.getObject().position, delta);
        this.events.check(this.screenTime);
        this.updateBar();

        if (this.screenTime >= this.maxScreenTime) {
            this.gameOver();
        }

        const speed = 0.05 * delta;
        if (keys['w'] || keys['ArrowUp']) this.controls.moveForward(speed);
        if (keys['s'] || keys['ArrowDown']) this.controls.moveForward(-speed);
        if (keys['a'] || keys['ArrowLeft']) this.controls.moveRight(-speed);
        if (keys['d'] || keys['ArrowRight']) this.controls.moveRight(speed);

        if (this.goal.reached(this.controls.getObject().position)) {
            this.win();
        }

        this.renderer.render(this.scene, this.camera);
    }

    /** Update the visual screen-time bar */
    updateBar() {
        const percent = Math.min(this.screenTime / this.maxScreenTime, 1);
        this.bar.style.width = `${percent * 100}%`;
    }

    /** Show game over overlay */
    gameOver() {
        this.state = 'over';
        this.gameOverScreen.classList.remove('hidden');
        this.controls.unlock();
    }

    /** Trigger victory overlay */
    win() {
        this.state = 'victory';
        this.victoryScreen.classList.remove('hidden');
        this.controls.unlock();
    }

    /** Restart to the menu */
    restart() {
        this.screenTime = 0;
        this.gameOverScreen.classList.add('hidden');
        this.victoryScreen.classList.add('hidden');
        document.getElementById('screen-time').classList.add('hidden');
        this.menu.classList.remove('hidden');
        this.state = 'menu';
    }

    /** Update renderer and camera on resize */
    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

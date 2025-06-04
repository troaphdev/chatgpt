export default class GameState {
    constructor(menuDiv, gameDiv) {
        this.state = 'menu';
        this.menuDiv = menuDiv;
        this.gameDiv = gameDiv;
        this.player = null; // set later
    }

    start() {
        this.state = 'playing';
        this.menuDiv.classList.add('hidden');
        this.gameDiv.classList.remove('hidden');
    }

    isPlaying() {
        return this.state === 'playing';
    }

    update(delta, phone) {
        phone.update(delta);
    }

    handleInput(key, down) {
        if (!this.player) return;
        const m = this.player.movement;
        switch (key) {
            case 'w':
            case 'W':
            case 'ArrowUp':
                m.up = down; break;
            case 's':
            case 'S':
            case 'ArrowDown':
                m.down = down; break;
            case 'a':
            case 'A':
            case 'ArrowLeft':
                m.left = down; break;
            case 'd':
            case 'D':
            case 'ArrowRight':
                m.right = down; break;
        }
    }
}

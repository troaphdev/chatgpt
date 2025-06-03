export default class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 0.2; // pixels per ms
        this.movement = { up: false, down: false, left: false, right: false };
    }

    update(delta) {
        if (this.movement.up) this.y -= this.speed * delta;
        if (this.movement.down) this.y += this.speed * delta;
        if (this.movement.left) this.x -= this.speed * delta;
        if (this.movement.right) this.x += this.speed * delta;
    }

    draw(ctx) {
        ctx.fillStyle = '#0f0';
        ctx.fillRect(this.x - 10, this.y - 10, 20, 20);
    }
}

export default class Phone {
    constructor() {
        this.opened = false;
        this.screenTime = 0; // in ms
        this.overlay = document.getElementById('phone-overlay');
        this.content = document.getElementById('phone-content');
        this.fill = document.getElementById('screen-fill');
    }

    toggle() {
        this.opened = !this.opened;
        this.overlay.classList.toggle('hidden', !this.opened);
        if (this.opened) {
            this.loadMessages();
        }
    }

    update(delta) {
        if (this.opened) {
            this.screenTime += delta * 2; // faster when phone open
        } else {
            this.screenTime += delta * 0.5; // passive accumulation
        }
        this.updateBar();
    }

    updateBar() {
        const percent = Math.min(this.screenTime / 100000, 1); // 100s to fill
        this.fill.style.width = `${percent * 100}%`;
    }

    loadMessages() {
        fetch('data/messages.json')
            .then(r => r.json())
            .then(msgs => {
                this.content.innerHTML = msgs.map(m => `<p>${m}</p>`).join('');
            });
    }
}

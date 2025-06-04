export default class PhoneUI {
    constructor(manager) {
        this.manager = manager;
        this.opened = false;
        this.overlay = document.getElementById('phone-ui');
        this.messagesEl = document.getElementById('phone-messages');
    }

    // Toggle phone overlay visibility
    toggle() {
        this.opened = !this.opened;
        this.overlay.classList.toggle('hidden', !this.opened);
        if (this.opened) {
            this.loadMessages();
        }
    }

    // Update screen time when called from the manager
    update(delta) {
        const rate = this.opened ? 0.02 : 0.005;
        this.manager.screenTime += delta * rate;
    }

    // Load dummy messages from the messages.json file
    loadMessages() {
        fetch('data/messages.json')
            .then(r => r.json())
            .then(list => {
                this.messagesEl.innerHTML = list
                    .map(m => `<p>${m}</p>`)
                    .join('');
            });
    }
}

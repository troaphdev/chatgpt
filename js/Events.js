export default class Events {
    constructor(manager) {
        this.manager = manager;
        this.triggered = {25: false, 50: false, 75: false};
        this.overlay = document.createElement('div');
        this.overlay.id = 'effect-overlay';
        document.body.appendChild(this.overlay);
    }

    // Check screen time thresholds and trigger effects
    check(percent) {
        if (percent >= 75 && !this.triggered[75]) {
            this.trigger75();
            this.triggered[75] = true;
        } else if (percent >= 50 && !this.triggered[50]) {
            this.trigger50();
            this.triggered[50] = true;
        } else if (percent >= 25 && !this.triggered[25]) {
            this.trigger25();
            this.triggered[25] = true;
        }
    }

    trigger25() {
        this.overlay.style.background = 'rgba(100,0,0,0.1)';
    }

    trigger50() {
        this.overlay.style.background = 'rgba(150,0,0,0.2)';
    }

    trigger75() {
        this.overlay.style.background = 'rgba(200,0,0,0.3)';
        // Placeholder for ghost spawn or extra effects
    }
}

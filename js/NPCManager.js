import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';

/**
 * Spawns simple NPC cubes in the maze. Parents warn the player when approached,
 * the brother ignores them.
 */
export default class NPCManager {
    constructor(scene, cells) {
        this.scene = scene;
        this.cells = cells;
        this.npcs = [];
        this.boxes = []; // bounding boxes for collision
        this.messageEl = document.getElementById('npc-message');
        this.messageTimer = 0;
        this.spawnNPCs();
    }

    /** Pick random cells and create parent/brother NPCs */
    spawnNPCs() {
        const sample = [...this.cells];
        sample.shift(); // avoid start
        const pick = () => sample.splice(Math.floor(Math.random()*sample.length),1)[0];
        this.createNPC('parent', pick());
        this.createNPC('parent', pick());
        this.createNPC('brother', pick());
    }

    createNPC(type, cell) {
        const height = type === 'brother' ? 3 : 4;
        const geom = new THREE.BoxGeometry(2, height, 2);
        const color = type === 'brother' ? 0x2266ff : 0xffaa00;
        const mesh = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ color }));
        mesh.position.set(cell.x, height / 2, cell.z);
        mesh.userData.type = type;
        this.scene.add(mesh);
        this.npcs.push(mesh);

        // bounding box for collision (NPCs don't move)
        this.boxes.push(new THREE.Box3().setFromObject(mesh));
    }

    /** Update NPC interactions */
    update(playerPos, delta) {
        if (this.messageTimer > 0) {
            this.messageTimer -= delta;
            if (this.messageTimer <= 0) {
                this.messageEl.classList.add('hidden');
            }
        }

        for (const npc of this.npcs) {
            const dist = npc.position.distanceTo(playerPos);
            if (dist < 5) {
                this.showMessage(npc.userData.type);
            }
        }
    }

    /** Return bounding boxes for collision checks */
    getCollisionBoxes() {
        return this.boxes;
    }

    showMessage(type) {
        if (this.messageTimer > 0) return;
        this.messageEl.textContent = type === 'brother'
            ? '...'
            : 'Put the phone down!';
        this.messageEl.classList.remove('hidden');
        this.messageTimer = 2000; // ms
    }
}

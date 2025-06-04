import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';

/**
 * Represents the cup of water goal. When the player gets close, they win.
 */
export default class GoalObject {
    constructor(scene, position) {
        const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(position.x, 0.5, position.z);
        scene.add(this.mesh);
    }

    /** Check distance to the player */
    reached(playerPos) {
        return playerPos.distanceTo(this.mesh.position) < 1.5;
    }
}

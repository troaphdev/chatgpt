import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';

/**
 * Generates a simple random hallway maze made of cube segments.
 * Returns the final corridor position so other objects can be placed.
 */
export default class MazeGenerator {
    constructor(scene, length = 10, cellSize = 10) {
        this.scene = scene;
        this.length = length;
        this.cellSize = cellSize;
        this.cells = []; // list of {x, z} positions
    }

    /** Build the maze and return the end position as THREE.Vector3 */
    generate() {
        const floorGeom = new THREE.BoxGeometry(this.cellSize, 1, this.cellSize);
        const wallGeomX = new THREE.BoxGeometry(1, 5, this.cellSize);
        const wallGeomZ = new THREE.BoxGeometry(this.cellSize, 5, 1);
        const floorMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
        const wallMat = new THREE.MeshBasicMaterial({ color: 0x666666 });

        let x = 0;
        let z = 0;
        let dir = Math.random() < 0.5 ? 'x' : 'z';

        for (let i = 0; i < this.length; i++) {
            const floor = new THREE.Mesh(floorGeom, floorMat);
            floor.position.set(x, -0.5, z);
            this.scene.add(floor);

            if (dir === 'x') {
                const w1 = new THREE.Mesh(wallGeomX, wallMat);
                const w2 = new THREE.Mesh(wallGeomX, wallMat);
                w1.position.set(x, 2, z - this.cellSize / 2);
                w2.position.set(x, 2, z + this.cellSize / 2);
                this.scene.add(w1, w2);
            } else {
                const w1 = new THREE.Mesh(wallGeomZ, wallMat);
                const w2 = new THREE.Mesh(wallGeomZ, wallMat);
                w1.position.set(x - this.cellSize / 2, 2, z);
                w2.position.set(x + this.cellSize / 2, 2, z);
                this.scene.add(w1, w2);
            }

            this.cells.push({ x, z });

            if (dir === 'x') {
                x += this.cellSize;
            } else {
                z += this.cellSize;
            }

            if (Math.random() > 0.7) dir = dir === 'x' ? 'z' : 'x';
        }

        return new THREE.Vector3(x, 0, z);
    }
}

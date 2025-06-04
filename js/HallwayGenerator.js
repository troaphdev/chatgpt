import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';

/**
 * Builds a connected series of hallway segments. Each segment is a box placed
 * end-to-end so the player can walk seamlessly through the maze.
 */
export default class HallwayGenerator {
    constructor(scene, segments = 15, width = 5, length = 10) {
        this.scene = scene;
        this.segments = segments;
        this.width = width;
        this.length = length;
        this.cells = []; // center positions for NPC spawning
        this.boxes = []; // bounding boxes for walls
    }

    /** Generate the hallway path and return the last position */
    generate() {
        const floorGeo = new THREE.BoxGeometry(this.width, 1, this.length);
        const wallGeo = new THREE.BoxGeometry(1, 5, this.length);
        const floorMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
        const wallMat = new THREE.MeshBasicMaterial({ color: 0x666666 });

        // starting position and direction (pointing down +Z)
        let pos = new THREE.Vector3(0, 0, 0);
        let dir = new THREE.Vector3(0, 0, 1);

        for (let i = 0; i < this.segments; i++) {
            // create floor segment
            const floor = new THREE.Mesh(floorGeo, floorMat);
            floor.position.copy(pos).addScaledVector(dir, this.length / 2);
            floor.rotation.y = Math.atan2(dir.x, dir.z);
            floor.position.y = -0.5;
            this.scene.add(floor);

            // create walls on both sides of the hallway
            const leftWall = new THREE.Mesh(wallGeo, wallMat);
            const rightWall = new THREE.Mesh(wallGeo, wallMat);
            const perp = new THREE.Vector3(-dir.z, 0, dir.x); // perpendicular vector
            leftWall.rotation.y = floor.rotation.y;
            rightWall.rotation.y = floor.rotation.y;
            leftWall.position.copy(floor.position).addScaledVector(perp, -this.width / 2);
            leftWall.position.y = 2;
            rightWall.position.copy(floor.position).addScaledVector(perp, this.width / 2);
            rightWall.position.y = 2;
            this.scene.add(leftWall, rightWall);

            // store wall bounding boxes for collisions
            this.boxes.push(new THREE.Box3().setFromObject(leftWall));
            this.boxes.push(new THREE.Box3().setFromObject(rightWall));

            // record cell center
            this.cells.push(floor.position.clone());

            // advance to next segment start
            pos.addScaledVector(dir, this.length);

            // randomly decide to turn left/right/straight for next piece
            const r = Math.random();
            if (r < 0.33) {
                dir = new THREE.Vector3(-dir.z, 0, dir.x); // left turn
            } else if (r < 0.66) {
                dir = new THREE.Vector3(dir.z, 0, -dir.x); // right turn
            }
        }

        return pos;
    }

    /** Provide all wall boxes for collision detection */
    getCollisionBoxes() {
        return this.boxes;
    }
}

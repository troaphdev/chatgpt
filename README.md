# Screen Escape

Screen Escape is a small horror-puzzle web game written in vanilla HTML, CSS and JavaScript. The current build uses [Three.js](https://threejs.org/) for a simple 3D environment and loads all assets from this repository.

The map is generated procedurally at runtime with a series of connected hallway segments. Logan must navigate the maze, avoid nagging family members, and reach a cup of water before the screen‑time bar fills up. Basic collision detection keeps the player from walking through walls or NPCs.

## Getting Started

Open `index.html` in a modern browser or serve the folder with a local HTTP server (e.g. `npx http-server`). Because the game relies on ES modules loaded from a CDN, make sure you run it from `http://` rather than `file://`.

### Module loading error

If you see a console error like `Failed to resolve module specifier "three"` it means the browser could not locate the Three.js dependency. The game loads example controls from [unpkg](https://unpkg.com/) with the `?module` flag so imports resolve correctly. Ensure the import lines in `js/GameManager.js` look like this:

```js
import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';
import { PointerLockControls } from 'https://unpkg.com/three@0.155.0/examples/jsm/controls/PointerLockControls.js?module';
```

Clearing your browser cache and reloading the page after saving these changes should fix the issue.

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In the repository settings, open **Pages**.
3. Select **Deploy from a branch** and choose the `main` branch, `/ (root)` folder.
4. Save. GitHub will build and host the site at `https://<yourname>.github.io/<repo>/`.

All game files are relative to the root path, so the game works directly on GitHub Pages without additional configuration.

## Troubleshooting

If the deployment fails:

1. Check the **Actions** tab on GitHub and open the latest `pages-build-deployment` log for details.
2. Ensure `index.html` exists in the repository root and that the **Source** in the Pages settings is set to the `main` branch and `/ (root)` folder.
3. Remove any old files named just `index` (without extension) which can confuse the build pipeline.
4. After correcting any issues, re-run the deployment from the Pages settings.

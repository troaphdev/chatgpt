# Screen Escape

Screen Escape is a small horror-puzzle web game written in vanilla HTML, CSS and JavaScript. The current build uses [Three.js](https://threejs.org/) for a simple 3D environment and loads all assets from this repository.

## Getting Started

Open `index.html` in a modern browser or serve the folder with a local HTTP server (e.g. `npx http-server`).

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

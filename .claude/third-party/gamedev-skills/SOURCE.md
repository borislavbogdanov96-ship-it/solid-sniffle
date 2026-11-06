# Game-dev skills: source

Six skills copied unmodified from
[gamedev-skills/awesome-gamedev-agent-skills](https://github.com/gamedev-skills/awesome-gamedev-agent-skills)
at commit `19d93f97c9c1ea0f8b306e77aa81e0d3e352d3e9` (2026-10-28), Apache-2.0 (LICENSE and NOTICE in this folder):

- threejs-scene-setup, threejs-gltf-loading, threejs-materials-lighting (skills/web-engines/)
- performance-optimization, camera-systems, create-game-assets (skills/disciplines/)

Reviewed before adding: no network calls or shell commands; the two Python scripts in
create-game-assets only read images and write a preview sheet (needs Pillow).

Project note: the three.js skills target three.js r186. venue.html and scan.html pin r160
(GaussianSplats3D 0.4.7 needs >= r160). Check APIs against r160 before using r186-only
features; do not bump the version as a side effect.

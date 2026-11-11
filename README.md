# BrAIan website

The public landing page for [BrAIan](https://getbraian.github.io), a local-first personal knowledge workspace.

The application introduction and CLI guide live in [getbraian/braian](https://github.com/getbraian/braian). The application source will be added as soon as possible.

## Local preview

This is a static site with no build step and no third-party runtime dependencies:

```sh
python3 -m http.server 8765
```

Open http://localhost:8765. GitHub Pages publishes the root of the `main` branch. `.nojekyll` disables Jekyll processing.

## Screenshots

`assets/desktop-board.jpg`, `assets/desktop-note.jpg`, `assets/mobile-note.jpg`, `assets/spaces.jpg`, `assets/discovery.jpg`, `assets/dashboard.jpg` and `assets/sharing.jpg` are real captures of the running app using its own `braian` vault. They show project/backlog content, including feature plans; a note shown in a screenshot does not imply that its subject has shipped. Device frames are CSS illustrations. The file tree on the page is an illustrative example.

The page uses scroll reveals, a reading-progress line and a pausable HyperFrames header video, all respecting reduced-motion preferences. Without JavaScript, all content and navigation remain visible; the copy button needs JavaScript.

## License

MIT © 2026 Marco Pegoraro.

## Header animation

The 12-second silent header MP4 was authored and rendered with [HyperFrames](https://github.com/heygen-com/hyperframes). Its editable source is in `motion/`; the frame layout was informed by the HyperFrames `browser-device-stage` component. Actual app screenshots retain their original pixels.

```sh
cd motion
npx --yes hyperframes@0.9.34 preview
npx --yes hyperframes@0.9.34 check
npx --yes hyperframes@0.9.34 render --quality delivery -o ../assets/header-loop-original.mp4
```

The published MP4 is a web-optimised H.264 encode at 1600×900, 30 fps, with a poster image. Playback stops offscreen or when the page is hidden. Automatic playback is disabled for reduced-motion and data-saving preferences; visitors can play or pause it explicitly.

The feature tour covers all 20 optional features in the current app catalog plus supporting workflows. Public Docker images and packaged Electron releases are marked coming soon. Android and iOS home-screen installation connects to a running, reachable BrAIan instance; it does not provide an offline server.

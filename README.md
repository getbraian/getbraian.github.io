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

`assets/desktop-board.jpg`, `assets/desktop-note.jpg` and `assets/mobile-note.jpg` are real captures of the running app using its own `braian` vault. They show project/backlog content, including feature plans; a note shown in a screenshot does not imply that its subject has shipped. Device frames are CSS illustrations. The file tree on the page is an illustrative example.

The page uses scroll reveals, a reading-progress line and a small device parallax effect, all respecting reduced-motion preferences. Without JavaScript, all content and navigation remain visible; the copy button needs JavaScript.

## License

MIT © 2026 Marco Pegoraro.

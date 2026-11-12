# BrAIan website

The public landing page for [BrAIan](https://getbraian.github.io), a local-first personal knowledge workspace. Introduction and CLI guide: [getbraian/braian-demo](https://github.com/getbraian/braian-demo). Application source will be added as soon as possible.

## Preview and publishing

Static HTML/CSS/JavaScript, no build step or third-party runtime dependencies:

```sh
python3 -m http.server 8765
```

GitHub Pages publishes the root of `main`; `.nojekyll` disables Jekyll.

## Screenshots and editing

All app screenshots in `assets/` come from the running app's own `braian` vault. They show project/backlog content, including plans: a note's subject is not necessarily a shipped feature. The journal capture is an empty journal ready for its first entry. The encrypted-note capture shows the confirmation dialog; it does not expose encrypted content.

`data/screenshots.json` defines the 18-feature slideshow and gallery. Run `python3 scripts/update-screenshots.py` after editing it. Theme compositions are editable in `theme-{notes,kanban,rss,discovery}.html`; their desktop screens are split light left/dark right and both mobile themes appear in CSS device frames. Capture at 1470×761 to update `assets/themes-*.jpg`. Original paired captures are retained in `assets/theme-*.jpg`. Device frames and the example file tree are illustrations.

Both carousels support swipe, named selectors, arrow buttons and keyboard arrows. Rotation pauses on hover, focus and hidden tabs; manual navigation stops rotation. Reduced motion disables automatic rotation and smooth transitions. Without JavaScript, screenshots remain swipeable and content stays visible.

## Feature film

The page follows [NARRATIVE.md](NARRATIVE.md): start with Markdown and files, then reveal navigation, structure, views, optional AI, sharing and ownership. The full feature list and gallery are expandable references. The hero shows Files and the editor.

The 14.5-second silent HyperFrames film follows the feature slideshow. It uses real Files, Calendar, RSS, Graph and Chat captures with substantial zooms/pans and bold moving claims. Editable source is in `motion/`. Check and render there with:

```sh
npx hyperframes check --json
npx hyperframes preview
npx hyperframes render --quality delivery --workers 2 -o render.mp4
```

The web delivery is `assets/detail-film.mp4`; the poster is `assets/detail-poster.jpg`. Video plays muted when visible and pauses offscreen, with native playback controls. Reduced motion or data-saving preferences prevent automatic playback.

## License

MIT © 2026 Marco Pegoraro.

The prepared Codespaces trial lives in [getbraian/braian-demo](https://github.com/getbraian/braian-demo/tree/main/.devcontainer), with a Files-only starter vault. The landing page links to its creation screen; it does not create or bill a Codespace automatically.

The top local-trial action opens a keyboard-accessible popup with Node requirements, `npx braian`, copy feedback and brief startup/stop instructions. Escape, the close button or the backdrop dismiss it and return focus to the trigger. Codespaces trial links open in a new tab.

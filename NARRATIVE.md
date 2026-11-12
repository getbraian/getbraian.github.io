# BrAIan: the landing-page story

## The idea

**Start with a note. Connect the rest.**

The reader wants somewhere useful to write, not a system to learn. Give them that first win, then show how the same files can become a personal knowledge base. Each chapter answers a question raised by the last. Features are evidence for the story, rather than its table of contents.

The action throughout is **try BrAIan**: `npx braian` locally, or a prepared GitHub Codespace.

## The arc

### 1. “I can start here.”

- **Show:** a folder tree and a real Markdown note. A new vault starts with Files; writing one note is enough. Introduce the editor's live Markdown, slash commands, tables, diagrams and attachments.
- **Why:** the basic product should feel useful before the reader hears about AI or schemas.
- **Connection:** this is the anchor for everything that follows. The note will stay a file as the workspace grows.
- **Images:** desktop editor with a phone reader; a close-up of the slash menu. No Kanban-first hero.

### 2. “The rest of my work fits beside it.”

- **Show:** source files, documents and media in the vault. HTML and CSS open side by side, with the working page preview underneath; named IDE sessions keep the arrangement.
- **Why:** turn “a note editor” into “a useful place to work” through a concrete example.
- **Connection:** the first note already lives in a folder. Reveal what else that folder can hold.
- **Image:** the actual HTML/CSS/preview layout from the BrAIan vault.

### 3. “More material won't mean more searching around.”

- **Show:** a Space's tree with two notes open together. Spotlight reaches notes, commands, views, cards and sessions; Recent returns to modified, created, opened and frequently used notes.
- **Why:** solve the finding problem before asking the reader to add more information.
- **Connection:** files become a working set, and navigation keeps it manageable.
- **Images:** tree and split notes; Spotlight search; an optional Recent detail.

### 4. “My notes can describe the things I care about.”

- **Show:** familiar types—a person, project or task—with properties and relationships. Use the topology editor to design types, link targets, templates, views and related-note panels.
- **Why:** structure now solves a need the reader understands. Explain the useful relationship before its schema.
- **Connection:** the files gain shared meaning without leaving Markdown; the schema is readable YAML.
- **Image:** connected types on the real canvas, with a selected type's properties inspector.

### 5. “Those connections give me useful perspectives.”

- **Show:** boards for progress, calendars for time, Discovery for structured rows, and a graph for relationships. RSS, journals and dashboards support daily reading and reflection.
- **Why:** this is the expansion moment: a knowledge manager emerges from familiar notes, rather than another import.
- **Connection:** meaningful properties make different views possible.
- **Images:** a selectable, files-first feature slideshow; immediately after it, the short zoom/pan film. Explain external iCal subscriptions and event context here.

### 6. “I can reach and capture that knowledge faster.”

- **Show:** an optional assistant answering a vault question or organising rough input. Multiple connections serve chat, dictation, embeddings and decision routing.
- **Why:** AI is a shortcut to reading and writing, not a prerequisite for the editor.
- **Connection:** the reader has already seen the context that makes the assistant useful.
- **Images:** a real short conversation and the provider chooser, without credentials. Name the available API, subscription, local speech and routing options accurately.

### 7. “Someone else can use the piece that matters.”

- **Show:** one note for a friend, or a family Space for a partner. Share a whole Space or one branch; choose read/write access, expiry or no end date, and revocation. Explain near-real-time Markdown collaboration and cursors.
- **Why:** make sharing a concrete personal use, not an enterprise collaboration pitch.
- **Connection:** the tree gives shared context a boundary.
- **Image:** actual Space-branch sharing controls before a link is created. Do not invent collaborators for a screenshot.

### 8. “I control how much of this I use.”

- **Show:** feature switches and configuration per vault, separate work/personal vaults, light/dark themes and phone installation. Explain Obsidian compatibility, encryption and computer/VPS/cloud hosting.
- **Why:** after showing breadth, answer the natural objection: “Do I need all of it?” The workspace still rests on the folder from the opening.
- **Connection:** flexibility and ownership make the larger system feel safe to try.
- **Images:** feature settings; four split-theme desktop compositions with both phone themes; a safe-block detail.

### 9. “I'll try the first note.”

- **Show:** two clear choices—run `npx braian` with Node, or open a prepared GitHub Codespace with a small vault and private app preview.
- **Why:** finish with the familiar first action, not a commitment to adopt every feature.
- **Connection:** return to the opening promise, now backed by evidence.
- **Presentation:** compact command panel and trial cards. Explain GitHub sign-in/quota. Keep Docker image and packaged Electron releases marked coming soon.

## Keep the reader moving

- One main claim per chapter. Alternate concise explanation and real product evidence.
- Let the reader choose depth. Keep the full feature list and screenshot gallery in expandable references; provide chapter links.
- Repeat the trial invitation at the opening, after the main demonstration and at the end.
- Scroll motion guides attention without delaying access. Honour reduced motion; make both carousels and the film pausable.
- Avoid invented adoption claims or app states. A backlog note is not evidence its subject has shipped.

## Keep the claims precise

Core Obsidian notes work without conversion; plugins/themes are not executed, and concurrent edits use the last saved version. Encryption covers note bodies or blocks, not titles, properties or attachments. Optional remote integrations transmit the context they need. WhisperKit requires a compatible Mac server; Groq is remote; Jev is decision routing. Subscription connectors are experimental and vendor-dependent. Calendar files can be referenced from the event's linked note; external events also support URLs and supported vault views.

## Where to edit

`index.html` implements the story. `data/screenshots.json` defines the feature tour. `theme-*.html` and `motion/` keep the graphics editable. The Codespaces trial lives in `getbraian/braian-demo` under `.devcontainer/`, with the starter vault in `demos/welcome/vault/` and `TRY.md`; it installs the published npm app, not application source.

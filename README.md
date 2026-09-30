# NITROQ.DEV

Personal site and project showcase for **Frank Gesmundo** — full stack mobile
and web developer. Astro + Tailwind v4 + Motion, deployed to GitHub Pages.

Runs at **$0/month**: GitHub Pages has no bandwidth cap and does not expire.

## Commands

| Command           | Action                                              |
| :---------------- | :-------------------------------------------------- |
| `npm install`     | Install dependencies                                 |
| `npm run dev`     | Sync repo stats, then start the dev server           |
| `npm run build`   | Sync repo stats, then build to `./dist/`             |
| `npm run preview` | Serve the production build locally                   |
| `npm run sync`    | Refresh `src/data/github.json` only                  |

## Adding content

**A project** — drop a Markdown file in `src/content/projects/`. Frontmatter is
validated by `src/content.config.ts`, so a typo fails the build instead of
silently rendering wrong.

```yaml
---
title: Bea
summary: One line that sells it.
repo: bea # must match a GitHub repo name — drives live stars/language
status: active # active | stable | archived
featured: false
order: 1 # lower sorts first
stack: [Rust, Tauri 2]
year: 2026
sprite: crab # coin | crab | ghost | star | heart | bolt | chip
accent: hot # phos | amber | hot | cyan | violet
license: AGPL-3.0
---
```

Sprites live in `src/lib/sprites.ts` as character grids — add a new one there and
it becomes available to every `sprite:` value.

**A post** — drop a Markdown file in `src/content/blog/`. `score` (0–999) drives
the high-score column on the blog index. Set `draft: true` to hide it.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo, on the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. `.github/workflows/deploy.yml` builds and publishes on every push.

The workflow passes `GITHUB_TOKEN` to the build, which lifts the GitHub API rate
limit so the repo-stat sync succeeds on Actions.

### Repo name vs. site URL

`astro.config.mjs` derives `base` from the repo name, because a project repo is
served from a sub-path while `NitroQ.github.io` is served from the root:

| Repo                | `base`               | Live at                        |
| :------------------ | :------------------- | :----------------------------- |
| `personal-site`     | `/personal-site/`    | `nitroq.github.io/personal-site/` |
| `NitroQ.github.io`  | `/`                  | `nitroq.github.io/`            |

Override without touching the config:

```sh
SITE_REPO=NitroQ.github.io npm run build
SITE_URL=https://your.domain npm run build   # for a custom domain + CNAME
```

## Structure

```text
src/
├── components/     Header, footer, cards, sprites, command palette
├── content/
│   ├── blog/       One Markdown file per post
│   └── projects/   One Markdown file per project
├── data/
│   └── github.json Generated cache of live repo stats — do not edit by hand
├── layouts/        BaseLayout: head, chrome, boot overlay, palette
├── lib/
│   ├── accents.ts  Accent colour map (full class names so Tailwind sees them)
│   ├── github.ts   Typed access to the repo-stat cache
│   ├── motion.ts   All Motion wiring: boot, decode, reveals, palette
│   ├── site.ts     Name, nav, social, hero, skills, timeline
│   └── sprites.ts  Pixel sprite character grids
├── pages/
└── styles/global.css   Design tokens, dithering, CRT, pixel primitives
```

## Notes on the design

Pixel art means rasterised type and hard edges, so every transition uses
`steps()` easing — smooth interpolation on a grid of squares reads as smearing.
Gradients are ordered Bayer 4×4 dither masks rather than smooth blends, and
`font-smoothing: none` keeps the type aliased.

Scroll reveals are progressive enhancement: an inline script in `<head>` adds
`.js-motion`, which is the only thing that hides `[data-reveal]`. No JavaScript
means visible content, never a blank page. `prefers-reduced-motion` skips the
boot sequence, the decode and every loop.

---
title: This site costs nothing to run
description: The whole stack behind nitroq.dev, why it is free forever, and where the hidden costs actually live.
pubDate: 2026-09-28
tags:
  - meta
  - static sites
  - tooling
score: 980
---

Somewhere between "I need a portfolio" and "here is a $40/month bill I forgot
about" there is a bad decision. This site is my attempt to stay on the right
side of it, so here is the entire stack and what each piece costs.

## The stack

| Piece | Choice | Cost |
| --- | --- | --- |
| Framework | [Astro](https://astro.build) | free, MIT |
| Styling | Tailwind CSS | free, MIT |
| Animation | Motion | free, MIT |
| Hosting | GitHub Pages | free, unlimited bandwidth |
| Deploys | GitHub Actions | free on public repos |
| Content | Markdown in the repo | free |
| Domain | `nitroq.github.io` | free |

**Total: $0/month.** Not a promotional tier, not a trial — GitHub Pages has no
bandwidth cap and does not expire.

## Why static wins here

A personal site is a document that changes when you change it. It gets read
maybe a few hundred times a month. Every piece of dynamic machinery you add —
a database, a server, a headless CMS, an image pipeline — is infrastructure
that has to be paid for, kept alive, secured, and migrated when its
maintainer gets bored.

Static generation moves all of that to build time. The output is files. Files
on a CDN cannot be SQL-injected, cannot be slow because somebody else's
database is under load, and cost nothing to serve.

## The two costs people forget

**Your time.** This is the real bill. Every dependency is a thing that can
break on a major release, and the site only has value if it still builds.

**Your domain name.** Optional, and the one thing I would actually pay for —
roughly $10/year. Register it through Cloudflare at cost rather than through a
registrar with a promotional first-year price designed to make the renewal look
like a surprise.

## On animations

Pixel art means rasterised type and hard edges, so easing curves have to be
`steps()`, not bezier. Smooth interpolation on a grid of squares looks like
smudging, not motion. Every transition on this site snaps between positions —
which is also exactly how the hardware it is imitating behaved.

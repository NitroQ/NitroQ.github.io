---
title: Shipping a Tauri app people trust
description: Notes from building a desktop assistant in Rust and Tauri — the unglamorous decisions that decide whether an install feels safe.
pubDate: 2026-09-12
tags:
  - rust
  - tauri
  - desktop
score: 910
---

An `AGPL-3.0` licence on a desktop app is not a legal footnote, it is a
product decision. People are being asked to install something on the machine
where their work happens, and every signal you send either earns or spends
that trust.

These are the decisions that mattered.

## It is a native binary or it is nothing

Tauri gives you Rust instead of Electron's bundled Chromium. The practical
consequence is that this is an actual native app: it starts instantly, it
appears in the system's app switcher, and it does not leave a 300 MB runtime in
your users' temp directories. The install is one executable. That is the whole
pitch, and anything that compromises it costs you the reason people picked a
desktop app over a web page.

## Storage is the security boundary

For a local-first app, "does it phone home?" is a question users will actually
ask. The answer has to be structurally true, not a policy statement.

Audio, transcripts and minutes live in a single local SQLite database. There is
no sync service, no telemetry endpoint, and no account system to leak. There is
nothing to breach because there is no server copy.

Being AGPL makes that verifiable rather than merely promised: anyone can read
the code and check.

## Long-running work is a UX problem

Transcription is slow enough that the user *will* do something else while it
runs. That means:

- Transcription runs on a background task with real cancellation, not a
  promise. Losing a half-finished job should be cheap.
- Progress is reported honestly — stages, not a fake percentage that sticks at
  99%.
- The app is fully usable while a job runs. Nothing blocks on it.

An app that locks its window during a 40-minute transcription teaches people not
to trust it with a 40-minute recording.

## The license is part of the design

AGPL-3.0 asks that modifications deployed as a service be published. For a tool
whose entire value proposition is local execution, that is a good trade: the
thing the copyleft protects is the privacy guarantee, and nobody can fork it
into a surveillance service without that fork being visible.

If you ship a local-first tool under a permissive licence, you have made a
different choice. Make it deliberately.

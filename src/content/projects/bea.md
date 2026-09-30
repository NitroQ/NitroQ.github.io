---
title: Bea
summary: A local-first Windows meeting assistant that records, transcribes and summarises meetings entirely on your own machine.
repo: bea
status: active
featured: true
order: 1
year: 2026
stack:
  - Rust
  - Tauri 2
  - React
  - SQLite
  - Whisper
  - Local LLM
sprite: crab
accent: hot
license: AGPL-3.0
---

## The problem

Meeting notes are the oldest surveillance tech in an office. A recorder sits in
the corner, an account somewhere holds the audio, and the transcript is
processed on somebody else's GPU. For anything involving a client, a patient or
a colleague who has not consented to being summarised, that is a problem — and
for anyone outside a corporate tenant, it is a non-starter.

**Bea** takes the whole pipeline and moves it onto the desktop.

## What it does

Drop in an audio or video file — or record straight from the mic — and Bea
handles the rest without a network connection:

- **Transcription** runs fully offline. Whisper handles the audio; Qwen and
  Nemotron are wired in for the language-side work.
- **Structured minutes** come out with decisions and action items separated
  from the discussion, not a wall of summarised prose.
- **Cross-meeting chat** lets you ask questions across every meeting you have
  recorded, and every answer cites the meeting and timestamp it came from.

That last part is the feature I care about most. A summary you cannot trace is
a rumour, so the retrieval layer is built to refuse to answer without pointing
at the evidence.

## Why it is built this way

**Tauri 2 over Electron.** The heavy lifting is transcription, and that belongs
in Rust. Tauri gives a Rust core a small webview UI instead of bundling a
second copy of Chromium, which is the difference between an app you can leave
running and one that eats your battery.

**Local models, not API calls.** Running the model on-device means the audio
never has to leave the machine, the app works on a plane, and there is no
per-minute bill. It also means the hard work is predictable engineering —
model loading, batching, cancellation — rather than integration roulette.

**SQLite for everything.** Recordings, transcripts, embeddings and minutes live
in one local file. That makes backup a file copy and makes the whole app
trivially portable between machines.

The source is AGPL-3.0. If you run a modified version as a service, the license
asks you to publish those changes — that is the deal, and it is a deliberate
one for a tool that handles other people's conversations.

---
title: Offline is a feature, not an error state
description: Why local-first beats sync-first for tools that handle private data, and what it actually costs you to build.
pubDate: 2026-09-20
tags:
  - architecture
  - local-first
  - desktop
score: 940
---

The default assumption in application design is that the network is a given and
its absence is a failure mode. Show a spinner. Queue it. Retry later. Tell the
user you are offline and come back when you are not.

That assumption is wrong for anything touching private data, and it is
*actively harmful* for the category of software I like building.

## The reframe

If the data is on the user's machine to begin with, the network is not the
source of truth — it is a convenience. Nothing is lost when it disappears,
because nothing was remote. The failure mode inverts: instead of "you cannot
use the app right now", you get "the app works exactly the same".

For [Bea](/projects/bea/) this meant Whisper and a language model running
on-device. The meeting recording, the transcript, the minutes — none of it
needs a server, so the app has no offline mode. It has one mode.

## What it costs

Being honest about the trade-offs, because "local-first" gets sold like a free
lunch:

**Model loading is real work.** A 4 GB model download is a first-run experience
you have to design, not a dependency you can assume. Progress reporting,
resumable downloads, disk space checks, and a clear answer to "why is this
taking so long" are all now your problem.

**Hardware is a constraint.** Inference needs RAM you cannot assume. I now treat
model size as a supported configuration rather than a single default, and the
app degrades to a smaller model instead of falling over.

**Search is harder.** There is no server-side index to lean on. Getting
retrieval across local documents to feel instant means owning the embedding
step and the vector store yourself. SQLite plus a small HNSW index is
entirely sufficient and removes a service from the diagram.

**Sync is exponentially harder.** The moment you support two devices, you are
in distributed systems — conflict resolution, tombstones, vector clocks. I have
deliberately not built this. It is the single strongest argument for
sync-first, and the honest answer is that some products need it.

## Why it is still worth it

The privacy win is not a feature bullet, it is a structural guarantee. There is
no breach to report because there is no database holding a copy of your
conversations. There is no subscription because there is no inference bill. And
for a user on a plane, in a basement, or on a connection that costs $0.05 per
megabyte, the app is not degraded. It is identical.

The trade is real, but for tools that handle other people's conversations, I
would rather own the complexity than hand it to a server.

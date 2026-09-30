---
title: inTrack
summary: An Android app for recording daily time-in and time-out, with history you can actually export.
repo: inTrack
status: archived
order: 8
year: 2022
stack:
  - Java
  - Android
  - SQLite
sprite: bolt
accent: cyan
---

## The problem

If you are paid by the hour, your hours are data, and you should not have to
trust a memory. Manual timesheets get entered at 5pm from recollection, which
means they are wrong in whichever direction is most convenient.

## What it does

One button for in, one for out, and a running day view. Records go into a local
SQLite database with edit support for when you forget to punch, and a history
you can export rather than a number trapped in someone else's app.

The whole point is that it is **your** record. No account, no sync service, no
subscription — the history is a table in a file on the phone, and exporting it
is a supported action rather than a feature request.

## What I learned

I built this to learn Android properly, and the interesting part was not the
UI. It was discovering how much of mobile work is *not* the app: handling the
clock changing, handling the process being killed in the background, and
deciding what a "day" means when somebody works past midnight. Those edge cases
are where the time goes, and they are invisible until real people use it.

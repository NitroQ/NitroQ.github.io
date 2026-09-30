---
title: CodeJuan CMS
summary: A disaster risk reduction knowledge base that gives the public the information they need before, during and after an emergency.
repo: CodeJuanCMS
status: stable
order: 6
year: 2022
stack:
  - Laravel
  - Blade
  - MySQL
sprite: chip
accent: phos
---

## The mission

CodeJuan was built around one uncomfortable observation: the Philippines
experiences a great many disasters every year, and the information people need
in an emergency is usually published somewhere nobody is looking at the moment
they need it.

The CMS organises preparedness material, evacuation guidance and response
procedures so that the same content can be surfaced at the right stage —
**before** an event as preparation, **during** as live instructions, and
**after** as a debrief.

## The design problem

Disaster content has the opposite shape of a normal blog. It is not read
chronologically, it is read in a panic, often on a phone, often on a connection
that has just gone. That drove the architecture:

- **Category-first navigation.** People do not know what a post is called. They
  know they need "what to do during a flood", so the entry points are
  situations, not topics.
- **Short, scannable pages.** One emergency, one page, clear steps. No essays.
- **Server-rendered Blade.** The first thing to render must be the instruction,
  not a JavaScript bundle.

## What I would keep

The situation-first taxonomy. It is the kind of decision that only makes sense
if you actually sit with the person who has to use the site at 3am with no
signal — which is the entire reason the project exists.

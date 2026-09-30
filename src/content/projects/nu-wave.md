---
title: NU Wave
summary: A news and information portal for the National University Center for Innovation and Entrepreneurship.
repo: nu-wave
status: stable
order: 4
year: 2023
stack:
  - Laravel
  - Blade
  - MySQL
sprite: ghost
accent: violet
---

## What it is

A publishing platform for the Center for Innovation and Entrepreneurship: news
posts, announcements and reference material, with an editorial workflow so
non-technical staff can publish without waiting on a developer.

## The interesting constraint

The audience is students and staff who mostly arrive on a phone, between
classes, on a campus connection that is not always good. That pushed three
decisions that everything else followed from:

- **Server-rendered Blade.** No client-side framework to download before a
  headline becomes readable. The first meaningful paint is text.
- **Images resized and compressed at upload.** Editorial staff paste whatever
  comes out of their phone; the pipeline handles the rest so the homepage does
  not ship 4 MB photographs.
- **A blog engine built on, not bolted to, the CMS.** Posts, tags, authors and
  archives share one data model, so publishing an article and managing a
  landing page are the same action with different fields.

## What I would keep

If I rebuilt this today the CMS would stay and the templating would probably
get stricter — a shared card component would have removed a lot of duplicated
markup that crept in as the design changed twice.

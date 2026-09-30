---
title: Nibs & Knobs
summary: An interior design studio site with a public portfolio, a managed inquiry portal and a customisable blog.
repo: Nibs-Knobs
status: archived
order: 5
year: 2022
stack:
  - TypeScript
  - Angular
  - Node.js
sprite: star
accent: cyan
---

## What it is

The public site for an interior design company: a project portfolio, an inquiry
portal so potential clients can send enquiries, and a blog the studio can edit
without a developer.

## Why it is archived

The project worked, but the stack was the problem. A static brochure site with a
handful of pages and a contact form does not need a full Angular application
with a build pipeline, a runtime router and a hydration step — and paying for
that on a brochure site is a cost with no upside.

## What I would do differently

Split the two halves. The portfolio and blog are content, so they belong in
static templates rebuilt on deploy. The inquiry portal is state, so it belongs
in a small server-rendered app with a database behind it. Trying to make one
Angular app be both meant the marketing pages inherited the app's weight and the
form inherited the app's complexity.

The inquiry side did produce something worth keeping: a small typed schema for
enquiries — name, contact, budget band, project type — that made the studio's
first response to a lead consistent instead of improvised per email.

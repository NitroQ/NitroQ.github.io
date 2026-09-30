---
title: Ten years of the same problem
description: Java to PHP to TypeScript to Rust — a tour through nine years of repos and the one complaint that never changed.
pubDate: 2026-09-05
tags:
  - retrospective
  - career
score: 870
---

My first commit was in 2017. The language has changed four times since. The
complaint has not changed once.

## The tour

**Java, 2017 — 2021.** Desktop Swing applications for school: a grocery system
with inventory and HRIS, a POS, an Android time tracker, a tic-tac-toe with
login. Every one of them had the same shape, and the shape was dictated by the
assignment rather than the user.

**PHP and Laravel, 2021 — 2023.** Client work — a salon platform, a university
news portal, a disaster-preparedness CMS. Real users, real money, and the first
time I felt the weight of other people's data. This is where "it should respect
the person using it" started as a professional instinct instead of a school
project's good intentions.

**TypeScript and Angular, 2022.** A design studio's site. A good reminder that
a framework can be the wrong tool for content, learned the expensive way.

**Rust and Tauri, 2026 — now.** A local-first meeting assistant and a small
usage widget. Local models, SQLite, no server. The same instinct from the
Laravel years, but now expressed as an architectural guarantee rather than a
promise in a policy document.

## What actually stayed constant

Every project is an interface. Someone has to understand what a thing does,
make a decision about it, and trust that it will still work tomorrow. The
language is a detail. The interface is the product.

The other constant is **where the data lives**. From the HRIS to Bea, the
recurring question was always the same: who can read this, who can copy it, and
what happens to the person who loses access. I did not have language for that
in 2017. I still do not have a perfect answer, but I now build the question into
the architecture on day one instead of auditing for it in year three.

## What I would tell 2017 me

Start the local-first work immediately. The skills compound — Tauri, SQLite,
on-device inference — and none of it needed a team or a budget to learn.

Also: finish things. The repo graveyard is full of projects that were more
interesting than the one I shipped. Depth on a boring problem beats breadth on
an exciting one, every time.

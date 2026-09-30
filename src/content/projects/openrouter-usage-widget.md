---
title: OpenRouter Usage Widget
summary: A small native desktop widget that keeps an eye on your OpenRouter spend, using nothing but your own API key.
repo: openrouter-usage-widget
status: active
featured: true
order: 2
year: 2026
stack:
  - Rust
  - OpenRouter API
sprite: coin
accent: amber
license: AGPL-3.0
---

## The problem

If you route model calls through OpenRouter, you are spending real money on
inference and you probably have no idea how fast. The dashboard exists, but
opening a browser tab to check a number is a tax you pay dozens of times a day.

## What it is

A tiny always-visible desktop widget. It holds your OpenRouter API key, reads
your balance and recent usage, and shows you the number without ever opening a
tab.

The whole point is that it is **local**. The key is stored on your machine and
the only host it ever talks to is OpenRouter's API. There is no account to
create, no telemetry, and no middleman between you and your own usage data.

## Why it is in Rust

There is almost nothing here — a window, a poll loop, a JSON response. Rust is
overkill for the logic and exactly right for the result: it compiles to a
single small native binary with no runtime to install. It starts instantly, sits
in the tray, and does not turn into a second browser in disguise.

The design goal was to write something you could leave running for weeks
without noticing it. That meant no framework overhead, no update service, and
nothing that grows a cache directory while you sleep.

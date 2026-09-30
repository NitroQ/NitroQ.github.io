---
title: GoShopper
summary: A Java Swing desktop system combining inventory, HRIS and point of sale in one application.
repo: grocerysystem
status: archived
order: 9
year: 2022
stack:
  - Java
  - Swing
  - MySQL
sprite: chip
accent: amber
---

## What it is

A single desktop application for a grocery operation, covering three jobs that
are almost always bought as three separate products:

- **Inventory** — stock levels, supplier records, purchase history and reorder
  points.
- **HRIS** — employee records, attendance and the payroll inputs that fall out
  of them.
- **Point of sale** — the register, with every sale decrementing inventory and
  feeding the same reports the back office reads.

## The idea

Small retail runs on a counter and a back room, not on a data centre. GoShopper
was built to sit on one machine behind the counter and share one database
across all three roles, so the person doing stocktake sees what sold this
morning and the person doing payroll sees the same attendance the register
already recorded.

## What I would keep

Sharing one database across the three modules. It sounds obvious and it is the
part that actually delivers the value — the alternative is three apps that each
hold a slightly different, slightly stale version of the same shop.

Swing itself was a stretch, but not a mistake for the goal: it kept everything
in a single JVM with no runtime to install on a shop counter PC, which for this
kind of deployment is worth more than a nicer interface.

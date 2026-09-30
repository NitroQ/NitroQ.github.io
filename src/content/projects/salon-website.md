---
title: SalonWebsite
summary: A salon platform covering the storefront, the booking calendar, inventory and a small CMS — one Laravel app for the whole shop.
repo: SalonWebsite
status: stable
order: 3
year: 2024
stack:
  - PHP
  - Laravel
  - MySQL
  - Blade
sprite: heart
accent: hot
---

## The problem

A salon runs on four things that are usually four different programs: someone
taking bookings, someone selling products, someone counting stock, and someone
posting on social media. None of them talk to each other, so the owner ends up
reconciling paperwork by hand.

## What it is

One Laravel application covering the whole operation:

- **Public storefront** for the salon's services and staff, so a new customer
  can find prices without asking.
- **Booking system** so appointments land in a calendar instead of a phone
  scribble, with the availability view the front desk actually needs.
- **Sales and inventory** linked to the same product records, so selling a
  product decrements the stock that the booking screen already knows about.
- **Content management** for staff bios, service descriptions and announcements.

## The part worth keeping

The value was never any single screen — it was that they share one database.
When a stylist leaves, their appointments are reassigned in the same transaction
that updates the roster. When a product sells out, the public page stops
advertising it.

Built on plain Blade and MySQL on purpose: this is a shop, not a startup, and
the most valuable property a system like this can have is that the person who
inherits it can still read it.

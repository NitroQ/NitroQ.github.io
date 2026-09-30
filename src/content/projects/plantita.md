---
title: Plantita
summary: An e-commerce storefront for plants, built around the fact that most plant shops sell to people who have never kept a plant before.
repo: Plantita
status: archived
order: 7
year: 2024
stack:
  - PHP
  - MySQL
  - Bootstrap
sprite: heart
accent: phos
---

## What it is

A full storefront for a plant business: catalogue, cart, checkout, orders and
an admin side for stock.

## The product idea worth keeping

A plant shop has a problem that a normal store does not. The customer is buying
a living thing that will die if the wrong person ends up caring for it, and
almost nobody knows which plants are dangerous to their cat or which need
bright indirect light and will survive a forgetful owner.

So care information is not marketing content bolted onto the product page — it
is part of what is being sold. Each plant carries a light requirement, a
watering rhythm, a difficulty rating and a toxicity flag, and the cart warns you
before checkout if a plant in it will hurt the animal in your house.

## Why it is archived

The PHP implementation was competent and the domain logic was the interesting
part, but the catalogue needed search, filtering and inventory that outgrew a
hand-rolled admin. Rebuilt properly, the care metadata becomes structured data
that a search index can query — which was always the right shape for it.

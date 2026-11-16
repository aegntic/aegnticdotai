---
title: "What owns the desktop agent?"
description: "The Hermes investigation carries forward a question about runtime responsibilities."
pubDate: 2026-11-16
retrospectiveDate: 2026-09-07
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-09-07, reconstructed on 16 November 2026. The archive date is not a claim of publication at the time.

The 22 August request for deep research into hermes-agent-desktop carries forward here. I wanted its inner workings examined as inspiration for a project that might use parts of it. The request does not establish an integration.

A responsive desktop depends on more than the speed of its model. Something owns the running task, something stores its state, and something tells the interface what happened. Find those responsibilities before borrowing the appearance.

Read the source and documentation, then test the behaviour that matters. Keep any inference labelled. A diagram should not make uncertain implementation details look settled.

There are several possible outcomes. Adopt a maintained module if the licence and interface fit. Adapt a pattern if the code is too tightly coupled. Leave a subsystem alone if bringing it over would mean inheriting half the original application.

The next artifact should narrow those choices: a small responsibility map and one integration candidate with a test. That gives the proposed project somewhere concrete to start, without pretending a research report is already an architecture that works.

Google released Gemini 3.8 Flash on 2 September. [Source](https://aistudio.google.com/docs/changelog).

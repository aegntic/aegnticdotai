---
title: "Show the finding and the fix"
description: "A security report should leave a maintainer with something they can verify."
pubDate: 2026-11-17
retrospectiveDate: 2026-04-13
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-04-13, reconstructed on 16 November 2026. The archive date is not a claim of publication at the time.

A security finding needs enough detail to repair it. Which component, under which conditions, with what impact? A frightening label and a long explanation of possible harm do not answer those questions.

Work inside an approved target. Use an isolated test environment where possible and keep production credentials out of the experiment. The assistant's ability to explore further is no reason to expand the assignment.

Confirm the issue with the smallest safe test. Then check the patch separately. Blocking one example can leave the underlying problem intact, or break legitimate behaviour alongside it. Add a regression test and run the existing checks.

Glasswing makes this work worth watching, but provider capability claims do not verify a local finding. The repository still needs evidence specific to its own code and configuration.

The handoff should name what was confirmed, what changed and what remains untested. A short list of repaired, reproducible problems gives the maintainer more to work with than a catalogue of alarming possibilities.

Anthropic announced Project Glasswing on 7 April. [Source](https://www.anthropic.com/glasswing).

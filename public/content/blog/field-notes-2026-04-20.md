---
title: "Keep the old route reachable"
description: "Know what reverting a model upgrade will actually restore."
pubDate: 2026-11-17
retrospectiveDate: 2026-04-20
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-04-20, reconstructed on 16 November 2026. The archive date is not a claim of publication at the time.

Switching a model name back may not undo the upgrade. The new route might have changed stored data, tool arguments or assumptions elsewhere in the application.

Check that before the rollout. Know which configuration restores the previous path and whether the old model remains available. If the new feature creates incompatible state, document how that state is handled too.

For evaluation, start with the failures that already cost time. The invented detail. The malformed output. The tool action taken without the required confirmation. A test set full of easy successes will make almost any upgrade look comfortable.

Keep the acceptance criteria steady. Better prose does not excuse a broken schema, and a higher benchmark score does not establish that the application respects its own boundaries.

Opus 4.7 is a candidate for that comparison. A small, repeatable test and a working rollback make it easier to adopt improvements quickly. Without them, even a minor switch can become a nervous production experiment with no clear way back.

Anthropic introduced Claude Opus 4.7 on 16 April. [Source](https://www.anthropic.com/news/claude-opus-4-7).

---
title: "The test has to be capable of failing"
description: "A file existing is a very low bar for a successful task."
pubDate: 2026-11-17
retrospectiveDate: "2025-11-10"
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2025-11-10. Reconstructed in November 2026 from dated sources, not originally published on the archive date.

A file existing is a very low bar for a successful task.

With model routing still in view after October's Haiku 4.5 release, I'd put the acceptance test before the model comparison. Otherwise we're comparing impressions.

For date extraction, include a missing date and an ambiguous format. For a website change, inspect a narrow viewport and the relevant interaction. For a research summary, check whether the source supports the sentence, not just whether a link appears beside it.

Include the mistake you're trying to prevent. If every case is easy, the test can pass while the workflow's actual problem survives untouched.

Keep a baseline where possible. More fluent output can feel more correct even when it isn't. Looking at the old and new results against the same requirements makes that easier to catch.

Some checks need judgment. A rendered page or an editorial read can expose things a schema won't. Name those checks honestly instead of pretending one score captures every quality dimension.

At the end, say which checks ran, which failed and which weren't available. “Looks good” might be a reaction to a preview. It isn't enough to sign off work someone else has to rely on.

## Sources

- [Claude Haiku 4.5 · 2025-10-15](https://www.anthropic.com/news/claude-haiku-4-5)

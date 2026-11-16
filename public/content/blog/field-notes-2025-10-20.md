---
title: "Give the small model a complete small job"
description: "Haiku 4.5 arrived on 15 October. That makes model routing interesting, but I wouldn't start by replacing every expensive call with a cheaper one."
pubDate: "2026-11-16"
retrospectiveDate: "2025-10-20"
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2025-10-20. Reconstructed in November 2026 from dated sources, not originally published on the archive date.

Haiku 4.5 arrived on 15 October. That makes model routing interesting, but I wouldn't start by replacing every expensive call with a cheaper one.

Look at the task first. Extracting a known field from a familiar document has a clear finish line. Deciding what an ambiguous request means across several accounts does not. Prompt length isn't a good measure of that difference.

A smaller model still needs the context required to do its job. “Classify this using these definitions and show the supporting sentence” is something we can check. “Help the main agent” is a vague assignment at any price.

Build the fallback into the route. If the result doesn't validate or the input is outside the expected shape, carry the evidence to the next step. Don't make the user repeat the request because the system's cost optimisation chose badly.

Then measure the whole task: completion, latency, retries and repair. A cheap first call followed by three attempts and a manual correction may be the expensive route.

There is no prize for using the biggest model on everything. There is also no prize for making a smaller one struggle through a job that needed more judgment. Match the job, then check the result.

## Sources

- [Claude Haiku 4.5 · 2025-10-15](https://www.anthropic.com/news/claude-haiku-4-5)

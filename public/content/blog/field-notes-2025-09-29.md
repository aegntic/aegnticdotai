---
title: "Use the SDK. Keep responsibility for the job."
description: "Anthropic introduced Sonnet 4.5 and the Claude Agent SDK on 29 September. Reusing maintained infrastructure is much more appealing than building another tool loop from scratch."
pubDate: "2026-11-16"
retrospectiveDate: "2025-09-29"
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2025-09-29. Reconstructed in November 2026 from dated sources, not originally published on the archive date.

Anthropic introduced Sonnet 4.5 and the Claude Agent SDK on 29 September. Reusing maintained infrastructure is much more appealing than building another tool loop from scratch.

It still leaves some decisions with the application. Which files can change? Which services can be called? What counts as finished? What happens if a tool succeeds and the next model step fails?

A support workflow and a coding workflow might share plumbing. They shouldn't inherit each other's assumptions about authority. An SDK doesn't know what your customer meant by “sort this out”.

I'd start with one complete task. Give it the tools it actually needs, save enough state to understand a failure, and make the result easy to inspect. Add another capability when the work needs it, not because exposing it takes three lines of code.

Before adopting the dependency, check the licence, maintenance and exit route. Record why it fits and why the nearest alternative doesn't. That note can save the same investigation happening again in a month.

There is plenty to build above a reliable foundation. The foundation shouldn't become a hobby of its own. Use the existing machinery and spend the effort on making the task work.

## Sources

- [Claude Sonnet 4.5 and Agent SDK · 2025-09-29](https://www.anthropic.com/news/claude-sonnet-4-5)

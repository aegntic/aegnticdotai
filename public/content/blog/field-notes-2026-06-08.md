---
title: "Test the replacement before the deadline"
description: "A retired endpoint can expose dependencies hidden in old scripts."
pubDate: 2026-11-16
retrospectiveDate: 2026-06-08
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-06-08, reconstructed on 16 November 2026. The archive date is not a claim of publication at the time.

Search the configuration, background jobs and old scripts. The endpoint that matters may be in a tool nobody has touched for months because it kept working.

The Gemini 2.0 shutdown makes the lifecycle issue concrete. Someone needs to own the migration, including noticing the notice in the first place. An important integration cannot belong to nobody.

Run the fallback before relying on it. Same inputs, same expected format, same data boundaries. Check whether it requires new permissions or a different hosting arrangement. Those differences are easier to resolve while the current path still works.

If there is no replacement ready, preserve the submitted work and show the failure plainly. Do not keep charging for retries or let a spinner imply that completion is imminent.

External services save a great deal of building. They also change. A short inventory and an exercised fallback are reasonable costs of using them. The alternative is learning the architecture again under pressure, with someone waiting for a workflow that has already stopped.

Google shut down Gemini 2.0 API models on 1 June. [Source](https://aistudio.google.com/docs/changelog).

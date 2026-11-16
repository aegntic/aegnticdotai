---
title: "Don't make the fallback start from nothing"
description: "Model routing creates a handoff problem. When the first model can't finish, what exactly does the next one receive?"
pubDate: "2026-11-16"
retrospectiveDate: "2025-11-03"
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2025-11-03. Reconstructed in November 2026 from dated sources, not originally published on the archive date.

Model routing creates a handoff problem. When the first model can't finish, what exactly does the next one receive?

Haiku 4.5 is still the October release in this week's context. The follow-up question is whether a smaller-model route can fail without throwing away useful progress.

Send the original request, its constraints, the completed work and the reason for escalation. Keep uncertain conclusions marked as uncertain. Passing a guess to a stronger model as an established fact is a good way to make the guess harder to spot.

For code, preserve the diff and failing check. For extraction, preserve the source and the fields that didn't validate. For research, keep the evidence and the unresolved question. The next attempt should have an advantage over the last one.

Retries need a reason as well. New evidence, a different method or a narrower scope can justify another attempt. Repeating the same failed approach indefinitely is just a loop.

The person waiting doesn't usually need a tour of the routing system. They need the result, or the exact blocker. Keep the complexity inside, preserve the work, and don't ask them to reconstruct a task the system already had.

## Sources

- [Claude Haiku 4.5 · 2025-10-15](https://www.anthropic.com/news/claude-haiku-4-5)

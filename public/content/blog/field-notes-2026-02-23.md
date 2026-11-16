---
title: "Stop using the flagship for string formatting"
description: "Split the workload before deciding which model should handle it."
pubDate: 2026-11-17
retrospectiveDate: 2026-02-23
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-02-23, reconstructed on 16 November 2026. The archive date is not a claim of publication at the time.

Formatting a date, finding a paragraph and resolving a conflicting brief are three different jobs. Sending all three to the largest model is an easy default, but it avoids the more interesting design work.

Some steps belong in ordinary code. Some need retrieval. Some genuinely need reasoning. Separate them before comparing models, or the comparison will mostly measure how well each one compensates for an unclear assignment.

Test routine cases and expensive mistakes separately. A rough draft can tolerate a correction. A silent change to a customer record needs a much stricter check. Average accuracy hides that difference.

Give the default path somewhere to escalate. Missing evidence or a failed check should trigger another step, rather than a confident answer produced to protect the cost target.

Sonnet 4.6 adds another candidate to evaluate. The selection should come down to the actual workload: accepted results, repair time and the failures that remain. The most dramatic launch does not automatically deserve every request.

Anthropic introduced Claude Sonnet 4.6 on 17 February. [Source](https://www.anthropic.com/news/claude-sonnet-4-6).

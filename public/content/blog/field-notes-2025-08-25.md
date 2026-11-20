---
title: "Same request shape. Different behaviour."
description: "DeepSeek-V3.1 arrived on 21 August. A familiar API makes trying another model much easier. It doesn't make migration a one-line engineering decision."
pubDate: 2026-11-17
retrospectiveDate: "2025-08-25"
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2025-08-25. Reconstructed in November 2026 from dated sources, not originally published on the archive date.

DeepSeek-V3.1 arrived on 21 August. A familiar API makes trying another model much easier. It doesn't make migration a one-line engineering decision.

The application is relying on behaviour, not just a request shape. Does the response satisfy the schema? Does the model select the right tool? Does it leave a field empty when the evidence is missing, or fill the gap with something plausible?

I'd test those expectations outside the provider-specific code. Otherwise the integration quietly defines success as whatever its current model happens to return.

Retries deserve a separate look. Repeating a read is one thing. Repeating a request that changes an external record can do the action twice. Swapping models shouldn't accidentally change that boundary.

Keep the previous route available while the candidate handles representative work. Record the actual model and settings used for each result. Debugging gets unpleasant quickly when “latest” is the only version information left.

The point of portability is having a choice. It doesn't require pretending the choices are identical. Hide the repetitive plumbing; keep the evidence needed to explain why a task failed. An abstraction that conceals both isn't saving much work.

## Sources

- [DeepSeek-V3.1 · 2025-08-21](https://api-docs.deepseek.com/news/news250821/)

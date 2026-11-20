---
title: "Turn one threat into a test"
description: "A report should lead to a specific check in the application."
pubDate: 2026-11-17
retrospectiveDate: 2026-09-14
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-09-14, reconstructed on 16 November 2026. The archive date is not a claim of publication at the time.

Take one scenario from the threat report and try it against the application's boundaries.

Can a retrieved document redirect a task? Can a tool response persuade the assistant to send private data to a new destination? Does a worker inherit credentials unrelated to its assignment? Those questions produce testable failures instead of a general sense that everything is dangerous.

Keep the scope of the report clear. It describes cases visible to its authors. That does not establish how often every pattern occurs across the whole industry.

For consequential actions, preserve the destination, authorisation and confirmed result in the log. Avoid copying sensitive payloads into yet another store just to make the log more complete. It should help explain an incident without becoming another source of exposure.

Anthropic's September report supplies material for that review. Pick a realistic case, check it and repair the boundary if it fails. Repeat when the system gains another tool or permission. A growing folder of security articles is easy to accumulate; a tested restriction is something the application can actually rely on.

Anthropic published a threat intelligence report on 10 September. [Source](https://www.anthropic.com/threat-intelligence-report-september-2026).

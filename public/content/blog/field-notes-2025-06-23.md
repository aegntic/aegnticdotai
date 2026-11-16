---
title: "Build the path before the platform"
description: "Add infrastructure when a real task needs it."
pubDate: 2026-11-16
retrospectiveDate: 2025-06-23
tags: ["Field Notes", "Retrospective"]
---

*Retrospective reconstruction of the week beginning 2025-06-23, written on 16 November 2026. This is not a claim of publication at the time.*

By June, Claude 4 and the Gemini 2.5 updates had arrived. More capability is welcome. It does not mean every project needs a larger architecture.

Start with one complete path: input, processing, output and a visible failure state. Use a maintained component where it fits. Check the licence and how it is operated before committing to it. Record why it won over the alternatives.

Then watch where the path struggles. A job that outlives the request may need a queue. Work lost after interruption may need saved state. A particular task that repeatedly fails may justify a different model. Each addition now has something concrete to fix.

Security and data handling belong in that first path. They cannot be deferred on the grounds that the prototype is small. But a speculative multi-agent control layer can probably wait until there are actual agents with distinct jobs.

Keep the working route easy to run and inspect. It is much easier to extend a modest system with known behaviour than to debug a diagram's worth of infrastructure before the first useful result has made it through.

## Sources available at the time

[Claude 4](https://www.anthropic.com/news/claude-4); [Gemini 2.5 updates](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/google-gemini-updates-io-2025/)

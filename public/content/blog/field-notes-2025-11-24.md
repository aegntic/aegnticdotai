---
title: "Keep the project usable outside the agent IDE"
description: "Gemini 3 and Antigravity arrived on 18 November; Opus 4.5 followed on 24 November. More of the development experience was being organised around agents."
pubDate: "2026-11-16"
retrospectiveDate: "2025-11-24"
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2025-11-24. Reconstructed in November 2026 from dated sources, not originally published on the archive date.

Gemini 3 and Antigravity arrived on 18 November; Opus 4.5 followed on 24 November. More of the development experience was being organised around agents.

I'd still want to know whether the project made sense after closing that particular interface.

Can someone run the tests without the original chat? Are the build instructions in the repository? Does the change arrive as a normal diff? Are important decisions recorded somewhere another contributor can find them?

An agent's memory can be helpful. It shouldn't be the only place that knows how the project works.

Integrated tools aren't the problem. They can remove a lot of repetitive effort. The question is what they leave behind. If the result requires the same service, session and model to be understood, the project has acquired a dependency that may not appear in its package file.

Keep an exit route. Try the documented setup from a clean state. Check that the evidence for the change is accessible outside the agent's completion message.

The environment can be clever. The handoff should be ordinary enough to survive it: code, tests, instructions and a clear account of what changed. That's the part another person can pick up when the current tool isn't available.

## Sources

- [Gemini 3 and Antigravity · 2025-11-18](https://blog.google/products-and-platforms/products/gemini/gemini-3/)
- [Claude Opus 4.5 · 2025-11-24](https://www.anthropic.com/news/claude-opus-4-5)

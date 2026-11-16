---
title: "What would make this coding task finished?"
description: "The Codex preview makes the acceptance criteria worth writing down."
pubDate: 2026-11-16
retrospectiveDate: 2025-05-19
tags: ["Field Notes", "Retrospective"]
---

*Retrospective reconstruction of the week beginning 2025-05-19, written on 16 November 2026. This is not a claim of publication at the time.*

OpenAI introduced the Codex cloud-agent research preview on 16 May. Giving an agent a coding task is easy. Giving it a task with a recognisable finish takes a little more care.

Describe the behaviour, the boundary and the check. For a broken mobile form: the affected width, the control that fails, the expected submission result and what must remain unchanged. That can be a few sentences.

Then let the agent investigate. There is no need to prescribe every edit before it has read the project. There is a need to review what it changed and run the behaviour that prompted the work.

Parallel tasks need ownership. Two agents can independently improve the same interface and leave incompatible results. Split the work where the boundaries are stable, and have one place responsible for integration.

A completion report should name the change, the checks and anything left unverified. Edited files are an intermediate result. A pull request may be ready for review without being deployed. Keep those states clear so the next person can pick up the work without first investigating what “done” was meant to mean.

## Sources available at the time

[Codex research preview, 16 May 2025](https://openai.com/index/introducing-codex/)

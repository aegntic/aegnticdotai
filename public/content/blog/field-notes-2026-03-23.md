---
title: "Give the small model a small job"
description: "Bound the task and include the cost of escalation."
pubDate: 2026-11-16
retrospectiveDate: 2026-03-23
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-03-23, reconstructed on 16 November 2026. The archive date is not a claim of publication at the time.

A small model gets an unclear assignment, returns something plausible and is blamed for being small.

Tighten the assignment first. Give it a defined input, allowed outputs and a way to say the case is outside its scope. Document classification is different from interpreting whether the document satisfies a complicated policy. There is no reason those steps must share an implementation.

Check the output before it moves downstream. A missing field should stay missing. An unsupported category should trigger review. Forcing a guess makes the cheap first step expensive later.

Count the entire route: initial call, retries, escalation and human repair. A lightweight model can still be economical with a second pass, but leaving that pass out of the calculation is misleading.

Mini and nano models are candidates for bounded work. Test them there. Use ordinary code for exact transformations and stronger reasoning when the ambiguity warrants it. The architecture should make those choices explicit enough to change when the evidence changes.

OpenAI released GPT-5.4 mini and nano on 17 March. [Source](https://developers.openai.com/api/docs/changelog).

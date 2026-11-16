---
title: "Who keeps it running?"
description: "Choosing a deployment also means choosing its maintenance work."
pubDate: 2026-11-16
retrospectiveDate: 2026-04-06
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-04-06, reconstructed on 16 November 2026. The archive date is not a claim of publication at the time.

The first successful inference is the easy milestone. After that, someone owns the serving stack, capacity, patches and the next model update.

Start with why control is needed. Data location? Latency? Customisation? Independence from a hosted provider? Those are different requirements. “Open” on its own does not choose an architecture.

Read the licence for the exact model and use. Availability, source access and commercial permission are separate questions. Keep the answer with the project so it does not need to be rediscovered during a later migration.

Then compare the self-managed route with a hosted baseline on the same workload. Include setup, monitoring and recovery time. A lower inference bill can conceal another service that needs attention every week.

Gemma 4 adds options to investigate. The decision can stay fairly plain: what control does this project need, what does that control cost to maintain, and who will be responsible when it stops working? If those answers are vague, the deployment plan is still incomplete.

Google added Gemma 4 API models on 2 April. [Source](https://aistudio.google.com/docs/changelog).

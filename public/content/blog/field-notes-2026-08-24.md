---
title: "Look underneath HARPA"
description: "The research brief was about mechanisms worth adapting."
pubDate: 2026-11-16
retrospectiveDate: 2026-08-24
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-08-24, reconstructed on 16 November 2026. Historical project discussions establish intent, not a claim that proposed work shipped.

On 22 August, I asked for deep research into HARPA's browser extension: its inner workings, as inspiration for an upcoming project that could use parts of it.

The interesting material is underneath the visible feature list. Where does execution live? What survives a tab closing? How does state move between the page and the rest of the system? Which permissions are required?

Keep documented behaviour, direct observations and architectural guesses separate. An assistant can produce a very plausible explanation of a proprietary system. Plausibility does not establish that the explanation is correct.

The output should narrow the next decision. Identify a mechanism worth adapting, the evidence behind it and the smallest experiment that would test whether it fits. Check licences and supported interfaces before treating anything as reusable code.

The conversation records a research request, not a completed integration. The surrounding change in model pricing does not remove the extension lifecycle, persistence or recovery work. Those mechanisms still need to hold when the model call is cheap and the browser is having a bad day.

OpenAI updated GPT-5.6 pricing on 21 August. [Source](https://openai.com/index/gpt-5-6/).

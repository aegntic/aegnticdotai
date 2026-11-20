---
title: "Try the second provider"
description: "Compatible request shapes only get you halfway to portability."
pubDate: 2026-11-17
retrospectiveDate: 2026-01-19
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-01-19, reconstructed on 16 November 2026. The archive date is not a claim of publication at the time.

An adapter accepts the same fields. Great. Now interrupt a tool call halfway through and try the same task with another provider.

That is where portability becomes real. Different models can choose different tools, interpret an argument differently or stop before the same work is finished. A matching request format does not resolve any of that for the application.

Keep completion under your own control. Record what was proposed, what was attempted and what the tool confirmed. Save the result somewhere the next request can inspect. A timeout should not trigger a blind repeat of an action that might already have happened.

There is room for provider-specific features. Put them behind a clear boundary rather than pretending every model offers the same thing. Then switching the core does not mean dismantling the entire product.

Open Responses is a reason to test a second implementation. The test should include malformed arguments, missing permissions and ordinary tool failures. Those cases tell you how much of the supposed abstraction actually holds.

OpenAI announced Open Responses on 15 January. [Source](https://developers.openai.com/api/docs/changelog).

---
title: "Link the proven parts"
description: "Build the missing piece after checking what already works."
pubDate: 2026-11-16
retrospectiveDate: 2026-11-16
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-11-16, reconstructed on 16 November 2026. The archive date is not a claim of publication at the time.

On 12 November, the direction was to avoid unnecessary building by linking proven working parts, and develop a library of agentic capabilities. That is the direction of the project, not a claim that the full system has shipped.

Start with one complete workflow. Give it an input, connect the services it needs and verify the output. Files, repositories, calendars and payment infrastructure already exist. Rebuilding them would consume time before reaching the part that makes the project different.

Reuse still needs scrutiny. Check the licence, maintenance history and failure behaviour. A dependency that drags in half another platform may be the wrong fit even if its feature list looks perfect.

Wallet's introduction puts another consequential boundary in view. Researching an item, adding it to a cart and paying remain separate steps. Preserve the approved amount and recipient, then read the merchant's confirmation.

Expand the capability library from workflows that actually run. Keep the working example, the checks and the recovery path together. The next addition should reduce the amount of work left for the person operating it.

OpenAI introduced ChatGPT Wallet on 13 November. [Source](https://openai.com/index/introducing-chatgpt-wallet/).

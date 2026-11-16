---
title: "Leave the missing field empty"
description: "Lightweight extraction should not invent completeness."
pubDate: 2026-11-17
retrospectiveDate: 2026-10-12
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-10-12, reconstructed on 16 November 2026. The archive date is not a claim of publication at the time.

A form has no invoice number. The extractor returns one anyway because the output schema expects it.

That is a bad contract. Missing and inferred are different states. Give the model a legitimate way to return missing, unknown or outside scope, then decide what happens next.

Validate what can be checked conventionally: allowed values, required references, field types. A small amount of ordinary code can catch errors that another round of fluent explanation will miss.

If the lightweight route fails, pass the original input, attempted result and reason for rejection to the next step. Do not make the stronger worker rediscover the entire problem. The handoff is part of the cost.

Haiku 5.5 belongs in tests for bounded work such as routing and extraction. Returning an answer is too weak a success criterion. The output has to fit the evidence, including its absences. A clean escalation or an honest empty field can be exactly the correct result.

Anthropic introduced Claude Haiku 5.5 on 7 October. [Source](https://www.anthropic.com/claude-haiku-5-5).

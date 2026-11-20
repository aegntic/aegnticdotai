---
title: "Test it with the tools attached"
description: "A model evaluation does not cover every application built around it."
pubDate: 2026-11-17
retrospectiveDate: 2026-08-10
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-08-10, reconstructed on 16 November 2026. The archive date is not a claim of publication at the time.

Attach a mailbox, a shell and private documents to a model and the application has a different set of risks from a chat box.

Read the safety report for what it actually tested. Which conditions, which tools, which mitigations? Some protections may live in the provider's product rather than in the model you are integrating.

Then test the local boundary. A document contains instructions to send its contents elsewhere. A recipient name matches two people. An action times out after the service has accepted it. These cases need explicit handling in the application.

Limit access to the task. A research worker does not need publishing authority. A component reading one repository does not need credentials for every other account. Smaller permissions make ordinary mistakes less damaging too.

OpenAI's August safety update is part of the evidence. The integration tests supply another part. Keep the failures and the fixes together so the next developer can see which protection is doing the work, and which assumptions still need checking.

OpenAI published a GPT-5.6 safety update on 6 August. [Source](https://deploymentsafety.openai.com/gpt-5-6-august-update/introduction).

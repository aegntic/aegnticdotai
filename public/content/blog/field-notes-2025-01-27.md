---
title: "The browser has the final say"
description: "R1 and Operator put reasoning and execution beside each other."
pubDate: 2026-11-17
retrospectiveDate: 2025-01-27
tags: ["Field Notes", "Retrospective"]
---

*Retrospective reconstruction of the week beginning 2025-01-27, written on 16 November 2026. This is not a claim of publication at the time.*

DeepSeek released R1 on 20 January. OpenAI introduced Operator's research preview on 23 January. One week brought reasoning and browser action into especially clear view.

A browser adds plenty of ways to be wrong after understanding the request perfectly. A button moves. A session expires. The site accepts the submission, but the confirmation page never loads. Clicking again could make a duplicate.

So the workflow needs to keep track of what happened outside the model. Prepared, submitted and confirmed are different states. Show the right one. If the result is uncertain, inspect the destination before trying again.

An example: an agent fills a form, clicks submit and gets a timeout. It should check whether the record exists. If it cannot check, report the uncertainty. Calling it a failure and repeating the submission is a guess with consequences.

That is where browser automation earns its place. The user should be able to stop watching every click because the system checks the result itself. A more convincing explanation of the clicks would not solve the problem.

## Sources available at the time

[DeepSeek-R1, 20 January](https://deepseek.com/en/news/deepseek-r1/); [Operator, 23 January](https://openai.com/index/introducing-operator/)

---
title: "Give the coding agent a usable project"
description: "Claude Code arrived alongside another week of model releases. The repository still needs to explain itself."
pubDate: 2026-11-17
retrospectiveDate: 2025-03-03
tags: ["Field Notes", "Retrospective"]
---

*Retrospective reconstruction of the week beginning 2025-03-03, written on 16 November 2026. This is not a claim of publication at the time.*

Anthropic introduced Claude 3.7 Sonnet and the Claude Code research preview on 24 February. GPT-4.5 followed on 27 February. More capable tools, and more ways to give them work.

A terminal assistant has a better starting point when the repository is understandable. Setup instructions that work. A test command that finds the tests. A short explanation of what belongs where. Without those, the agent spends its time guessing the project's conventions.

For a change, describe the behaviour you want and what must stay intact. “Make this form work on mobile” needs a little more detail: which control is broken, at what width, and what should happen after submission? That is enough to begin a focused investigation.

Review the diff as well as the explanation. Look for extra dependencies, unrelated rewrites and tests that merely repeat the code's assumptions. Run the behaviour that prompted the change.

There is no special exemption for generated code. It still has to fit the project. Giving the assistant accurate setup and a bounded task saves both sides the conversation where everyone discovers it built the wrong thing very efficiently.

## Sources available at the time

[Claude 3.7 and Claude Code](https://www.anthropic.com/news/claude-3-7-sonnet); [GPT-4.5](https://openai.com/index/introducing-gpt-4-5/)

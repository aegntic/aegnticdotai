---
title: "Which test passed?"
description: "A green result needs a named behaviour behind it."
pubDate: 2026-11-16
retrospectiveDate: 2025-06-16
tags: ["Field Notes", "Retrospective"]
---

*Retrospective reconstruction of the week beginning 2025-06-16, written on 16 November 2026. This is not a claim of publication at the time.*

The Codex preview made running checks part of a visible coding-agent workflow. The word “tested” still needs a follow-up: tested what?

A helper function can pass while the form that calls it remains broken. A build can succeed while a button is hidden behind the header. Those checks are useful, but they answer different questions.

Start with the reported failure. Make a case that fails before the fix and passes afterwards. If the bug needs a sequence of actions, test that sequence. Add a nearby case to catch a fix that works by breaking something else.

Run the existing checks too. If the repository already has failures, compare against the baseline. Keep them visible rather than claiming the whole project is healthy or blaming every red result on the new change.

The report can be brief: the behaviour checked, the result and the remaining gap. If no browser check ran, say so. “No regressions” needs more support than one green command. The person accepting the change should be able to see exactly how much confidence the evidence buys.

## Sources available at the time

[Codex research preview](https://openai.com/index/introducing-codex/)

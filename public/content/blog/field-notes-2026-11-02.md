---
title: "Give me the diff and the checks"
description: "Coding work should arrive ready to review."
pubDate: 2026-11-17
retrospectiveDate: 2026-11-02
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-11-02, reconstructed on 16 November 2026. The archive date is not a claim of publication at the time.

Read the repository before adding another subsystem. The maintained solution may already be in the dependency list or implemented in the next component over.

When a new dependency fits, check its licence and last release. Record why it was chosen and what was rejected. A short note now can save the next round of research.

Keep the diff focused. Fixing a bug does not automatically require redesigning the surrounding page. If a refactor is necessary, explain the connection so the reviewer can see why those files changed.

Run the actual project checks: lint, types, tests and build. For an interface, open it at the relevant sizes and exercise the behaviour. A build passing does not show that the header stays out of the content's way.

GPT-6.1 Terra is another coding model to put through those checks. The handoff standard stays concrete: changed files, commands run, results and anything left unverified. “No regressions” needs evidence. A confident completion message cannot substitute for a check that was never run.

OpenAI introduced GPT-6.1 Terra on 26 October. [Source](https://openai.com/index/introducing-gpt-6-1-terra/).

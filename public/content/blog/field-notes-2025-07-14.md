---
title: "Give it a shell. Give it a job."
description: "Gemini CLI's June release raises a fairly ordinary question with fairly large consequences: what exactly did we give the agent permission to do?"
pubDate: 2026-11-17
retrospectiveDate: "2025-07-14"
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2025-07-14. Reconstructed in November 2026 from dated sources, not originally published on the archive date.

Gemini CLI's June release raises a fairly ordinary question with fairly large consequences: what exactly did we give the agent permission to do?

A shell doesn't care whether a command fits the brief. It will happily execute a brilliant fix and an unnecessary detour. The boundary has to come from the task.

For a local website bug, I'd spell out the result, the files or project it can touch, and where it should stop. Make the change. Run the checks. Leave a diff that can be reviewed. If deployment is included, say so. If it isn't, don't quietly turn a local fix into a production release.

This shouldn't become twenty questions about harmless choices. That's the other failure: giving someone a job, then having to supervise every keystroke. Inside a clear scope, the agent should get on with it.

Keep authority close to the work. A task that needs to read documentation probably doesn't need access to billing settings. A layout change doesn't need the whole account.

A command log can tell us what happened afterwards. Sensible boundaries keep the wrong thing from happening in the first place. I'd rather have both.

## Sources

- [Gemini CLI · 2025-06-25](https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-cli-open-source-ai-agent/)

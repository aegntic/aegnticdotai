---
title: "Make the project portable between assistants"
description: "Gemini CLI adds another reason to keep instructions and checks in the repository."
pubDate: 2026-11-17
retrospectiveDate: 2025-06-30
tags: ["Field Notes", "Retrospective"]
---

*Retrospective reconstruction of the week beginning 2025-06-30, written on 16 November 2026. This is not a claim of publication at the time.*

Google introduced Gemini CLI on 25 June. Alongside Claude Code and Codex workflows, the terminal was becoming a more visible place to work with AI assistance.

The project should not need a fresh explanation every time the assistant changes. Put the setup, conventions and verification commands where the next tool can read them.

Check those commands yourself. Does the test command discover the intended tests? Does lint include the files being changed? Can a clean checkout build using the documented steps? A misleading README can waste more time than a missing one because everyone initially trusts it.

Compare tools on a representative task before moving the whole workflow. Keep the inputs and acceptance criteria stable. Look at the resulting diff, the checks performed and how the tool handles an unexpected failure. A release announcement cannot settle those details for your repository.

Keep the current working path available while trying the replacement. The experiment should be reversible. If the new assistant does a better job, the project can benefit without relocating all its knowledge into another conversation or rebuilding its standards around a model name.

## Sources available at the time

[Gemini CLI announcement, 25 June 2025](https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-cli-open-source-ai-agent/)

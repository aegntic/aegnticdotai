---
title: "What does success mean in this tool?"
description: "A timeout and a rejected request need different recovery paths."
pubDate: 2026-11-17
retrospectiveDate: 2025-03-24
tags: ["Field Notes", "Retrospective"]
---

*Retrospective reconstruction of the week beginning 2025-03-24, written on 16 November 2026. This is not a claim of publication at the time.*

March's Responses API and Agents SDK announcements put tool-connected work in the foreground. The response from a tool deserves as much attention as the instruction sent to it.

Take a create operation. It returns “success”. Does that mean a draft exists, the record passed validation, or the recipient received something? If the caller cannot tell, the agent may report a result that never happened.

Return the identifier and the actual state. Give the caller a way to read it back. Explain any side effects in the tool definition so a seemingly harmless action does not also publish or notify someone.

Timeouts need particular care. The server may have finished while the caller stopped waiting. Where possible, a repeated request should resolve to the same operation rather than create another one. Otherwise the caller needs to inspect the outcome before retrying.

This is ordinary software engineering, made more visible by an assistant that can chain actions together. One ambiguous response can contaminate everything after it. Fix the ambiguity at the interface instead of hoping a longer prompt will compensate for it.

## Sources available at the time

[Agent-building tools announcement](https://openai.com/index/new-tools-for-building-agents/)

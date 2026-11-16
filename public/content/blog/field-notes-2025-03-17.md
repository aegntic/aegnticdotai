---
title: "Connect a few tools properly"
description: "The Responses API, Agents SDK and Gemma 3 arrived in the same week."
pubDate: 2026-11-16
retrospectiveDate: 2025-03-17
tags: ["Field Notes", "Retrospective"]
---

*Retrospective reconstruction of the week beginning 2025-03-17, written on 16 November 2026. This is not a claim of publication at the time.*

OpenAI introduced the Responses API and Agents SDK on 11 March. Google announced Gemma 3 the next day. There were new tools for building agents and another open-model option to work with.

The tempting response is to connect everything. A better first job is to connect two things and make their failure understandable.

Say the model prepares a record and a tool saves it. What fields are required? What comes back on success? If the request times out, can the system find out whether the record exists? These are small questions until the agent starts repeating uncertain actions.

Keep the inputs explicit and the responses consistent. Separate a rejected request from an unknown result. Log enough to diagnose a failure without copying unnecessary personal information into yet another store.

Provider-specific code can stay at the edges. The rule about what makes a record valid should belong to the application, where it can be tested independently.

Once that path works, add the next tool. There is much less debugging involved when each new connection has a clear job and the previous connection already has evidence behind it.

## Sources available at the time

[Responses API and Agents SDK](https://openai.com/index/new-tools-for-building-agents/); [Gemma 3](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-3/)

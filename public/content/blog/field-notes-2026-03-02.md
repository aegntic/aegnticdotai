---
title: "Reconnect to the work"
description: "A restored socket should recover the task, not just restart the animation."
pubDate: 2026-11-17
retrospectiveDate: 2026-03-02
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-03-02, reconstructed on 16 November 2026. The archive date is not a claim of publication at the time.

The connection drops just after the user says send. Did it send?

A realtime interface needs an answer to that before it offers a retry. Otherwise the friendly reconnect animation can lead directly to a duplicate message, order or update.

Keep a task identifier and confirmed action record outside the connection. Save drafts as work progresses. Reconnecting should recover those records and show the actual state: still running, completed, failed or genuinely uncertain.

The visible states should mean something. Listening, waiting for a tool and reconnecting require different responses from the person. One indefinite spinner makes them look identical and leaves the user guessing whether to wait or start again.

WebSockets can improve responsiveness. They cannot supply missing state management. Measure the time to a usable result, too. An instant first token followed by a long wait is still a long wait.

Before polishing the live effect, disconnect the application at the awkward moments. See whether the work survives and whether the screen tells the truth.

OpenAI added Responses WebSocket mode on 23 February. [Source](https://developers.openai.com/api/docs/changelog).

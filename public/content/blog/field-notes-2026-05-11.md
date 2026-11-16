---
title: "What happens on the second webhook?"
description: "Deduplicate events before they produce duplicate actions."
pubDate: 2026-11-17
retrospectiveDate: 2026-05-11
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-05-11, reconstructed on 16 November 2026. The archive date is not a claim of publication at the time.

The webhook arrives twice. Does the customer get two messages?

Give each event an identity and record its processing state. A retry from the sender should not become a second external consequence. That needs to be designed before the first happy-path demonstration.

Acknowledge receipt separately from completing the work. Put the job in a durable queue so a slow tool call does not force the sender to keep retrying. Make pending and failed jobs inspectable.

Verify the sender and keep the event inside its authorised scope. A payload is data. It does not gain permission to redirect the workflow or disclose information simply because it came through a valid integration.

Google's webhook support can remove manual polling. Test the less attractive cases too: duplicate delivery, an interrupted worker, a tool that finishes after the response times out. The user should not need to investigate whether the automation ran. A persistent failure needs a clear status; a harmless retry does not need a stream of notifications.

Google added Gemini API webhooks on 4 May. [Source](https://aistudio.google.com/docs/changelog).

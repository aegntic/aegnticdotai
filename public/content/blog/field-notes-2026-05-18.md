---
title: "The laptop still has to be awake"
description: "Remote access needs to say where the work is actually running."
pubDate: 2026-11-16
retrospectiveDate: 2026-05-18
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-05-18, reconstructed on 16 November 2026. The archive date is not a claim of publication at the time.

A phone interface can look available while the computer holding the files is asleep.

That dependency needs to be clear before someone closes the laptop and expects the work to continue. The May Codex remote preview required the connected Mac to stay awake and online. A cloud-looking interface does not make a local checkout cloud-hosted.

Show where the task is running. The local machine may have uncommitted changes that do not exist in a remote workspace. Silently switching environments can mean working on a different project state while presenting it as continuity.

Online is only one check. Is the required application open? Is the repository available? Is the task paused or still running? Say what the connection state means for the work.

Save progress outside the session: draft, branch, last completed check. On reconnect, inspect before repeating commands. The person should be able to leave the desk without becoming an infrastructure operator, but the interface still owes them the few details that determine whether the job can continue.

OpenAI added a Codex remote-access preview on 14 May, requiring the connected Mac to remain awake and online. [Source](https://help.openai.com/en/articles/6825453-chatgpt-release-notes).

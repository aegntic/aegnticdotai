---
title: "Put the new model in the old project"
description: "GPT-5 was announced on 7 August. The obvious thing to do next is try it. The less obvious thing is to resist making the test unusually easy."
pubDate: "2026-11-16"
retrospectiveDate: "2025-08-18"
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2025-08-18. Reconstructed in November 2026 from dated sources, not originally published on the archive date.

GPT-5 was announced on 7 August. The obvious thing to do next is try it. The less obvious thing is to resist making the test unusually easy.

Give it an existing project. Keep the awkward files, the old conventions and the tests nobody wrote for a demo. Ask for a change that matters there.

Can it find the right component? Does it preserve behaviour outside the brief? If a test fails, does it fix the cause or arrange for the test to disappear? Those answers tell me more than a perfect little function written in an empty directory.

I'd include a visual task too. Something can compile and still look wrong. And I'd include one request that should stop before an external action, because knowing where to stop is part of doing the job.

Save the first result. If you simplify the task after a failure, that's a second experiment, not a retroactive success.

A few representative jobs are enough to begin. The aim isn't a universal model ranking. It's to decide whether this model makes this work better. Keep the diff, the checks and the correction time. The release name can go in the notes.

## Sources

- [GPT-5 · 2025-08-07](https://openai.com/index/introducing-gpt-5/)

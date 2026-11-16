---
title: "What did latest change?"
description: "A moving model alias can change the product without a code deployment."
pubDate: 2026-11-16
retrospectiveDate: 2026-01-26
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-01-26, reconstructed on 16 November 2026. The archive date is not a claim of publication at the time.

The code has not changed. The answers have. Somewhere in the configuration is a model called latest.

That name delegates an upgrade decision to the provider. Fine for an experiment. Less fine when a customer workflow depends on a particular format or behaviour and nobody has checked the replacement.

Keep a stable identifier where one is available and reproducibility matters. Test the moving alias separately. Feed it the awkward cases as well as the obvious ones: strict output formats, ambiguous instructions, tool errors. A successful response code says very little about whether the result still fits the job.

Record the change next to the configuration. Which version was tested, what failed, what improved, and how to switch back. This can be a short note. It does not need a committee.

Google's January alias change is a reminder to check that setting deliberately. Otherwise the first person to notice the upgrade may be the customer whose previously working task has started behaving differently.

Google changed Gemini latest aliases on 21 January. [Source](https://aistudio.google.com/docs/changelog).

---
title: "The preview became somebody’s daily tool"
description: "Dependency records should include the experiments people now rely on."
pubDate: 2026-11-17
retrospectiveDate: 2026-05-04
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-05-04, reconstructed on 16 November 2026. The archive date is not a claim of publication at the time.

A prototype can become essential without anyone announcing that it is production. One person starts using the script every morning. Then the preview endpoint disappears and nobody remembers where it was configured.

Keep a short dependency list. Service, identifier, purpose, owner, replacement. Include those quiet internal tools. The list only helps if it is small and current enough to maintain.

When a service retires, changing the identifier is the start of migration. Run the original tasks against the replacement. Check its errors, limits and output shape. Similar inputs do not guarantee equivalent behaviour.

The interface also needs a permanent-failure state. An endless spinner or another retry button will not revive a retired endpoint. Preserve the user's input and explain which part cannot run.

The Robotics preview shutdown is a prompt to inspect those forgotten integrations. Finding one now is considerably easier than rediscovering it through a broken workflow that somebody assumed would still be there tomorrow.

Google shut down Robotics ER 1.5 preview on 30 April. [Source](https://aistudio.google.com/docs/changelog).

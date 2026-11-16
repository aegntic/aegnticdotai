---
title: "Looks real. Does it behave properly?"
description: "NVIDIA Cosmos puts the difference between a convincing scene and a dependable system in view."
pubDate: 2026-11-17
retrospectiveDate: 2025-01-13
tags: ["Field Notes", "Retrospective"]
---

*Retrospective reconstruction of the week beginning 2025-01-13, written on 16 November 2026. This is not a claim of publication at the time.*

NVIDIA announced Cosmos at CES on 6 January, bringing physical AI into the conversation. A generated scene can look convincing. Whether it represents something that could happen is a separate check.

That gap is familiar even without robots. A dashboard can look finished while showing the wrong total. A booking screen can display a success animation before the reservation is confirmed. The presentation is doing its job; the underlying state may be wrong.

For a prototype, write down which parts are real. Is the action simulated? Is that value measured or inferred? What happens when an input is missing? Put those distinctions close to the result so the person looking at it does not have to guess.

Then choose a check that does not depend on how impressive the screen looks. Compare the total against its inputs. Read the booking back from the service. Test the movement against the constraints of the simulated environment.

There is plenty of room for visual ambition. Just leave a way to inspect what is underneath it. Otherwise the most polished part of the demo becomes the easiest place to hide a mistake.

## Sources available at the time

[NVIDIA CES announcements, 6 January 2025](https://blogs.nvidia.com/blog/ces-2025-jensen-huang/)

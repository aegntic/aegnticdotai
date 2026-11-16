---
title: "The dispatcher does not need to be a town hall"
description: "clawREFORM needed clear technical names underneath its city analogy."
pubDate: 2026-11-17
retrospectiveDate: 2026-03-30
tags: ["Field Notes", "Retrospective"]
---

> Retrospective field note for 2026-03-30, reconstructed on 16 November 2026. Historical project discussions establish intent, not a claim that proposed work shipped.

On 24 March, the architecture discussion acquired the name clawREFORM. The correction that mattered was more specific: keep standard technical names. Use the city metaphor to explain the system, not to rename its machinery.

A dispatcher called a dispatcher can be searched, documented and compared with other implementations. Calling it the town hall creates a second vocabulary someone has to learn before they can work on the code.

The analogy still has a place. It can explain who coordinates work and why the responsibilities are separated. Then show the actual components, their inputs and outputs, and what happens when one fails. Let the reader move from the picture to the implementation without translating everything again.

The archived request was for Markdown, supporting documents, blueprints and a package. That establishes a documentation brief, not a finished system.

The package should make it possible to inspect what exists. Commands and checks belong beside the diagrams. If the metaphor needs more explanation than the architecture, cut it back.

Google introduced Gemini 3.1 Flash Live preview on 26 March. [Source](https://aistudio.google.com/docs/changelog).

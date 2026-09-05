# Six-world journey acceptance

Status: in progress, local design branch. Production colour repair is complete; the following packages are not yet signed off.

## A. Homepage and artwork

DONE IF:
1. The homepage contains the six requested labels in the requested order, with number/name vertically stacked at the far left.
2. Each non-contact category has a full-height scene, distinct artwork and a short understandable purpose. Systems artwork bleeds left without clipping its rightmost subject or showing a panel edge.
3. Fresh artwork retains actual blue accents, and all local image/font references resolve after the build.
4. Product disclosures work with touch and keyboard; opening them does not navigate. Echo, Tab Harvest, Cognitive OS and aegntic skills have explicit destinations.
5. Desktop and 390px mobile have no horizontal document overflow; reduced motion and missing GSAP leave all content usable.
6. The exact requested homepage document title is present; visible brand casing is never mixed.

## B. Shared shell and enquiry

DONE IF:
1. Menu/Close have the same measured footprint on home and representative public routes; only one global navigation is operable.
2. Menu categories have correct active mapping, keyboard/touch support, and approximately 280ms open/180ms close transitions; reduced motion is immediate.
3. The logo retreats before approaching scroll text, restores when clear, and never hides focused navigation.
4. All Work with me actions open an on-site, accessible enquiry dialog with focus containment, Escape/backdrop closing and focus restoration.
5. Local previews cannot submit a real enquiry; production success is shown only after a successful server response. Production delivery remains a separate verification gate.

### Enquiry delivery gate (local implementation; production not yet verified)

DONE IF:
1. JSON, byte limits, field lengths/types, email, service, honeypot and same-origin validation reject invalid submissions before a database write.
2. An additive migration preserves existing messages and stores the service, source path, optional system URL, offer, lead status and notification status.
3. The enquiry is durably stored before a fixed-recipient notification is attempted. Queued, delivered and failed notifications remain distinguishable.
4. Notification or notification-status-update failure retains the message and confirms receipt; database failure never triggers email or exposes internal error details. An unchanged retry or simultaneous duplicate has one stored row and at most one notification attempt.
5. Local and staging hosts cannot send real notifications. Tests execute real SQL and replace only the external email boundary; the migration and API are also exercised through local Wrangler.
6. Documentation describes setup, recovery and privacy honestly. Sender onboarding, secrets, deployment approval and an explicitly approved production enquiry remain release gates.

Maintainer/unplug: a non-author can run the documented Node and local Wrangler commands from a clean checkout without production secrets. No framework or database abstraction is added beyond a small test-only SQLite adapter.

Business link: prevent lost enquiries and retain enough context to respond usefully; no conversion uplift is claimed.

## C. Alternatives and compounding

DONE IF:
1. A genuinely blank-slate HTML alternative exists outside the production site, with a different information architecture, not a colour reskin.
2. A decision record includes competing arguments and limits without invented external reviewers or product evidence.
3. A portable workflow skill captures source discovery, scope isolation, art provenance, implementation, browser evidence and release gates without host-specific paths or invented tools.
4. An independent evaluator reviews the implementation and reruns at least one check. Findings are resolved or explicitly retained as limitations.

## D. Rendered scroll-world film

Current render brief and configuration-specific cost evidence: [scroll-world-film.md](scroll-world-film.md). Exact scene artwork, camera, spending ceiling and native portrait selection remain unapproved. No generated video exists yet.

DONE IF:
1. Exact reference artwork/start canvases, camera direction, credit ceiling and portrait-chain decision are approved before paid rendering.
2. Actual rendered frames establish continuous seams across the approved scenes; no CSS-only substitute is called a completed film.
3. Scrub seeking, poster fallback, reduced motion, mobile performance and image/video byte budgets are tested against actual outputs.

## Maintainability limits

Use the existing static-page architecture, one shared navigation, one enquiry module, one homepage stylesheet and one motion module. No new framework or general-purpose state machine. Existing backend delivery, unconfirmed partner links and video generation must not be papered over by demo success messages.

Independent evaluator must quote observed failures and fresh command results, not rely on this author's completion labels.

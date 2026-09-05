# Scroll-world film: render brief and release gate

Status: proposed direction, no paid job submitted. The local GSAP/still-image journey remains usable and is not represented as this completed film. The original landing mascot stays protected. This document records the next executable media step, not another homepage redesign.

## Decisions needed

- Exact artwork and start canvases: owner approval pending. The four new category illustrations are local proposals, not approved paid-render inputs. Obtain approval of the specific scene files and any prepared full-frame canvas before spending against them. Camera or budget approval alone does not approve replacement artwork.
- Camera treatment: owner selection pending. Recommend a continuous studio glide (architecture A). The alternate is a partial sculptural orbit inside each scene, returning to forward motion before each handoff. Repeated aerial pull-backs would change the grounded studio character and require separate approval.
- Desktop only versus desktop plus a native 9:16 portrait chain: owner selection pending. Do not silently crop the desktop film and call that the mobile version.
- Provider and spending ceiling: pending. Monid and Higgsfield executables are absent on the current host. OpenArt is connected, but neither a probe nor a complete chain is authorized. Do not install, subscribe, top up, or switch workspaces as a workaround.
- Reference upload: after approval, use the provider's supported upload flow. Files are local; do not invent hosted asset URLs or publish references via a deployment merely to feed the renderer.

## Current capability and price evidence

Read-only provider queries on 2026-09-05 confirmed that OpenArt Seedance 2.0 and Mini image-to-video accept a literal `startFrame` and optional `endFrame`. The current forms distinguish this from element/reference mode, which does not lock the first frame. Use literal first-frame mode for chain handoffs. No seam capability has yet been verified against a rendered output on this account.

Each quote below is for **one** image-to-video job, one output, no audio, and the stated explicit resolution, duration and aspect ratio. Prices are estimates finalized by the provider at generation time; they are not USD prices.

| Purpose | Model | Configuration | Credits |
|---|---|---|---:|
| Isolated camera/proportion probe | Seedance 2.0 Mini | 480p, 4 seconds, 16:9 | 80 |
| Draft scene | Seedance 2.0 Mini | 720p, 8 seconds, 16:9 | 320 |
| Final desktop scene | Seedance 2.0, normal mode | 1080p, 8 seconds, 16:9 | 1,600 |
| Final portrait scene | Seedance 2.0, normal mode | 1080p, 8 seconds, 9:16 | 1,600 |

The recommended architecture has six sequential legs and **no connectors**. At these settings, its base cost is 1,920 draft credits or 9,600 final credits. Allowing one whole replacement leg gives a ceiling of 2,240 draft or 11,200 final credits (about 17% headroom). A separate final portrait chain makes the combined base 19,200 and the two-chain allowance 22,400. These are alternatives, not authority to spend; rendering a draft and then a final costs both amounts. Probe costs and any new still-generation costs are additional. Stop and ask again before exceeding the approved ceiling.

The earlier eleven-clip estimate describes architecture B (six dives plus five connectors), not this proposed continuous-forward treatment. A single 80-credit probe tests motion and mascot fidelity only. It cannot prove a handoff; at least two chained probe clips and inspection of their actual boundary frames are needed for that.

## Protected visual contract

Warm paper `#f7f8f6`, graphite `#111719`, brushed chrome `#b7bec2`, muted type `#687178`, electric blue `#165bcc`. No teal cast, dark room, pedestal/card around the swarm, new logo, or baked-in typography. Preserve the original mascot's large square optical head, broad torso, short heavy limbs and block feet. Small blue lights may move with the robot; no blanket greyscale treatment.

The original `/cta-float.webp` is the landing poster and identity reference. The current four `*-mascot-v2.webp` files establish subsequent tasks and silhouettes; `/cta-reach-arm.png` establishes the contact reach. These are concept illustrations, not hardware-product claims. Retain their sources and the versioned stills when rendering video.

The full-frame video reference must match the approved landing composition, with a genuinely flat paper background and the mascot's native proportions. The original transparent 512 × 768 asset is not itself a 16:9 canvas. Prepare and inspect an appropriate start canvas through the available image tool before a paid job. Reject identity drift; do not regenerate the landing character as a different bot. The untouched responsive landing poster remains the immediate and reduced-motion fallback.

## Six connected beats

| Section | Physical action and destination | Composition / reader pause |
|---|---|---|
| 00 / ACCESS | Begin on the original compact mascot. Drift forward past its shoulder as the Systems group becomes visible ahead in the same white space. | Preserve the familiar opening scale and text-side whitespace. Hold the introduction before entering the next stage. |
| 01 / SYSTEMS | Track alongside the cohort coordinating the blue-lit core. Continue toward a single working robot beyond the assembly. | The group bleeds left; the rightmost bot stays whole. Leave the copy and Cognitive OS disclosure clear. |
| 02 / AGENTS | Pass the compact robot inspecting its translucent document. Carry the same forward drift toward the cartridge mechanism. | The document remains a prop, not a claim of a real product UI. Leave room for the Echo disclosure. |
| 03 / PLUGINS | Observe the cartridge seat into the mechanism while the helper robot steadies the module. Move onward toward a completed object. | Mechanical gestures are restrained and physically legible; no explosive parts or added floating text. |
| 04 / PRODUCTS | Follow the completed module into the presenting robot's hands. Drift past it toward the contact reach. | Leave a quiet interval for the logo-only product disclosures. Links remain explicit DOM controls. |
| END // CONTACT | The original reaching arm extends into the shared white space and settles. | Hold a stable ending while the visitor opens the on-site form. No automatic jump back to the start. |

Titles, links, menus, disclosures and enquiry controls remain HTML. The film never contains or replaces them. Normal scrolling drives the film; menu navigation and keyboard access must still reach each real section. Do not hide useful content behind a loading gate or turn the required form into an animated imitation.

## Camera prompt candidates, awaiting selection

### Studio glide (recommended)

One unbroken, slow forward camera move through the white studio. Pass the compact camera-headed robots at their working height, with restrained lateral parallax and natural mechanical gestures. Preserve graphite, chrome and blue lights. End each scene in a steady forward drift. No cuts, sudden zooms, text or captions.

### Sculptural orbit

One unbroken camera move with a gentle partial orbit around each compact robot and its task. Keep the white studio, graphite, chrome and blue lights consistent. Settle into a slow forward drift before entering the next scene. No cuts, aerial pull-backs, text or captions.

The provider's four-choice prompt gate also offers the user's original direction ("the bots and titles all need to be scroll animated, with a natural transition flow.") or regenerating both candidates. Selecting a prompt is not spending approval.

## Handoff and verification contract

1. Render the approved first leg from the inspected canvas. Extract and inspect its actual first and last frames. Keep job ID, exact parameters, prompt, billed credits and native source file together. A timeout is not a failed remote job; inspect the same handle before considering a retry.
2. For each later leg, use the preceding leg's **actual final decoded frame** as `startFrame`, not its original still or an approximate frame sampled near the end. Continue the same slow forward drift. Do not add a wide `endFrame` that forces the camera to pull back. Inspect each ending before committing the next leg's cost.
3. Compare seam composition and camera direction in both scroll directions. A small crossfade can conceal codec noise; it cannot substitute for a matching composition, identity or direction. Stop a failed chain before paying for downstream legs.
4. Adapt the supplied portable scrub engine only after actual clips exist. Preserve the existing shared navigation, enquiry panel and accessible section content. Use seekable blob loading, bounded nearby prefetch, seek coalescing, first-painted-frame poster retention, reduced-motion stills and teardown. Encode from native source resolution; do not upscale a draft and call it a final.
5. A portrait opt-in is a separate native portrait chain with its own frame handoffs and posters. Test real delivered dimensions and the requested mobile variant, not just CSS viewport size. Actual Safari/device testing remains a release gate when that hardware/browser is unavailable.

## DONE IF

1. Owner approval of the exact reference artwork/start canvases, selected camera, desktop/mobile choice, provider, spending ceiling and exact prompts is recorded before any paid generation.
2. Every required leg has a real terminal-success job record, downloaded native video, actual boundary frames and billed cost within the approved ceiling; no absent leg is disguised as finished.
3. All real adjacent seams have been inspected forward and backward with no composition jump or velocity reversal; failed seams are corrected rather than relabelled.
4. Browser evidence shows the rendered clips seek through their full durations without blank frames, console errors, hidden controls or lost enquiry access; posters remain when media fails or reduced motion is enabled.
5. Desktop and any approved native portrait chain pass the specified viewport, throttled-decoder, poster/first-frame, route, and orientation checks; unavailable real-device evidence remains explicitly unverified.
6. A non-author can reproduce the local build from the documented install steps and inspect the manifest/source/output mapping. A different-model evaluator reruns at least one actual media or browser check. No broad deployment occurs before owner review.

Business link: make the relationships between the six offers understandable while preserving a direct enquiry path. Conversion uplift is unproven; visual complexity alone does not establish authority.

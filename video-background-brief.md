# AutoApply SA — Looping Hero Video Brief

## Generation prompt

Create a **seamless 8-second horizontal looping background video** for a premium Saudi Arabian job-application service based in Jeddah. The scene should feel like an **editorial operations film**, not an advertisement. Show a single young Saudi professional in modest smart-casual workwear at a dark desk at night, viewed in a medium-wide side angle. Their face should never be the central subject; focus instead on calm, deliberate application work: a hand moving a trackpad, a laptop screen showing only abstract unreadable interface blocks, a printed CV on the desk, and the soft reflection of city lights from a Jeddah office window. The subject works slowly and confidently, with one subtle gaze shift and a small motion of the hand. The beginning and end frames must match closely so the video loops without a jump.

**Composition:** reserve the entire left 46% of the frame as almost-black negative space for white website headline text; position the person and laptop between 58% and 92% of the frame. Keep the right edge darker than the subject so a small website status card can remain visible over it. Use a cinematic 16:9 frame, shallow depth of field, gentle grain, low-key lighting, near-black charcoal palette, warm ivory practical light, and a very restrained signal-vermilion detail only in a tiny laptop interface indicator. Keep the image monochrome-forward with no blue neon, no glossy 3D effects, and no gradients.

**Do not include:** readable UI text, legible company logos, watermarks, subtitles, overt pointing, fast cuts, camera shake, zooms, glitch effects, flashy transitions, smiling-to-camera poses, stock-photo staging, maps, flags, or additional people. Avoid any identifiable personal data on the CV or screen.

## Export requirements

| Requirement | Specification |
|---|---|
| Format | MP4, H.264 AVC baseline or main profile, `yuv420p`, no audio |
| Duration | 8 seconds, seamless loop |
| Resolution | 1920 × 1080 px; also export 1280 × 720 px fallback if available |
| Frame rate | 24 fps or 30 fps, constant frame rate |
| File weight | Aim for **under 3 MB** at 1080p; do not exceed 5 MB |
| Motion | Slow hand/ambient movement only; no cuts or camera movement |
| Safe areas | Keep left 46% and upper-left 18% very dark and clear of visual detail |
| Accessibility | No embedded text, no audio, no flashing or rapid contrast changes |

## Upload instruction

When complete, send the final `.mp4` here. It will be hosted as a production asset and wired into the existing hero component, which automatically plays it only on screens at least 768 px wide and only when the visitor has not requested reduced motion. Mobile visitors will continue to receive the lightweight still-image fallback.

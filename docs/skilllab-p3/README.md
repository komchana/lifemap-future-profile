# Skill Lab Phase 4 / P3 — controlled Guide enablement (frontend only)

Base: Draft PR #4, commit `73c58e4` (Phase 3). Only `exploration.js` changes; `app.js`, `index.html`, CSS, assets are byte-identical to `73c58e4`.

## What changed
- `GUIDE_ENABLED_MISSIONS = Object.freeze(['creator', 'helper-2'])` and `isGuideEnabled(key)` (both exported from `exploration.js`).
- `renderLifeMapGuide` returns an empty string for any other mission, and `mountSkillGuide` returns before binding anything (second, independent gate).
- To enable another mission later: add its key to the list, after its backend mission context and a Thai voice check have been approved.

## Behaviour
| | Guide enabled (`creator`, `helper-2`) | No Guide (the other 13) |
|---|---|---|
| Guide section | Shown, collapsed, exactly as in Phase 3 | **Not rendered at all** (no button, no panel, no "coming soon" text) |
| Activity (steps, answer box and guidance, Evidence form, save, draft, portfolio) | unchanged | unchanged, byte-identical to Phase 3 apart from the missing Guide section |
| Microphone / network | only after the learner taps Start and consents | none: no `getUserMedia`, no `RTCPeerConnection`, no request, no timer |

API contract unchanged: the only request is `POST {missionKey, sdp}` with the pilot-code header, sent only from an enabled mission. Typed answers, scales and drafts never leave the browser (asserted per enabled mission).

## Tests (no OpenAI call, no real microphone, no real secret)
```
NODE_PATH=<dir with puppeteer-core> CHROME=<Chrome binary> node docs/skilllab-p3/p3_qa.cjs
```
Mock WebRTC / microphone / backend / 120 s timer in real Chrome against this checkout. `P3_BASE_REF` (default `73c58e4`) is the approved Phase 3 build the mission screens are compared with. Results are written to `$QA_OUT` (default: a temp folder), not into the repo.
It is the Phase 3 harness adapted for P3, plus: enabled-list checks, 13 no-Guide missions × Thai/English, enabled↔disabled switching (live, connecting, permission prompt open, after timeout, after error, language toggle, "choose a mission"), a defence-in-depth check of the mount gate, a no-private-answer-in-requests check, and no-Guide mobile layout at 360/375/390 px.

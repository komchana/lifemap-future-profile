# Skill Lab — deployed v02 baseline (provenance)

Recorded 2026-10-14 (+07). This commit adds the **exact bytes** of the LifeMap frontend that is published at
`https://ubiquitous-narwhal-a393cf.netlify.app` (Netlify, zip upload — not built from this repository).

* Source of the bytes: `LifeMap-SkillLab-LiveGuide-FounderPilot-v02.zip` (sha256 `f0755d0209829105…5842b`, 332,700 bytes).
  The v01 zip contains byte-identical files (only zip metadata differs).
* Verified on 2026-10-14 08:33–08:40 +07: all 10 files in the zip are byte-identical to the same paths fetched from the live site (see `BASELINE_V02_MANIFEST.sha256`; run `verify-baseline.sh . --live`).
* Base commit: `main` 634955d (2026-09-09). The deployed lineage had diverged from this repository (deployed `app.js` has 8,785 lines vs 6,449 on main), so this commit rewrites those files; no history was removed.
* Cache-bust strings in the published page: `app.js?v=36-opportunity-r2-1`, `exploration.js?v=27-gate1-rc1`, `exploration.css?v=25-phase0-3`, `style.css?v=28-opportunity-mobile-hotfix`, `landing.*?v=24-carousel`.

## Not part of the deployed set (left untouched, not deleted)
`canvas.js`, `wheel.js`, `ambient.mp3`, `index.html.v21_mvp`, and the Markdown notes from the earlier repository lineage. The live site answers 404 for the first four; the deployed `app.js` imports only `./exploration.js` (no `canvas.js`/`wheel.js`).

## Known gaps / unprovable from outside Netlify
* `assets/voice/skill-guide-pilot-01.mp3` is referenced by `exploration.js` (creator static guide) but is **absent** on the live site (404); the zip only contains an empty `assets/voice/` directory (git cannot track empty directories).
* Netlify-side configuration (headers/redirects set in the UI, build settings, environment variables, deploy history) cannot be proven from files; no `_headers`, `_redirects` or `netlify.toml` is published (404).

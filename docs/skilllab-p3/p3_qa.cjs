// Mocked QA for the LifeMap Guide frontend, Phase 4 / P3 (controlled mission enablement).
// Run from anywhere: node docs/skilllab-p3/p3_qa.cjs   (needs puppeteer-core on NODE_PATH and a Chrome binary: CHROME=...)
// Real Chrome + the real exploration.js/css/style.css of this checkout; WebRTC, mic,
// the backend and the 120 s timer are mocked. No real network, mic or secret.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer-core');

const os = require('node:os');
const ROOT = process.env.QA_ROOT || path.resolve(__dirname, '../..');
const OUT = process.env.QA_OUT || path.join(os.tmpdir(), 'lifemap-p3-qa'); fs.mkdirSync(OUT, { recursive: true });
const BASE_REF = process.env.P3_BASE_REF || '73c58e4'; // the approved Phase 3 build the screen must still match
const ENABLED = ['creator', 'helper-2'];
const CHROME = process.env.CHROME || path.join(process.env.HOME, '.cache/puppeteer/chrome/mac-148.0.7778.97/chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.mp3': 'audio/mpeg' };
const BACKEND = 'https://lifemap-voice-lab.netlify.app/.netlify/functions/skill-guide-session';
const FAKE_CODE = 'QA-FAKE-CODE-not-a-real-secret-7781'; // made-up test value
const ALL_KEYS = ['creator', 'creator-2', 'creator-3', 'analyst', 'analyst-2', 'analyst-3', 'builder', 'builder-2', 'builder-3', 'helper', 'helper-2', 'helper-3', 'entrepreneur', 'entrepreneur-2', 'entrepreneur-3'];

const DISABLED = ALL_KEYS.filter((k) => !ENABLED.includes(k));
const results = [];
let currentGroup = '';
const check = (name, ok, detail) => { results.push({ group: currentGroup, name, ok: !!ok, detail }); if (!ok) console.log('  FAIL', name, detail === undefined ? '' : JSON.stringify(detail)); };
const group = (g) => { currentGroup = g; console.log(`\n# ${g}`); };

function silentWav() { const n = 800, b = Buffer.alloc(44 + n * 2); b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22); b.writeUInt32LE(8000, 24); b.writeUInt32LE(16000, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(n * 2, 40); return b; }
function startServer(root = ROOT, stubAudio = true) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, 'http://x');
      if (stubAudio && url.pathname === '/assets/voice/skill-guide-pilot-01.mp3') { res.writeHead(200, { 'Content-Type': 'audio/wav' }); return res.end(silentWav()); }
      let file = url.pathname === '/qa.html' ? path.join(__dirname, 'qa.html') : path.join(root, decodeURIComponent(url.pathname));
      if (url.pathname === '/') file = path.join(root, 'index.html');
      if (!file.startsWith(root) && !file.startsWith(__dirname)) { res.writeHead(403); return res.end(); }
      fs.readFile(file, (err, data) => {
        if (err) { res.writeHead(404); return res.end('nf'); }
        res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
        res.end(data);
      });
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

const MOCKS = `
(() => {
  const qa = window.__qa = { gum: [], streams: [], peers: [], dcs: [], timers: [], cleared: [], audios: 0 };
  class Track { constructor() { this.enabled = true; this.readyState = 'live'; this.stopCalls = 0; } stop() { this.readyState = 'ended'; this.stopCalls++; } }
  class Stream { constructor() { this.t = [new Track()]; } getTracks() { return this.t; } getAudioTracks() { return this.t; } }
  window.__qaGum = { deny: false, delay: 0 };
  Object.defineProperty(navigator.mediaDevices, 'getUserMedia', { configurable: true, value: async (c) => {
    qa.gum.push({ at: performance.now(), constraints: JSON.stringify(c) });
    if (window.__qaGum.delay) await new Promise((r) => setTimeout(r, window.__qaGum.delay));
    if (window.__qaGum.deny) { const e = new Error('denied'); e.name = 'NotAllowedError'; throw e; }
    const s = new Stream(); qa.streams.push(s); return s; } });
  class DC {
    constructor() { this.readyState = 'connecting'; this.sent = []; this.l = {}; this.closeCalls = 0; }
    addEventListener(t, f) { (this.l[t] ||= []).push(f); }
    send(m) { this.sent.push(m); }
    close() { this.closeCalls++; this.readyState = 'closed'; }
    fire(t, ev) { (this.l[t] || []).forEach((f) => f(ev || {})); }
    open() { this.readyState = 'open'; this.fire('open'); }
    msg(obj) { this.fire('message', { data: JSON.stringify(obj) }); }
  }
  class PC {
    constructor() { this.iceGatheringState = 'complete'; this.localDescription = null; this.closeCalls = 0; this.tracks = 0; qa.peers.push(this); }
    addEventListener() {} removeEventListener() {} addTrack() { this.tracks++; }
    createDataChannel() { const d = new DC(); this.dc = d; qa.dcs.push(d); return d; }
    async createOffer() { return { type: 'offer', sdp: 'v=0 QA-FAKE-OFFER' }; }
    async setLocalDescription(o) { this.localDescription = o; }
    async setRemoteDescription(d) { this.remote = d; }
    close() { this.closeCalls++; }
  }
  window.RTCPeerConnection = PC;
  // 120 s soft-cap timer is captured instead of scheduled so tests can fire it by hand.
  const realSet = window.setTimeout.bind(window), realClear = window.clearTimeout.bind(window);
  let nextId = 9e6;
  window.setTimeout = (fn, ms, ...a) => {
    if (ms >= 60000 && ms !== 120000) (qa.otherLong ||= []).push(ms);
    if (ms === 120000) { const id = ++nextId; qa.timers.push({ id, ms, fn, at: performance.now(), cleared: false, fired: false }); return id; }
    return realSet(fn, ms, ...a);
  };
  window.clearTimeout = (id) => { const t = qa.timers.find((x) => x.id === id); if (t) { t.cleared = true; qa.cleared.push(id); return; } return realClear(id); };
  // Observe every state change on the Guide root.
  qa.old = [];
  new MutationObserver((recs) => { for (const r of recs) if (r.attributeName === 'data-guide-state') qa.old.push(r.oldValue); })
    .observe(document, { subtree: true, attributes: true, attributeFilter: ['data-guide-state'], attributeOldValue: true });
  // Ordered list of distinct states the Guide root went through since last reset.
  window.__qaSeq = () => { const cur = document.querySelector('#lmguide')?.dataset.guideState; const raw = [...qa.old.filter((v) => v !== null), cur]; const out = []; for (const v of raw) if (out.at(-1) !== v) out.push(v); return out; };
  window.__qaSeqReset = () => { qa.old = []; };
  window.__qaFireCap = () => { const t = qa.timers.filter((x) => !x.cleared && !x.fired).pop(); if (!t) return false; t.fired = true; t.fn(); return true; };
})();
`;

(async () => {
  const server = await startServer();
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const consoleLines = [];
  page.on('console', (m) => consoleLines.push(`${m.type()}: ${m.text()}`));
  page.on('pageerror', (e) => consoleLines.push(`pageerror: ${e.message}`));

  // Backend mock + network ledger.
  const backend = { status: 200, body: { transport: { sdp: 'v=0 QA-FAKE-ANSWER' } }, delayMs: 0, hold: null };
  const requests = [];
  const external = [];
  await page.setRequestInterception(true);
  page.on('request', async (req) => {
    const u = req.url();
    if (u.startsWith(base)) return req.continue();
    if (u.startsWith(BACKEND)) {
      const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS' };
      if (req.method() === 'OPTIONS') return req.respond({ status: 204, headers: cors });
      requests.push({ url: u, method: req.method(), headers: req.headers(), body: req.postData() });
      if (backend.hold) await backend.hold;
      if (backend.delayMs) await new Promise((r) => setTimeout(r, backend.delayMs));
      return req.respond({ status: backend.status, headers: { ...cors, 'Content-Type': 'application/json' }, body: JSON.stringify(backend.body) });
    }
    external.push(u);
    return req.abort();
  });
  await page.evaluateOnNewDocument(MOCKS);

  const load = async (width = 1024, height = 900) => {
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto(`${base}/qa.html`, { waitUntil: 'load' });
    await page.waitForFunction('window.qaReady === true', { timeout: 15000 });
    requests.length = 0;
  };
  const render = (key, lang = 'th') => page.evaluate((k, l) => window.qa.render(k, l), key, lang);
  const $ = (sel) => page.$(sel);
  const visible = (sel) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return !e.hidden && cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 0 && r.height > 0; }, sel);
  const text = (sel) => page.evaluate((s) => document.querySelector(s)?.textContent ?? null, sel);
  const click = async (sel) => { await page.evaluate((s) => document.querySelector(s).click(), sel); };
  const q = (expr) => page.evaluate(expr);
  const state = () => q('document.querySelector("#lmguide")?.dataset.guideState');
  const settle = (ms = 60) => new Promise((r) => setTimeout(r, ms));
  const waitState = (s) => page.waitForFunction((x) => document.querySelector('#lmguide')?.dataset.guideState === x, { timeout: 5000 }, s);

  async function toConsent(codeIfAsked = FAKE_CODE) {
    await click('#lmguide-cta');
    await click('#lmguide-start');
    if (await visible('[data-lmguide-step="code"]')) {
      await page.type('#lmguide-code-input', codeIfAsked);
      await click('#lmguide-code-next');
    }
  }
  async function allowAndAttach() {
    const prev = await q('window.__qa.peers.length');
    await click('#lmguide-consent-allow');
    await page.waitForFunction((p) => window.__qa.peers.length > p && window.__qa.peers.at(-1).remote !== undefined, { timeout: 5000 }, prev);
  }
  async function connectLive() {
    await allowAndAttach();
    await q('window.__qa.dcs.at(-1).open()');
    await waitState('listening');
  }

  // ------------------------------------------------------------ 1. CTA on all 15
  group('1. Guide CTA only on the enabled missions; the other 13 have no Guide at all');
  await load();
  const keysFromApp = await q('window.qa.keys');
  check('app exposes exactly the 15 expected mission keys', JSON.stringify([...keysFromApp].sort()) === JSON.stringify([...ALL_KEYS].sort()), keysFromApp);
  for (const key of ENABLED) {
    await render(key);
    const info = await q(`(() => { const w = document.querySelector('#experiment-workbench'); const g = w.querySelector('#lmguide'); const cta = w.querySelector('#lmguide-cta'); const layout = w.querySelector('.experiment-layout');
      return { heading: w.querySelector('.experiment-heading')?.dataset.selectedPath, count: w.querySelectorAll('#lmguide').length, ctaText: cta?.textContent.trim(), expanded: cta?.getAttribute('aria-expanded'),
        panelHidden: w.querySelector('#lmguide-panel')?.hidden, inStaticCard: !!w.querySelector('.skilllab-guide-card #lmguide'), beforeLayout: !!(g && layout && (g.compareDocumentPosition(layout) & Node.DOCUMENT_POSITION_FOLLOWING)),
        forms: w.querySelectorAll('form').length, formsInGuide: g ? g.querySelectorAll('form').length : -1, staticCard: !!w.querySelector('.skilllab-guide-card') }; })()`);
    check(`${key}: renders for the selected mission`, info.heading === key, info);
    check(`${key}: exactly one shared CTA, collapsed, Thai text`, info.count === 1 && info.ctaText === '✨ คุยกับ LifeMap Guide' && info.expanded === 'false' && info.panelHidden === true, info);
    check(`${key}: CTA sits before the mission steps/work area and not inside the static card`, info.beforeLayout && !info.inStaticCard, info);
    check(`${key}: static-audio card only for creator`, info.staticCard === (key === 'creator'), info);
    check(`${key}: no <form> added (still exactly one: the Evidence form) and none inside the Guide`, info.forms === 1 && info.formsInGuide === 0, info);
  }
  const exp = await q('({ list: window.qa.ex.GUIDE_ENABLED_MISSIONS, frozen: Object.isFrozen(window.qa.ex.GUIDE_ENABLED_MISSIONS), fn: Object.fromEntries(window.qa.keys.map((k) => [k, window.qa.ex.isGuideEnabled(k)])) })');
  check('GUIDE_ENABLED_MISSIONS is exactly [creator, helper-2] and frozen', JSON.stringify(exp.list) === JSON.stringify(ENABLED) && exp.frozen, exp);
  check('isGuideEnabled is true for exactly the two listed keys and false for the other 13', ALL_KEYS.every((k) => exp.fn[k] === ENABLED.includes(k)) && Object.values(exp.fn).filter(Boolean).length === 2, exp.fn);
  check('isGuideEnabled rejects non-mission input (undefined, null, "", inherited names, arrays)', await q('[undefined, null, "", "constructor", "__proto__", "toString", ["creator"], {}, 0].every((v) => window.qa.ex.isGuideEnabled(v) === false)'));
  check('the enabled list cannot be widened at runtime (push throws, length unchanged)', await q('(() => { try { window.qa.ex.GUIDE_ENABLED_MISSIONS.push("analyst"); } catch (e) {} return window.qa.ex.GUIDE_ENABLED_MISSIONS.length === 2 && !window.qa.ex.isGuideEnabled("analyst"); })()'));
  const ledger0 = { req: requests.length, gum: await q('window.__qa.gum.length'), peers: await q('window.__qa.peers.length') };
  for (const lang of ['th', 'en']) for (const key of DISABLED) {
    await render(key, lang);
    const d = await q(`(() => { const w = document.querySelector('#experiment-workbench'); const t = w.textContent; const layout = w.querySelector('.experiment-layout');
      return { heading: w.querySelector('.experiment-heading')?.dataset.selectedPath, lmguide: w.querySelectorAll('#lmguide, .lmguide, [class*="lmguide"], [id^="lmguide"], [data-lmguide-step]').length, guideState: w.querySelectorAll('[data-guide-state]').length,
        guideWords: /LifeMap Guide|คุยกับ|Talk to|ไมโครโฟน|microphone|Thai voice|เสียงภาษาไทย|เร็ว ๆ นี้|coming soon|ยังไม่พร้อม|not available|unavailable/i.test(t), staticCard: w.querySelectorAll('.skilllab-guide-card').length, audio: w.querySelectorAll('audio').length,
        steps: w.querySelectorAll('.experiment-steps li').length, forms: w.querySelectorAll('form').length, textarea: !!w.querySelector('#experiment-output'), answerGuide: !!w.querySelector('#experiment-output-guide'), save: !!w.querySelector('#experiment-save'),
        disabledButtons: [...w.querySelectorAll('button')].filter((b) => b.disabled).map((b) => b.id || b.textContent.trim()), between: (() => { const out = []; for (let n = w.querySelector('.experiment-heading').nextElementSibling; n && n !== layout; n = n.nextElementSibling) out.push(n.className); return out; })() }; })()`);
    check(`${key}/${lang}: NO Guide markup at all (no section, button, panel, step or state attribute)`, d.lmguide === 0 && d.guideState === 0, d);
    check(`${key}/${lang}: no Guide wording, no "coming soon / unavailable" message, no mic or voice wording, no audio card`, !d.guideWords && d.staticCard === 0 && d.audio === 0, d);
    check(`${key}/${lang}: the activity is intact: heading, 3 steps, answer box with guidance, one Evidence form, save button`, d.heading === key && d.steps === 3 && d.forms === 1 && d.textarea && d.answerGuide && d.save, d);
    check(`${key}/${lang}: no dead or disabled button on the screen; the activity follows the heading directly (only the existing usage tip sits between the heading and the activity)`, d.disabledButtons.length === 0 && JSON.stringify(d.between) === '["try-usage-guide"]', d);
  }
  check('rendering all 13 disabled missions in Thai and English made no backend request, no microphone call, no peer connection', requests.length === ledger0.req && (await q('window.__qa.gum.length')) === ledger0.gum && (await q('window.__qa.peers.length')) === ledger0.peers, [requests.length, ledger0]);
  check('a disabled mission cannot mount a Guide from the exported mount path either (no live Guide object, no timers)', (await q('window.__qa.timers.length')) === 0 && (await q('!document.querySelector("#lmguide")')));
  await render('helper-2', 'en');
  check('English UI CTA text', (await text('#lmguide-cta')) === '✨ Talk to LifeMap Guide · Thai voice', await text('#lmguide-cta'));

  // ------------------------------------------------------------ 2. per-mission expand + request
  group('2. Enabled missions: expand, request carries exact missionKey and nothing else (typed answers never leave the browser)');
  await load();
  for (const key of ENABLED) {
    await render(key);
    const PRIVATE = 'QA-PRIVATE-ANSWER-' + key + '-ไม่ส่งออก';
    await page.evaluate((txt) => { const t = document.querySelector('#experiment-output'); t.value = txt; t.dispatchEvent(new Event('input', { bubbles: true })); const f = document.querySelector('form'); for (const n of ['enjoyment', 'difficulty']) f.querySelector(`input[name="${n}"][value="4"]`).click(); f.querySelector('input[name="nextChoice"][value="continue"]').click(); }, PRIVATE);
    const gumAtLoad = await q('window.__qa.gum.length');
    await click('#lmguide-cta');
    check(`${key}: tapping CTA expands inline (intro visible, helper line shown)`, (await visible('[data-lmguide-step="intro"]')) && (await text('.lmguide-helper')) === 'Guide ช่วยคิดและอธิบาย แต่ไม่ทำภารกิจแทนคุณ' && (await q('document.querySelector("#lmguide-cta").getAttribute("aria-expanded")')) === 'true');
    const gumBefore = await q('window.__qa.gum.length');
    check(`${key}: no microphone call just from expanding`, gumBefore === gumAtLoad, [gumAtLoad, gumBefore]);
    await click('#lmguide-start');
    if (await visible('[data-lmguide-step="code"]')) { await page.type('#lmguide-code-input', FAKE_CODE); await click('#lmguide-code-next'); }
    check(`${key}: consent step shown before any mic call`, (await visible('[data-lmguide-step="consent"]')) && (await q('window.__qa.gum.length')) === gumBefore);
    requests.length = 0;
    await allowAndAttach();
    const req = requests.at(-1);
    let body = null; try { body = JSON.parse(req.body); } catch {}
    check(`${key}: POST to the skill-guide-session endpoint`, req && req.method === 'POST' && req.url === BACKEND, req && req.url);
    check(`${key}: body is exactly {missionKey, sdp} with this key`, body && JSON.stringify(Object.keys(body).sort()) === '["missionKey","sdp"]' && body.missionKey === key && body.sdp === 'v=0 QA-FAKE-OFFER', body && Object.keys(body));
    check(`${key}: headers = Content-Type + pilot-code header`, req.headers['content-type'] === 'application/json' && req.headers['x-lifemap-skill-guide-code'] === FAKE_CODE);
    const raw = req.body;
    const sentMissionText = await q(`(() => { const p = window.qa.ex.paths['${key}']; const needles = [p.th, p.en, ...p.task, ...p.steps.flat(), ...p.prompt]; return needles.filter(Boolean); })()`);
    check(`${key}: no mission title/task/steps/prompt text in the request`, sentMissionText.every((n) => !raw.includes(n)));
    const allSent = JSON.stringify(requests.map((r) => [r.url, r.headers, r.body])) + JSON.stringify(await q('window.__qa.dcs.map((d) => d.sent)'));
    check(`${key}: the typed answer, reflection scales and draft never appear in any request, header or data-channel message`, !allSent.includes(PRIVATE) && !allSent.includes('QA-PRIVATE') && !/enjoyment|difficulty|nextChoice|"output"|evidence|reflection/i.test(req.body), req.body.slice(0, 120));
    check(`${key}: nothing in the URL or body carries the pilot code`, !req.url.includes(FAKE_CODE) && !raw.includes(FAKE_CODE));
    await q('window.__qa.dcs.at(-1).open()');
    await waitState('listening');
    await click('#lmguide-end');
    await waitState('ended');
  }

  // ------------------------------------------------------------ 3. pilot code lifecycle
  group('3. Pilot code: first session asks, second mission reuses, reload clears');
  await load();
  await render('creator');
  await click('#lmguide-cta'); await click('#lmguide-start');
  check('first session asks for the pilot code', await visible('[data-lmguide-step="code"]'));
  check('code field is a password field, not pre-filled', (await q('document.querySelector("#lmguide-code-input").type')) === 'password' && (await q('document.querySelector("#lmguide-code-input").value')) === '');
  await page.type('#lmguide-code-input', FAKE_CODE); await click('#lmguide-code-next');
  check('code field emptied immediately after Next', (await q('document.querySelector("#lmguide-code-input").value')) === '');
  check('consent step follows the code step (mic not yet requested)', (await visible('[data-lmguide-step="consent"]')) && (await q('window.__qa.gum.length')) === 0);
  await allowAndAttach(); await q('window.__qa.dcs.at(-1).open()'); await waitState('listening');
  await click('#lmguide-end'); await waitState('ended');
  await render('helper-2');
  await click('#lmguide-cta'); await click('#lmguide-start');
  check('second mission, same page: code NOT asked again, goes straight to consent', (await visible('[data-lmguide-step="consent"]')) && !(await visible('[data-lmguide-step="code"]')));
  check('second session still needs its own explicit consent (no new mic call yet)', (await q('window.__qa.gum.length')) === 1);
  requests.length = 0;
  await allowAndAttach();
  check('second mission reuses the in-memory code in the header', requests.at(-1).headers['x-lifemap-skill-guide-code'] === FAKE_CODE && JSON.parse(requests.at(-1).body).missionKey === 'helper-2');
  await q('window.__qa.dcs.at(-1).open()'); await waitState('listening');
  await click('#lmguide-end'); await waitState('ended');
  await click('#lmguide-retry');
  check('"Talk again" after a session goes to consent again, not straight to the mic', (await visible('[data-lmguide-step="consent"]')) && (await q('window.__qa.gum.length')) === 2);
  await load(); await render('creator');
  await click('#lmguide-cta'); await click('#lmguide-start');
  check('after reload/reset the code is gone and is requested again', await visible('[data-lmguide-step="code"]'));

  // ------------------------------------------------------------ 4. persistence scan
  group('4. Pilot code is never persisted or exposed');
  await load(); await render('helper-2');
  await toConsent();
  await allowAndAttach(); await q('window.__qa.dcs.at(-1).open()'); await waitState('listening');
  const scan = await page.evaluate(async (code) => {
    const hits = [];
    const has = (s) => typeof s === 'string' && s.includes(code);
    for (const store of [localStorage, sessionStorage]) for (let i = 0; i < store.length; i++) { const k = store.key(i); if (has(k) || has(store.getItem(k))) hits.push('storage:' + k); }
    if (has(document.cookie)) hits.push('cookie');
    if (has(location.href)) hits.push('url');
    const dbs = (indexedDB.databases ? await indexedDB.databases() : []);
    for (const el of document.querySelectorAll('*')) {
      for (const a of el.attributes) if (has(a.value) || has(a.name)) hits.push('attr:' + el.tagName + '[' + a.name + ']');
      if ('value' in el && has(el.value)) hits.push('value:' + el.tagName + '#' + el.id);
      if (el.childElementCount === 0 && has(el.textContent)) hits.push('text:' + el.tagName);
    }
    return { hits, dbs: dbs.length, lsKeys: Object.keys(localStorage), ssKeys: Object.keys(sessionStorage) };
  }, FAKE_CODE);
  check('code not in localStorage/sessionStorage/cookie/URL/DOM attributes/input values/text', scan.hits.length === 0, scan);
  check('no IndexedDB databases created', scan.dbs === 0, scan.dbs);
  check('no console output contains the code', consoleLines.every((l) => !l.includes(FAKE_CODE)), consoleLines.filter((l) => l.includes(FAKE_CODE)));
  check('the only place the code travels is the one header to the backend', requests.every((r) => !r.url.includes(FAKE_CODE) && !(r.body || '').includes(FAKE_CODE) && r.headers['x-lifemap-skill-guide-code'] === FAKE_CODE) && requests.length === 1, requests.length);
  const analyticsCalls = external.filter((u) => !u.includes('fonts.g'));
  check('no other outbound request was made (no analytics beacon)', analyticsCalls.length === 0, analyticsCalls);
  await click('#lmguide-end'); await waitState('ended');

  // ------------------------------------------------------------ 5. wrong code
  group('5. Wrong code shows the backend error and does not persist');
  await load(); await render('creator');
  backend.status = 401; backend.body = { error: 'รหัสทดลองไม่ถูกต้อง (QA mock)' };
  await toConsent('WRONG-QA-CODE-1');
  await click('#lmguide-consent-allow'); await waitState('error');
  check('error state reached', (await state()) === 'error');
  check('backend error message is shown in the Guide', (await text('#lmguide-message')) === 'รหัสทดลองไม่ถูกต้อง (QA mock)', await text('#lmguide-message'));
  check('mic stream released after the failure', await q('window.__qa.streams.every((s) => s.t.every((t) => t.readyState === "ended"))'));
  check('peer connection closed after the failure', await q('window.__qa.peers.every((p) => p.closeCalls > 0)'));
  await click('#lmguide-retry');
  check('rejected code was dropped: retry asks for the code again', await visible('[data-lmguide-step="code"]'));
  const wrongScan = await page.evaluate((c) => ({ ls: JSON.stringify(localStorage).includes(c), ss: JSON.stringify(sessionStorage).includes(c), html: document.documentElement.outerHTML.includes(c) }), 'WRONG-QA-CODE-1');
  check('wrong code not persisted anywhere', !wrongScan.ls && !wrongScan.ss && !wrongScan.html, wrongScan);
  backend.status = 200; backend.body = { transport: { sdp: 'v=0 QA-FAKE-ANSWER' } };

  // ------------------------------------------------------------ 6. mic denied / sequence
  group('6. Microphone consent order and denial');
  await load(); await render('creator');
  await click('#lmguide-cta'); await click('#lmguide-start');
  await page.type('#lmguide-code-input', FAKE_CODE); await click('#lmguide-code-next');
  check('before consent click: zero getUserMedia calls', (await q('window.__qa.gum.length')) === 0);
  await click('#lmguide-consent-cancel');
  check('cancelling consent: still zero getUserMedia calls and panel collapsed', (await q('window.__qa.gum.length')) === 0 && (await visible('#lmguide-panel')) === false);
  await q('window.__qaGum.deny = true');
  await click('#lmguide-cta'); await click('#lmguide-start'); await click('#lmguide-consent-allow'); await waitState('error');
  check('permission denial → error state with a clear message', (await text('#lmguide-message')).includes('ไมโครโฟน'), await text('#lmguide-message'));
  check('no backend request when the microphone is denied', requests.length === 0);
  check('denial keeps the code in memory (retry goes to consent)', await (async () => { await click('#lmguide-retry'); return visible('[data-lmguide-step="consent"]'); })());

  // ------------------------------------------------------------ 7. teardown + states
  group('7. Teardown, state machine, 120 s cap');
  await load(); await render('creator');
  await toConsent();
  const clickTime = await q('performance.now()');
  await allowAndAttach();
  check('state is connecting before the data channel opens', (await state()) === 'connecting');
  check('no 120 s timer exists after the button click (before data channel open)', (await q('window.__qa.timers.length')) === 0);
  await q('window.__qa.dcs.at(-1).open()'); await waitState('listening');
  const timers = await q('window.__qa.timers.map((t) => ({ ms: t.ms, cleared: t.cleared }))');
  check('exactly one 120000 ms timer, created only when the data channel opened', timers.length === 1 && timers[0].ms === 120000, timers);
  check('listening is the connected neutral state; "speaking" label never entered', (await q('window.__qaSeq().join(">")')) === 'idle>connecting>listening', await q('window.__qaSeq().join(">")'));
  await q('window.__qa.dcs.at(-1).msg({ type: "conversation.item.input_audio_transcription.completed", transcript: "สวัสดี QA" })');
  check('transcript line appears for a transcript event', (await text('#lmguide-transcript')).includes('สวัสดี QA'));
  await click('#lmguide-mute');
  check('mute disables the track', await q('window.__qa.streams.at(-1).t[0].enabled === false') && (await q('document.querySelector("#lmguide-mute").getAttribute("aria-pressed")')) === 'true');
  await q('window.__qaFireCap()');
  await waitState('ended');
  const seq = await q('window.__qaSeq().join(">")');
  check('cap path goes listening → ending → ended', seq === 'idle>connecting>listening>ending>ended', seq);
  const dc = await q('({ sent: window.__qa.dcs.at(-1).sent, closeCalls: window.__qa.dcs.at(-1).closeCalls })');
  check('cap sends session.close when the channel is open', dc.sent.length === 1 && JSON.parse(dc.sent[0]).type === 'session.close', dc);
  check('cap closes the data channel', dc.closeCalls >= 1, dc);
  check('cap closes the peer connection', await q('window.__qa.peers.at(-1).closeCalls >= 1'));
  check('cap stops every mic track', await q('window.__qa.streams.at(-1).t.every((t) => t.readyState === "ended" && t.stopCalls >= 1)'));
  check('cap result message states the 120 s soft limit', (await text('#lmguide-message')).includes('120'), await text('#lmguide-message'));
  check('no other long timer (e.g. a leftover 90000 ms cap) was ever scheduled', !(await q('window.__qa.otherLong')) , await q('window.__qa.otherLong'));
  check('the soft-cap timer is a client-side setTimeout (no server quota claimed in UI copy)', !(await q('document.querySelector("#lmguide").textContent')).match(/quota|โควต้า/i));

  // End button
  await load(); await render('helper-2');
  await toConsent(); await connectLive();
  await click('#lmguide-end'); await waitState('ended');
  const seq2 = await q('window.__qaSeq().join(">")');
  check('End button path: listening → ending → ended, session.close sent, timer cleared', seq2 === 'idle>connecting>listening>ending>ended' && (await q('JSON.parse(window.__qa.dcs.at(-1).sent[0]).type')) === 'session.close' && (await q('window.__qa.timers[0].cleared')), seq2);
  check('End: peer, data channel and all mic tracks closed', await q('window.__qa.peers.at(-1).closeCalls >= 1 && window.__qa.dcs.at(-1).closeCalls >= 1 && window.__qa.streams.at(-1).t.every((t) => t.readyState === "ended")'));

  // Remote close
  await load(); await render('creator');
  await toConsent(); await connectLive();
  await q('window.__qa.dcs.at(-1).msg({ type: "session.closed" })'); await waitState('ended');
  check('remote session.closed ends cleanly and releases media', await q('window.__qa.streams.at(-1).t.every((t) => t.readyState === "ended") && window.__qa.peers.at(-1).closeCalls >= 1'));
  await click('#lmguide-retry'); await allowAndAttach();
  check('a second session after ended gets a fresh mic stream (explicit consent each time)', (await q('window.__qa.gum.length')) === 2 && (await q('window.__qa.streams.length')) === 2);
  await q('window.__qa.dcs.at(-1).open()'); await waitState('listening');
  check('mute button reset for the new session', (await text('#lmguide-mute')) === 'ปิดไมค์' && (await q('document.querySelector("#lmguide-mute").getAttribute("aria-pressed")')) === 'false');
  await click('#lmguide-end'); await waitState('ended');

  // data channel closing by itself
  await load(); await render('helper-2');
  await toConsent(); await connectLive();
  await q('window.__qa.dcs.at(-1).fire("close")'); await waitState('ended');
  check('data channel closing on its own ends the session and releases media', await q('window.__qa.streams.at(-1).t.every((t) => t.readyState === "ended")'));

  // mission change while live
  await load(); await render('creator');
  await toConsent(); await connectLive();
  await render('helper-2');
  check('mission change while LISTENING tears everything down (mic, dc, peer, timer)', await q('(() => { const q = window.__qa; return q.streams.at(-1).t.every((t) => t.readyState === "ended") && q.dcs.at(-1).closeCalls >= 1 && q.peers.at(-1).closeCalls >= 1 && q.timers[0].cleared; })()'));
  check('new mission renders a fresh idle Guide for the new key', (await state()) === 'idle' && (await q('document.querySelector(".experiment-heading").dataset.selectedPath')) === 'helper-2');

  // mission change during connecting (fetch in flight)
  await load(); await render('creator');
  await toConsent();
  let release; backend.hold = new Promise((r) => { release = r; });
  await click('#lmguide-consent-allow');
  await page.waitForFunction('window.__qa.peers.length === 1 && window.__qa.peers[0].dc', { timeout: 5000 });
  await settle(100);
  check('request is in flight while still connecting', (await state()) === 'connecting' && requests.length === 1);
  await render('helper-2');
  check('mission change DURING CONNECTING stops the mic and closes the peer immediately', await q('window.__qa.streams.at(-1).t.every((t) => t.readyState === "ended") && window.__qa.peers.at(-1).closeCalls >= 1'));
  release(); backend.hold = null; await settle(200);
  check('the late backend answer is ignored: no 120 s timer, still idle, no leaked connection', (await state()) === 'idle' && (await q('window.__qa.timers.length')) === 0 && (await q('window.__qa.peers.length')) === 1);

  // mission change while the browser permission prompt is open
  await load(); await render('helper-2');
  await toConsent();
  await q('window.__qaGum.delay = 300');
  await click('#lmguide-consent-allow');
  await settle(50);
  await render('creator');
  await settle(500);
  check('mission change while the permission prompt is open: stream granted late is stopped at once', await q('window.__qa.streams.length === 1 && window.__qa.streams[0].t.every((t) => t.readyState === "ended")') && (await q('window.__qa.peers.length')) === 0 && requests.length === 0);

  // language toggle re-render and "choose another mission" re-render tear down
  await load(); await render('creator');
  await toConsent(); await connectLive();
  await render('creator', 'en');
  check('language re-render tears down a live session', await q('window.__qa.streams.at(-1).t.every((t) => t.readyState === "ended") && window.__qa.peers.at(-1).closeCalls >= 1'));
  await render('creator', 'en'); await toConsent(); await connectLive();
  await render(null);
  check('returning to the "choose a mission" state (no selection) tears down a live session', await q('window.__qa.streams.at(-1).t.every((t) => t.readyState === "ended") && window.__qa.peers.at(-1).closeCalls >= 1'));

  // view hidden by the app (display:none) while live → ends; scrolled away → does not
  await load(); await render('creator');
  await toConsent(); await connectLive();
  await q('window.scrollTo(0, document.body.scrollHeight)'); await settle(150);
  check('scrolling the Guide out of view does NOT end the session', (await state()) === 'listening');
  await q('document.querySelector("#experiment-workbench").style.display = "none"'); await settle(900);
  check('hiding the screen (display:none, as the app does when switching views) ends the live session', (await state()) === 'ended' && await q('window.__qa.streams.at(-1).t.every((t) => t.readyState === "ended") && window.__qa.peers.at(-1).closeCalls >= 1 && window.__qa.timers[0].cleared'));
  await q('document.querySelector("#experiment-workbench").style.display = ""');
  // the app's own mechanism: .view-panel { visibility:hidden } on an ancestor
  await load(); await render('helper-2');
  await toConsent(); await connectLive();
  await q('document.querySelector("#experiment-workbench").style.visibility = "hidden"'); await settle(900);
  check('ancestor visibility:hidden (how the real app hides inactive views) ends the live session', (await state()) === 'ended' && await q('window.__qa.streams.at(-1).t.every((t) => t.readyState === "ended") && window.__qa.peers.at(-1).closeCalls >= 1'));

  // beforeunload
  await load(); await render('helper-2');
  await toConsent(); await connectLive();
  await q('window.dispatchEvent(new Event("beforeunload"))');
  check('beforeunload releases the mic and peer', await q('window.__qa.streams.at(-1).t.every((t) => t.readyState === "ended") && window.__qa.peers.at(-1).closeCalls >= 1'));

  // ------------------------------------------------------------ 7c. Continue after the soft cap
  group('7c. Continue after the 120 s soft cap (no re-consent, fresh mic + session)');
  const liveStreams = () => q('window.__qa.streams.filter((s) => s.t.some((t) => t.readyState === "live")).length');
  const visibleStep = (n) => visible(`[data-lmguide-step="${n}"]`);
  const timeoutNow = async () => { await q('window.__qaFireCap()'); await waitState('ended'); };
  const watchConsent = () => q('(() => { window.__consentSeen = false; const st = document.querySelector("[data-lmguide-step=consent]"); new MutationObserver(() => { if (!st.hidden) window.__consentSeen = true; }).observe(st, { attributes: true, attributeFilter: ["hidden"] }); })()');
  const attachedAfter = (prev) => page.waitForFunction((p) => window.__qa.peers.length > p && window.__qa.peers.at(-1).remote !== undefined, { timeout: 5000 }, prev);

  await load(); await render('helper-2');
  await toConsent(); await connectLive();
  await timeoutNow();
  check('timeout: "Continue talking" is offered and "Talk again" is hidden', (await visible('#lmguide-continue')) === true && (await visible('#lmguide-retry')) === false && (await text('#lmguide-continue')) === 'คุยต่อ');
  check('timeout: message states the 120 s limit', (await text('#lmguide-message')).includes('120'));
  check('timeout: session closed exactly as before (session.close sent, channel, peer, remote audio, every track)', await q('(() => { const q = window.__qa; return JSON.parse(q.dcs[0].sent[0]).type === "session.close" && q.dcs[0].closeCalls >= 1 && q.peers[0].closeCalls >= 1 && q.streams[0].t.every((t) => t.readyState === "ended") && q.timers[0].fired; })()'));
  check('(7) while sitting in the timed-out state NO microphone stream is live', (await liveStreams()) === 0);
  const before = await q('({ gum: window.__qa.gum.length, peers: window.__qa.peers.length, streams: window.__qa.streams.length })');
  const reqsBefore = requests.length;
  await watchConsent();
  const atClick = await page.evaluate(() => { document.querySelector('#lmguide-continue').click(); return { state: document.querySelector('#lmguide').dataset.guideState, consentHidden: document.querySelector('[data-lmguide-step="consent"]').hidden, codeHidden: document.querySelector('[data-lmguide-step="code"]').hidden }; });
  check('(1) Continue goes straight to connecting: consent step not shown, code step not shown', atClick.state === 'connecting' && atClick.consentHidden && atClick.codeHidden, atClick);
  await attachedAfter(before.peers);
  check('(1) consent step never became visible at any point during the continuation', (await q('window.__consentSeen')) === false);
  const after = await q('({ gum: window.__qa.gum.length, peers: window.__qa.peers.length, streams: window.__qa.streams.length })');
  check('(2) Continue made a fresh getUserMedia call and a fresh stream', after.gum === before.gum + 1 && after.streams === before.streams + 1, [before, after]);
  check('(3) Continue created a new peer connection and a new backend session with the same mission and in-memory code', after.peers === before.peers + 1 && requests.length === reqsBefore + 1 && JSON.parse(requests.at(-1).body).missionKey === 'helper-2' && requests.at(-1).headers['x-lifemap-skill-guide-code'] === FAKE_CODE, [requests.length, reqsBefore]);
  check('(7) the previous stream stays stopped and exactly one stream is live', (await q('window.__qa.streams[0].t.every((t) => t.readyState === "ended" && t.stopCalls >= 1)')) && (await liveStreams()) === 1);
  await q('window.__qa.dcs.at(-1).open()'); await waitState('listening');
  check('continued session reaches listening and starts its own 120000 ms timer on data-channel open', (await q('window.__qa.timers.length')) === 2 && (await q('window.__qa.timers[1].ms')) === 120000);
  // a second timeout offers Continue again; still one live stream at a time
  await timeoutNow();
  check('(7) second timeout: continuation offered again, previous mic closed, no live stream', (await visible('#lmguide-continue')) === true && (await liveStreams()) === 0 && (await q('window.__qa.streams[1].t.every((t) => t.readyState === "ended")')));
  await click('#lmguide-continue'); await attachedAfter(after.peers); await q('window.__qa.dcs.at(-1).open()'); await waitState('listening');
  check('(7) third session: only one live stream at any time, all earlier streams ended', (await liveStreams()) === 1 && (await q('window.__qa.streams.slice(0, -1).every((s) => s.t.every((t) => t.readyState === "ended"))')) && (await q('window.__qa.gum.length')) === 3);
  // (4) manual end → consent required
  const gumBeforeManual = await q('window.__qa.gum.length');
  await click('#lmguide-end'); await waitState('ended');
  check('(4) manual end: no Continue; "Talk again" shown instead', (await visible('#lmguide-continue')) === false && (await visible('#lmguide-retry')) === true);
  await click('#lmguide-retry');
  check('(4) manual end → restart: consent step required, microphone not requested yet', (await visibleStep('consent')) === true && (await q('window.__qa.gum.length')) === gumBeforeManual);

  // Close the panel after a timeout → consent required
  await load(); await render('helper-2');
  await toConsent(); await connectLive(); await timeoutNow();
  await click('#lmguide-result-close'); await click('#lmguide-cta');
  check('closing the panel after a timeout drops the continuation: reopening shows the intro, not Continue', (await visibleStep('intro')) === true && (await q('document.querySelector("#lmguide-continue").hidden')) === true);
  await click('#lmguide-start');
  check('closing the panel after a timeout → restart: consent required', (await visibleStep('consent')) === true);

  // (5) mission change → consent required
  await load(); await render('helper-2');
  await toConsent(); await connectLive(); await timeoutNow();
  const gumBeforeSwitch = await q('window.__qa.gum.length');
  await render('creator');
  check('(5) mission change after a timeout: fresh idle Guide with no Continue', (await state()) === 'idle' && (await q('document.querySelector("#lmguide-continue").hidden')) === true);
  await click('#lmguide-cta'); await click('#lmguide-start');
  check('(5) mission change → restart: code reused from memory but consent required again; no mic call', (await visibleStep('consent')) === true && (await visibleStep('code')) === false && (await q('window.__qa.gum.length')) === gumBeforeSwitch);
  // language / view lifecycle: same mission re-rendered
  await load(); await render('helper-2');
  await toConsent(); await connectLive(); await timeoutNow();
  await render('helper-2', 'en');
  check('language/view re-render after a timeout drops the continuation', (await state()) === 'idle' && (await q('document.querySelector("#lmguide-continue").hidden')) === true);
  await click('#lmguide-cta'); await click('#lmguide-start');
  check('language/view re-render → restart: consent required', (await visibleStep('consent')) === true);
  // leaving the view (visibility hidden) after a timeout, then a re-render as the real app does on return
  await load(); await render('helper-2');
  await toConsent(); await connectLive(); await timeoutNow();
  await q('document.querySelector("#experiment-workbench").style.visibility = "hidden"'); await settle(100);
  await q('document.querySelector("#experiment-workbench").style.visibility = ""');
  await render('helper-2');
  await click('#lmguide-cta'); await click('#lmguide-start');
  check('leaving and re-entering the Skill Lab view after a timeout: consent required', (await visibleStep('consent')) === true && (await q('document.querySelector("#lmguide-continue").hidden')) === true);
  // error ends the flow → consent required
  await load(); await render('helper-2');
  await toConsent(); await connectLive(); await timeoutNow();
  backend.status = 500; backend.body = { error: 'QA backend failure' };
  await click('#lmguide-continue'); await waitState('error');
  check('error during a continuation: error state, Continue gone, mic and peer released', (await visible('#lmguide-continue')) === false && (await liveStreams()) === 0 && (await q('window.__qa.peers.at(-1).closeCalls >= 1')));
  backend.status = 200; backend.body = { transport: { sdp: 'v=0 QA-FAKE-ANSWER' } };
  const gumAfterErr = await q('window.__qa.gum.length');
  await click('#lmguide-retry');
  check('error ends the flow → restart: consent required', (await visibleStep('consent')) === true && (await q('window.__qa.gum.length')) === gumAfterErr);
  // microphone denied on Continue → consent required
  await load(); await render('helper-2');
  await toConsent(); await connectLive(); await timeoutNow();
  await q('window.__qaGum.deny = true');
  await click('#lmguide-continue'); await waitState('error');
  check('microphone denied on Continue: error with a clear message, no backend call, Continue gone', (await text('#lmguide-message')).includes('ไมโครโฟน') && (await visible('#lmguide-continue')) === false);
  await q('window.__qaGum.deny = false'); await click('#lmguide-retry');
  check('after the denial, restart requires consent', (await visibleStep('consent')) === true);
  // remote close / End button are not timeouts
  await load(); await render('helper-2');
  await toConsent(); await connectLive();
  await q('window.__qa.dcs.at(-1).msg({ type: "session.closed" })'); await waitState('ended');
  check('remote close is not a timeout: no Continue', (await visible('#lmguide-continue')) === false && (await visible('#lmguide-retry')) === true);
  // (6) reload/reset → consent required, code asked again
  await load(); await render('helper-2');
  await toConsent(); await connectLive(); await timeoutNow();
  check('(6) before reload: Continue is available', (await visible('#lmguide-continue')) === true);
  await load(); await render('helper-2');
  check('(6) after reload: no Continue', (await q('document.querySelector("#lmguide-continue").hidden')) === true && (await state()) === 'idle');
  await click('#lmguide-cta'); await click('#lmguide-start');
  check('(6) after reload: pilot code asked again (memory cleared)', (await visibleStep('code')) === true);
  await page.type('#lmguide-code-input', FAKE_CODE); await click('#lmguide-code-next');
  check('(6) after reload: consent required before any microphone call', (await visibleStep('consent')) === true && (await q('window.__qa.gum.length')) === 0);
  // continuation flag is not stored anywhere
  const flagScan = await page.evaluate(() => ({ ls: JSON.stringify(localStorage), ss: JSON.stringify(sessionStorage), attrs: [...document.querySelectorAll('*')].some((e) => [...e.attributes].some((a) => /continuefromtimeout|continue-from|data-continue/i.test(a.name + a.value))) }));
  check('continuation flag is not persisted (no storage entries, no DOM attribute)', !/continuefromtimeout|continue-from/i.test(flagScan.ls + flagScan.ss) && !flagScan.attrs, flagScan);

  // state-model unit checks
  group('7b. State model');
  const model = await q('({ states: window.qa.ex.SKILL_GUIDE_STATES, tr: window.qa.ex.SKILL_GUIDE_TRANSITIONS })');
  check('exactly the seven required states', JSON.stringify(model.states) === JSON.stringify(['idle', 'connecting', 'listening', 'speaking', 'ending', 'ended', 'error']), model.states);
  check('speaking is supported by the model (listening↔speaking, speaking→ending/error)', model.tr.listening.includes('speaking') && model.tr.speaking.includes('listening') && model.tr.speaking.includes('ending') && model.tr.speaking.includes('error'));
  check('every transition target is a declared state', Object.values(model.tr).flat().every((s) => model.states.includes(s)));
  check('ended and error can only restart via connecting (so consent is re-required by the UI)', JSON.stringify(model.tr.ended) === '["connecting"]' && JSON.stringify(model.tr.error) === '["connecting"]');

  // ------------------------------------------------------------ 8. fallbacks
  group('8. LINE and no-microphone fallbacks');
  const fallbackCases = [
    ['LINE in-app browser', async () => { await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari Line/14.0.0'); }],
    ['no getUserMedia', async () => { await page.evaluateOnNewDocument(() => { Object.defineProperty(navigator.mediaDevices, 'getUserMedia', { configurable: true, value: undefined }); }); }],
  ];
  for (const [label, setup] of fallbackCases) {
    const fresh = await browser.newPage();
    await fresh.setRequestInterception(true);
    fresh.on('request', (r) => (r.url().startsWith(base) ? r.continue() : r.abort()));
    await fresh.evaluateOnNewDocument(MOCKS);
    const realPage = page;
    // apply setup on the fresh page
    if (label === 'LINE in-app browser') await fresh.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari Line/14.0.0');
    else await fresh.evaluateOnNewDocument(() => { Object.defineProperty(navigator.mediaDevices, 'getUserMedia', { configurable: true, value: undefined }); });
    await fresh.goto(`${base}/qa.html`, { waitUntil: 'load' });
    await fresh.waitForFunction('window.qaReady === true');
    for (const key of ENABLED) {
      await fresh.evaluate((k) => window.qa.render(k, 'th'), key);
      const vis = (s) => fresh.evaluate((x) => { const e = document.querySelector(x); if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== 'hidden'; }, s);
      check(`${label} / ${key}: CTA still compact and present`, await vis('#lmguide-cta'));
      await fresh.evaluate(() => document.querySelector('#lmguide-cta').click());
      check(`${label} / ${key}: shows the static fallback, not the voice start`, (await vis('[data-lmguide-step="fallback"]')) && !(await vis('#lmguide-start')));
      const t = await fresh.evaluate(() => document.querySelector('[data-lmguide-step="fallback"] .lmguide-text').textContent);
      check(`${label} / ${key}: tells the learner to use the on-screen steps and suggests Chrome/Safari`, t.includes('ขั้นตอนบนหน้าจอ') && t.includes('Chrome') && t.includes('Safari'), t);
      check(`${label} / ${key}: points to the static card transcript only for creator, never claims recorded audio`, t.includes('อ่านข้อความแนะนำในการ์ดด้านบน') === (key === 'creator') && !t.includes('ฟังคำแนะนำ'), t);
      const calls = await fresh.evaluate(() => ({ gum: window.__qa.gum.length, peers: window.__qa.peers.length }));
      check(`${label} / ${key}: no voice connection attempted`, calls.gum === 0 && calls.peers === 0, calls);
      await fresh.evaluate(() => document.querySelector('#lmguide-fallback-close').click());
    }
    await fresh.evaluate(() => window.qa.render('creator', 'en'));
    await fresh.evaluate(() => document.querySelector('#lmguide-cta').click());
    const tEn = await fresh.evaluate(() => document.querySelector('[data-lmguide-step="fallback"] .lmguide-text').textContent);
    check(`${label}: English fallback copy`, tEn.includes('steps on screen') && tEn.includes('Chrome or Safari'), tEn);
    await fresh.close();
  }

  // ------------------------------------------------------------ 9. creator static guide
  group('9. Creator static-audio Guide unchanged and separate');
  await load(); await render('creator');
  await q(`(() => { window.__qaStatic = []; ['lifemap:voice_guide_played','lifemap:voice_guide_completed','lifemap:transcript_opened'].forEach((n) => window.addEventListener(n, (e) => window.__qaStatic.push(n + ':' + e.detail.mission))); })()`);
  const staticInfo = await q(`(() => { const c = document.querySelector('.skilllab-guide-card'); return { has: !!c, play: !!c.querySelector('#skilllab-guide-play'), replay: !!c.querySelector('#skilllab-guide-replay'), toggle: !!c.querySelector('#skilllab-guide-transcript-toggle'), nestedConversation: !!c.querySelector('#lmguide, .skilllab-conversation, #skillguide-conversation'), audioSrc: c.querySelector('audio').getAttribute('src'), sibling: c.nextElementSibling?.id }; })()`);
  check('static card present with play/replay/transcript controls', staticInfo.has && staticInfo.play && staticInfo.replay && staticInfo.toggle, staticInfo);
  check('static card has no nested conversation; shared Guide is its next sibling', !staticInfo.nestedConversation && staticInfo.sibling === 'lmguide', staticInfo);
  check('static card still points at the recorded audio asset', staticInfo.audioSrc === 'assets/voice/skill-guide-pilot-01.mp3', staticInfo.audioSrc);
  await click('#skilllab-guide-transcript-toggle');
  check('transcript toggle still works', (await visible('#skilllab-guide-transcript')) === true && (await q('document.querySelector("#skilllab-guide-transcript-toggle").getAttribute("aria-expanded")')) === 'true');
  await click('#skilllab-guide-transcript-toggle');
  check('transcript toggle collapses again', (await visible('#skilllab-guide-transcript')) === false);
  await q(`(() => { const a = document.querySelector('#skilllab-guide-audio'); a.play = () => Promise.resolve(); document.querySelector('#skilllab-guide-play').click(); a.dispatchEvent(new Event('ended')); })()`);
  const staticEvents = await q('window.__qaStatic');
  check('static Guide still dispatches played / completed / transcript_opened events with mission=creator', JSON.stringify(staticEvents) === JSON.stringify(['lifemap:transcript_opened:creator', 'lifemap:voice_guide_played:creator', 'lifemap:voice_guide_completed:creator']), staticEvents);
  check('static audio does not touch the live Guide (no mic, no peer)', (await q('window.__qa.gum.length')) === 0 && (await q('window.__qa.peers.length')) === 0);
  await render('helper');
  check('non-creator missions have no static-audio card', (await q('document.querySelectorAll(".skilllab-guide-card").length')) === 0);

  // ------------------------------------------------------------ 9b. parity vs baseline
  group('9b. Rendered mission screen vs the approved Phase 3 build (Guide markup excluded): all 15 missions, Thai and English, byte-identical');
  const baseRoot = path.join(OUT, 'baseline_root');
  fs.rmSync(baseRoot, { recursive: true, force: true });
  fs.mkdirSync(baseRoot, { recursive: true });
  for (const f of ['app.js', 'style.css', 'index.html']) fs.copyFileSync(path.join(ROOT, f), path.join(baseRoot, f));
  fs.cpSync(path.join(ROOT, 'assets'), path.join(baseRoot, 'assets'), { recursive: true });
  const gitShow = (f) => require('node:child_process').execFileSync('git', ['show', `${BASE_REF}:${f}`], { cwd: ROOT, maxBuffer: 1 << 26 });
  fs.writeFileSync(path.join(baseRoot, 'exploration.js'), gitShow('exploration.js'));
  fs.writeFileSync(path.join(baseRoot, 'exploration.css'), gitShow('exploration.css'));
  const baseServer = await startServer(baseRoot, true);
  const basePage = await browser.newPage();
  await basePage.setRequestInterception(true);
  basePage.on('request', (r) => (r.url().startsWith(`http://127.0.0.1:${baseServer.address().port}`) ? r.continue() : r.abort()));
  await basePage.setViewport({ width: 1024, height: 900 });
  await basePage.goto(`http://127.0.0.1:${baseServer.address().port}/qa.html`, { waitUntil: 'load' });
  await basePage.waitForFunction('window.qaReady === true');
  await load();
  const TASK = null; // nothing is masked: the Phase 3 task lines are the approved ones
  const MASK = TASK;
  const snap = (p, k, l, mask) => p.evaluate((key, lang, m) => { window.qa.render(key, lang); const w = document.querySelector('#experiment-workbench').cloneNode(true); w.querySelector('#lmguide')?.remove(); w.querySelector('#skillguide-conversation')?.remove(); if (m) for (const sel of m) w.querySelectorAll(sel).forEach((e) => e.remove()); return w.innerHTML; }, k, l, mask || null);
  for (const lang of ['th', 'en']) {
    for (const key of ALL_KEYS) {
      const [a, b] = [await snap(basePage, key, lang, TASK), await snap(page, key, lang, TASK)];
      check(`${key}/${lang}: the whole mission screen, apart from the Guide section, is identical to the approved Phase 3 build`, a === b, a === b ? '' : { baseLen: a.length, newLen: b.length });
    }
  }
  await basePage.close(); baseServer.close();
  fs.rmSync(baseRoot, { recursive: true, force: true });

  // ------------------------------------------------------------ 9d. approved task lines
  group('9d. All 15 task lines (ลองทำ:) match the approved wording, Thai and English');
  const APPROVED = JSON.parse(fs.readFileSync(path.join(__dirname, 'taskline-approved.json'), 'utf8'));
  await load();
  for (const lang of ['th', 'en']) for (const key of ALL_KEYS) {
    await render(key, lang);
    const line = await q('document.querySelector(".experiment-heading > div > p:last-of-type").textContent');
    const want = lang === 'th' ? `ลองทำ: ${APPROVED.th[key]} · 10 นาที` : `Try: ${APPROVED.en[key]} · 10 min`;
    check(`${key}/${lang}: header task line is the approved wording`, line === want, line);
  }
  const tasks = await q('Object.entries(window.qa.ex.paths).map(([k, p]) => [k, p.task[0], p.task[1]])');
  check('every Thai task line is a full instruction: 60-100 characters, no leading abstract label (ฝึก/เข้าใจ/วิเคราะห์/ออกแบบ)', tasks.every(([k, th]) => [...th].length >= 60 && [...th].length <= 100 && !/^(ฝึก|เข้าใจ|วิเคราะห์|ออกแบบ)/.test(th)), tasks.map(([k, th]) => [k, [...th].length]).filter(([k, n]) => n < 60 || n > 100));
  check('Thai task lines address the learner only as "คุณ" (no ฉัน/เธอ/น้อง/ผม/เรา)', tasks.every(([k, th]) => !/ฉัน|เธอ|น้อง|ผม|เรา/.test(th)), tasks.filter(([k, th]) => /ฉัน|เธอ|น้อง|ผม|เรา/.test(th)).map((x) => x[0]));
  check('English task lines are full sentences ending with a full stop', tasks.every(([k, th, en]) => en.length >= 50 && en.endsWith('.')), tasks.filter(([k, th, en]) => !en.endsWith('.')).map((x) => x[0]));
  check('exactly 15 task lines, all distinct', new Set(tasks.map((x) => x[1])).size === 15 && tasks.length === 15);
  await q("document.querySelector('#experiment-workbench').replaceChildren()");

  // ------------------------------------------------------------ 9c. helper-2 content alignment
  group('9c. helper-2: one skill, one conversation (content alignment)');
  await load();
  const REFLECT = 'ถ้าฉันเข้าใจถูก ช่วงนี้คุณหนักเพราะต้องทำงานเดิมให้เสร็จ พร้อมกับแบ่งเวลาไปสอนคนใหม่ด้วย ใช่ไหม';
  const LEFTOVERS_TH = ['สะท้อนความต้องการ', 'จัดกระเป๋า', 'เตรียมให้ครบ', 'ตารางเรียน', 'ขั้นตอนง่าย ๆ', 'ตัดคำ', 'ดินสอ', 'เขียนคู่มือ'];
  const LEFTOVERS_EN = ['reflect a need', 'packing', 'school bag', 'timetable', 'checklist', 'simple steps', 'too long', 'shortened', 'pencils', 'guide about'];
  for (const lang of ['th', 'en']) {
    await render('helper-2', lang);
    const h = await q(`(() => { const w = document.querySelector('#experiment-workbench'); const li = (s) => [...w.querySelectorAll(s)].map((e) => e.textContent.trim());
      return { steps: li('.experiment-steps li'), task: w.querySelector('.experiment-heading p:last-of-type')?.textContent.trim(), label: w.querySelector('.activity-response label')?.textContent.trim(), starterSpan: w.querySelector('#experiment-output-guide span:first-child')?.textContent, example: w.querySelector('#experiment-output-guide span:last-child')?.textContent, all: w.textContent, heading: w.querySelector('#experiment-heading')?.textContent, noteText: w.querySelector('.experiment-layout > section:first-child > p.explore-note')?.textContent }; })()`);
    const L = lang === 'th' ? LEFTOVERS_TH : LEFTOVERS_EN;
    const hit = L.filter((x) => h.all.toLowerCase().includes(x.toLowerCase()));
    check(`helper-2/${lang}: no unrelated writing / step-ordering example or wording remains anywhere on the page`, hit.length === 0, hit);
    check(`helper-2/${lang}: title is the new one`, h.heading === (lang === 'th' ? 'ฟังและสะท้อนความเข้าใจ' : 'Listen and Reflect Understanding'), h.heading);
    check(`helper-2/${lang}: note keeps the stop-anytime and not-a-certification lines`, lang === 'th' ? (h.noteText.includes('คุณหยุดได้ทุกเมื่อ') && h.noteText.includes('ไม่ใช่การรับรองระดับทักษะ')) : (h.noteText.includes('You can stop at any time') && h.noteText.includes('not a certification of skill level')), h.noteText);
    check(`helper-2/${lang}: shows the helper-2 note and not the shared "imaginary information" note`, h.noteText === (lang === 'th' ? 'เลือกเรื่องเล็ก ๆ ที่อีกฝ่ายยินดีเล่า และหลีกเลี่ยงข้อมูลส่วนตัวหรือเรื่องอ่อนไหว คุณหยุดได้ทุกเมื่อ ภารกิจนี้เป็นหลักฐานการฝึก ไม่ใช่การรับรองระดับทักษะ' : 'Choose a small topic the other person is happy to share, and avoid personal or sensitive information. You can stop at any time. This mission creates practice evidence; it is not a certification of skill level.') && !h.all.includes('ใช้ข้อมูลสมมุติ') && !h.all.includes('imaginary information'), h.noteText);
    if (lang === 'th') {
      check('helper-2/th: instruction (task + steps) is about listening and reflecting back', h.task.includes('ฟัง') && h.steps.join(' ').includes('สรุปกลับ') && h.steps.join(' ').includes('เข้าใจถูกไหม'), [h.task, h.steps]);
      check('helper-2/th: activity prompt asks for the same four things in order', ['เขาพูดว่าอะไร', 'คุณสรุปกลับว่าอะไร', 'เขาบอกว่าคุณเข้าใจถูกไหม', 'หลังถามกลับคุณเข้าใจอะไรเพิ่ม'].every((x, i, a) => h.label.includes(x) && (i === 0 || h.label.indexOf(x) > h.label.indexOf(a[i - 1]))), h.label);
      check('helper-2/th: starter has the four lines (said / reflected / their answer / understood more)', h.starterSpan.split('\n').length >= 4 && h.starterSpan.includes('เขาพูดว่า') && h.starterSpan.includes('ฉันสรุปกลับว่า') && h.starterSpan.includes('เขาบอกว่า') && h.starterSpan.includes('ฉันเข้าใจเพิ่มว่า'), h.starterSpan);
      check('helper-2/th: example is a real conversation with the four numbered parts in order', /1\. เขาพูดว่า[^]*2\. ฉันสรุปกลับว่า[^]*3\. เขาบอกว่า[^]*4\. หลังถามกลับ ฉันเข้าใจเพิ่มว่า/.test(h.example), h.example);
      check('helper-2/th: example contains the approved reflection sentence verbatim', h.example.includes(REFLECT), h.example);
      check('helper-2/th: example is not advice-giving and does not solve the other person’s problem', !/ควร|แนะนำให้|ลองทำ|วิธีแก้|ต้องรีบ/.test(h.example), h.example);
      check('helper-2/th: the other person’s words are in quotes and the reflection is marked as an interpretation (“ถ้าฉันเข้าใจถูก … ใช่ไหม”)', /เขาพูดว่า: “[^”]+”/.test(h.example) && h.example.includes('“ถ้าฉันเข้าใจถูก'), h.example);
    } else {
      check('helper-2/en: activity prompt asks for the same four things', ['what they said', 'what you reflected back', 'whether they said you understood correctly', 'what you understood better after checking'].every((x) => h.label.includes(x)), h.label);
      check('helper-2/en: example is the same four-part conversation', /1\. They said[^]*2\. I reflected back[^]*3\. They said[^]*4\. After checking/.test(h.example), h.example);
    }
    check(`helper-2/${lang}: the mission screen still shows no Guide-generated reflection (Guide copy only offers the field, not an answer)`, !(await q('document.querySelector("#lmguide").textContent')).includes(REFLECT));
  }
  // every other mission keeps the shared note; the mission list shows the new title
  for (const lang of ['th', 'en']) for (const key of ALL_KEYS.filter((k) => k !== 'helper-2')) {
    await render(key, lang);
    const note = await q('document.querySelector(".experiment-layout > section:first-child > p.explore-note")?.textContent');
    const want = lang === 'th' ? 'ใช้ข้อมูลสมมุติ และหยุดได้ทุกเมื่อ ภารกิจนี้สร้างหลักฐานการฝึก ไม่ใช่การรับรองระดับทักษะ' : 'Use imaginary information and stop anytime. This mission creates practice evidence; it is not a skill certification.';
    check(`${key}/${lang}: shared note unchanged`, note === want, note);
  }
  for (const lang of ['th', 'en']) {
    await q(`(() => { window.qa.state.language = '${lang}'; window.qa.ex.renderExplorationResult(window.qa.state, window.qa.questions, () => {}, () => {}); })()`);
    const list = await q('document.querySelector("#exploration-result").textContent');
    check(`mission list (${lang}) shows the new helper-2 title and not the old one`, list.includes(lang === 'th' ? 'ฟังและสะท้อนความเข้าใจ' : 'Listen and Reflect Understanding') && !list.includes('สะท้อนความต้องการ') && !list.toLowerCase().includes('reflect a need'), list.slice(0, 120));
  }
  await q("document.querySelector('#exploration-result').replaceChildren()");
  // the other helper missions keep their own content
  for (const key of ['helper', 'helper-3']) {
    await render(key);
    const txt = await q('document.querySelector("#experiment-workbench").textContent');
    check(`${key}: still shows the helper-family example (not changed)`, txt.includes('จัดกระเป๋าไปเรียน') && !txt.includes('เขาพูดว่า'), key);
  }
  // Guide CTA + Evidence on helper-2
  await render('helper-2');
  await click('#lmguide-cta'); await click('#lmguide-start');
  await page.type('#lmguide-code-input', FAKE_CODE); await click('#lmguide-code-next');
  requests.length = 0; await allowAndAttach();
  check('helper-2: Guide CTA still works and sends exactly {missionKey:"helper-2", sdp}', JSON.parse(requests.at(-1).body).missionKey === 'helper-2' && Object.keys(JSON.parse(requests.at(-1).body)).length === 2);
  await q('window.__qa.dcs.at(-1).open()'); await waitState('listening'); await click('#lmguide-end'); await waitState('ended');
  const four = '1. เขาพูดว่า: งานเยอะ\n2. ฉันสรุปกลับว่า: คุณหนักเพราะต้องสอนด้วย\n3. เขาบอกว่า: ใช่\n4. เข้าใจเพิ่ม: เวลาเงียบน้อย';
  await page.evaluate((txt) => { const f = document.querySelector('form'); const ta = f.querySelector('#experiment-output'); ta.value = txt; ta.dispatchEvent(new Event('input', { bubbles: true })); for (const n of ['enjoyment', 'difficulty']) f.querySelector(`input[name="${n}"][value="3"]`).click(); f.querySelector('input[name="nextChoice"][value="continue"]').click(); }, four);
  await page.evaluate(() => document.querySelector('#experiment-save').click()); await settle(30);
  check('helper-2: Evidence saves the four-part text unchanged in the same single `output` field', await q(`window.qa.state.exploration.entries.some((e) => e.path === 'helper-2' && e.output === ${JSON.stringify(four)})`) && (await q('window.qa.events.evidence.at(-1).path')) === 'helper-2');
  check('helper-2: the Evidence record has the same fields as before (no new keys)', JSON.stringify(Object.keys(await q("window.qa.state.exploration.entries.find((e) => e.path === 'helper-2')")).sort()) === JSON.stringify(['createdAt', 'difficulty', 'enjoyment', 'hard', 'id', 'liked', 'next', 'nextChoice', 'output', 'path', 'updatedAt']));

  // ------------------------------------------------------------ 10. Evidence / draft / resume / gate-1 landing
  group('10. Evidence save, pause/resume (draft), Gate-1 style landing');
  await load();
  for (const key of ALL_KEYS) {
    await render(key);
    if (ENABLED.includes(key)) await click('#lmguide-cta'); // Guide open during save: must not interfere (the other 13 have no Guide)
    await page.evaluate(() => { const f = document.querySelector('form'); const t = f.querySelector('#experiment-output'); t.value = 'QA evidence text'; t.dispatchEvent(new Event('input', { bubbles: true })); for (const n of ['enjoyment', 'difficulty']) f.querySelector(`input[name="${n}"][value="3"]`).click(); f.querySelector('input[name="nextChoice"][value="continue"]').click(); });
    check(`${key}: typing autosaves a draft`, await q(`window.qa.state.exploration.drafts['${key}']?.output === 'QA evidence text'`));
    await page.evaluate(() => document.querySelector('#experiment-save').click());
    await settle(20);
    const ev = await q('window.qa.events.evidence.at(-1)');
    check(`${key}: Evidence save works and fires the Evidence event for this mission`, ev && ev.path === key && ev.output === 'QA evidence text' && ev.enjoyment === '3', ev);
    check(`${key}: saved record present in state.exploration.entries`, await q(`window.qa.state.exploration.entries.some((e) => e.path === '${key}' && e.output === 'QA evidence text')`));
    check(`${key}: save button shows saved state`, (await q('document.querySelector("#experiment-save").disabled')) === true);
  }
  // pause / resume: leave mid-activity, come back, draft restored; Guide does not hold state
  await load();
  await render('analyst-2');
  await page.evaluate(() => { const t = document.querySelector('#experiment-output'); t.value = 'half-finished thought'; t.dispatchEvent(new Event('input', { bubbles: true })); });
  await render(null);
  check('leaving to the mission list works (no mission selected → recommendation screen)', (await q('document.querySelector("#experiment-workbench").textContent')).includes('เริ่มจากภารกิจเล็ก ๆ'));
  await render('analyst-2');
  check('resuming the mission restores the unsaved draft text', (await q('document.querySelector("#experiment-output").value')) === 'half-finished thought');
  await render('analyst-2', 'en');
  check('resume after a language toggle keeps the draft too', (await q('document.querySelector("#experiment-output").value')) === 'half-finished thought');
  // Gate 1 landing: app sets state.exploration.selected then switchView('missions') → renderExperimentWorkbench
  for (const key of ['helper-2', 'creator', 'entrepreneur-3', 'creator-3']) {
    await load();
    await page.evaluate((k) => { window.qa.state.exploration.selected = k; window.qa.state.exploration.activeAttempts[k] = { id: null, mode: 'new' }; }, key);
    await render(key);
    if (ENABLED.includes(key)) {
      await toConsent(); requests.length = 0; await allowAndAttach();
      check(`Gate-1-style landing on ${key}: heading, Guide key and request all agree`, (await q('document.querySelector(".experiment-heading").dataset.selectedPath')) === key && JSON.parse(requests.at(-1).body).missionKey === key);
    } else {
      check(`Gate-1-style landing on ${key} (no Guide): the mission opens with its activity, no Guide, no request`, (await q('document.querySelector(".experiment-heading").dataset.selectedPath')) === key && (await q('!document.querySelector("#lmguide")')) && requests.length === 0 && (await q('window.__qa.gum.length')) === 0);
    }
  }

  // ------------------------------------------------------------ 11. mobile
  group('11. Mobile layout (360 / 375 / 390)');
  const sample = ['creator', 'helper-2'];
  const sampleOff = ['analyst', 'analyst-2', 'builder-2', 'helper', 'helper-3', 'entrepreneur-2', 'entrepreneur-3'];
  const shotsDir = path.join(OUT, 'shots'); fs.mkdirSync(shotsDir, { recursive: true });
  for (const width of [360, 375, 390]) {
    await load(width, 844);
    for (const lang of ['th', 'en']) {
      for (const key of sample) {
        await render(key, lang);
        const measure = async (label) => {
          const m = await q(`(() => { const de = document.documentElement; const g = document.querySelector('#lmguide'); const vw = de.clientWidth; const bad = [...g.querySelectorAll('*')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > vw + 0.5 || r.left < -0.5); }).map((e) => e.id || e.className || e.tagName); return { scrollW: de.scrollWidth, vw, bodyScrollW: document.body.scrollWidth, gRight: Math.round(g.getBoundingClientRect().right), gH: Math.round(g.getBoundingClientRect().height), bad }; })()`);
          check(`${width}px ${lang} ${key} ${label}: no horizontal overflow, Guide inside viewport`, m.scrollW <= m.vw && m.bodyScrollW <= m.vw && m.bad.length === 0, m);
          return m;
        };
        const collapsed = await measure('collapsed');
        check(`${width}px ${lang} ${key}: collapsed CTA stays compact (<= 64px tall)`, collapsed.gH <= 64, collapsed.gH);
        await click('#lmguide-cta'); await measure('intro');
        await click('#lmguide-start'); await measure('code');
        await page.type('#lmguide-code-input', FAKE_CODE); await click('#lmguide-code-next'); await measure('consent');
        if (width === 360 && lang === 'th' && key === 'creator') await page.screenshot({ path: path.join(shotsDir, 'mobile-360-consent-creator.png') });
        await allowAndAttach(); await q('window.__qa.dcs.at(-1).open()'); await waitState('listening');
        for (let i = 0; i < 4; i++) await q(`window.__qa.dcs.at(-1).msg({ type: "response.audio_transcript.done", transcript: "ข้อความยาวมากสำหรับทดสอบการตัดบรรทัดบนมือถือ ${i} ".repeat(4) + "ภาษาอังกฤษยาวติดกันไม่มีช่องว่างLongUnbrokenEnglishWord".repeat(2) })`);
        await measure('live');
        if (width === 360 && lang === 'th' && key === 'creator') await page.screenshot({ path: path.join(shotsDir, 'mobile-360-live-creator.png') });
        const obscure = await q(`(() => { const g = document.querySelector('#lmguide').getBoundingClientRect(); const l = document.querySelector('.experiment-layout').getBoundingClientRect(); return { guideBottom: Math.round(g.bottom), layoutTop: Math.round(l.top) }; })()`);
        check(`${width}px ${lang} ${key}: expanded Guide pushes mission steps down instead of covering them`, obscure.layoutTop >= obscure.guideBottom - 1, obscure);
        await click('#lmguide-end'); await waitState('ended'); await measure('result');
        // wait: set an unsupported cap-timer remnant not needed
        await click('#lmguide-result-close');
      }
      for (const key of DISABLED) {
        await render(key, lang);
        const m = await q(`(() => { const de = document.documentElement, vw = de.clientWidth, w = document.querySelector('#experiment-workbench'); const wide = [...w.querySelectorAll('*')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > vw + 0.5 || r.left < -0.5); }).map((e) => e.tagName + '#' + e.id + '.' + e.className).slice(0, 4);
          const ta = w.querySelector('#experiment-output'), r = ta.getBoundingClientRect(); const head = w.querySelector('.experiment-heading').getBoundingClientRect(), steps = w.querySelector('.experiment-steps').getBoundingClientRect();
          return { vw, scrollW: de.scrollWidth, bodyScrollW: document.body.scrollWidth, wide, guide: !!w.querySelector('#lmguide'), taWidth: Math.round(r.width), stepsTop: Math.round(steps.top - head.bottom) }; })()`);
        check(`${width}px ${lang} ${key} (no Guide): no horizontal overflow, no Guide, answer box fits the screen`, m.scrollW <= m.vw && m.bodyScrollW <= m.vw && m.wide.length === 0 && !m.guide && m.taWidth > 0 && m.taWidth <= m.vw, m);
      }
    }
    if (width === 360) { await render('creator'); await page.screenshot({ path: path.join(shotsDir, 'mobile-360-collapsed-creator.png') }); await render('helper-2'); await page.screenshot({ path: path.join(shotsDir, 'mobile-360-collapsed-helper2.png') }); await render('helper-3'); await page.screenshot({ path: path.join(shotsDir, 'mobile-360-no-guide-helper3.png') }); await render('analyst'); await page.screenshot({ path: path.join(shotsDir, 'mobile-360-no-guide-analyst.png') }); }
  }

  // ------------------------------------------------------------ 7d. enabled <-> disabled switching
  group('7d. Switching between a Guide mission and a mission without the Guide');
  const allEnded = () => q('window.__qa.streams.every((s) => s.t.every((t) => t.readyState === "ended")) && window.__qa.peers.every((p) => p.closeCalls > 0)');
  const noGuide = () => q('!document.querySelector("#lmguide") && !document.querySelector("[data-lmguide-step]") && !document.querySelector("[data-guide-state]")');
  // (a) live conversation on helper-2, learner picks a mission without the Guide
  await load(); await render('helper-2');
  await toConsent(); await connectLive();
  await render('analyst');
  check('(a) live helper-2 → analyst: mic, data channel, peer and the 120 s timer are all released', (await allEnded()) && (await q('window.__qa.dcs.at(-1).closeCalls >= 1')) && (await q('window.__qa.timers[0].cleared')));
  check('(a) analyst opens with its normal activity and no Guide, no leftover Guide state', (await noGuide()) && (await q('document.querySelector(".experiment-heading").dataset.selectedPath')) === 'analyst' && (await q('document.querySelectorAll(".experiment-steps li").length')) === 3);
  const gumA = await q('window.__qa.gum.length'), reqA = requests.length;
  await render('helper-2');
  check('(a) back to helper-2: a fresh, collapsed, idle Guide; no Continue; nothing resumed', (await state()) === 'idle' && (await visible('#lmguide-panel')) === false && (await q('document.querySelector("#lmguide-continue").hidden')) === true && (await q('window.__qa.gum.length')) === gumA && requests.length === reqA);
  await click('#lmguide-cta'); await click('#lmguide-start');
  check('(a) back to helper-2: consent is required again (code only in memory), microphone not requested yet', (await visibleStep('consent')) === true && (await q('window.__qa.gum.length')) === gumA);
  // (b) request in flight while connecting, switch to a mission without the Guide
  await load(); await render('creator');
  await toConsent();
  let releaseB; backend.hold = new Promise((r) => { releaseB = r; });
  await click('#lmguide-consent-allow');
  await page.waitForFunction('window.__qa.peers.length === 1 && window.__qa.peers[0].dc', { timeout: 5000 });
  await settle(100);
  check('(b) request in flight while connecting', (await state()) === 'connecting' && requests.length === 1);
  await render('builder-3');
  check('(b) switch to builder-3 during connecting: mic stopped and peer closed at once, no Guide on the new screen', (await allEnded()) && (await noGuide()));
  releaseB(); backend.hold = null; await settle(250);
  check('(b) the late backend answer is ignored: no timer, no new peer, still no Guide', (await q('window.__qa.timers.length')) === 0 && (await q('window.__qa.peers.length')) === 1 && (await noGuide()));
  // (c) browser permission prompt still open
  await load(); await render('helper-2');
  await toConsent();
  await q('window.__qaGum.delay = 300');
  await click('#lmguide-consent-allow');
  await settle(50);
  await render('entrepreneur-2');
  await settle(500);
  check('(c) switch to a no-Guide mission while the permission prompt is open: the late stream is stopped, no peer, no request, no Guide', (await q('window.__qa.streams.length === 1 && window.__qa.streams[0].t.every((t) => t.readyState === "ended")')) && (await q('window.__qa.peers.length')) === 0 && requests.length === 0 && (await noGuide()));
  // (d) after the 120 s soft cap (Continue offered), switch away and back
  await load(); await render('creator');
  await toConsent(); await connectLive(); await timeoutNow();
  check('(d) before switching: Continue is offered', (await visible('#lmguide-continue')) === true);
  await render('helper');
  check('(d) timed-out creator → helper: no Guide and no Continue anywhere on the new screen', (await noGuide()) && (await q('!document.querySelector("#lmguide-continue")')) && (await liveStreams()) === 0);
  const gumD = await q('window.__qa.gum.length');
  await render('creator');
  await click('#lmguide-cta'); await click('#lmguide-start');
  check('(d) back to creator: Continue gone, consent required, no microphone call', (await q('document.querySelector("#lmguide-continue").hidden')) === true && (await visibleStep('consent')) === true && (await q('window.__qa.gum.length')) === gumD);
  // (e) a failed session, then a mission without the Guide
  await load(); await render('helper-2');
  backend.status = 500; backend.body = { error: 'QA backend failure' };
  await toConsent(); await click('#lmguide-consent-allow'); await waitState('error');
  await render('analyst-2');
  check('(e) error state on helper-2 does not leak onto the next mission: no Guide, no message, resources released', (await noGuide()) && (await allEnded()) && !(await q('document.querySelector("#experiment-workbench").textContent')).includes('QA backend failure'));
  backend.status = 200; backend.body = { transport: { sdp: 'v=0 QA-FAKE-ANSWER' } };
  // (f) language toggle and "choose a mission" on a mission without the Guide
  await render('analyst-2', 'en');
  check('(f) language toggle on a no-Guide mission keeps it Guide-free', await noGuide());
  await render(null);
  check('(f) the "choose a mission" screen has no Guide either', await noGuide());
  // (g) a full live session on every ENABLED mission, ended, then each of the 13 other missions in a row: no stray live resources
  await load();
  for (const key of ENABLED) { await render(key); await toConsent(); await connectLive(); await click('#lmguide-end'); await waitState('ended'); }
  const peersBefore = await q('window.__qa.peers.length'), gumBefore = await q('window.__qa.gum.length');
  for (const key of DISABLED) { await render(key); }
  check('(g) walking through all 13 no-Guide missions after live sessions opens no microphone, no peer, no request and holds no timer', (await q('window.__qa.peers.length')) === peersBefore && (await q('window.__qa.gum.length')) === gumBefore && (await liveStreams()) === 0 && (await noGuide()));

  // ------------------------------------------------------------ 7e. defence in depth: the mount gate alone
  group('7e. Defence in depth: even if the Guide markup were rendered for a disabled mission, nothing is wired to it');
  {
    const gateRoot = path.join(OUT, 'gate_root');
    fs.rmSync(gateRoot, { recursive: true, force: true }); fs.mkdirSync(gateRoot, { recursive: true });
    for (const f of ['app.js', 'style.css', 'index.html', 'exploration.css']) fs.copyFileSync(path.join(ROOT, f), path.join(gateRoot, f));
    fs.cpSync(path.join(ROOT, 'assets'), path.join(gateRoot, 'assets'), { recursive: true });
    const gateLine = " if (!isGuideEnabled(key)) return '';\n";
    const srcJs = fs.readFileSync(path.join(ROOT, 'exploration.js'), 'utf8');
    check('the markup gate line exists exactly once in exploration.js (so this test really strips it)', srcJs.split(gateLine).length === 2);
    fs.writeFileSync(path.join(gateRoot, 'exploration.js'), srcJs.replace(gateLine, ''));
    const gateServer = await startServer(gateRoot, true);
    const gp = await browser.newPage();
    const gateReqs = [];
    await gp.setRequestInterception(true);
    gp.on('request', (r) => { if (r.url().startsWith(`http://127.0.0.1:${gateServer.address().port}`)) return r.continue(); if (r.url().startsWith(BACKEND)) gateReqs.push(r.url()); return r.abort(); });
    await gp.evaluateOnNewDocument(MOCKS);
    await gp.setViewport({ width: 1024, height: 900 });
    await gp.goto(`http://127.0.0.1:${gateServer.address().port}/qa.html`, { waitUntil: 'load' });
    await gp.waitForFunction('window.qaReady === true');
    await gp.evaluate(() => window.qa.render('analyst', 'th'));
    const g = await gp.evaluate(() => { const c = document.querySelector('#lmguide-cta'); const had = !!c; if (c) c.click(); const st = document.querySelector('#lmguide'); if (st) { document.querySelector('#lmguide-start')?.click(); document.querySelector('#lmguide-consent-allow')?.click(); }
      return { had, expanded: c?.getAttribute('aria-expanded'), panelHidden: document.querySelector('#lmguide-panel')?.hidden, gum: window.__qa.gum.length, peers: window.__qa.peers.length, timers: window.__qa.timers.length }; });
    await settle(150);
    check('markup forced into a disabled mission is inert: the button opens nothing', g.had === true && g.expanded === 'false' && g.panelHidden === true, g);
    check('…and it requests no microphone, creates no peer connection, sets no timer and sends no request', g.gum === 0 && g.peers === 0 && g.timers === 0 && gateReqs.length === 0, [g, gateReqs.length]);
    await gp.close(); gateServer.close(); fs.rmSync(gateRoot, { recursive: true, force: true });
  }

  // ------------------------------------------------------------ 12. console health
  group('12. Console health');
  const bad = consoleLines.filter((l) => /^(error|pageerror)/.test(l) && !/Failed to load resource|ERR_FAILED|net::/.test(l));
  check('no page errors or console errors from the Guide code', bad.length === 0, bad.slice(0, 5));
  check('Guide code wrote nothing to the console (no code, no logging)', consoleLines.filter((l) => /lmguide|skill-guide|pilot/i.test(l)).length === 0, consoleLines.filter((l) => /lmguide|skill-guide|pilot/i.test(l)).slice(0, 5));

  await browser.close(); server.close();
  const failed = results.filter((r) => !r.ok);
  const byGroup = {};
  for (const r of results) { byGroup[r.group] ||= { pass: 0, fail: 0 }; byGroup[r.group][r.ok ? 'pass' : 'fail']++; }
  console.log('\n==== SUMMARY ====');
  for (const [g, c] of Object.entries(byGroup)) console.log(`${c.fail ? 'FAIL' : 'ok  '} ${g}: ${c.pass} passed, ${c.fail} failed`);
  console.log(`TOTAL ${results.length - failed.length}/${results.length} passed`);
  fs.writeFileSync(path.join(OUT, 'p3_qa_results.json'), JSON.stringify({ at: new Date().toISOString(), root: path.basename(ROOT), baseRef: BASE_REF, total: results.length, failed: failed.length, byGroup, failures: failed }, null, 1));
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error('HARNESS ERROR', e); process.exit(2); });

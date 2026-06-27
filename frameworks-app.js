/* ══════════════════════════════════════════════════════════════
   ProdCast – PM Frameworks Page Logic
   Active Theory-Inspired Cyber-HUD Experience
   ═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   THEME
   ───────────────────────────────────────────── */
(function () {
  const saved = localStorage.getItem('prodcast-theme') || 'dark';
  document.body.className = saved;
})();

const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light');
    document.body.className = isLight ? 'dark' : 'light';
    localStorage.setItem('prodcast-theme', document.body.className);
    playSound('click');
  });
}

/* ─────────────────────────────────────────────
   CYBER SYNTH SOUND FX ENGINE
   ───────────────────────────────────────────── */
let audioCtx = null;
let soundMuted = localStorage.getItem('prodcast-sound-muted') === 'true';

if (soundMuted) {
  document.body.classList.add('audio-muted');
} else {
  document.body.classList.remove('audio-muted');
}

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playSound(type) {
  if (soundMuted) return;
  try {
    initAudio();
    if (!audioCtx) return;
    
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'hover') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1300, now);
      osc.frequency.setValueAtTime(1900, now + 0.02);
      gain.gain.setValueAtTime(0.012, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'transition') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.22);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    }
  } catch (e) {
    console.warn("Audio Context error:", e);
  }
}

const volumeBtn = document.getElementById('volumeBtn');
if (volumeBtn) {
  volumeBtn.addEventListener('click', () => {
    soundMuted = !soundMuted;
    localStorage.setItem('prodcast-sound-muted', soundMuted);
    document.body.classList.toggle('audio-muted', soundMuted);
    if (!soundMuted) {
      playSound('click');
    }
  });
}

function initHoverAudio() {
  const hoverSelectors = 'a, button, .fwp-card, .resource-card, .panel-nav-btn, .panel-close-btn';
  document.body.addEventListener('mouseenter', (e) => {
    if (e.target.matches && e.target.matches(hoverSelectors)) {
      playSound('hover');
    }
  }, true);
}

/* ─────────────────────────────────────────────
   CONSTANTS & STATE
   ───────────────────────────────────────────── */
const CAT_COLORS = {
  strategy:       '#8B5CF6',
  growth:         '#059669',
  discovery:      '#7C3AED',
  metrics:        '#DC2626',
  prioritization: '#BE185D',
  design:         '#0891B2',
  execution:      '#B45309',
};

const RESOURCE_ICONS = { book: '📚', article: '📄', course: '🎓', tool: '🔧' };

let activeFilter = 'all';
let searchQuery  = '';
let sortMode     = 'default';
let openIndex    = -1;
let visibleList  = [];

/* ─────────────────────────────────────────────
   VISUAL DIAGRAM GENERATORS
   ───────────────────────────────────────────── */
function generateVisual(fw) {
  const c = fw.color;
  const light = c + '22';
  const mid   = c + '44';

  switch (fw.visualType) {
    case 'steps': { // CIRCLES
      const letters = ['C','I','R','C','L','E','S'];
      const words   = ['Comprehend','Identify','Report','Cut','List','Evaluate','Summarize'];
      const boxes = letters.map((l, i) =>
        `<div class="vis-step-box" style="border-color:${mid};background:${light};color:${c}">
           <span class="vis-step-letter">${l}</span>
           <span class="vis-step-word">${words[i]}</span>
         </div>
         ${i < letters.length-1 ? `<span class="vis-arrow">→</span>` : ''}`
      ).join('');
      return `<div class="vis-steps">${boxes}</div>`;
    }

    case 'funnel': { // AARRR
      const stages = [
        { label: 'Acquisition', pct: '100%', shade: '#059669' },
        { label: 'Activation',  pct: '88%',  shade: '#0891B2' },
        { label: 'Retention',   pct: '72%',  shade: '#7C3AED' },
        { label: 'Referral',    pct: '52%',  shade: '#B45309' },
        { label: 'Revenue',     pct: '35%',  shade: '#DC2626' },
      ];
      const rows = stages.map((s, i) =>
        `<div class="vis-funnel-step" style="width:${s.pct};background:${s.shade}">
           <span>${['A','A','R','R','R'][i]} – ${s.label}</span>
           <span class="vis-funnel-pct">${s.pct}</span>
         </div>`
      ).join('');
      return `<div class="vis-funnel">${rows}</div>`;
    }

    case 'cycle': { // Design Thinking, Hooked, JTBD
      let steps;
      if (fw.name === 'Design Thinking')
        steps = ['Empathize','Define','Ideate','Prototype','Test'];
      else if (fw.name === 'The Hooked Model')
        steps = ['Trigger','Action','Variable Reward','Investment'];
      else
        steps = ['Trigger','Planning','Execution','Monitoring','Concluding'];

      const boxes = steps.map((s, i) =>
        `<div class="vis-cycle-step" style="border-color:${mid};color:${c}">${s}</div>
         ${i < steps.length-1 ? `<span class="vis-cycle-arr">→</span>` : `<span class="vis-cycle-arr">↩</span>`}`
      ).join('');
      return `<div class="vis-cycle">${boxes}</div>`;
    }

    case 'formula': { // RICE, ICE
      let eq, scoreLabel;
      if (fw.name === 'RICE Scoring') {
        eq   = `<div class="vis-formula-eq">(Reach &times; Impact &times; Confidence) &divide; Effort</div>`;
        scoreLabel = 'RICE Score';
      } else {
        eq   = `<div class="vis-formula-eq">(Impact + Confidence + Ease) &divide; 3</div>`;
        scoreLabel = 'ICE Score';
      }
      return `<div class="vis-formula">
        ${eq}
        <div style="width:100%;height:1px;background:var(--border);margin:12px 0"></div>
        <div class="vis-formula-score">${scoreLabel}</div>
        <div class="vis-formula-label">Higher = Higher Priority</div>
      </div>`;
    }

    case 'hierarchy': { // OKRs
      return `<div class="vis-hierarchy">
        <div class="vis-hier-level">
          <div class="vis-hier-box" style="background:#B45309;font-size:1rem;padding:12px 32px">🏢 Company Objective</div>
        </div>
        <div class="vis-hier-connector">↓</div>
        <div class="vis-hier-level">
          <div class="vis-hier-box" style="background:#D97706;font-size:.82rem">Team KR 1</div>
          <div class="vis-hier-box" style="background:#D97706;font-size:.82rem">Team KR 2</div>
          <div class="vis-hier-box" style="background:#D97706;font-size:.82rem">Team KR 3</div>
        </div>
        <div class="vis-hier-connector">↓</div>
        <div class="vis-hier-level">
          <div class="vis-hier-box" style="background:#F59E0B;font-size:.72rem;color:#000">Initiative A</div>
          <div class="vis-hier-box" style="background:#F59E0B;font-size:.72rem;color:#000">Initiative B</div>
          <div class="vis-hier-box" style="background:#F59E0B;font-size:.72rem;color:#000">Initiative C</div>
          <div class="vis-hier-box" style="background:#F59E0B;font-size:.72rem;color:#000">Initiative D</div>
        </div>
      </div>`;
    }

    case 'grid5': { // HEART
      const cells = [
        { l:'H', w:'Happiness', metric:'NPS / CSAT' },
        { l:'E', w:'Engagement', metric:'DAU / Sessions' },
        { l:'A', w:'Adoption', metric:'Conversion %' },
        { l:'R', w:'Retention', metric:'30-day %' },
        { l:'T', w:'Task Success', metric:'Completion %' },
      ];
      const html = cells.map(cell =>
        `<div class="vis-heart-cell" style="border-color:${mid};background:${light};color:${c}">
           <span class="vis-heart-letter">${cell.l}</span>
           <span class="vis-heart-word">${cell.w}</span>
           <span style="font-size:.56rem;color:var(--t3);margin-top:2px">${cell.metric}</span>
         </div>`
      ).join('');
      return `<div class="vis-grid5">${html}</div>`;
    }

    case 'kano': {
      const cells = [
        { label:'Must-Have', desc:'Expected — absence hurts', color:'#DC2626', cborder:'rgba(220,38,38,.3)' },
        { label:'Performance', desc:'More = more satisfied', color:'#059669', cborder:'rgba(5,150,105,.3)' },
        { label:'Delighter', desc:'Unexpected wow moment', color:'#7C3AED', cborder:'rgba(124,58,237,.3)' },
        { label:'Indifferent', desc:'Users don\'t care', color:'#94A3B8', cborder:'rgba(148,163,184,.3)' },
      ];
      const html = cells.map(cell =>
        `<div class="vis-kano-cell" style="border-color:${cell.cborder};border-left-color:${cell.color}">
           <span class="vis-kano-label" style="color:${cell.color}">${cell.label}</span>
           <span class="vis-kano-desc">${cell.desc}</span>
         </div>`
      ).join('');
      return `<div class="vis-kano">${html}</div>`;
    }

    case 'star': { // North Star
      const subs = ['Breadth','Depth','Frequency','Leading Indicators'];
      const subHtml = subs.map(s =>
        `<div class="vis-star-sub" style="border-color:${mid};color:${c}">${s}</div>`
      ).join('');
      return `<div class="vis-star">
        <div class="vis-star-center" style="background:${c}">⭐ North Star Metric</div>
        <div style="font-size:.72rem;color:var(--t3)">↑ driven by sub-metrics ↑</div>
        <div class="vis-star-submetrics">${subHtml}</div>
      </div>`;
    }

    case 'canvas': { // Lean Canvas
      const cells = [
        { label:'Problem', span:false },
        { label:'Solution', span:false },
        { label:'Unique Value Prop', span:false },
        { label:'Unfair Advantage', span:false },
        { label:'Customer Segments', span:false },
        { label:'Key Metrics', span:false },
        { label:'Channels', span:false },
        { label:'Revenue Streams', span:true },
      ];
      const c2 = fw.color;
      const html = cells.map((cell, i) =>
        `<div class="vis-canvas-cell${cell.span?' span2':''}" style="border-color:${c2}33;color:${c2};background:${c2}11">
           ${cell.label}
         </div>`
      ).join('');
      return `<div class="vis-canvas">${html}</div>`;
    }

    case 'moscow': {
      const items = [
        { label:'Must Have',  key:'Non-negotiable',     color:'#DC2626' },
        { label:'Should Have',key:'High value, deferrable', color:'#F59E0B' },
        { label:'Could Have', key:'Nice to have',       color:'#22D3EE' },
        { label:"Won't Have", key:'Out of scope (now)', color:'#94A3B8' },
      ];
      const html = items.map(item =>
        `<div class="vis-moscow-cell" style="border-left-color:${item.color}">
           <span class="vis-moscow-label" style="color:${item.color}">${item.label}</span>
           <span class="vis-moscow-key">${item.key}</span>
         </div>`
      ).join('');
      return `<div class="vis-moscow">${html}</div>`;
    }

    case 'map': { // User Story Map
      const activities = ['Browse','Select','Cart','Checkout','Track'];
      const c1 = '#0891B2';
      const actRow = activities.map(a =>
        `<div class="vis-map-cell" style="background:${c1};color:#fff">${a}</div>`
      ).join('');
      const taskRow = activities.map(() =>
        `<div class="vis-map-cell" style="background:rgba(8,145,178,.2);color:var(--t1);font-size:.6rem;font-weight:600">Task</div>`
      ).join('');
      const mvpRow  = activities.map(() =>
        `<div class="vis-map-cell" style="background:rgba(16,185,129,.15);color:#10B981;font-size:.6rem;font-weight:700">MVP Story</div>`
      ).join('');
      return `<div class="vis-map">
        <div style="font-size:.65rem;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">User Activities (Backbone)</div>
        <div class="vis-map-row">${actRow}</div>
        <div class="vis-map-row">${taskRow}</div>
        <div style="font-size:.6rem;color:var(--t3);margin:4px 0;text-align:center">── MVP Release Slice ──</div>
        <div class="vis-map-row">${mvpRow}</div>
      </div>`;
    }

    case 'pmf': { // Product-Market Fit
      const rows = [
        { label: 'Very Disappointed', pct: 42, color: '#DC2626' },
        { label: 'Somewhat Disappointed', pct: 38, color: '#F59E0B' },
        { label: 'Not Disappointed', pct: 20, color: '#94A3B8' },
      ];
      const html = rows.map(r =>
        `<div class="vis-pmf-bar-row">
           <div class="vis-pmf-bar-label">${r.label}</div>
           <div class="vis-pmf-bar-track">
             <div class="vis-pmf-bar-fill" style="width:${r.pct}%;background:${r.color}"></div>
           </div>
           <div class="vis-pmf-bar-pct">${r.pct}%</div>
         </div>`
      ).join('');
      return `<div class="vis-pmf">
        <div class="vis-pmf-question">If this product disappeared tomorrow, how would you feel?</div>
        <div class="vis-pmf-survey">${html}</div>
        <div style="margin-top:10px;font-size:.72rem;color:#DC2626;font-weight:700">✓ 42% Very Disappointed &gt; 40% threshold → PMF achieved!</div>
      </div>`;
    }

    default:
      return `<div class="vis-steps" style="padding:16px;justify-content:center">
        <span style="font-size:2rem">${fw.emoji}</span>
      </div>`;
  }
}

/* ─────────────────────────────────────────────
   BUILD CARDS GRID
   ───────────────────────────────────────────── */
function buildGrid() {
  const grid = document.getElementById('fwPageGrid');
  if (!grid) return;
  grid.innerHTML = '';
  visibleList = getFiltered();

  document.getElementById('fwEmpty').classList.toggle('hidden', visibleList.length > 0);
  document.getElementById('fwPageGrid').classList.toggle('hidden', visibleList.length === 0);

  updateResultsBar();

  visibleList.forEach((fw, idx) => {
    const c    = fw.color;
    const light = c + '20';

    const previewComps = fw.components.slice(0, 3).map(comp =>
      `<div class="fwp-comp-row">
         <div class="fwp-comp-dot" style="background:${c}"></div>
         <span>${comp.split('–')[0].trim()}</span>
       </div>`
    ).join('');

    const resCount = fw.resources ? fw.resources.length : 0;

    const card = document.createElement('div');
    card.className = 'fwp-card fade-up';
    card.dataset.idx = idx;
    card.dataset.cat = fw.category;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Open ${fw.name} framework`);
    card.innerHTML = `
      <div class="fwp-stripe" style="background:${c}"></div>
      <div class="fwp-card-body">
        <div class="fwp-top">
          <div class="fwp-icon" style="background:${light};border:1px solid ${c}33">${fw.emoji}</div>
          <div class="fwp-title-wrap">
            <div class="fwp-name">${fw.name}</div>
            <span class="fwp-cat cat-${fw.category}">${fw.category}</span>
          </div>
        </div>
        <p class="fwp-tagline">${fw.tagline}</p>
        <div class="fwp-components-preview">${previewComps}</div>
        <div class="fwp-cta">
          <span class="fwp-cta-text">
            Explore framework
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
          <span class="fwp-resources-count">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            ${resCount} resources
          </span>
        </div>
      </div>`;

    card.addEventListener('click', () => openPanel(idx));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openPanel(idx); });

    grid.appendChild(card);
  });

  setTimeout(() => {
    document.querySelectorAll('.fwp-card.fade-up').forEach(el => el.classList.add('visible'));
  }, 50);
}

/* ─────────────────────────────────────────────
   FILTER + SORT LOGIC
   ───────────────────────────────────────────── */
function getFiltered() {
  let list = [...FRAMEWORKS];

  if (activeFilter !== 'all') {
    list = list.filter(fw => fw.category === activeFilter);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(fw =>
      fw.name.toLowerCase().includes(q) ||
      fw.tagline.toLowerCase().includes(q) ||
      fw.description.toLowerCase().includes(q) ||
      fw.category.toLowerCase().includes(q) ||
      (fw.components || []).some(c => c.toLowerCase().includes(q))
    );
  }

  if (sortMode === 'az') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortMode === 'cat') {
    list.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  }

  return list;
}

function updateResultsBar() {
  const txt  = document.getElementById('fwResultsText');
  const rsbt = document.getElementById('fwResetBtn');
  const total = FRAMEWORKS.length;
  const visible = visibleList.length;
  const isFiltered = activeFilter !== 'all' || searchQuery;

  txt.textContent = isFiltered
    ? `Showing ${visible} of ${total} frameworks`
    : `${total} frameworks — click any card to explore`;

  rsbt.classList.toggle('hidden', !isFiltered);
}

/* ─────────────────────────────────────────────
   FILTER BUTTONS
   ───────────────────────────────────────────── */
function initFilters() {
  const btns = document.querySelectorAll('#fwFilters .filt');

  btns.forEach(btn => {
    const f = btn.dataset.f;
    if (f !== 'all') {
      const count = FRAMEWORKS.filter(fw => fw.category === f).length;
      const countEl = btn.querySelector('.filt-count');
      if (!countEl) {
        const span = document.createElement('span');
        span.className = 'filt-count';
        span.textContent = count;
        btn.appendChild(span);
      }
    } else {
      const countEl = document.getElementById('filtCountAll');
      if (countEl) countEl.textContent = FRAMEWORKS.length;
    }
  });

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.f;
      openIndex = -1;
      buildGrid();
      playSound('click');
    });
  });
}

/* ─────────────────────────────────────────────
   SEARCH
   ───────────────────────────────────────────── */
function initSearch() {
  const input = document.getElementById('fwSearch');
  const clear = document.getElementById('fwSearchClear');

  input.addEventListener('input', () => {
    searchQuery = input.value.trim();
    clear.classList.toggle('hidden', !searchQuery);
    openIndex = -1;
    buildGrid();
  });

  clear.addEventListener('click', () => {
    input.value = '';
    searchQuery = '';
    clear.classList.add('hidden');
    input.focus();
    buildGrid();
    playSound('click');
  });
}

/* ─────────────────────────────────────────────
   SORT
   ───────────────────────────────────────────── */
function initSort() {
  document.getElementById('fwSort').addEventListener('change', (e) => {
    sortMode = e.target.value;
    buildGrid();
    playSound('click');
  });
}

/* ─────────────────────────────────────────────
   RESET
   ───────────────────────────────────────────── */
function resetAll() {
  activeFilter = 'all';
  searchQuery  = '';
  sortMode     = 'default';
  document.getElementById('fwSearch').value = '';
  document.getElementById('fwSearchClear').classList.add('hidden');
  document.getElementById('fwSort').value = 'default';
  document.querySelectorAll('#fwFilters .filt').forEach(b => b.classList.remove('active'));
  document.querySelector('#fwFilters .filt[data-f="all"]').classList.add('active');
  buildGrid();
  playSound('click');
}

document.getElementById('fwResetBtn').addEventListener('click', resetAll);
document.getElementById('fwEmptyReset')?.addEventListener('click', resetAll);

/* ─────────────────────────────────────────────
   SIDE PANEL
   ───────────────────────────────────────────── */
const panel    = document.getElementById('fwSidePanel');
const backdrop = document.getElementById('fwBackdrop');

function openPanel(idxInVisible) {
  openIndex = idxInVisible;
  const fw = visibleList[openIndex];
  if (!fw) return;

  renderPanel(fw);

  panel.classList.add('open');
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';

  document.querySelectorAll('.fwp-card').forEach((card, i) => {
    card.classList.toggle('active-panel', parseInt(card.dataset.idx) === idxInVisible);
  });

  document.getElementById('panelBody').scrollTop = 0;

  updatePanelNav();
  playSound('transition');
}

function closePanel() {
  panel.classList.remove('open');
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
  document.querySelectorAll('.fwp-card').forEach(c => c.classList.remove('active-panel'));
  playSound('click');
}

function renderPanel(fw) {
  const c = fw.color;
  const light = c + '22';

  // Header
  document.getElementById('panelEmoji').textContent = fw.emoji;
  document.getElementById('panelEmojiWrap').style.background = light;
  document.getElementById('panelCatBadge').textContent = fw.category;
  document.getElementById('panelCatBadge').style.background = c;
  document.getElementById('panelFwName').textContent = fw.name;
  document.getElementById('panelFwTagline').textContent = fw.tagline;

  // Visual
  document.getElementById('panelVisual').innerHTML = generateVisual(fw);

  // Description
  document.getElementById('panelDesc').textContent = fw.description;

  // Components
  const compEl = document.getElementById('panelComponents');
  compEl.innerHTML = fw.components.map((comp, i) =>
    `<div class="panel-comp-item">
       <div class="panel-comp-num" style="background:${c}">${i + 1}</div>
       <span class="panel-comp-text">${comp}</span>
     </div>`
  ).join('');

  // When to use
  document.getElementById('panelUseWhen').innerHTML =
    `💡 <strong>Best for:</strong> ${fw.useWhen}`;

  // Example
  document.getElementById('panelExample').textContent = fw.example;

  // Resources
  const resEl = document.getElementById('panelResources');
  if (fw.resources && fw.resources.length) {
    resEl.innerHTML = fw.resources.map(r => {
      const icon    = RESOURCE_ICONS[r.type] || '🔗';
      const typeCls = `rtype-${r.type}`;
      return `<a class="resource-card" href="${r.url}" target="_blank" rel="noopener noreferrer">
        <div class="resource-icon" style="background:${c}18;border:1px solid ${c}28">${icon}</div>
        <div class="resource-body">
          <div class="resource-title">${r.title}</div>
          <div class="resource-desc">${r.desc}</div>
        </div>
        <span class="resource-type-tag ${typeCls}">${r.type}</span>
        <svg class="resource-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
        </svg>
      </a>`;
    }).join('');
  } else {
    resEl.innerHTML = `<p style="font-size:.85rem;color:var(--t3)">Resources coming soon.</p>`;
  }
}

function updatePanelNav() {
  const pos  = document.getElementById('panelNavPos');
  const prev = document.getElementById('panelPrev');
  const next = document.getElementById('panelNext');

  pos.textContent = `${openIndex + 1} / ${visibleList.length}`;
  prev.disabled = openIndex <= 0;
  next.disabled = openIndex >= visibleList.length - 1;
}

document.getElementById('panelPrev').addEventListener('click', () => {
  if (openIndex > 0) {
    openPanel(openIndex - 1);
  }
});
document.getElementById('panelNext').addEventListener('click', () => {
  if (openIndex < visibleList.length - 1) {
    openPanel(openIndex + 1);
  }
});

document.getElementById('panelCloseBtn').addEventListener('click', closePanel);
backdrop.addEventListener('click', closePanel);

document.addEventListener('keydown', e => {
  if (!panel.classList.contains('open')) return;
  if (e.key === 'Escape') closePanel();
  if (e.key === 'ArrowLeft'  && openIndex > 0)                  openPanel(openIndex - 1);
  if (e.key === 'ArrowRight' && openIndex < visibleList.length - 1) openPanel(openIndex + 1);
});

/* ─────────────────────────────────────────────
   NAVBAR SCROLL
   ───────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }
}, { passive: true });

/* ─────────────────────────────────────────────
   PREMIUM FEATURES (Scroll, Cursor, Spotlight, Magnetic)
   ───────────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollH = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollH <= 0) {
      bar.style.width = '0%';
      return;
    }
    const pct = Math.min((window.scrollY / scrollH) * 100, 100);
    bar.style.width = `${pct}%`;
  }, { passive: true });
}

function initCardSpotlights() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const selectors = '.fwp-card, .resource-card, .btn';
  document.body.addEventListener('mousemove', (e) => {
    const card = e.target.closest(selectors);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  });
}

function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const buttons = document.querySelectorAll('.magnetic-btn');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ─────────────────────────────────────────────
   CANVAS CURSOR PARTICLE TRAIL (Active Theory style)
   ───────────────────────────────────────────── */
let cursorCanvas = null;
let cursorCtx = null;
let cursorParticles = [];

function initCursorTrail() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  
  cursorCanvas = document.createElement('canvas');
  cursorCanvas.id = 'cursorCanvas';
  cursorCanvas.style.position = 'fixed';
  cursorCanvas.style.inset = '0';
  cursorCanvas.style.width = '100vw';
  cursorCanvas.style.height = '100vh';
  cursorCanvas.style.pointerEvents = 'none';
  cursorCanvas.style.zIndex = '9998';
  document.body.appendChild(cursorCanvas);
  
  cursorCtx = cursorCanvas.getContext('2d');
  
  const resizeCursorCanvas = () => {
    cursorCanvas.width = window.innerWidth;
    cursorCanvas.height = window.innerHeight;
  };
  resizeCursorCanvas();
  window.addEventListener('resize', resizeCursorCanvas);
  
  let lastX = null;
  let lastY = null;
  
  window.addEventListener('mousemove', (e) => {
    const mx = e.clientX;
    const my = e.clientY;
    
    let distMoved = 0;
    if (lastX !== null && lastY !== null) {
      const dx = mx - lastX;
      const dy = my - lastY;
      distMoved = Math.sqrt(dx*dx + dy*dy);
    }
    
    lastX = mx;
    lastY = my;
    
    if (distMoved > 2) {
      const numToSpawn = Math.min(Math.floor(distMoved * 0.18) + 1, 4);
      for (let i = 0; i < numToSpawn; i++) {
        cursorParticles.push({
          x: mx,
          y: my,
          vx: (Math.random() - 0.5) * 2.2,
          vy: (Math.random() - 0.5) * 2.2,
          color: Math.random() > 0.5 ? '#06B6D4' : '#8B5CF6',
          size: Math.random() * 2.5 + 1.0,
          life: 1.0,
          decay: Math.random() * 0.025 + 0.015
        });
      }
    }
  }, { passive: true });
  
  runCursorTrailAnimation();
}

function runCursorTrailAnimation() {
  if (!cursorCanvas || !cursorCtx) return;
  
  const w = cursorCanvas.width;
  const h = cursorCanvas.height;
  
  cursorCtx.clearRect(0, 0, w, h);
  
  for (let i = cursorParticles.length - 1; i >= 0; i--) {
    const p = cursorParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.96;
    p.vy *= 0.96;
    p.life -= p.decay;
    
    if (p.life <= 0) {
      cursorParticles.splice(i, 1);
      continue;
    }
    
    cursorCtx.beginPath();
    cursorCtx.arc(p.x, p.y, p.size * p.life, 0, 2 * Math.PI);
    cursorCtx.fillStyle = p.color;
    cursorCtx.globalAlpha = p.life * 0.75;
    
    cursorCtx.shadowColor = p.color;
    cursorCtx.shadowBlur = 6;
    
    cursorCtx.fill();
  }
  cursorCtx.shadowBlur = 0;
  cursorCtx.globalAlpha = 1.0;
  
  requestAnimationFrame(runCursorTrailAnimation);
}

function initCursorFollower() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const follower = document.getElementById('cursorFollower');
  if (!follower) return;
  
  follower.style.display = 'block';
  
  let followerX = window.innerWidth / 2;
  let followerY = window.innerHeight / 2;
  let currentX = followerX;
  let currentY = followerY;
  const damping = 0.12;
  
  window.addEventListener('mousemove', (e) => {
    followerX = e.clientX;
    followerY = e.clientY;
  }, { passive: true });
  
  function updatePosition() {
    currentX += (followerX - currentX) * damping;
    currentY += (followerY - currentY) * damping;
    
    follower.style.left = `${currentX}px`;
    follower.style.top = `${currentY}px`;
    
    requestAnimationFrame(updatePosition);
  }
  requestAnimationFrame(updatePosition);
  
  const hoverSelectors = 'a, button, .fwp-card, .resource-card, .theme-btn';
  
  document.body.addEventListener('mouseenter', (e) => {
    if (e.target.matches && e.target.matches(hoverSelectors)) {
      follower.classList.add('hovered');
    }
  }, true);
  
  document.body.addEventListener('mouseleave', (e) => {
    if (e.target.matches && e.target.matches(hoverSelectors)) {
      follower.classList.remove('hovered');
    }
  }, true);
}

/* ─────────────────────────────────────────────
   INIT
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const countEl = document.getElementById('totalCount');
  if (countEl) countEl.textContent = FRAMEWORKS.length;

  initFilters();
  initSearch();
  initSort();
  buildGrid();
  
  // Interactive features
  initScrollProgress();
  initCardSpotlights();
  initMagneticButtons();
  initCursorTrail();
  initCursorFollower();
  initHoverAudio();
});

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ProdCast â€“ IIM Udaipur  |  App Logic + Rendering
   Active Theory-Inspired Cyber-HUD Experience
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   THEME TOGGLE & INITIALIZATION
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   CYBER SYNTH SOUND FX ENGINE
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
      // Crisp retro-HUD click beep
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'hover') {
      // High-frequency data crackle (double beep)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1300, now);
      osc.frequency.setValueAtTime(1900, now + 0.02);
      gain.gain.setValueAtTime(0.012, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'check') {
      // Satisfaction chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.setValueAtTime(600, now + 0.06);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'transition') {
      // Low-frequency transition hum sweep
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

// Hook up global sound control button
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
  const hoverSelectors = 'a, button, .sc-card, .mv-card, .track-card, .node-pulsar, .node-card, .tl-checkbox, .tl-item, .orbit-node, .holo-card, .winner-card, .pn-card';
  document.body.addEventListener('mouseenter', (e) => {
    if (e.target.matches && e.target.matches(hoverSelectors)) {
      playSound('hover');
    }
  }, true);
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   THREE.JS WAVE MESH HERO (Active Theory Style)
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
let threeScene = null;
let threeCamera = null;
let threeRenderer = null;
let waveMesh = null;
let waveGeometry = null;
let waveMaterial = null;
let threeTime = 0;

// Shared mouse tracking (normalized -1 to 1)
let mouseNX = 0;
let mouseNY = 0;
let mouseRawX = -9999;
let mouseRawY = -9999;

// Scroll velocity for skew warp
let lastScrollY = window.scrollY;
let scrollVelocity = 0;
let targetSkew = 0;
let currentSkew = 0;

// Grid resolution â€” more segments = smoother wave
const WAVE_SEGS_W = 80;
const WAVE_SEGS_H = 50;

function initHeroCanvas() {
  const mount = document.getElementById('heroThreeMount');
  if (!mount || typeof THREE === 'undefined') {
    // Fallback: silent fail, no crash
    return;
  }

  // Scene
  threeScene = new THREE.Scene();

  // Camera â€” orthographic-like perspective for flat layered look
  const aspect = window.innerWidth / window.innerHeight;
  threeCamera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
  threeCamera.position.set(0, 0, 5);

  // Renderer â€” alpha:true for transparent background
  threeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  threeRenderer.setSize(window.innerWidth, window.innerHeight);
  threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  threeRenderer.domElement.style.position = 'absolute';
  threeRenderer.domElement.style.inset = '0';
  threeRenderer.domElement.style.pointerEvents = 'none';
  mount.appendChild(threeRenderer.domElement);

  // Wave geometry â€” a flat PlaneGeometry that we displace in Z
  const planeW = 14 * aspect;
  const planeH = 14;
  waveGeometry = new THREE.PlaneGeometry(planeW, planeH, WAVE_SEGS_W, WAVE_SEGS_H);

  // Custom ShaderMaterial â€” handles wave displacement + color by Z
  waveMaterial = new THREE.ShaderMaterial({
    transparent: true,
    wireframe: true,
    uniforms: {
      uTime:      { value: 0.0 },
      uMouse:     { value: new THREE.Vector2(0, 0) },
      uAmplitude: { value: 0.28 },
      uFreqX:     { value: 1.8 },
      uFreqY:     { value: 1.4 },
      uSpeed:     { value: 0.55 },
      uColorA:    { value: new THREE.Color(0x8B5CF6) },  // purple (negative Z)
      uColorB:    { value: new THREE.Color(0x06B6D4) },  // cyan (positive Z)
      uOpacity:   { value: 0.55 },
    },
    vertexShader: `
      uniform float uTime;
      uniform vec2  uMouse;
      uniform float uAmplitude;
      uniform float uFreqX;
      uniform float uFreqY;
      uniform float uSpeed;
      varying float vZ;
      varying vec3  vPos;

      void main() {
        vec3 pos = position;

        // Base sinusoidal wave displacement
        float wave = sin(pos.x * uFreqX + uTime * uSpeed) *
                     cos(pos.y * uFreqY + uTime * uSpeed * 0.7) * uAmplitude;

        // Secondary ripple layer
        float ripple = sin(pos.x * 2.5 + uTime * 1.1) *
                       sin(pos.y * 2.2 + uTime * 0.9) * uAmplitude * 0.35;

        // Gaussian cursor ripple â€” creates a localized bump around mouse
        float dx = pos.x - uMouse.x * 7.0;
        float dy = pos.y - uMouse.y * 3.5;
        float mouseDist = sqrt(dx*dx + dy*dy);
        float mouseRipple = exp(-mouseDist * mouseDist * 0.18) *
                            sin(mouseDist * 3.5 - uTime * 4.0) * uAmplitude * 1.8;

        pos.z = wave + ripple + mouseRipple;
        vZ = pos.z;
        vPos = pos;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3  uColorA;
      uniform vec3  uColorB;
      uniform float uOpacity;
      varying float vZ;
      varying vec3  vPos;

      void main() {
        // Normalize Z from [-amplitude, +amplitude] to [0,1]
        float t = clamp((vZ + 0.28) / 0.56, 0.0, 1.0);
        vec3 col = mix(uColorA, uColorB, t);

        // Subtle edge fade using UV distance from center
        float edgeFade = 1.0 - smoothstep(0.35, 1.0, length(vPos.xy) / 7.5);

        gl_FragColor = vec4(col, uOpacity * edgeFade);
      }
    `
  });

  waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
  threeScene.add(waveMesh);

  // Mouse tracking â€” normalized screen coords
  window.addEventListener('mousemove', (e) => {
    mouseNX = (e.clientX / window.innerWidth)  * 2 - 1;
    mouseNY = -(e.clientY / window.innerHeight) * 2 + 1;
    mouseRawX = e.clientX;
    mouseRawY = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouseNX = 0;
    mouseNY = 0;
    mouseRawX = -9999;
    mouseRawY = -9999;
  });

  // Scroll velocity tracking
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    scrollVelocity = currentY - lastScrollY;
    lastScrollY = currentY;
  }, { passive: true });

  // Resize handler
  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    threeCamera.aspect = w / h;
    threeCamera.updateProjectionMatrix();
    threeRenderer.setSize(w, h);
  });

  runWaveMeshAnimation();
}

function runWaveMeshAnimation() {
  if (!threeRenderer) return;
  requestAnimationFrame(runWaveMeshAnimation);

  threeTime += 0.016;

  // Update wave uniforms
  waveMaterial.uniforms.uTime.value = threeTime;
  waveMaterial.uniforms.uMouse.value.set(mouseNX, mouseNY);

  // Subtle camera lean toward mouse â€” creates 3D parallax
  threeCamera.position.x += (mouseNX * 0.4 - threeCamera.position.x) * 0.04;
  threeCamera.position.y += (mouseNY * 0.25 - threeCamera.position.y) * 0.04;
  threeCamera.lookAt(0, 0, 0);

  // Scroll velocity decay + skew warp on HTML elements
  scrollVelocity *= 0.88;
  targetSkew = Math.max(Math.min(scrollVelocity * 0.05, 8), -8);
  currentSkew += (targetSkew - currentSkew) * 0.12;

  document.querySelectorAll('.scroll-velocity-warp').forEach(el => {
    el.style.transform = `skewY(${currentSkew}deg) translateY(${-currentSkew * 1.2}px)`;
  });

  threeRenderer.render(threeScene, threeCamera);
}


/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   CANVAS CURSOR PARTICLE TRAIL (Active Theory style)
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   STATS BAR (Counter Animation)
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function buildStatsBar() {
  const bar = document.getElementById('statsBar');
  if (!bar) return;
  bar.innerHTML = '';
  CLUB_STATS.forEach((s, i) => {
    if (i > 0) {
      const div = document.createElement('div');
      div.className = 'stat-div';
      bar.appendChild(div);
    }
    const item = document.createElement('div');
    item.className = 'stat-item';
    item.innerHTML = `
      <span class="stat-num" data-target="${s.number}">0</span>
      <span class="stat-label">${s.label}</span>`;
    bar.appendChild(item);
  });
}

function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const dur = 1800;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + (p < 1 ? '' : '+');
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target + '+';
    };
    requestAnimationFrame(tick);
  });
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   PM ROADMAP (Interactive Stages & Sidebar)
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function buildJourneyStages() {
  const container = document.getElementById('pmJourneyNodes');
  if (!container) return;
  container.innerHTML = '';
  
  PM_ROADMAP_STAGES.forEach((stage, idx) => {
    const row = document.createElement('div');
    row.className = 'journey-node-row';
    
    const contentWrap = document.createElement('div');
    contentWrap.className = 'node-content-wrap';
    
    const card = document.createElement('div');
    card.className = 'node-card glass';
    card.innerHTML = `
      <h3>${stage.number}. ${stage.name}</h3>
      <p>${stage.tagline}</p>
    `;
    card.addEventListener('click', () => {
      openStagePanel(stage);
      playSound('click');
    });
    
    contentWrap.appendChild(card);
    
    const bubbleWrap = document.createElement('div');
    bubbleWrap.className = 'node-bubble-wrap';
    
    const pulsar = document.createElement('div');
    pulsar.className = 'node-pulsar';
    pulsar.innerHTML = stage.icon;
    pulsar.addEventListener('click', () => {
      openStagePanel(stage);
      playSound('click');
    });
    
    bubbleWrap.appendChild(pulsar);
    
    row.appendChild(contentWrap);
    row.appendChild(bubbleWrap);
    
    container.appendChild(row);
  });
}

function openStagePanel(stage) {
  const panel = document.getElementById('journeyStagePanel');
  const backdrop = document.getElementById('panelBackdrop');
  if (!panel || !backdrop) return;
  
  document.getElementById('stageIcon').textContent = stage.icon;
  document.getElementById('stageNumber').textContent = `Stage ${stage.number}`;
  document.getElementById('stageName').textContent = stage.name;
  document.getElementById('stageTagline').textContent = stage.tagline;
  
  // Skills list
  const skillsList = document.getElementById('stageSkills');
  skillsList.innerHTML = stage.skills.map(s => `<li>${s}</li>`).join('');
  
  // Resources cards
  const resList = document.getElementById('stageResources');
  resList.innerHTML = stage.resources.map(r => `
    <div class="panel-res-card">
      <strong>${r.title}</strong>
      <span>${r.desc}</span>
    </div>
  `).join('');
  
  // Workshops list
  const workshopsList = document.getElementById('stageWorkshops');
  workshopsList.innerHTML = stage.workshops.map(w => `<li>${w}</li>`).join('');
  
  // Projects list
  const projectsList = document.getElementById('stageProjects');
  projectsList.innerHTML = stage.projects.map(p => `<li>${p}</li>`).join('');
  
  panel.classList.add('open');
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeStagePanel() {
  const panel = document.getElementById('journeyStagePanel');
  const backdrop = document.getElementById('panelBackdrop');
  if (panel) panel.classList.remove('open');
  if (backdrop && !document.getElementById('teamProfilePanel').classList.contains('open')) {
    backdrop.classList.remove('open');
  }
  document.body.style.overflow = '';
}

// Hook up panel close buttons
const journeyPanelCloseBtn = document.getElementById('journeyPanelCloseBtn');
if (journeyPanelCloseBtn) {
  journeyPanelCloseBtn.addEventListener('click', () => {
    closeStagePanel();
    playSound('click');
  });
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   EVENTS & WINNERS UNIVERSE
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function buildEventsUniverse() {
  const grid = document.getElementById('eventsUniverseGrid');
  if (!grid) return;
  grid.innerHTML = '';
  
  EVENTS.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'holo-card fade-up';
    card.innerHTML = `
      <div class="holo-header" style="background:${ev.gradient}">
        <span style="font-size:3rem;position:relative;z-index:1">${ev.emoji}</span>
      </div>
      <div class="holo-body">
        <div class="holo-meta">
          <span class="holo-badge tag-${ev.tag}">${ev.tag}</span>
          <span class="holo-date">${ev.date}</span>
        </div>
        <h3 class="holo-title">${ev.title}</h3>
        <p class="holo-desc">${ev.desc}</p>
        <div class="holo-footer">
          <div class="holo-speaker">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            ${ev.participants}+ participants
          </div>
          <span class="holo-cta">
            Learn More
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </div>
      </div>
    `;
    
    card.addEventListener('click', () => {
      const target = document.getElementById('projects');
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      playSound('click');
    });
    
    grid.appendChild(card);
  });
}

function buildWinnersUniverse() {
  const grid = document.getElementById('winnersUniverseGrid');
  if (!grid) return;
  grid.innerHTML = '';
  
  WINNERS.forEach(w => {
    const card = document.createElement('div');
    card.className = 'winner-card glass fade-up';
    const membersHtml = w.members.map(m => `<span class="member-chip">${m}</span>`).join('');
    
    card.innerHTML = `
      <div class="winner-banner" style="background:${w.gradient}"></div>
      <div class="winner-body">
        <div class="winner-trophy">${w.emoji}</div>
        <div class="winner-competition">${w.competition}</div>
        <h3 class="winner-name">${w.winner}</h3>
        <div class="winner-achievement">${w.achievement}</div>
        <div class="winner-members">${membersHtml}</div>
        <p class="winner-desc">${w.desc}</p>
        <div class="winner-prize">ðŸ… ${w.prize}</div>
      </div>
    `;
    
    card.addEventListener('click', () => playSound('click'));
    
    grid.appendChild(card);
  });
}

function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const paneId = tab.dataset.tab;
      document.querySelectorAll('.tab-pane').forEach(p => {
        p.classList.toggle('active', p.id === paneId);
      });
      playSound('transition');
      triggerFadeIn();
    });
  });
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   TEAM SOLAR ORBITS SHOWCASE
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function buildTeamOrbits() {
  const solarSystem = document.getElementById('solarSystem');
  if (!solarSystem) return;
  
  const existingOrbits = solarSystem.querySelectorAll('.orbit-line');
  existingOrbits.forEach(el => el.remove());
  
  const president = TEAM.leadership.find(m => m.role === 'President');
  const vp = TEAM.leadership.find(m => m.role === 'Vice President');
  const strategy = TEAM.core.find(m => m.role === 'Head of Strategy');
  const events = TEAM.core.find(m => m.role === 'Head of Events');
  const content = TEAM.core.find(m => m.role === 'Head of Content');
  const digital = TEAM.core.find(m => m.role === 'Digital Lead');
  const community = TEAM.core.find(m => m.role === 'Community Lead');
  const finance = TEAM.core.find(m => m.role === 'Finance & Ops');

  // Sun / President setup
  const sunNode = document.getElementById('sunNode');
  if (sunNode && president) {
    sunNode.querySelector('.sun-avatar').textContent = president.avatar;
    sunNode.querySelector('.sun-label').textContent = president.name;
    
    const newSunNode = sunNode.cloneNode(true);
    sunNode.parentNode.replaceChild(newSunNode, sunNode);
    
    newSunNode.addEventListener('click', () => {
      openTeamPanel(president);
      playSound('click');
    });
  }

  // Orbit 1: VP (Priya Mehta) & Head of Strategy (Vikram Singh)
  const orbit1 = document.createElement('div');
  orbit1.className = 'orbit-line orbit-line-1';
  if (vp) orbit1.appendChild(createOrbitNode(vp, 'node-vp'));
  if (strategy) orbit1.appendChild(createOrbitNode(strategy, 'node-ops'));
  solarSystem.appendChild(orbit1);
  
  // Orbit 2: Head of Events (Arjun Patel) & Head of Content (Sneha Kumar)
  const orbit2 = document.createElement('div');
  orbit2.className = 'orbit-line orbit-line-2';
  if (events) orbit2.appendChild(createOrbitNode(events, 'node-eve'));
  if (content) orbit2.appendChild(createOrbitNode(content, 'node-des'));
  solarSystem.appendChild(orbit2);
  
  // Orbit 3: Digital Lead (Kavya Reddy), Community Lead (Ananya Gupta), Finance & Ops (Rohan Das)
  const orbit3 = document.createElement('div');
  orbit3.className = 'orbit-line orbit-line-3';
  if (digital) orbit3.appendChild(createOrbitNode(digital, 'node-mkt'));
  if (community) orbit3.appendChild(createOrbitNode(community, 'node-core'));
  if (finance) orbit3.appendChild(createOrbitNode(finance, 'node-fin'));
  solarSystem.appendChild(orbit3);
}

function createOrbitNode(member, positionClass) {
  const node = document.createElement('div');
  node.className = `orbit-node ${positionClass}`;
  node.innerHTML = `
    <div class="orbit-node-img" style="background:${member.gradient}">${member.avatar}</div>
    <div class="orbit-node-label">${member.role.split(' ')[0]}</div>
  `;
  node.addEventListener('click', (e) => {
    e.stopPropagation();
    openTeamPanel(member);
    playSound('click');
  });
  return node;
}

function openTeamPanel(member) {
  const panel = document.getElementById('teamProfilePanel');
  const backdrop = document.getElementById('panelBackdrop');
  if (!panel || !backdrop) return;
  
  const avatar = document.getElementById('teamMemberAvatar');
  avatar.textContent = member.avatar;
  avatar.style.background = member.gradient;
  
  document.getElementById('teamMemberName').textContent = member.name;
  document.getElementById('teamMemberRole').textContent = member.role;
  document.getElementById('teamMemberBatch').textContent = member.batch;
  document.getElementById('teamMemberBio').textContent = member.bio;
  
  const contribEl = document.getElementById('teamMemberContributions');
  if (member.role === 'President') {
    contribEl.textContent = "Drives ProdCast's strategic vision, manages club portfolios, establishes industry relationships, and oversees year-round operations.";
  } else if (member.role === 'Vice President') {
    contribEl.textContent = "Spearheads operational timelines, manages workshop execution pipelines, coordinates guest speaker alignment, and drives membership engagement.";
  } else if (member.role === 'Head of Events') {
    contribEl.textContent = "Organizes large-scale case competitions and hackathons (ProdThon), designs case prompts, coordinates evaluation panels, and schedules logistics.";
  } else if (member.role === 'Head of Content') {
    contribEl.textContent = "Crafts editorial guidelines for ProdNew archives, manages marketing layouts, leads content drafting for weekly PM insights, and writes core summaries.";
  } else if (member.role === 'Head of Strategy') {
    contribEl.textContent = "Identifies cross-college collaboration channels, structures corporate relations, manages sponsor pitches, and designs career preparation models.";
  } else if (member.role === 'Community Lead') {
    contribEl.textContent = "Fosters student community networking, coordinates cohort feedback loops, organizes intra-club mixers, and manages speaker interactions.";
  } else if (member.role === 'Finance & Ops') {
    contribEl.textContent = "Controls budget allocation matrices, handles prize distribution structures, drives vendor negotiations, and leads event operational logistics.";
  } else if (member.role === 'Digital Lead') {
    contribEl.textContent = "Oversees social channels, monitors growth metrics campaigns, manages community reach strategies, and handles digital telemetry analysis.";
  } else {
    contribEl.textContent = "Led orientations, designed GTM roadmap benchmarks, and structured PM interview frameworks libraries.";
  }
  
  const liBtn = document.getElementById('teamMemberLinkedIn');
  if (liBtn) {
    liBtn.href = member.linkedin || '#';
  }
  
  panel.classList.add('open');
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeTeamPanel() {
  const panel = document.getElementById('teamProfilePanel');
  const backdrop = document.getElementById('panelBackdrop');
  if (panel) panel.classList.remove('open');
  if (backdrop && !document.getElementById('journeyStagePanel').classList.contains('open')) {
    backdrop.classList.remove('open');
  }
  document.body.style.overflow = '';
}

const teamPanelCloseBtn = document.getElementById('teamPanelCloseBtn');
if (teamPanelCloseBtn) {
  teamPanelCloseBtn.addEventListener('click', () => {
    closeTeamPanel();
    playSound('click');
  });
}

function buildMobileTeamFallback() {
  const container = document.getElementById('mobileTeamFallback');
  if (!container) return;
  container.innerHTML = '';
  
  const allMembers = [
    ...TEAM.leadership,
    ...TEAM.core
  ];
  
  allMembers.forEach(member => {
    const card = document.createElement('div');
    card.className = 'flip-card';
    card.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-front">
          <div class="member-avatar" style="background:${member.gradient}">${member.avatar}</div>
          <div class="member-name">${member.name}</div>
          <div class="member-role">${member.role}</div>
          <div class="member-batch">${member.batch}</div>
          <div class="flip-hint">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
            Tap to view profile
          </div>
        </div>
        <div class="flip-back">
          <div class="member-avatar" style="background:${member.gradient};opacity:.7">${member.avatar}</div>
          <div class="member-name">${member.name}</div>
          <div class="member-role" style="margin-bottom:8px">${member.role}</div>
          <p class="back-bio">${member.bio}</p>
          <button class="linkedin-btn" style="margin-top:auto; font-size:0.75rem; padding:6px 12px;">More Details</button>
        </div>
      </div>
    `;
    
    const moreBtn = card.querySelector('.linkedin-btn');
    moreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openTeamPanel(member);
      playSound('click');
    });
    
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      playSound('click');
    });
    
    container.appendChild(card);
  });
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   INDUSTRY CONNECTIONS NETWORK GRAPH (Canvas)
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const NETWORK_DATA = {
  nodes: [
    { id: "club", label: "ProdCast Club", type: "center", size: 16, color: "#8B5CF6", details: { name: "ProdCast IIM Udaipur", role: "Product Club Headquarters", quote: "The gravitational core of product innovations at IIM Udaipur." } },
    { id: "alum1", label: "Vikram Nair", type: "alumni", size: 10, color: "#06B6D4", details: { name: "Vikram Nair", role: "Alumni Â· PM at Google", quote: "Focus on structured user thinking. CIRCLES is your friend, but empathy is your core." } },
    { id: "alum2", label: "Ananya Gupta", type: "alumni", size: 10, color: "#06B6D4", details: { name: "Ananya Gupta", role: "Alumni Â· PM at Microsoft", quote: "Agile alignment with engineering starts with respect and writing detailed technical specifications." } },
    { id: "alum3", label: "Arjun Patel", type: "alumni", size: 10, color: "#06B6D4", details: { name: "Arjun Patel", role: "Alumni Â· Growth PM at Flipkart", quote: "Analyze telemetry trends closely. Conversion funnel optimization drives major revenue scale." } },
    { id: "alum4", label: "Shreya Kapoor", type: "alumni", size: 10, color: "#06B6D4", details: { name: "Shreya Kapoor", role: "Alumni Â· PM at Amazon", quote: "Write working backwards press releases (PRFAQs) before writing code. Define success metrics early." } },
    { id: "mentor1", label: "Karan Shah", type: "mentor", size: 11, color: "#EC4899", details: { name: "Karan Shah", role: "Mentor Â· Director of Product at Razorpay", quote: "Product managers solve business problems. Keep your unit economics and checkout funnels friction-free." } },
    { id: "mentor2", label: "Priya Mehta", type: "mentor", size: 11, color: "#EC4899", details: { name: "Priya Mehta", role: "Mentor Â· VP of Product at Swiggy", quote: "Delighters are transient. Kano shows that what delights today is expected tomorrow. Keep innovating." } },
    { id: "mentor3", label: "Manav Singh", type: "mentor", size: 11, color: "#EC4899", details: { name: "Manav Singh", role: "Mentor Â· Lead PM at Netflix", quote: "A/B testing is not about finding what works, but understanding user behavior variance at scale." } },
    { id: "partner1", label: "Mixpanel", type: "partner", size: 9, color: "#10B981", details: { name: "Mixpanel", role: "Ecosystem Partner Â· Analytics Platform", quote: "Telemetry tracking helps PMs see what users actually do rather than what they say." } },
    { id: "partner2", label: "Amplitude", type: "partner", size: 9, color: "#10B981", details: { name: "Amplitude", role: "Ecosystem Partner Â· Product Intelligence", quote: "Cohort analysis separates active users from churn. Measure retention to find product-market fit." } },
    { id: "partner3", label: "Jira / Atlassian", type: "partner", size: 9, color: "#10B981", details: { name: "Jira / Atlassian", role: "Workflow Partner", quote: "Agile backlogs align development sprints. Map user stories to plan horizontal MVP slices." } }
  ],
  links: [
    { source: "club", target: "alum1" },
    { source: "club", target: "alum2" },
    { source: "club", target: "alum3" },
    { source: "club", target: "alum4" },
    { source: "club", target: "mentor1" },
    { source: "club", target: "mentor2" },
    { source: "club", target: "mentor3" },
    { source: "club", target: "partner1" },
    { source: "club", target: "partner2" },
    { source: "club", target: "partner3" },
    { source: "alum1", target: "mentor1" },
    { source: "alum2", target: "mentor3" },
    { source: "alum3", target: "partner1" },
    { source: "alum4", target: "partner2" },
    { source: "mentor1", target: "partner3" },
    { source: "mentor2", target: "alum3" }
  ]
};

let networkCanvas = null;
let networkCtx = null;
let networkNodes = [];
let networkLinks = [];
let hoveredNode = null;
let networkAnimationFrameId = null;

function initNetworkGraph() {
  networkCanvas = document.getElementById('networkCanvas');
  if (!networkCanvas) return;
  
  networkCtx = networkCanvas.getContext('2d');
  
  const resizeCanvas = () => {
    const rect = networkCanvas.parentNode.getBoundingClientRect();
    networkCanvas.width = rect.width;
    networkCanvas.height = 480;
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  const w = networkCanvas.width;
  const h = networkCanvas.height;
  
  networkNodes = NETWORK_DATA.nodes.map(n => ({
    ...n,
    x: w/2 + (Math.random() - 0.5) * (w * 0.6),
    y: h/2 + (Math.random() - 0.5) * (h * 0.6),
    vx: 0,
    vy: 0
  }));
  
  networkLinks = NETWORK_DATA.links.map(l => {
    const sNode = networkNodes.find(n => n.id === l.source);
    const tNode = networkNodes.find(n => n.id === l.target);
    return { source: sNode, target: tNode };
  });
  
  networkCanvas.addEventListener('mousemove', (e) => {
    const rect = networkCanvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    let foundNode = null;
    for (let i = 0; i < networkNodes.length; i++) {
      const n = networkNodes[i];
      const dx = mx - n.x;
      const dy = my - n.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist <= n.size + 6) {
        foundNode = n;
        break;
      }
    }
    
    if (foundNode !== hoveredNode) {
      hoveredNode = foundNode;
      if (hoveredNode) {
        playSound('hover');
        showNetworkTooltip(hoveredNode, e.clientX, e.clientY);
      } else {
        hideNetworkTooltip();
      }
    } else if (hoveredNode) {
      showNetworkTooltip(hoveredNode, e.clientX, e.clientY);
    }
  });
  
  networkCanvas.addEventListener('mouseleave', () => {
    hoveredNode = null;
    hideNetworkTooltip();
  });
  
  runNetworkSimulation();
}

function showNetworkTooltip(node, clientX, clientY) {
  const tooltip = document.getElementById('networkTooltip');
  if (!tooltip) return;
  
  tooltip.innerHTML = `
    <div class="tooltip-title">${node.details.name}</div>
    <div class="tooltip-role">${node.details.role}</div>
    <div class="tooltip-quote">"${node.details.quote}"</div>
  `;
  
  tooltip.style.opacity = '1';
  
  const rect = networkCanvas.parentNode.getBoundingClientRect();
  const x = clientX - rect.left + 15;
  const y = clientY - rect.top + 15;
  
  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
}

function hideNetworkTooltip() {
  const tooltip = document.getElementById('networkTooltip');
  if (tooltip) {
    tooltip.style.opacity = '0';
  }
}

function runNetworkSimulation() {
  if (!networkCanvas || !networkCtx) return;
  
  const w = networkCanvas.width;
  const h = networkCanvas.height;
  const kRepulsion = 1500;
  const kAttraction = 0.04;
  const centerForce = 0.015;
  const targetDist = 90;
  const damping = 0.85;
  
  for (let i = 0; i < networkNodes.length; i++) {
    const n1 = networkNodes[i];
    for (let j = i + 1; j < networkNodes.length; j++) {
      const n2 = networkNodes[j];
      const dx = n2.x - n1.x;
      const dy = n2.y - n1.y;
      const dist = Math.sqrt(dx*dx + dy*dy) || 1;
      
      const force = kRepulsion / (dist * dist);
      const fx = force * (dx / dist);
      const fy = force * (dy / dist);
      
      n1.vx -= fx;
      n1.vy -= fy;
      n2.vx += fx;
      n2.vy += fy;
    }
  }
  
  for (let i = 0; i < networkLinks.length; i++) {
    const link = networkLinks[i];
    const dx = link.target.x - link.source.x;
    const dy = link.target.y - link.source.y;
    const dist = Math.sqrt(dx*dx + dy*dy) || 1;
    
    const force = kAttraction * (dist - targetDist);
    const fx = force * (dx / dist);
    const fy = force * (dy / dist);
    
    link.source.vx += fx;
    link.source.vy += fy;
    link.target.vx -= fx;
    link.target.vy -= fy;
  }
  
  for (let i = 0; i < networkNodes.length; i++) {
    const n = networkNodes[i];
    
    const dx = w/2 - n.x;
    const dy = h/2 - n.y;
    n.vx += dx * centerForce;
    n.vy += dy * centerForce;
    
    n.x += n.vx;
    n.y += n.vy;
    
    n.vx *= damping;
    n.vy *= damping;
    
    const pad = n.size + 10;
    if (n.x < pad) { n.x = pad; n.vx *= -0.5; }
    if (n.x > w - pad) { n.x = w - pad; n.vx *= -0.5; }
    if (n.y < pad) { n.y = pad; n.vy *= -0.5; }
    if (n.y > h - pad) { n.y = h - pad; n.vy *= -0.5; }
  }
  
  networkCtx.clearRect(0, 0, w, h);
  
  // Links
  for (let i = 0; i < networkLinks.length; i++) {
    const link = networkLinks[i];
    networkCtx.beginPath();
    networkCtx.moveTo(link.source.x, link.source.y);
    networkCtx.lineTo(link.target.x, link.target.y);
    
    const isAdjacent = hoveredNode && (link.source === hoveredNode || link.target === hoveredNode);
    if (hoveredNode) {
      if (isAdjacent) {
        networkCtx.strokeStyle = "rgba(6, 182, 212, 0.7)";
        networkCtx.lineWidth = 2.5;
        networkCtx.shadowColor = "#06B6D4";
        networkCtx.shadowBlur = 8;
      } else {
        networkCtx.strokeStyle = "rgba(255, 255, 255, 0.02)";
        networkCtx.lineWidth = 1;
        networkCtx.shadowBlur = 0;
      }
    } else {
      networkCtx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      networkCtx.lineWidth = 1.2;
      networkCtx.shadowBlur = 0;
    }
    networkCtx.stroke();
  }
  
  // Nodes
  networkCtx.shadowBlur = 0;
  for (let i = 0; i < networkNodes.length; i++) {
    const n = networkNodes[i];
    networkCtx.beginPath();
    networkCtx.arc(n.x, n.y, n.size, 0, 2 * Math.PI);
    
    const isHovered = n === hoveredNode;
    const isAdjacent = hoveredNode && networkLinks.some(l => 
      (l.source === hoveredNode && l.target === n) || 
      (l.target === hoveredNode && l.source === n)
    );
    
    if (hoveredNode) {
      if (isHovered) {
        networkCtx.fillStyle = n.color;
        networkCtx.strokeStyle = "#fff";
        networkCtx.lineWidth = 2.5;
        networkCtx.shadowColor = n.color;
        networkCtx.shadowBlur = 12;
      } else if (isAdjacent) {
        networkCtx.fillStyle = n.color;
        networkCtx.strokeStyle = "rgba(6, 182, 212, 0.6)";
        networkCtx.lineWidth = 1.8;
        networkCtx.shadowColor = "#06B6D4";
        networkCtx.shadowBlur = 6;
      } else {
        networkCtx.fillStyle = "rgba(255, 255, 255, 0.05)";
        networkCtx.strokeStyle = "rgba(255, 255, 255, 0.02)";
        networkCtx.lineWidth = 1;
        networkCtx.shadowBlur = 0;
      }
    } else {
      networkCtx.fillStyle = n.color;
      networkCtx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      networkCtx.lineWidth = 1.5;
      networkCtx.shadowBlur = 0;
    }
    
    networkCtx.fill();
    networkCtx.stroke();
    
    if (!hoveredNode || isHovered || isAdjacent) {
      networkCtx.font = "bold 9px 'Space Grotesk', sans-serif";
      networkCtx.fillStyle = isHovered ? "#fff" : "rgba(255, 255, 255, 0.75)";
      networkCtx.textAlign = "center";
      networkCtx.fillText(n.label, n.x, n.y - n.size - 6);
    }
  }
  
  networkCtx.shadowBlur = 0;
  networkAnimationFrameId = requestAnimationFrame(runNetworkSimulation);
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   CHECKLIST ROADMAP (Dashboard Progress & Checklist)
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const STATUS_META = {
  done:       { label: 'Done',        icon: 'âœ…', cls: 'done'       },
  inprogress: { label: 'In Progress', icon: 'ðŸ”„', cls: 'inprogress' },
  planned:    { label: 'Planned',     icon: 'ðŸ“‹', cls: 'planned'    },
};

let checkedMilestones = JSON.parse(localStorage.getItem('prodcast-milestones')) || {};

function saveMilestoneState(id, isChecked) {
  if (isChecked) {
    checkedMilestones[id] = true;
  } else {
    delete checkedMilestones[id];
  }
  localStorage.setItem('prodcast-milestones', JSON.stringify(checkedMilestones));
}

function updateProgressTracker() {
  const allItems = [];
  ROADMAP.forEach(q => {
    q.items.forEach(item => {
      allItems.push(item);
    });
  });

  const total = allItems.length;
  if (total === 0) return;

  let completed = 0;
  allItems.forEach(item => {
    const id = item.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    if (checkedMilestones[id]) {
      completed++;
    }
  });

  const pct = Math.round((completed / total) * 100);

  const statsEl = document.getElementById('roadmapProgressStats');
  if (statsEl) {
    statsEl.textContent = `${completed} / ${total} Completed`;
  }

  const pctEl = document.getElementById('roadmapProgressPct');
  if (pctEl) {
    pctEl.textContent = `${pct}%`;
  }

  const ring = document.getElementById('roadmapProgressRing');
  if (ring) {
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (pct / 100) * circumference;
    ring.style.strokeDashoffset = offset;
  }
}

function buildRoadmap() {
  const el = document.getElementById('timelineEl');
  if (!el) return;
  el.innerHTML = '';

  ROADMAP.forEach(q => {
    const block = document.createElement('div');
    block.className = 'quarter-block';

    const label = document.createElement('div');
    label.className = 'quarter-label';
    label.textContent = q.quarter;
    block.appendChild(label);

    q.items.forEach(item => {
      const meta = STATUS_META[item.status];
      const itemId = item.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const isChecked = !!checkedMilestones[itemId];

      const row = document.createElement('div');
      row.className = `tl-item fade-up${isChecked ? ' checked-item' : ''}`;
      row.dataset.status = item.status;
      
      row.innerHTML = `
        <div class="tl-checkbox-wrap">
          <button class="tl-checkbox${isChecked ? ' checked' : ''}" aria-label="Mark completed" data-id="${itemId}" title="Mark as attended/completed">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
        </div>
        <div class="tl-status ${meta.cls}">${meta.icon}</div>
        <div class="tl-body">
          <div class="tl-top">
            <span class="tl-title">${item.title}</span>
            <span class="status-badge badge-${meta.cls}">${meta.label}</span>
            <span class="tl-date">${item.date}</span>
          </div>
          <p class="tl-desc">${item.desc}</p>
        </div>
        <svg class="tl-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>`;

      const checkboxBtn = row.querySelector('.tl-checkbox');
      checkboxBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const active = checkboxBtn.classList.toggle('checked');
        row.classList.toggle('checked-item', active);
        saveMilestoneState(itemId, active);
        updateProgressTracker();
        playSound('check');
      });

      row.addEventListener('click', (e) => {
        if (!e.target.closest('.tl-checkbox-wrap')) {
          row.classList.toggle('expanded');
          playSound('click');
        }
      });

      block.appendChild(row);
    });

    el.appendChild(block);
  });

  const resetBtn = document.getElementById('resetRoadmapProgressBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      checkedMilestones = {};
      localStorage.setItem('prodcast-milestones', JSON.stringify(checkedMilestones));
      
      document.querySelectorAll('.tl-checkbox').forEach(btn => {
        btn.classList.remove('checked');
      });
      document.querySelectorAll('.tl-item').forEach(item => {
        item.classList.remove('checked-item');
      });
      
      playSound('click');
      updateProgressTracker();
    });
  }

  updateProgressTracker();
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   PRODNEW ARCHIVES
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function buildProdnew() {
  const grid = document.getElementById('prodnewGrid');
  if (!grid) return;
  grid.innerHTML = '';
  
  PRODNEW.forEach(post => {
    const card = document.createElement('div');
    card.className = 'pn-card fade-up';
    card.dataset.status = post.status;

    const chipCls = `chip-${post.status}`;
    const statusLabel = { published:'Published', scheduled:'Scheduled', drafting:'Drafting' }[post.status];
    const viewBtn = post.url
      ? `<button class="pn-view-btn" onclick="window.open('${post.url}','_blank')">View on Instagram</button>`
      : `<button class="pn-view-btn" style="opacity:.5;cursor:default">Coming Soon</button>`;
    const likesHtml = post.likes
      ? `<span class="pn-likes">â¤ï¸ ${post.likes}</span>`
      : '';

    card.innerHTML = `
      <div class="pn-visual" style="background:${post.gradient}">
        <div class="pn-emoji">${post.emoji}</div>
        <div class="pn-title-overlay">${post.title}</div>
        <div class="pn-hover-overlay">
          <p class="pn-caption-text">${post.caption}</p>
          ${viewBtn}
        </div>
      </div>
      <div class="pn-body">
        <div class="pn-card-title">${post.title}</div>
        <div class="pn-meta">
          <span class="status-chip ${chipCls}">${statusLabel}</span>
          <span class="pn-date">${post.date}</span>
          ${likesHtml}
        </div>
      </div>`;

    card.addEventListener('click', () => playSound('click'));

    grid.appendChild(card);
  });
}

function initProdnewFilters() {
  const btns = document.querySelectorAll('#prodnewFilters .filt');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      playSound('click');
      const f = btn.dataset.f;
      document.querySelectorAll('.pn-card').forEach(card => {
        card.classList.toggle('hidden', f !== 'all' && card.dataset.status !== f);
      });
    });
  });
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   NAVBAR ACTIVE SCROLL
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
    updateActiveNav();
  }, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        playSound('transition');
        const isMobile = window.innerWidth <= 900;
        const offset   = isMobile ? 0 : 70;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}

function updateActiveNav() {
  const sections = ['home','about','pm-roadmap','events','team','connections','projects'];
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.5) current = id;
  });

  document.querySelectorAll('[data-nav]').forEach(el => {
    el.classList.toggle('active', el.dataset.nav === current);
  });
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   SCROLL PROGRESS
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   HUD INTERACTIVE TYPING CAROUSEL
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function initTaglineCarousel() {
  const txtEl = document.getElementById('taglineTxt');
  if (!txtEl) return;
  const taglines = [
    "Where Product Thinking Meets Leadership",
    "Bridging Strategy, Design & Business",
    "Mastering Frameworks, Solving Real Problems",
    "Fostering the Next Gen of Product Leaders"
  ];
  
  let currentLine = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 60;
  
  const typeTick = () => {
    const fullText = taglines[currentLine];
    
    if (isDeleting) {
      txtEl.textContent = fullText.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 30;
    } else {
      txtEl.textContent = fullText.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 60;
    }
    
    // Glitch effect on finish typing or starting deletion
    if (!isDeleting && charIdx === fullText.length) {
      isDeleting = false;
      txtEl.classList.add('glitch-active');
      setTimeout(() => {
        txtEl.classList.remove('glitch-active');
        isDeleting = true;
        setTimeout(typeTick, 2800); // Pause on typed text
      }, 500);
      return;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      currentLine = (currentLine + 1) % taglines.length;
      typingSpeed = 400; // Pause before typing next line
    }
    
    setTimeout(typeTick, typingSpeed);
  };
  
  typeTick();
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   INTERSECTION OBSERVER FADE IN
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
let countersDone = false;

function triggerFadeIn() {
  document.querySelectorAll('.fade-up:not(.visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      el.classList.add('visible');
    }
  });

  if (!countersDone) {
    const statsBar = document.getElementById('statsBar');
    if (statsBar) {
      const rect = statsBar.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        countersDone = true;
        animateCounters();
      }
    }
  }
}

function initScrollObserver() {
  if (!('IntersectionObserver' in window)) {
    window.addEventListener('scroll', triggerFadeIn, { passive: true });
    triggerFadeIn();
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const parent = el.parentElement;
        if (parent) {
          const siblings = Array.from(parent.querySelectorAll('.fade-up'));
          if (siblings.length > 1 && siblings.includes(el)) {
            const index = siblings.indexOf(el);
            el.style.transitionDelay = `${index * 60}ms`;
          }
        }
        
        el.classList.add('visible');
        obs.unobserve(el);

        if (el.id === 'statsBar' || el.closest('#statsBar')) {
          if (!countersDone) {
            countersDone = true;
            animateCounters();
          }
        }
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.05
  });

  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });

  const statsBar = document.getElementById('statsBar');
  if (statsBar) observer.observe(statsBar);
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   SPOTLIGHT MOUSE HOVER EFFECT
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function initCardSpotlights() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  
  const selectors = '.mv-card, .event-card, .winner-card, .pn-card, .fwp-preview-card, .track-card, .holo-card, .fw-teaser-cta';
  
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   MAGNETIC BUTTONS
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   CUSTOM CURSOR FOLLOWER
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
  
  const hoverSelectors = 'a, button, .flip-card, .fwp-preview-card, .pn-card, .event-card, .winner-card, .mv-card, .theme-btn, .orbit-node, .node-pulsar, .node-card, .tl-checkbox, .tl-item';
  
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   BACKDROP DISMISS LISTENER
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function initBackdropDismiss() {
  const backdrop = document.getElementById('panelBackdrop');
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeStagePanel();
      closeTeamPanel();
      playSound('click');
    });
  }
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   ACTIVE THEORY VISUAL SYSTEMS
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function initPageCurtain() {
  const curtain = document.getElementById('pageCurtain');
  if (curtain) {
    setTimeout(() => {
      curtain.classList.add('curtain-out');
    }, 100);
  }
}

function initHeroDisplayReveal() {
  const lines = document.querySelectorAll('.hdl-line');
  lines.forEach(line => {
    const delay = parseInt(line.dataset.delay || 0, 10);
    setTimeout(() => {
      line.classList.add('hdl-revealed');
    }, 400 + delay);
  });
}

function initNoiseGrain() {
  const canvas = document.getElementById('noiseCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  let w = window.innerWidth;
  let h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;

  window.addEventListener('resize', () => {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  }, { passive: true });

  function renderNoise() {
    const idata = ctx.createImageData(w, h);
    const buffer32 = new Uint32Array(idata.data.buffer);
    const len = buffer32.length;
    for (let i = 0; i < len; i++) {
      if (Math.random() < 0.05) {
        buffer32[i] = 0x11ffffff; // very subtle white noise
      }
    }
    ctx.putImageData(idata, 0, 0);
    requestAnimationFrame(renderNoise);
  }
  renderNoise();
}

function initClipReveal() {
  const masks = document.querySelectorAll('.reveal-mask');
  if (masks.length === 0) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  masks.forEach(m => obs.observe(m));
}

function initCard3DTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const cards = document.querySelectorAll('.sc-card, .holo-card, .pn-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPct = (x / rect.width) - 0.5;
      const yPct = (y / rect.height) - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${xPct * 10}deg) rotateX(${-yPct * 10}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function initShowcaseRibbon() {
  const track = document.getElementById('showcaseTrack');
  if (!track) return;
  let isDown = false;
  let startX;
  let scrollLeft;
  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('active');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.classList.remove('active');
  });
  track.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('active');
  });
  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   FLAGSHIP EVENTS DATA
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const FLAGSHIP_EVENTS = [
  { name: 'Prod360',          icon: '🔄', color: '#8B5CF6', desc: 'A comprehensive PM simulation covering the full product lifecycle — from market research and ideation to roadmapping and go-to-market launch strategy.' },
  { name: 'ProdShot',         icon: '📸', color: '#06B6D4', desc: 'Weekly product teardown challenges where members dissect, critique, and redesign real-world product experiences in rapid 60-minute sprints.' },
  { name: 'ProdUxpert',       icon: '🎨', color: '#EC4899', desc: 'UX-focused workshops combining design thinking, user research, and high-fidelity prototyping at the intersection of PM and design.' },
  { name: 'Product Teardown', icon: '🔬', color: '#10B981', desc: 'Deep-dive analysis sessions deconstructing successful products to uncover PM decisions, frameworks, and trade-offs behind category-defining features.' },
  { name: 'ProdLabs',         icon: '⚗️', color: '#F59E0B', desc: 'Experimental build sprints where cross-functional teams prototype, test, and iterate on new product ideas with real users in a structured innovation lab.' },
  { name: 'Sketchify',        icon: '✏️', color: '#06B6D4', desc: 'Rapid sketching and wireframing workshops that sharpen visual communication — a critical PM skill for expressing product vision before engineering begins.' },
  { name: 'Trap or Treasure', icon: '🗝️', color: '#8B5CF6', desc: 'Strategic case competitions where teams identify hidden product opportunities, diagnose pitfalls, and build a defensible roadmap under time pressure.' },
  { name: 'InsideIIM',        icon: '🏛️', color: '#EC4899', desc: 'Collaborative content series showcasing IIMU’s PM culture, student perspectives, and case study insights to the broader product community.' },
  { name: 'Certificate Course', icon: '📜', color: '#10B981', desc: 'A structured 8-week learning program providing foundational PM skills, core frameworks, case practice, and industry knowledge for all members.' },
];

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   HERO STAR — scroll-driven rotation
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function initHeroStarScroll() {
  const starWrap = document.getElementById('heroStar');
  const heroEl   = document.getElementById('home');
  if (!starWrap || !heroEl) return;
  let raf = false;
  function update() {
    const p = Math.min(1, window.scrollY / (heroEl.offsetHeight * 0.8));
    const rotation = p * 130;
    const scale    = 1 - p * 0.2;
    const opacity  = 1 - p * 0.85;
    starWrap.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    starWrap.style.opacity   = opacity;
    raf = false;
  }
  window.addEventListener('scroll', () => { if (!raf) { raf = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   SCROLL STORY — pinned about reveal
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function initScrollStory() {
  const wrapper  = document.getElementById('scrollStoryWrapper');
  const leftEl   = document.getElementById('storyPanelLeft');
  const rightEl  = document.getElementById('storyPanelRight');
  const echoEl   = document.getElementById('storyStarEcho');
  if (!wrapper) return;

  // Start hidden
  leftEl.style.cssText  = 'opacity:0;transform:translateX(-50px);will-change:transform,opacity;';
  rightEl.style.cssText = 'opacity:0;transform:translateX(50px);will-change:transform,opacity;';

  let raf = false;
  function ease(t) { return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2; }

  function update() {
    const rect  = wrapper.getBoundingClientRect();
    const total = wrapper.offsetHeight - window.innerHeight;
    const p     = Math.max(0, Math.min(1, -rect.top / total));

    const lp = ease(Math.min(1, p / 0.45));
    leftEl.style.opacity   = lp;
    leftEl.style.transform = `translateX(${(1-lp)*-50}px)`;

    const rp = ease(Math.max(0, Math.min(1, (p - 0.15) / 0.55)));
    rightEl.style.opacity   = rp;
    rightEl.style.transform = `translateX(${(1-rp)*50}px)`;

    if (echoEl) {
      echoEl.style.transform = `translate(-50%,-50%) rotate(${p*210}deg) scale(${1 + p*0.35})`;
    }
    raf = false;
  }
  window.addEventListener('scroll', () => { if (!raf) { raf = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   HELIX SCROLL — 3D rotating flagship events
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function initHelixScroll() {
  const wrapper = document.getElementById('helixWrapper');
  const scene   = document.getElementById('helixScene');
  const dotsEl  = document.getElementById('helixDots');
  if (!wrapper || !scene) return;

  const N     = FLAGSHIP_EVENTS.length; // 9
  const ANGLE = 360 / N;               // 40° per card
  const RAD   = 300;                    // orbit radius in px

  // Build cards
  FLAGSHIP_EVENTS.forEach((ev, i) => {
    const card = document.createElement('div');
    card.className = 'helix-card' + (i === 0 ? ' hc-active' : '');
    card.dataset.index = i;
    card.style.transform = `rotateY(${i * ANGLE}deg) translateZ(${RAD}px)`;
    card.style.setProperty('--card-color', ev.color);
    card.innerHTML = `<div class="hc-icon">${ev.icon}</div><div class="hc-name">${ev.name}</div>`;
    scene.appendChild(card);

    const dot = document.createElement('span');
    dot.className = 'hdot' + (i === 0 ? ' active' : '');
    dot.dataset.idx = i;
    dot.addEventListener('click', () => {
      const wrapTop = wrapper.offsetTop;
      const wrapH   = wrapper.offsetHeight - window.innerHeight;
      window.scrollTo({ top: wrapTop + (i / (N-1)) * wrapH, behavior: 'smooth' });
    });
    dotsEl.appendChild(dot);
  });

  let activeIdx = 0;
  let raf = false;

  function setDetail(idx) {
    const ev = FLAGSHIP_EVENTS[idx];
    const numEl  = document.getElementById('helixDetailNum');
    const nameEl = document.getElementById('helixDetailName');
    const descEl = document.getElementById('helixDetailDesc');
    if (numEl)  numEl.textContent  = String(idx+1).padStart(2,'0');
    if (nameEl) nameEl.textContent = ev.name;
    if (descEl) descEl.textContent = ev.desc;
  }

  setDetail(0);

  function update() {
    const rect  = wrapper.getBoundingClientRect();
    const total = wrapper.offsetHeight - window.innerHeight;
    const p     = Math.max(0, Math.min(1, -rect.top / total));

    // Rotate whole scene
    scene.style.transform = `rotateY(${-p * (N-1) * ANGLE}deg)`;

    // Active index
    const newIdx = Math.min(N-1, Math.round(p * (N-1)));
    if (newIdx !== activeIdx) {
      activeIdx = newIdx;
      setDetail(activeIdx);
      scene.querySelectorAll('.helix-card').forEach((c,i) => c.classList.toggle('hc-active', i===activeIdx));
      dotsEl.querySelectorAll('.hdot').forEach((d,i) => d.classList.toggle('active', i===activeIdx));
    }

    const fill = document.getElementById('helixProgressFill');
    if (fill) fill.style.width = `${p*100}%`;
    raf = false;
  }

  window.addEventListener('scroll', () => { if (!raf) { raf = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   PAGE INITS
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
document.addEventListener('DOMContentLoaded', () => {
  buildStatsBar();
  buildJourneyStages();
  buildEventsUniverse();
  buildWinnersUniverse();
  initTabs();
  buildTeamOrbits();
  buildMobileTeamFallback();
  initNetworkGraph();
  buildRoadmap();
  buildProdnew();
  initProdnewFilters();
  initNavbar();

  // Visual layer
  initPageCurtain();
  initNoiseGrain();
  initClipReveal();
  initCard3DTilt();

  // New scroll-story systems
  initHeroStarScroll();
  initScrollStory();
  initHelixScroll();

  // Interaction
  initCursorTrail();
  initScrollProgress();
  initTaglineCarousel();
  initScrollObserver();
  initCardSpotlights();
  initMagneticButtons();
  initCursorFollower();
  initBackdropDismiss();
  initHoverAudio();

  setTimeout(animateCounters, 400);
});

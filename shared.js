// shared.js — loaded by every page

// ── Loader ──
window.addEventListener('load', () => {
  setTimeout(() => {
    const l = document.getElementById('loader');
    if (l) { l.classList.add('hidden'); setTimeout(() => l.remove(), 500); }
  }, 650);
});

// ── Particles ──
const canvas = document.getElementById('particles');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (canvas && !prefersReduced) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  for (let i = 0; i < 40; i++) {
    particles.push({ x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight,
      r: Math.random()*1.3+0.3, vx: (Math.random()-.5)*.22, vy: (Math.random()-.5)*.22,
      a: Math.random()*.32+.05, c: Math.random()>.5?'0,224,255':'150,120,255' });
  }
  function drawParticles() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${p.c},${p.a})`; ctx.fill();
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0;
      if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0;
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

// ── Scroll reveal ──
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
reveals.forEach(r => revealObs.observe(r));

// ── Mobile nav toggle ──
function toggleNav() {
  const nl = document.querySelector('.nav-links');
  if (!nl) return;
  const open = nl.style.display === 'flex';
  nl.style.display = open ? 'none' : 'flex';
  if (!open) {
    nl.style.flexDirection = 'column';
    nl.style.position = 'absolute';
    nl.style.top = '64px'; nl.style.left = '0'; nl.style.right = '0';
    nl.style.background = 'rgba(5,5,16,0.98)';
    nl.style.padding = '1.5rem 2rem';
    nl.style.borderBottom = '1px solid rgba(0,245,255,0.2)';
    nl.style.gap = '0';
  }
}

// ── Skill bars ──
document.querySelectorAll('.skill-bar-fill').forEach(bar => {
  const targetWidth = bar.dataset.width || '60%';
  bar.style.width = '0%';
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transition = 'width 1.3s ease-out';
        e.target.style.width = targetWidth;
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  obs.observe(bar);
});

/* ===================================================
   KANGUINPOS — MAIN.JS
   =================================================== */

/* ── BOOT SEQUENCE ───────────────────────────────── */
(function boot() {
  const screen = document.getElementById('boot-screen');
  const log    = document.getElementById('boot-log');
  if (!screen || !log) return;

  const lines = [
    { t: 0,    text: '<span style="color:#ff6a00">KANGUINPOS</span> v2.0 — INITIALISING...' },
    { t: 300,  text: '> Loading payment systems............<span style="color:#00ff88">OK</span>' },
    { t: 600,  text: '> Loading order management...........<span style="color:#00ff88">OK</span>' },
    { t: 900,  text: '> Loading menu builder...............<span style="color:#00ff88">OK</span>' },
    { t: 1100, text: '> Booting website engine.............<span style="color:#00ff88">OK</span>' },
    { t: 1400, text: '<span style="color:#ffb347">ALL SYSTEMS GO — WELCOME!</span>' },
  ];

  lines.forEach(({ t, text }) => {
    setTimeout(() => {
      const p = document.createElement('p');
      p.innerHTML = text;
      log.appendChild(p);
    }, t);
  });

  setTimeout(() => {
    screen.classList.add('hide');
    setTimeout(() => screen.remove(), 600);
  }, 2000);
})();

/* ── HAMBURGER MENU ──────────────────────────────── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const open = mobileMenu.classList.contains('open');
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

/* ── SCROLL REVEAL ───────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach(el => observer.observe(el));

/* ── ACTIVE NAV LINK ON SCROLL ───────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a, .mobile-menu a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--orange)' : '';
  });
}, { passive: true });

/* ── TYPING HERO SUBLINE ─────────────────────────── */
const typeEl = document.getElementById('typing-text');
if (typeEl) {
  const phrases = [
    'No per-order charges. Ever.',
    'Keep 100% of your profits.',
    'Your brand. Your customers.',
    'One-off cost. No surprises.',
  ];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const phrase = phrases[pi];
    typeEl.textContent = deleting ? phrase.slice(0, ci--) : phrase.slice(0, ci++);
    let delay = deleting ? 40 : 80;
    if (!deleting && ci > phrase.length) { delay = 1800; deleting = true; }
    if (deleting && ci < 0)             { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }
    setTimeout(type, delay);
  }
  type();
}

/* ── SMOOTH ANCHOR for buttons ───────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

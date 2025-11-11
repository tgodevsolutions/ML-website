// ===========================================================
// Loughran Osteopathy - script.js
// Handles:
// 1) Mobile nav toggle + close on link/ESC/click-outside
// 2) Smooth-scroll for same-page anchors (respects reduced motion)
// 3) Footer year auto-fill
// 4) Fix initial hash scroll with sticky header
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Home: match the left image height to the right cards stack ---
  function syncAboutImageHeight() {
    const cardsCol = document.querySelector('.about-preview .list-cards');
    const imgEl    = document.querySelector('.about-preview .about-image img');
    if (!cardsCol || !imgEl) return;

    // Set the image height to the cards column height
    const h = cardsCol.offsetHeight;
    imgEl.style.height = h + 'px';
    imgEl.style.width  = '100%';
    imgEl.style.objectFit = 'cover';   // fill the box without distortion
    imgEl.style.objectPosition = 'center';
  }

  // Run on load and when resizing
  syncAboutImageHeight();
  window.addEventListener('resize', syncAboutImageHeight);

  const el = {
    toggle: document.getElementById('menuToggle'),
    nav: document.getElementById('siteNav'),
    header: document.querySelector('.site-header'),
    year: document.getElementById('year'),
  };

  // --------------------------
  // Helpers
  // --------------------------
  const headerOffset = () => (el.header ? el.header.offsetHeight : 0);
  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const openNav = () => {
  if (!el.nav || !el.toggle) return;
  el.nav.classList.add('open');
  el.toggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';   // lock background scroll
};

const closeNav = () => {
  if (!el.nav || !el.toggle) return;
  el.nav.classList.remove('open');
  el.toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';         // restore scroll
};


  const toggleNav = () => {
    if (!el.nav || !el.toggle) return;
    const isOpen = el.nav.classList.contains('open');
    isOpen ? closeNav() : openNav();
  };

  // Smooth scroll to a target element by id/hash with header offset
  function smoothScrollToHash(hash) {
    if (!hash || hash === '#') return;
    const id = decodeURIComponent(hash.substring(1));
    const target =
      document.getElementById(id) ||
      document.querySelector(`[name="${CSS.escape(id)}"]`);
    if (!target) return;

    const top =
      window.pageYOffset + target.getBoundingClientRect().top - headerOffset();

    if (prefersReducedMotion()) {
      window.scrollTo(0, Math.max(0, top));
    } else {
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }

    // Move focus for accessibility
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    // Clean up tabindex after focusing
    setTimeout(() => target.removeAttribute('tabindex'), 1000);
  }

  // --------------------------
  // 1) Mobile nav interactions
  // --------------------------
  if (el.toggle) {
    el.toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNav();
    });
  }

  // Close on any nav link click
  if (el.nav) {
    el.nav.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      // If it's an in-page anchor, smooth-scroll instead of full reload
      const url = new URL(link.href, window.location.origin);
      const isSamePage =
        url.pathname.replace(/\/+$/, '') === window.location.pathname.replace(/\/+$/, '') &&
        url.hash;

      if (isSamePage) {
        e.preventDefault();
        closeNav();
        smoothScrollToHash(url.hash);
        history.replaceState(null, '', url.hash); // keep the hash in URL
      } else {
        closeNav();
      }
    });
  }

  // Close nav on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!el.nav || !el.toggle) return;
    const clickedInside =
      el.nav.contains(e.target) || el.toggle.contains(e.target);
    if (!clickedInside) closeNav();
  });

  // --------------------------
  // 2) Smooth-scroll for same-page anchors anywhere in content
  // --------------------------
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const hash = a.getAttribute('href');
      if (!hash || hash === '#') return;

      e.preventDefault();
      smoothScrollToHash(hash);
      history.replaceState(null, '', hash);
    });
  });

  // --------------------------
  // 3) Footer year
  // --------------------------
  if (el.year) {
    el.year.textContent = new Date().getFullYear();
  }

  // --------------------------
  // 4) Adjust initial hash position on load (sticky header)
  // --------------------------
  if (window.location.hash) {
    // Let browser jump first, then adjust
    setTimeout(() => {
      smoothScrollToHash(window.location.hash);
    }, 0);
  }
});

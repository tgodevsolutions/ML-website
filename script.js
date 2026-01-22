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

  // --------------------------
  // Home: slide-in cards on first scroll into view
  // --------------------------
  const listCards = document.querySelector('.about-preview .list-cards');
  const aboutImage = document.querySelector('.about-preview .about-image');
  const whatIsSection = document.querySelector('.what-is');
  const offeringsSection = document.querySelector('.offerings-section');
  const storySection = document.querySelector('.story-section');
  const trustSection = document.querySelector('.trust-section');
  if (listCards) {
    if (prefersReducedMotion()) {
      listCards.classList.add('is-revealed');
    } else if ('IntersectionObserver' in window) {
      listCards.classList.add('will-animate');
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              listCards.classList.add('is-revealed');
              obs.disconnect();
            }
          });
        },
        { threshold: 0.25, rootMargin: '0px 0px -10% 0px' }
      );
      observer.observe(listCards);
    } else {
      listCards.classList.add('is-revealed');
    }
  }

  if (aboutImage) {
    if (prefersReducedMotion()) {
      aboutImage.classList.add('is-revealed');
    } else if ('IntersectionObserver' in window) {
      aboutImage.classList.add('will-animate');
      const imageObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              aboutImage.classList.add('is-revealed');
              obs.disconnect();
            }
          });
        },
        { threshold: 0.35, rootMargin: '0px 0px -10% 0px' }
      );
      imageObserver.observe(aboutImage);
    } else {
      aboutImage.classList.add('is-revealed');
    }
  }

  if (whatIsSection) {
    if (prefersReducedMotion()) {
      whatIsSection.classList.add('is-revealed');
    } else if ('IntersectionObserver' in window) {
      whatIsSection.classList.add('will-animate');
      const whatIsObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              whatIsSection.classList.add('is-revealed');
              obs.disconnect();
            }
          });
        },
        { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
      );
      whatIsObserver.observe(whatIsSection);
    } else {
      whatIsSection.classList.add('is-revealed');
    }
  }

  if (offeringsSection) {
    if (prefersReducedMotion()) {
      offeringsSection.classList.add('is-revealed');
    } else if ('IntersectionObserver' in window) {
      offeringsSection.classList.add('will-animate');
      const offeringsObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              offeringsSection.classList.add('is-revealed');
              obs.disconnect();
            }
          });
        },
        { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
      );
      offeringsObserver.observe(offeringsSection);
    } else {
      offeringsSection.classList.add('is-revealed');
    }
  }

  if (storySection) {
    if (prefersReducedMotion()) {
      storySection.classList.add('is-revealed');
    } else if ('IntersectionObserver' in window) {
      storySection.classList.add('will-animate');
      const storyObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              storySection.classList.add('is-revealed');
              obs.disconnect();
            }
          });
        },
        { threshold: 0.25, rootMargin: '0px 0px -10% 0px' }
      );
      storyObserver.observe(storySection);
    } else {
      storySection.classList.add('is-revealed');
    }
  }

  if (trustSection) {
    if (prefersReducedMotion()) {
      trustSection.classList.add('is-revealed');
    } else if ('IntersectionObserver' in window) {
      trustSection.classList.add('will-animate');
      const trustObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              trustSection.classList.add('is-revealed');
              obs.disconnect();
            }
          });
        },
        { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
      );
      trustObserver.observe(trustSection);
    } else {
      trustSection.classList.add('is-revealed');
    }
  }

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

  // --------------------------
  // 5) Blur header on scroll
  // --------------------------
  const updateHeaderState = () => {
    if (!el.header) return;
    const isScrolled = window.scrollY > 10;
    el.header.classList.toggle('is-scrolled', isScrolled);
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
});

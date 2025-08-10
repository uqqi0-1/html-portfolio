document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const header = document.querySelector('.site-header');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  // Mobile nav toggle
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', (!isOpen).toString());
      mobileMenu.hidden = isOpen;
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
        document.body.style.overflow = '';
      });
    });
  }

  // Header shadow on scroll
  const onScroll = () => {
    if (window.scrollY > 2) {
      header?.classList.add('shadow');
    } else {
      header?.classList.remove('shadow');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on intersect
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el) => io.observe(el));
});
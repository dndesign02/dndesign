// Smooth page transition on internal anchor navigation (no morph overlay)
(function () {
  const main = document.querySelector('main');

  function clearTransition() {
    if (main) main.classList.remove('is-transitioning');
  }

  function smoothNavigateTo(selector) {
    const target = document.querySelector(selector);
    if (!target) return;

    // Add a light transition class (CSS can optionally style this)
    if (main) main.classList.add('is-transitioning');

    // Estimate duration based on distance for fallback timer
    const distance = Math.abs(target.getBoundingClientRect().top);
    const duration = Math.max(350, Math.min(1000, distance / 1.2)); // ms

    // Smooth scroll to target
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Remove transition class when scrolling ends (or fallback by time)
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      clearTransition();
      window.removeEventListener('scrollend', finish);
    };
    window.addEventListener('scrollend', finish, { once: true });
    setTimeout(finish, duration + 200);
  }

  window.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#' || href.length <= 1) return;

    // prevent default and do smooth transition
    e.preventDefault();
    smoothNavigateTo(href);
  });

  // Ensure page visible on load (in case preloader styles had been used)
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
})();

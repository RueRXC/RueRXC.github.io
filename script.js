(() => {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');
  const indicator = document.querySelector('.tab-indicator');

  function moveIndicator(tab) {
    const rect = tab.getBoundingClientRect();
    const parentRect = tab.parentElement.getBoundingClientRect();
    indicator.style.left = (rect.left - parentRect.left) + 'px';
    indicator.style.width = rect.width + 'px';
  }

  function activate(tab) {
    const target = tab.dataset.tab;
    const anchorId = tab.dataset.anchor;
    tabs.forEach(t => t.classList.toggle('active', t === tab));
    panels.forEach(p => p.classList.toggle('active', p.id === target));
    moveIndicator(tab);

    // Scroll: to anchor if specified, otherwise to top
    requestAnimationFrame(() => {
      if (anchorId) {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activate(tab));
  });

  // Initial position (wait a tick for fonts to settle)
  requestAnimationFrame(() => {
    const active = document.querySelector('.tab.active');
    if (active) moveIndicator(active);
  });

  window.addEventListener('resize', () => {
    const active = document.querySelector('.tab.active');
    if (active) moveIndicator(active);
  });

  // Project expand/collapse: play videos on open, pause on close
  document.querySelectorAll('details.project').forEach(d => {
    d.addEventListener('toggle', () => {
      d.querySelectorAll('video').forEach(v => {
        if (d.open) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    });
  });
})();

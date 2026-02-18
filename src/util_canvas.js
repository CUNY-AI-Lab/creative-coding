export function makeCanvas(container, { pixelRatioCap = 2 } = {}) {
  const c = document.createElement('canvas');
  c.style.width = '100%';
  c.style.height = '100%';
  c.style.display = 'block';
  container.appendChild(c);

  const ctx = c.getContext('2d');

  function resize() {
    const r = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, pixelRatioCap);
    c.width = Math.max(1, Math.floor(r.width * dpr));
    c.height = Math.max(1, Math.floor(r.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { width: r.width, height: r.height, dpr };
  }

  const ro = new ResizeObserver(() => resize());
  ro.observe(container);
  const size = resize();

  return { canvas: c, ctx, resize, size, destroy: () => { ro.disconnect(); c.remove(); } };
}

export function rafLoop(step) {
  let raf = 0;
  let alive = true;
  function tick(t) {
    if (!alive) return;
    step(t);
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);
  return () => { alive = false; cancelAnimationFrame(raf); };
}

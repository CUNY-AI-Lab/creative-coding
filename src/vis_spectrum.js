import { makeCanvas, rafLoop } from './util_canvas.js';

// Slide 8 artifact: Vibe ↔ Deliberate spectrum slider with shifting visuals.
export function spectrum(container) {
  container.innerHTML = '';
  const root = document.createElement('div');
  root.style.position = 'relative';
  root.style.width = '100%';
  root.style.height = '100%';
  container.appendChild(root);

  const ui = document.createElement('div');
  ui.style.position = 'absolute';
  ui.style.left = '24px';
  ui.style.right = '24px';
  ui.style.bottom = '18px';
  ui.style.display = 'flex';
  ui.style.gap = '12px';
  ui.style.alignItems = 'center';
  ui.style.color = 'rgba(255,255,255,0.9)';
  ui.style.font = '14px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto';

  const left = document.createElement('div');
  left.textContent = 'Vibe';
  left.style.opacity = '0.85';

  const right = document.createElement('div');
  right.textContent = 'Deliberate';
  right.style.opacity = '0.85';

  const range = document.createElement('input');
  range.type = 'range';
  range.min = '0';
  range.max = '1';
  range.step = '0.001';
  range.value = '0.45';
  range.style.flex = '1';

  const hint = document.createElement('div');
  hint.textContent = 'Drag';
  hint.style.opacity = '0.6';
  hint.style.minWidth = '44px';
  hint.style.textAlign = 'right';

  ui.appendChild(left);
  ui.appendChild(range);
  ui.appendChild(right);
  ui.appendChild(hint);
  root.appendChild(ui);

  const { ctx, resize, destroy } = makeCanvas(root);

  const stop = rafLoop((t) => {
    const { width, height } = resize();
    const v = parseFloat(range.value); // 0 vibe → 1 deliberate

    ctx.fillStyle = '#070a10';
    ctx.fillRect(0, 0, width, height);

    // Left: chaotic particles.
    const particleCount = Math.floor(420 * (1 - v));
    ctx.fillStyle = `rgba(255,120,180,${0.55 * (1 - v)})`;
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = 1 + Math.random() * 3;
      ctx.fillRect(x, y, r, r);
    }

    // Center: flow-ish field.
    const flow = 1 - Math.abs(v - 0.5) * 2;
    const cols = 28;
    const rows = 18;
    const sx = width / cols;
    const sy = height / rows;
    ctx.strokeStyle = `rgba(120,200,255,${0.45 * flow})`;
    ctx.lineWidth = 2;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const x = (i + 0.5) * sx;
        const y = (j + 0.5) * sy;
        const a = 1.7 * Math.sin((i * 0.35) + (j * 0.25) + t / 1200);
        const len = 10 + 16 * flow;
        ctx.beginPath();
        ctx.moveTo(x - Math.cos(a) * len, y - Math.sin(a) * len);
        ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
        ctx.stroke();
      }
    }

    // Right: precise grid.
    const g = v;
    ctx.strokeStyle = `rgba(255,255,255,${0.35 * g})`;
    ctx.lineWidth = 1;
    const step = 26;
    for (let x = 0; x <= width; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
    for (let y = 0; y <= height; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }

    // Title.
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.font = '20px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto';
    ctx.fillText('Spectrum: Vibe coding → Deliberate collaboration', 22, 34);
  });

  return () => {
    stop();
    destroy();
    root.remove();
  };
}

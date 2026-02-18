import { makeCanvas, rafLoop } from './util_canvas.js';

// Boids (Craig Reynolds, 1986): a canonical creative coding / emergent behavior sketch.
// This is a lightweight implementation for a slide-stage preview.

export function boids(container) {
  const { ctx, resize, destroy } = makeCanvas(container, { pixelRatioCap: 2 });

  let W = 0, H = 0;
  function onResize() {
    const s = resize();
    W = s.width; H = s.height;
  }
  onResize();

  const N = 90;
  const boid = [];
  function reset() {
    boid.length = 0;
    for (let i = 0; i < N; i++) {
      boid.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() * 2 - 1) * 0.8,
        vy: (Math.random() * 2 - 1) * 0.8,
      });
    }
  }
  reset();

  // Optional pointer influence (subtle).
  let px = null, py = null;
  function onMove(e) {
    const r = container.getBoundingClientRect();
    px = e.clientX - r.left;
    py = e.clientY - r.top;
  }
  function onLeave() { px = null; py = null; }
  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);
  container.addEventListener('pointerup', reset);

  function wrap(p) {
    if (p.x < -20) p.x = W + 20;
    if (p.x > W + 20) p.x = -20;
    if (p.y < -20) p.y = H + 20;
    if (p.y > H + 20) p.y = -20;
  }

  const stop = rafLoop(() => {
    onResize();

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#05070b';
    ctx.fillRect(0, 0, W, H);

    // Parameters (tuned for "readable" on a slide).
    const sepDist = 18;
    const aliDist = 42;
    const cohDist = 52;

    const maxSpeed = 2.1;
    const maxForce = 0.06;

    const sepW = 1.35;
    const aliW = 0.85;
    const cohW = 0.65;

    for (let i = 0; i < boid.length; i++) {
      const b = boid[i];
      let sx = 0, sy = 0, sa = 0;
      let ax = 0, ay = 0, aa = 0;
      let cx = 0, cy = 0, ca = 0;

      for (let j = 0; j < boid.length; j++) {
        if (i === j) continue;
        const o = boid[j];
        const dx = o.x - b.x;
        const dy = o.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 0.0001) continue;

        if (d2 < sepDist * sepDist) {
          const d = Math.sqrt(d2);
          sx -= dx / d;
          sy -= dy / d;
          sa++;
        }
        if (d2 < aliDist * aliDist) {
          ax += o.vx;
          ay += o.vy;
          aa++;
        }
        if (d2 < cohDist * cohDist) {
          cx += o.x;
          cy += o.y;
          ca++;
        }
      }

      let fx = 0, fy = 0;
      if (sa) {
        sx /= sa; sy /= sa;
        const m = Math.hypot(sx, sy) || 1;
        sx = (sx / m) * maxSpeed - b.vx;
        sy = (sy / m) * maxSpeed - b.vy;
        const sm = Math.hypot(sx, sy) || 1;
        if (sm > maxForce) { sx = (sx / sm) * maxForce; sy = (sy / sm) * maxForce; }
        fx += sx * sepW;
        fy += sy * sepW;
      }
      if (aa) {
        ax /= aa; ay /= aa;
        const m = Math.hypot(ax, ay) || 1;
        ax = (ax / m) * maxSpeed - b.vx;
        ay = (ay / m) * maxSpeed - b.vy;
        const am = Math.hypot(ax, ay) || 1;
        if (am > maxForce) { ax = (ax / am) * maxForce; ay = (ay / am) * maxForce; }
        fx += ax * aliW;
        fy += ay * aliW;
      }
      if (ca) {
        cx = cx / ca - b.x;
        cy = cy / ca - b.y;
        const m = Math.hypot(cx, cy) || 1;
        cx = (cx / m) * maxSpeed - b.vx;
        cy = (cy / m) * maxSpeed - b.vy;
        const cm = Math.hypot(cx, cy) || 1;
        if (cm > maxForce) { cx = (cx / cm) * maxForce; cy = (cy / cm) * maxForce; }
        fx += cx * cohW;
        fy += cy * cohW;
      }

      // Pointer: mild attraction.
      if (px != null && py != null) {
        const dx = px - b.x;
        const dy = py - b.y;
        const d = Math.hypot(dx, dy) || 1;
        const pull = Math.min(1, 180 / d) * 0.015;
        fx += (dx / d) * pull;
        fy += (dy / d) * pull;
      }

      b.vx += fx;
      b.vy += fy;

      const sp = Math.hypot(b.vx, b.vy) || 1;
      if (sp > maxSpeed) { b.vx = (b.vx / sp) * maxSpeed; b.vy = (b.vy / sp) * maxSpeed; }

      b.x += b.vx;
      b.y += b.vy;
      wrap(b);
    }

    // Draw boids.
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.20)';
    ctx.fillStyle = 'rgba(122,215,255,0.70)';

    for (let i = 0; i < boid.length; i++) {
      const b = boid[i];
      const a = Math.atan2(b.vy, b.vx);
      const s = 7;

      ctx.beginPath();
      ctx.moveTo(b.x + Math.cos(a) * s, b.y + Math.sin(a) * s);
      ctx.lineTo(b.x + Math.cos(a + 2.4) * s * 0.75, b.y + Math.sin(a + 2.4) * s * 0.75);
      ctx.lineTo(b.x + Math.cos(a - 2.4) * s * 0.75, b.y + Math.sin(a - 2.4) * s * 0.75);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Small caption.
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '12px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText('Boids (Reynolds, 1986) • tap to reseed', 14, 22);
  });

  return () => {
    stop();
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.removeEventListener('pointerup', reset);
    destroy();
  };
}

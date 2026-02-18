import { makeCanvas, rafLoop } from './util_canvas.js';

// Flow field sketch (popularized by generative art / creative coding practice).
// Famous reference point: flow-field drawings (e.g. Tyler Hobbs / many others).
// This is a lightweight, no-deps version designed for workshop slides.

export function flowField(container) {
  const { ctx, resize, destroy } = makeCanvas(container, { pixelRatioCap: 2 });

  let W = 0, H = 0;
  function onResize() {
    const s = resize();
    W = s.width; H = s.height;
  }
  onResize();

  // Simple hash noise (no external libs).
  function hash2(x, y) {
    let n = x * 374761393 + y * 668265263; // large primes
    n = (n ^ (n >> 13)) * 1274126177;
    return ((n ^ (n >> 16)) >>> 0) / 4294967295;
  }

  function smoothstep(t) { return t * t * (3 - 2 * t); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  function valueNoise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const u = smoothstep(xf), v = smoothstep(yf);
    const a = hash2(xi, yi);
    const b = hash2(xi + 1, yi);
    const c = hash2(xi, yi + 1);
    const d = hash2(xi + 1, yi + 1);
    return lerp(lerp(a, b, u), lerp(c, d, u), v);
  }

  const particles = [];
  const N = 1200;
  function seed() {
    particles.length = 0;
    for (let i = 0; i < N; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: 0,
        vy: 0,
        life: Math.random() * 200 + 50,
      });
    }

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#05070b';
    ctx.fillRect(0, 0, W, H);

    // Slight vignette.
    const g = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.65);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, 'rgba(0,0,0,0.55)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }
  seed();

  // Tap/click to reseed.
  function onPointer() { seed(); }
  container.addEventListener('pointerup', onPointer);

  let t0 = performance.now();
  const stop = rafLoop((t) => {
    const dt = Math.min(32, t - t0);
    t0 = t;

    // Gentle fade to keep trails without infinite buildup.
    ctx.fillStyle = 'rgba(5,7,11,0.06)';
    ctx.fillRect(0, 0, W, H);

    const scale = 0.008; // field frequency
    const speed = 0.035;

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(122,215,255,0.18)';

    ctx.beginPath();
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      const nx = p.x * scale;
      const ny = p.y * scale;
      const a = valueNoise(nx + t * 0.00005, ny) * Math.PI * 2.0;

      // steer toward field direction
      const ax = Math.cos(a) * speed;
      const ay = Math.sin(a) * speed;
      p.vx = p.vx * 0.92 + ax;
      p.vy = p.vy * 0.92 + ay;

      const x0 = p.x, y0 = p.y;
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      ctx.moveTo(x0, y0);
      ctx.lineTo(p.x, p.y);

      p.life -= 1;
      const out = (p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10);
      if (p.life <= 0 || out) {
        p.x = Math.random() * W;
        p.y = Math.random() * H;
        p.vx = 0; p.vy = 0;
        p.life = Math.random() * 240 + 80;
      }
    }
    ctx.stroke();
  });

  return () => {
    stop();
    container.removeEventListener('pointerup', onPointer);
    destroy();
  };
}

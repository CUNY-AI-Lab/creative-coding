import { makeCanvas, rafLoop } from './util_canvas.js';

// Slide 11/12 artifact: starfield w/ mouse parallax (vibe-coding example).
export function starfield(container) {
  container.innerHTML = '';
  const { ctx, resize, destroy } = makeCanvas(container);

  let mouse = { x: 0, y: 0 };
  const onMove = (e) => {
    const r = container.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) / r.width;
    mouse.y = (e.clientY - r.top) / r.height;
  };
  container.addEventListener('pointermove', onMove);

  let stars = [];
  function reset(width, height) {
    stars = Array.from({ length: 260 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 3 + 0.5,
    }));
  }

  let { width, height } = resize();
  reset(width, height);

  const stop = rafLoop(() => {
    ({ width, height } = resize());

    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, width, height);

    const mx = (mouse.x - 0.5) * width;
    const my = (mouse.y - 0.5) * height;

    for (const s of stars) {
      ctx.fillStyle = `rgba(255,255,255,${s.z / 3})`;
      ctx.fillRect(s.x, s.y, s.z, s.z);
      s.x += mx * 0.0009 * s.z;
      s.y += my * 0.0009 * s.z;
      // wrap
      if (s.x < 0) s.x += width;
      if (s.x > width) s.x -= width;
      if (s.y < 0) s.y += height;
      if (s.y > height) s.y -= height;
    }
  });

  return () => {
    stop();
    container.removeEventListener('pointermove', onMove);
    destroy();
  };
}

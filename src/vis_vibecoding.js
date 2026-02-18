import { makeCanvas, rafLoop } from './util_canvas.js';

// Slide 7 artifact: Vibe Coding — prompt → code → pattern loop.
// Demonstrates the vibe coding workflow: type a prompt, code materializes, a real pattern emerges.

const CYCLES = [
  {
    prompt: '"draw a grid of circles that pulse"',
    render(ctx, W, H, t, progress) {
      const cols = 10, rows = 7;
      const sx = W / (cols + 1), sy = H / (rows + 1);
      const maxR = Math.min(sx, sy) * 0.35;
      ctx.strokeStyle = `rgba(192,192,192,${0.7 * progress})`;
      ctx.lineWidth = 1.2;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = (i + 1) * sx;
          const y = (j + 1) * sy;
          const phase = (i + j) * 0.6 + t * 0.003;
          const r = maxR * (0.4 + 0.6 * (0.5 + 0.5 * Math.sin(phase)));
          ctx.beginPath();
          ctx.arc(x, y, r * progress, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    },
  },
  {
    prompt: '"diagonal lines with random spacing"',
    render(ctx, W, H, t, progress) {
      // Seeded pseudo-random for consistent diagonals.
      let seed = 42;
      function rand() { seed = (seed * 16807 + 0) % 2147483647; return seed / 2147483647; }

      ctx.strokeStyle = `rgba(192,192,192,${0.6 * progress})`;
      ctx.lineWidth = 1;
      const count = 36;
      for (let i = 0; i < count; i++) {
        const gap = rand() * 30 + 8;
        const x = (i / count) * (W + H) - H * 0.3 + Math.sin(t * 0.001 + i) * 4;
        const x0 = x - gap * 0.5;
        const drawn = progress;
        ctx.beginPath();
        ctx.moveTo(x0, 0);
        ctx.lineTo(x0 - H * drawn, H * drawn);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x0 + gap, 0);
        ctx.lineTo(x0 + gap - H * drawn, H * drawn);
        ctx.stroke();
      }
    },
  },
  {
    prompt: '"rotating squares in a grid"',
    render(ctx, W, H, t, progress) {
      const cols = 8, rows = 6;
      const sx = W / (cols + 1), sy = H / (rows + 1);
      const size = Math.min(sx, sy) * 0.32;
      ctx.strokeStyle = `rgba(192,192,192,${0.7 * progress})`;
      ctx.lineWidth = 1.2;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = (i + 1) * sx;
          const y = (j + 1) * sy;
          const angle = t * 0.0015 + (i + j) * 0.4;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle * progress);
          const s = size * progress;
          ctx.strokeRect(-s, -s, s * 2, s * 2);
          ctx.restore();
        }
      }
    },
  },
];

const CODE_CHARS = '{}();=><[]const let function return Math.sin for if var ctx .draw() canvas width height'.split('');

export function vibeCoding(container) {
  // Clear container using safe DOM methods.
  while (container.firstChild) container.removeChild(container.firstChild);

  const root = document.createElement('div');
  root.style.cssText = 'position:relative;width:100%;height:100%;overflow:hidden;';
  container.appendChild(root);

  const { ctx, resize, destroy } = makeCanvas(root, { pixelRatioCap: 2 });

  let cycleIdx = 0;
  let phase = 'typing';   // typing | code | pattern
  let phaseStart = 0;

  // Code rain particles.
  const drops = [];
  function spawnDrops(W, H) {
    drops.length = 0;
    for (let i = 0; i < 60; i++) {
      drops.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.25 + H * 0.08,
        vy: 40 + Math.random() * 80,
        char: CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
        alpha: 0.3 + Math.random() * 0.5,
      });
    }
  }

  function startPhase(name, t) {
    phase = name;
    phaseStart = t;
  }

  function nextCycle(t) {
    cycleIdx = (cycleIdx + 1) % CYCLES.length;
    startPhase('typing', t);
  }

  // Click/tap to advance.
  function onClick() {
    nextCycle(performance.now());
  }
  container.addEventListener('pointerup', onClick);

  let firstFrame = true;
  const stop = rafLoop((t) => {
    if (firstFrame) { phaseStart = t; firstFrame = false; }

    const { width: W, height: H } = resize();
    const cycle = CYCLES[cycleIdx];
    const elapsed = t - phaseStart;

    ctx.fillStyle = '#05070b';
    ctx.fillRect(0, 0, W, H);

    const promptY = H * 0.08;
    const patternTop = H * 0.22;
    const patternH = H - patternTop;

    // --- Phase: Typing ---
    if (phase === 'typing') {
      const charsPerSec = 28;
      const shown = Math.min(cycle.prompt.length, Math.floor(elapsed / 1000 * charsPerSec));
      const text = cycle.prompt.slice(0, shown);

      // Prompt prefix.
      ctx.font = `${Math.max(14, W * 0.026)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.fillStyle = 'rgba(192,192,192,0.5)';
      const prefix = '> ';
      const prefixW = ctx.measureText(prefix).width;
      const promptX = W * 0.06;
      ctx.fillText(prefix, promptX, promptY);

      // Typed text.
      ctx.fillStyle = 'rgba(255,255,255,0.88)';
      ctx.fillText(text, promptX + prefixW, promptY);

      // Cursor blink.
      if (Math.floor(t / 500) % 2 === 0) {
        const cursorX = promptX + prefixW + ctx.measureText(text).width + 2;
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillRect(cursorX, promptY - W * 0.022, 2, W * 0.03);
      }

      if (shown >= cycle.prompt.length) {
        // Small pause after typing finishes.
        if (elapsed > (cycle.prompt.length / charsPerSec) * 1000 + 600) {
          spawnDrops(W, H);
          startPhase('code', t);
        }
      }
    }

    // --- Phase: Code rain ---
    if (phase === 'code') {
      const dur = 1500;
      const progress = Math.min(1, elapsed / dur);

      // Show the full prompt, dimming.
      ctx.font = `${Math.max(14, W * 0.026)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.fillStyle = `rgba(192,192,192,${0.5 * (1 - progress * 0.6)})`;
      const promptX = W * 0.06;
      ctx.fillText('> ', promptX, promptY);
      ctx.fillStyle = `rgba(255,255,255,${0.88 * (1 - progress * 0.6)})`;
      ctx.fillText(cycle.prompt, promptX + ctx.measureText('> ').width, promptY);

      // Falling code characters.
      ctx.font = `${Math.max(12, W * 0.018)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      for (const d of drops) {
        const dy = d.y + d.vy * progress;
        const fade = d.alpha * (1 - progress * 0.7);
        ctx.fillStyle = `rgba(192,192,192,${fade})`;
        ctx.fillText(d.char, d.x, dy);
      }

      // Preview of pattern emerging.
      if (progress > 0.5) {
        const patternProgress = (progress - 0.5) * 2;
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, patternTop, W, patternH);
        ctx.clip();
        ctx.translate(0, patternTop);
        cycle.render(ctx, W, patternH, t, patternProgress * 0.3);
        ctx.restore();
      }

      if (progress >= 1) {
        startPhase('pattern', t);
      }
    }

    // --- Phase: Pattern ---
    if (phase === 'pattern') {
      const fadeIn = Math.min(1, elapsed / 800);

      // Dimmed prompt.
      ctx.font = `${Math.max(14, W * 0.026)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.fillStyle = 'rgba(192,192,192,0.25)';
      const promptX = W * 0.06;
      ctx.fillText('> ', promptX, promptY);
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.fillText(cycle.prompt, promptX + ctx.measureText('> ').width, promptY);

      // Hint.
      ctx.font = `${Math.max(11, W * 0.016)}px ui-sans-serif, system-ui, sans-serif`;
      ctx.fillStyle = `rgba(255,255,255,${0.3 * fadeIn})`;
      ctx.textAlign = 'right';
      ctx.fillText('click for next prompt', W * 0.94, H * 0.97);
      ctx.textAlign = 'left';

      // Render the actual pattern.
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, patternTop, W, patternH);
      ctx.clip();
      ctx.translate(0, patternTop);
      cycle.render(ctx, W, patternH, t, fadeIn);
      ctx.restore();
    }
  });

  return () => {
    stop();
    container.removeEventListener('pointerup', onClick);
    destroy();
    root.remove();
  };
}

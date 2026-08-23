// Brand Orbs Particle Engine - Inspired by Jakub Antalik & Meng To
// High-performance Canvas 2D math & particle rendering for brand and technology marks

export type OrbMode =
  | 'claude'
  | 'openai'
  | 'codex'
  | 'cursor'
  | 'gemini'
  | 'figma'
  | 'framer'
  | 'react'
  | 'swift'
  | 'designcode'
  | 'aura'
  | 'dreamcut'
  | 'ui'
  | 'ux'
  | 'css'
  | 'ios'
  | 'neuform'
  | 'github'
  | 'x'
  | 'instagram'
  | 'threads'
  | 'linkedin'
  | 'email'
  | 'cube'
  | 'orb'
  | 'sphere'
  | 'flower'
  | 'book'
  | 'claudebook'
  | 'openaibook'
  | 'codexbook'
  | 'cursorbook'
  | 'geminibook'
  | 'figmabook'
  | 'framerbook'
  | 'reactbook'
  | 'swiftbook'
  | 'designcodebook'
  | 'aurabook'
  | 'dreamcutbook'
  | 'githubbook'
  | 'xbook'
  | 'instagrambook'
  | 'threadsbook'
  | 'linkedinbook'
  | 'emailbook'
  | 'uibook'
  | 'uxbook'
  | 'cssbook'
  | 'iosbook'
  | 'neuformbook'
  | 'pointer';

const TAU = Math.PI * 2;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (v: number) => {
  v = clamp01(v);
  return v * v * (3 - 2 * v);
};
const lerp = (a: number, b: number, m: number) => a + (b - a) * m;

// Deterministic hash noise
const hash = (x: number, y: number) => {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
};

// Fibonacci sphere point i of n -> [x,y,z] on unit sphere
const fib = (i: number, n: number): [number, number, number] => {
  const ga = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (2 * (i + 0.5)) / n;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const th = i * ga;
  return [r * Math.cos(th), y, r * Math.sin(th)];
};

// Yaw+tilt rotation and orthographic projection
const proj = (yaw: number, tilt: number, cx: number, cy: number, s: number) => {
  const st = Math.sin(tilt),
    ct = Math.cos(tilt);
  const sy = Math.sin(yaw),
    cyw = Math.cos(yaw);
  return (x: number, y: number, z: number): [number, number, number] => {
    const px = x * cyw + z * sy,
      pz = -x * sy + z * cyw;
    const py = y * ct - pz * st,
      z2 = y * st + pz * ct;
    return [cx + px * s, cy - py * s, z2];
  };
};

const rscale = (S: number) => Math.pow(S / 300, 0.6);

interface Dot {
  x: number;
  y: number;
  z: number;
  r: number;
  v: number;
  a?: number;
  c?: [number, number, number] | null;
}

interface DrawOptions {
  mini?: boolean;
  accent?: [number, number, number] | null;
  isDark?: boolean;
}

function paint(
  ctx: CanvasRenderingContext2D,
  dots: Dot[],
  accent: [number, number, number] | null | undefined,
  sat: number,
  rMin: number,
  isDark = false
) {
  dots.sort((a, b) => a.z - b.z);
  for (const d of dots) {
    const al = d.a ?? 1;
    if (al < 0.02) continue;
    const v = clamp01(d.v);
    
    // In light theme, background is light, dots are crisp dark/colored.
    // In dark theme, background is dark, dots are luminous light/colored.
    const baseVal = isDark ? v * 255 : (1 - v * 0.9) * 20;
    const acc = d.c || accent;
    const st = d.c ? 0.95 : sat;
    let r = baseVal,
      gg = baseVal,
      b = baseVal;

    if (acc && st > 0) {
      if (isDark) {
        const lift = Math.min(1, v * 1.15);
        r = baseVal * (1 - st) + acc[0] * lift * st;
        gg = baseVal * (1 - st) + acc[1] * lift * st;
        b = baseVal * (1 - st) + acc[2] * lift * st;
      } else {
        // Light mode saturated tone
        r = baseVal * (1 - st) + acc[0] * st * 0.9;
        gg = baseVal * (1 - st) + acc[1] * st * 0.9;
        b = baseVal * (1 - st) + acc[2] * st * 0.9;
      }
    }

    if (isDark && v > 0.85) {
      const w = ((v - 0.85) / 0.15) * 0.45;
      r += (255 - r) * w;
      gg += (255 - gg) * w;
      b += (255 - b) * w;
    }

    ctx.fillStyle = `rgba(${r | 0},${gg | 0},${b | 0},${al})`;
    ctx.beginPath();
    ctx.arc(d.x, d.y, Math.max(rMin, d.r), 0, TAU);
    ctx.fill();
  }
}

// ============ CLAUDE: Spark burst ============
function drawClaude(ctx: CanvasRenderingContext2D, S: number, t: number, o: DrawOptions) {
  const cx = S / 2,
    cy = S / 2,
    R = (S / 2) * 0.84;
  const rs = rscale(S) * (o.mini ? 1.8 : 1);
  const yaw = 0.32 * Math.sin(t * 0.5),
    tilt = 0.3 + 0.17 * Math.sin(t * 0.33);
  const p = proj(yaw, tilt, cx, cy, R);
  const spin = t * 0.17;
  const rays = o.mini ? 8 : 11;
  const perRay = o.mini ? 4 : 6;
  const dots: Dot[] = [];

  const gh = o.mini ? 10 : 22;
  for (let i = 0; i < gh; i++) {
    const a = (i / gh) * TAU + t * 0.05;
    const [x, y, z] = p(Math.cos(a), Math.sin(a), 0);
    dots.push({ x, y, z, r: 0.8 * rs, v: 0.22, a: 0.1 + 0.1 * ((z + 1) / 2) });
  }

  for (let k = 0; k < rays; k++) {
    const baseA = (k / rays) * TAU + (hash(k, 3.1) - 0.5) * 0.3 + spin;
    const baseL = 0.62 + 0.38 * hash(k, 7.7);
    const pulse = 0.5 + 0.5 * Math.sin(t * 1.7 - k * 1.13);
    const L = baseL * (0.8 + 0.28 * pulse * pulse);
    for (let j = 0; j < perRay; j++) {
      const f = (j + 0.8) / perRay;
      const rr = 0.14 + f * (L - 0.14);
      const [x, y, z] = p(Math.cos(baseA) * rr, Math.sin(baseA) * rr, 0);
      const dep = (z + 1) / 2;
      dots.push({
        x,
        y,
        z,
        r: (0.75 + 1.35 * (1 - f * 0.45) + 0.5 * dep) * rs,
        v: 0.38 + 0.38 * f + 0.22 * pulse * f,
        a: 0.55 + 0.45 * f
      });
    }
  }

  const [x0, y0, z0] = p(0, 0, 0);
  dots.push({ x: x0, y: y0, z: z0 + 0.01, r: 1.5 * rs, v: 0.92 });
  paint(ctx, dots, o.accent, 0.85, 0.3, o.isDark);
}

// ============ GEMINI: Astroid twinkle ============
function drawGemini(ctx: CanvasRenderingContext2D, S: number, t: number, o: DrawOptions) {
  const cx = S / 2,
    cy = S / 2,
    R = (S / 2) * 0.84;
  const rs = rscale(S) * (o.mini ? 1.8 : 1);
  const yaw = 0.3 * Math.sin(t * 0.45),
    tilt = 0.32 + 0.14 * Math.sin(t * 0.28);
  const p = proj(yaw, tilt, cx, cy, R);
  const rotW = 0.14 * Math.sin(t * 0.9);
  const scale = 0.88 + 0.12 * Math.sin(t * 1.8);
  const N = o.mini ? 22 : 58;
  const dots: Dot[] = [];
  const cBlue: [number, number, number] = [64, 148, 255];
  const cPurple: [number, number, number] = [176, 118, 240];
  const cPink: [number, number, number] = [225, 118, 178];

  const grad = (py: number): [number, number, number] => {
    const gpos = clamp01((1 - py) / 2);
    return gpos < 0.5
      ? [
          lerp(cBlue[0], cPurple[0], gpos * 2),
          lerp(cBlue[1], cPurple[1], gpos * 2),
          lerp(cBlue[2], cPurple[2], gpos * 2)
        ]
      : [
          lerp(cPurple[0], cPink[0], gpos * 2 - 1),
          lerp(cPurple[1], cPink[1], gpos * 2 - 1),
          lerp(cPurple[2], cPink[2], gpos * 2 - 1)
        ];
  };

  for (let i = 0; i < N; i++) {
    const th = (i / N) * TAU + rotW;
    const c3 = Math.cos(th),
      s3 = Math.sin(th);
    const px = c3 * c3 * c3 * scale,
      py = s3 * s3 * s3 * scale;
    const [x, y, z] = p(px, py, 0);
    const dep = (z + 1) / 2;
    const tip = Math.pow(Math.abs(px) + Math.abs(py), 1.6);
    dots.push({
      x,
      y,
      z,
      r: (0.7 + 1.1 * dep + 0.9 * tip) * rs,
      v: 0.48 + 0.32 * tip + 0.2 * dep,
      c: grad(py)
    });
  }

  const Ni = o.mini ? 0 : N >> 1;
  for (let i = 0; i < Ni; i++) {
    const th = (i / Ni) * TAU - rotW * 0.6;
    const c3 = Math.cos(th),
      s3 = Math.sin(th);
    const px = c3 * c3 * c3 * scale * 0.48,
      py = s3 * s3 * s3 * scale * 0.48;
    const [x, y, z] = p(px, py, 0.04);
    dots.push({ x, y, z, r: 0.85 * rs, v: 0.52, a: 0.8, c: grad(py * 2) });
  }

  if (!o.mini) {
    for (let k = 0; k < 3; k++) {
      const a = t * (k % 2 ? -0.5 : 0.65) + k * 2.1;
      const rr = 0.95 + 0.1 * Math.sin(t * 1.3 + k * 2);
      const [x, y, z] = p(Math.cos(a) * rr, Math.sin(a) * rr, 0.25 * Math.sin(t * 0.7 + k * 3));
      const tw = 0.5 + 0.5 * Math.sin(t * 3 + k * 2.4);
      dots.push({
        x,
        y,
        z,
        r: (0.6 + 0.9 * tw) * rs,
        v: 0.85,
        a: 0.25 + 0.6 * tw,
        c: k === 0 ? cBlue : k === 1 ? cPurple : cPink
      });
    }
  }

  const [x0, y0, z0] = p(0, 0, 0);
  dots.push({
    x: x0,
    y: y0,
    z: z0 + 0.01,
    r: (1.1 + 0.5 * Math.sin(t * 2.2)) * rs,
    v: 0.9,
    c: cPurple
  });
  paint(ctx, dots, null, 0, 0.3, o.isDark);
}

// ============ REACT: The Atom ============
function drawReact(ctx: CanvasRenderingContext2D, S: number, t: number, o: DrawOptions) {
  const cx = S / 2,
    cy = S / 2,
    R = (S / 2) * 0.92;
  const rs = rscale(S) * (o.mini ? 1.8 : 1);
  const p = proj(0.1 * Math.sin(t * 0.4), 0.12 * Math.sin(t * 0.33), cx, cy, R);
  const spin = t * 0.26,
    rx = 0.94,
    ry = 0.345;
  const per = o.mini ? 20 : 56;
  const dots: Dot[] = [];

  for (let k = 0; k < 3; k++) {
    const a0 = spin + (k * Math.PI) / 3;
    const ca = Math.cos(a0),
      sa = Math.sin(a0);
    const ring = (th: number): [number, number] => {
      const ex = Math.cos(th) * rx,
        ey = Math.sin(th) * ry;
      return [ex * ca - ey * sa, ex * sa + ey * ca];
    };
    for (let i = 0; i < per; i++) {
      const th = (i / per) * TAU;
      const [gx, gy] = ring(th);
      const [x, y, z] = p(gx, gy, 0);
      const ph = ((th / TAU - t * 0.19 - k * 0.33) % 1 + 1) % 1;
      const crest = Math.exp(-Math.pow(ph - 0.5, 2) / 0.022);
      dots.push({
        x,
        y,
        z: z + crest * 0.01,
        r: (0.95 + 0.6 * crest) * rs,
        v: 0.66 + 0.3 * crest,
        a: 0.85 + 0.15 * crest
      });
    }
    const eth = t * (k % 2 ? -1.15 : 1.3) + k * 2.1;
    const [ex2, ey2] = ring(eth);
    const [x2, y2, z2] = p(ex2, ey2, 0.04);
    dots.push({ x: x2, y: y2, z: z2 + 0.02, r: 1.9 * rs, v: 0.95 });
  }

  const nN = o.mini ? 3 : 7;
  for (let i = 0; i < nN; i++) {
    const a = (i / nN) * TAU,
      rr = i ? 0.085 : 0;
    const [x, y, z] = p(Math.cos(a) * rr, Math.sin(a) * rr, 0.05);
    dots.push({ x, y, z: z + 0.03, r: 1.5 * rs, v: 0.9 });
  }

  paint(ctx, dots, [97, 218, 251], 0.88, 0.3, o.isDark);
}

// ============ OPENAI: Rosette Bloom ============
const OPENAI_PATH =
  'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z';

const maskCache = new Map<string, [number, number][]>();

function pathDots(
  key: string,
  d: string,
  N: number,
  vb = 24,
  strokeW?: number,
  inv?: string,
  rc?: boolean
): [number, number][] {
  const ck = `${key}-${N}-${inv || ''}-${rc ? '-rc' : ''}`;
  if (maskCache.has(ck)) return maskCache.get(ck)!;
  if (typeof document === 'undefined') return [];

  const px = 200,
    c = document.createElement('canvas');
  c.width = c.height = px;
  const g = c.getContext('2d');
  if (!g) return [];

  g.setTransform(px / vb, 0, 0, px / vb, 0, 0);
  if (strokeW) {
    g.strokeStyle = '#fff';
    g.lineWidth = strokeW;
    g.lineJoin = 'round';
    g.lineCap = 'round';
    g.stroke(new Path2D(d));
  } else {
    g.fillStyle = '#fff';
    g.fill(new Path2D(d));
  }

  const img = g.getImageData(0, 0, px, px).data;
  let x0 = px,
    x1 = -1,
    y0 = px,
    y1 = -1;
  for (let j = 0; j < px; j++)
    for (let i = 0; i < px; i++)
      if (img[(j * px + i) * 4 + 3] > 128) {
        if (i < x0) x0 = i;
        if (i > x1) x1 = i;
        if (j < y0) y0 = j;
        if (j > y1) y1 = j;
      }
  const mx = (x0 + x1) / 2,
    my = (y0 + y1) / 2,
    m = Math.max(x1 - x0, y1 - y0);
  const pts: [number, number][] = [];
  for (let j = 0; j < N; j++)
    for (let i = 0; i < N; i++) {
      const sx = mx + (((i + 0.5) / N) * 2 - 1) * (m / 2),
        sy = my + (((j + 0.5) / N) * 2 - 1) * (m / 2);
      const ix = Math.round(sx),
        iy = Math.round(sy);
      if (ix < 0 || iy < 0 || ix >= px || iy >= px) continue;
      const on = img[(iy * px + ix) * 4 + 3] > 128;
      const nx = (sx - mx) / (m / 2),
        ny = (sy - my) / (m / 2);
      if (inv) {
        if (on) continue;
        if (inv === 'circle' && Math.hypot(nx, ny) > 0.96) continue;
        if (inv === 'box' && Math.pow(Math.abs(nx), 4) + Math.pow(Math.abs(ny), 4) > Math.pow(0.9, 4)) continue;
      } else if (!on) continue;
      pts.push([nx, ny]);
    }

  if (rc && pts.length) {
    let ax0 = 1e9,
      ax1 = -1e9,
      ay0 = 1e9,
      ay1 = -1e9;
    for (const [qx, qy] of pts) {
      if (qx < ax0) ax0 = qx;
      if (qx > ax1) ax1 = qx;
      if (qy < ay0) ay0 = qy;
      if (qy > ay1) ay1 = qy;
    }
    const ox = (ax0 + ax1) / 2,
      oy = (ay0 + ay1) / 2;
    for (const q of pts) {
      q[0] -= ox;
      q[1] -= oy;
    }
  }

  maskCache.set(ck, pts);
  return pts;
}

function drawOpenAI(ctx: CanvasRenderingContext2D, S: number, t: number, o: DrawOptions) {
  const cx = S / 2,
    cy = S / 2,
    R = (S / 2) * 0.9;
  const rs = rscale(S) * (o.mini ? 1.8 : 1);
  const p = proj(0.12 * Math.sin(t * 0.38), 0.12 * Math.sin(t * 0.29), cx, cy, R);
  const pts = pathDots('openai', OPENAI_PATH, o.mini ? 14 : 34);
  const cyc = ((t * 0.28) % 1 + 1) % 1;
  const open = smooth(Math.sin(cyc * Math.PI));
  const scl = 0.5 + 0.5 * open;
  const dots: Dot[] = [];

  for (const [gx0, gy0] of pts) {
    const r0 = Math.hypot(gx0, gy0),
      th = Math.atan2(gy0, gx0);
    const a = th + (1 - open) * 1.5 * r0 + t * 0.1;
    const rr = r0 * scl;
    const [x, y, z] = p(Math.cos(a) * rr, -Math.sin(a) * rr, 0);
    const dep = (z + 1) / 2;
    dots.push({
      x,
      y,
      z,
      r: (0.78 + 0.7 * dep + 0.4 * r0 * open) * rs,
      v: 0.5 + 0.16 * dep + 0.28 * r0 * open
    });
  }

  paint(ctx, dots, null, 0, 0.3, o.isDark);
}

// ============ GITHUB, LINKEDIN, EMAIL, X, INSTAGRAM, THREADS ============
const MARK_PATHS = {
  github:
    'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  x: 'M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z',
  instagram:
    'M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839',
  threads:
    'M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Z',
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
};

function drawMark(
  ctx: CanvasRenderingContext2D,
  S: number,
  t: number,
  o: DrawOptions,
  cfg: {
    key: string;
    fit?: number;
    n?: number;
    nMini?: number;
    vb?: number;
    stroke?: number;
    invert?: string;
    recenter?: boolean;
    speed?: number;
    motion?: 'scan' | 'sweep' | 'diag';
    v?: number;
    accent?: [number, number, number] | null;
    grad?: [[number, number, number], [number, number, number]];
  }
) {
  const cx = S / 2,
    cy = S / 2,
    R = (S / 2) * (cfg.fit ?? 0.88);
  const rs = rscale(S) * (o.mini ? 1.8 : 1);
  const p = proj(0.15 * Math.sin(t * 0.4), 0.13 * Math.sin(t * 0.31), cx, cy, R);
  const pathD = (MARK_PATHS as Record<string, string>)[cfg.key] || MARK_PATHS.github;
  const pts = pathDots(
    cfg.key,
    pathD,
    o.mini ? cfg.nMini ?? 12 : cfg.n ?? 26,
    cfg.vb,
    cfg.stroke,
    cfg.invert,
    cfg.recenter
  );
  const wave = (((t * (cfg.speed ?? 0.4)) % 1 + 1) % 1) * 2.4 - 1.2;
  const dots: Dot[] = [];

  for (const [gx, gy] of pts) {
    let crest: number;
    if (cfg.motion === 'scan') crest = Math.exp(-Math.pow(gy - wave, 2) / 0.05);
    else if (cfg.motion === 'sweep') {
      const ph = ((Math.atan2(gy, gx) / TAU + 0.5 - t * 0.3) % 1 + 1) % 1;
      crest = Math.exp(-Math.pow(ph - 0.5, 2) / 0.014);
    } else {
      crest = Math.exp(-Math.pow((gx - gy) * 0.5 - wave, 2) / 0.05);
    }
    const [x, y, z] = p(gx, -gy, 0);
    const dep = (z + 1) / 2;
    const d: Dot = {
      x,
      y,
      z,
      r: (0.78 + 0.72 * dep + 0.45 * crest) * rs,
      v: (cfg.v ?? 0.58) + 0.15 * dep + 0.3 * crest
    };
    if (cfg.grad) {
      const m = clamp01((gy + 1) / 2);
      d.c = [
        lerp(cfg.grad[0][0], cfg.grad[1][0], m),
        lerp(cfg.grad[0][1], cfg.grad[1][1], m),
        lerp(cfg.grad[0][2], cfg.grad[1][2], m)
      ];
    }
    dots.push(d);
  }
  paint(ctx, dots, cfg.accent ?? o.accent, cfg.accent ? 0.9 : 0, 0.3, o.isDark);
}

function perimeter(pts: [number, number][]) {
  const n = pts.length,
    seg: number[] = [];
  let L = 0;
  for (let i = 0; i < n; i++) {
    const a = pts[i],
      b = pts[(i + 1) % n];
    const l = Math.hypot(b[0] - a[0], b[1] - a[1]);
    seg.push(l);
    L += l;
  }
  return (u: number): [number, number] => {
    let d = (((u % 1) + 1) % 1) * L,
      i = 0;
    while (d > seg[i] && i < n - 1) {
      d -= seg[i];
      i++;
    }
    const a = pts[i],
      b = pts[(i + 1) % n],
      f = seg[i] ? d / seg[i] : 0;
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
  };
}

// ============ EMAIL: The envelope, flap lifting & letter showing ============
function drawEmail(ctx: CanvasRenderingContext2D, S: number, t: number, o: DrawOptions) {
  const cx = S / 2,
    cy = S / 2,
    R = (S / 2) * 0.8;
  const rs = rscale(S) * (o.mini ? 1.8 : 1);
  const p = proj(0.14 * Math.sin(t * 0.4), 0.14 * Math.sin(t * 0.3), cx, cy, R);
  const w = 0.88,
    h = 0.6,
    r = 0.24;
  const cyc = ((t * 0.3) % 1 + 1) % 1;
  const lift = smooth(Math.sin(clamp01(cyc * 1.5) * Math.PI));
  const show = clamp01((lift - 0.2) / 0.3);
  const step = o.mini ? 0.28 : 0.128;
  const dots: Dot[] = [];

  const dot = (gx: number, gy: number, z0: number, v: number, mul?: number) => {
    const [x, y, z] = p(gx, -gy, z0 || 0);
    const dep = (z + 1) / 2;
    dots.push({
      x,
      y,
      z,
      r: (0.82 + 1.5 * dep) * rs,
      v: v + 0.44 * dep,
      a: (0.62 + 0.38 * dep) * (mul ?? 1)
    });
  };

  const node = (gx: number, gy: number, z0?: number, mul?: number) => {
    const [x, y, z] = p(gx, -gy, z0 || 0);
    const dep = (z + 1) / 2;
    dots.push({
      x,
      y,
      z,
      r: (1.22 + 1.5 * dep) * rs,
      v: 0.62 + 0.4 * dep,
      a: (0.68 + 0.32 * dep) * (mul ?? 1)
    });
  };

  const line = (
    ax: number,
    ay: number,
    bx: number,
    by: number,
    v: number,
    z0?: number,
    mul?: number
  ) => {
    const L = Math.hypot(bx - ax, by - ay),
      n = Math.max(2, Math.round(L / step));
    for (let i = 0; i <= n; i++) {
      const f = i / n;
      dot(ax + (bx - ax) * f, ay + (by - ay) * f, z0 || 0, v, mul);
    }
  };

  const body: [number, number][] = [];
  const arc = (ax: number, ay: number, a0: number, a1: number) => {
    for (let i = 0; i <= 5; i++) {
      const a = a0 + ((a1 - a0) * i) / 5;
      body.push([ax + Math.cos(a) * r, ay + Math.sin(a) * r]);
    }
  };
  body.push([-w + r, -h], [w - r, -h]);
  arc(w - r, -h + r, -Math.PI / 2, 0);
  body.push([w, h - r]);
  arc(w - r, h - r, 0, Math.PI / 2);
  body.push([-w + r, h]);
  arc(-w + r, h - r, Math.PI / 2, Math.PI);
  body.push([-w, -h + r]);
  arc(-w + r, -h + r, Math.PI, Math.PI * 1.5);

  let per = 0;
  for (let i = 0; i < body.length; i++) {
    const a = body[i],
      b = body[(i + 1) % body.length];
    per += Math.hypot(b[0] - a[0], b[1] - a[1]);
  }
  const bodyPath = perimeter(body);
  const N = Math.max(8, Math.round(per / step));
  for (let i = 0; i < N; i++) {
    const [gx, gy] = bodyPath((i + 0.5) / N);
    dot(gx, gy, 0, 0.5);
  }

  const kx = w - r * 0.3,
    ky = h - r * 0.3;
  node(-kx, -ky);
  node(kx, -ky);
  node(kx, ky);
  node(-kx, ky);

  if (show > 0.02) {
    const lw = w * 0.6,
      lh = h * 0.62,
      lr = 0.1,
      lz = -0.06;
    const ly = 0;
    line(-lw + lr, ly - lh, lw - lr, ly - lh, 0.56, lz, show);
    line(-lw + lr, ly + lh, lw - lr, ly + lh, 0.56, lz, show);
    line(-lw, ly - lh + lr, -lw, ly + lh - lr, 0.56, lz, show);
    line(lw, ly - lh + lr, lw, ly + lh - lr, 0.56, lz, show);
    if (!o.mini) {
      line(-lw * 0.55, ly - lh * 0.3, lw * 0.55, ly - lh * 0.3, 0.5, lz, show);
      line(-lw * 0.55, ly + lh * 0.12, lw * 0.28, ly + lh * 0.12, 0.5, lz, show);
    }
    node(-lw, ly - lh, lz, show);
    node(lw, ly - lh, lz, show);
  }

  const apex = lerp(0.34 * h, -1.5 * h, lift);
  const fx = w - r * 0.4,
    fy = -h + r * 0.1;
  line(-fx, fy, 0, apex, 0.6, 0.07);
  line(fx, fy, 0, apex, 0.6, 0.07);
  node(0, apex, 0.08);
  paint(ctx, dots, null, 0, 0.3, o.isDark);
}

// Map all available modes to their renderer
export const ORB_MODES: Record<
  string,
  {
    draw: (ctx: CanvasRenderingContext2D, S: number, t: number, o: DrawOptions) => void;
    accent?: [number, number, number] | null;
    speed: number;
  }
> = {
  claude: { draw: drawClaude, accent: [217, 119, 87], speed: 1 },
  gemini: { draw: drawGemini, accent: null, speed: 1 },
  react: { draw: drawReact, accent: [97, 218, 251], speed: 1 },
  openai: { draw: drawOpenAI, accent: null, speed: 1 },
  email: { draw: drawEmail, accent: null, speed: 1 },
  github: {
    draw: (c, s, t, o) =>
      drawMark(c, s, t, o, {
        key: 'github',
        n: 30,
        nMini: 13,
        motion: 'diag',
        invert: 'circle',
        recenter: true,
        v: 0.62
      }),
    accent: null,
    speed: 1
  },
  linkedin: {
    draw: (c, s, t, o) =>
      drawMark(c, s, t, o, {
        key: 'linkedin',
        n: 30,
        nMini: 13,
        motion: 'scan',
        speed: 0.38,
        invert: 'box',
        accent: [40, 130, 220],
        v: 0.66
      }),
    accent: [40, 130, 220],
    speed: 1
  },
  x: {
    draw: (c, s, t, o) =>
      drawMark(c, s, t, o, { key: 'x', n: 30, nMini: 12, motion: 'sweep', fit: 0.7, v: 0.64 }),
    accent: null,
    speed: 1
  },
  instagram: {
    draw: (c, s, t, o) =>
      drawMark(c, s, t, o, {
        key: 'instagram',
        n: 28,
        nMini: 13,
        motion: 'sweep',
        fit: 0.74,
        grad: [
          [151, 78, 200],
          [250, 140, 70]
        ],
        v: 0.68
      }),
    accent: null,
    speed: 1
  },
  threads: {
    draw: (c, s, t, o) =>
      drawMark(c, s, t, o, { key: 'threads', n: 30, nMini: 13, motion: 'sweep', fit: 0.74, v: 0.64 }),
    accent: null,
    speed: 1
  }
};

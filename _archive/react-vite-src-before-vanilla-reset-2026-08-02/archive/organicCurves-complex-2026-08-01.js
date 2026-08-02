const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const createSeededRandom = (seed) => {
  let state = Math.floor(Math.abs(seed || 1) * 2147483647) % 2147483647;
  if (state === 0) state = 1;

  return () => {
    state = (state * 48271) % 2147483647;
    return state / 2147483647;
  };
};

const signedNoise = (random) => random() * 2 - 1;

const addEdgePoints = ({
  points,
  from,
  to,
  steps,
  normal,
  amplitude,
  random,
  width,
  height,
  margin,
  active,
  skipFirst,
}) => {
  for (let i = skipFirst ? 1 : 0; i <= steps; i += 1) {
    const t = i / steps;
    const x = from.x + (to.x - from.x) * t;
    const y = from.y + (to.y - from.y) * t;
    const fade = Math.sin(t * Math.PI);
    const offset = active && i !== 0 && i !== steps ? signedNoise(random) * amplitude * fade : 0;

    points.push({
      x: clamp(x + normal.x * offset, margin * 0.25, width - margin * 0.25),
      y: clamp(y + normal.y * offset, margin * 0.25, height - margin * 0.25),
    });
  }
};

const catmullRomToBezier = (points, tension) => {
  if (points.length < 3) return '';

  let path = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

  for (let i = 0; i < points.length; i += 1) {
    const p0 = points[(i - 1 + points.length) % points.length];
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];
    const p3 = points[(i + 2) % points.length];

    const cp1 = {
      x: p1.x + (p2.x - p0.x) * tension,
      y: p1.y + (p2.y - p0.y) * tension,
    };
    const cp2 = {
      x: p2.x - (p3.x - p1.x) * tension,
      y: p2.y - (p3.y - p1.y) * tension,
    };

    path += ` C ${cp1.x.toFixed(1)} ${cp1.y.toFixed(1)}, ${cp2.x.toFixed(1)} ${cp2.y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  return `${path} Z`;
};

export function generateCurvilinearBoundary({
  width = 420,
  height = 260,
  seed = 12,
  intensity = 0.18,
  pointsPerEdge = 5,
  smoothness = 0.72,
  edges = { top: true, right: true, bottom: true, left: true },
} = {}) {
  const random = createSeededRandom(seed);
  const shortestSide = Math.min(width, height);
  const amplitude = clamp(intensity, 0, 0.32) * shortestSide;
  const margin = amplitude + 12;
  const steps = clamp(Math.round(pointsPerEdge), 2, 12);
  const tension = 0.08 + clamp(smoothness, 0, 1) * 0.16;

  const left = margin;
  const top = margin;
  const right = width - margin;
  const bottom = height - margin;

  const generatedPoints = [];

  addEdgePoints({
    points: generatedPoints,
    from: { x: left, y: top },
    to: { x: right, y: top },
    steps,
    normal: { x: 0, y: -1 },
    amplitude,
    random,
    width,
    height,
    margin,
    active: edges.top,
    skipFirst: false,
  });

  addEdgePoints({
    points: generatedPoints,
    from: { x: right, y: top },
    to: { x: right, y: bottom },
    steps,
    normal: { x: 1, y: 0 },
    amplitude,
    random,
    width,
    height,
    margin,
    active: edges.right,
    skipFirst: true,
  });

  addEdgePoints({
    points: generatedPoints,
    from: { x: right, y: bottom },
    to: { x: left, y: bottom },
    steps,
    normal: { x: 0, y: 1 },
    amplitude,
    random,
    width,
    height,
    margin,
    active: edges.bottom,
    skipFirst: true,
  });

  addEdgePoints({
    points: generatedPoints,
    from: { x: left, y: bottom },
    to: { x: left, y: top },
    steps,
    normal: { x: -1, y: 0 },
    amplitude,
    random,
    width,
    height,
    margin,
    active: edges.left,
    skipFirst: true,
  });

  return {
    path: catmullRomToBezier(generatedPoints, tension),
    points: generatedPoints,
    viewBox: `0 0 ${width} ${height}`,
    width,
    height,
  };
}

export function generateWaveDivider({
  width = 900,
  height = 180,
  seed = 8,
  waves = 4,
  amplitude = 48,
  position = 'bottom',
} = {}) {
  const random = createSeededRandom(seed);
  const steps = Math.max(2, Math.round(waves * 2));
  const baseY = position === 'bottom' ? height * 0.42 : height * 0.58;
  const points = [];

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const x = width * t;
    const wave = Math.sin(t * Math.PI * waves);
    const noise = signedNoise(random) * 0.32;
    const y = clamp(baseY + (wave + noise) * amplitude, 16, height - 16);
    points.push({ x, y });
  }

  let path = position === 'bottom' ? `M 0 ${height} L 0 ${points[0].y.toFixed(1)}` : `M 0 0 L 0 ${points[0].y.toFixed(1)}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const current = points[i];
    const next = points[i + 1];
    const midX = (current.x + next.x) / 2;
    const midY = (current.y + next.y) / 2;
    path += ` Q ${current.x.toFixed(1)} ${current.y.toFixed(1)}, ${midX.toFixed(1)} ${midY.toFixed(1)}`;
  }

  const last = points[points.length - 1];
  path += ` T ${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
  path += position === 'bottom' ? ` L ${width} ${height} Z` : ` L ${width} 0 Z`;

  return {
    path,
    points,
    viewBox: `0 0 ${width} ${height}`,
    width,
    height,
  };
}

export function makeSvgMarkup({ path, viewBox, fill = '#2f9e8f', stroke = '#1f2937' }) {
  return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" role="img">
  <path d="${path}" fill="${fill}" stroke="${stroke}" stroke-width="2" />
</svg>`;
}

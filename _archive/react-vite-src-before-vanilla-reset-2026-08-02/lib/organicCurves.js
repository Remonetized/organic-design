const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function pointText(point) {
  return `${Math.round(point.x)}px ${Math.round(point.y)}px`;
}

function generateRectanglePoints(width, height, detail, variation, curved, phase) {
  const points = [];
  const steps = clamp(Math.round(detail / 10), 4, 12);

  const addSide = (start, end, normal, sideIndex) => {
    for (let i = 0; i <= steps; i += 1) {
      if (points.length > 0 && i === 0) continue;

      const t = i / steps;
      const x = start.x + (end.x - start.x) * t;
      const y = start.y + (end.y - start.y) * t;
      const fade = Math.sin(t * Math.PI);
      const wave = curved
        ? Math.sin(t * Math.PI * 2 + phase + sideIndex) * variation
        : (i % 2 === 0 ? variation : -variation);

      points.push({
        x: clamp(x + normal.x * wave * fade, 0, width),
        y: clamp(y + normal.y * wave * fade, 0, height),
      });
    }
  };

  addSide({ x: 0, y: 0 }, { x: width, y: 0 }, { x: 0, y: -1 }, 0);
  addSide({ x: width, y: 0 }, { x: width, y: height }, { x: 1, y: 0 }, 1);
  addSide({ x: width, y: height }, { x: 0, y: height }, { x: 0, y: 1 }, 2);
  addSide({ x: 0, y: height }, { x: 0, y: 0 }, { x: -1, y: 0 }, 3);

  return points;
}

function generateCirclePoints(width, height, detail, variation, jagged, phase) {
  const points = [];
  const count = clamp(Math.round(detail / 3), 16, 42);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.42;

  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2;
    const wave = jagged
      ? (i % 2 === 0 ? variation : -variation)
      : Math.sin(angle * 5 + phase) * variation;
    const currentRadius = radius + wave;

    points.push({
      x: centerX + Math.cos(angle) * currentRadius,
      y: centerY + Math.sin(angle) * currentRadius,
    });
  }

  return points;
}

export function generateOrganicDiv({
  width = 252,
  height = 135,
  detail = 60,
  variation = 18,
  style = 'Rectangular Curved',
  background = '#bbbbbb',
  phase = 0,
} = {}) {
  const points = style.includes('Circular')
    ? generateCirclePoints(width, height, detail, variation, style.includes('Jagged'), phase)
    : generateRectanglePoints(width, height, detail, variation, !style.includes('Jagged'), phase);

  const polygon = `polygon(${points.map(pointText).join(',')})`;
  const html = `<div id="organicDiv">\n</div>`;
  const css = `#organicDiv {\n  height: ${height}px;\n  width: ${width}px;\n  background-color: ${background};\n  clip-path: ${polygon};\n  shape-outside: ${polygon};\n}`;
  const sass = `$backgroundColour: ${background};\n$polygon: ${points.map(pointText).join(',')};`;

  return {
    polygon,
    html,
    css,
    sass,
    style: {
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: background,
      clipPath: polygon,
      shapeOutside: polygon,
    },
  };
}

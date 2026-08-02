export function generateWavyCircle(size = 260, phase = 0) {
  const center = size / 2;
  const radius = size * 0.35;
  const points = 24;
  let path = "";

  for (let i = 0; i <= points; i += 1) {
    const angle = (i / points) * Math.PI * 2;
    const wave = Math.sin(angle * 5 + phase) * 18;
    const x = center + Math.cos(angle) * (radius + wave);
    const y = center + Math.sin(angle) * (radius + wave);

    if (i === 0) {
      path = `M ${x.toFixed(1)} ${y.toFixed(1)}`;
    } else {
      path += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
  }

  return `${path} Z`;
}

import { useMemo, useState } from 'react';
import { generateCurvilinearBoundary, generateWaveDivider, makeSvgMarkup } from './lib/organicCurves.js';

const componentModes = [
  { id: 'card', label: 'Card' },
  { id: 'container', label: 'Container' },
  { id: 'divider', label: 'Divider' },
];

const edgeOptions = [
  { id: 'top', label: 'Top' },
  { id: 'right', label: 'Right' },
  { id: 'bottom', label: 'Bottom' },
  { id: 'left', label: 'Left' },
];

function Slider({ label, value, min, max, step = 1, suffix = '', onChange }) {
  return (
    <label className="control">
      <span className="control__row">
        <span>{label}</span>
        <strong>{value}{suffix}</strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function App() {
  const [mode, setMode] = useState('card');
  const [seed, setSeed] = useState(17);
  const [width, setWidth] = useState(420);
  const [height, setHeight] = useState(260);
  const [intensity, setIntensity] = useState(18);
  const [smoothness, setSmoothness] = useState(72);
  const [pointsPerEdge, setPointsPerEdge] = useState(5);
  const [copied, setCopied] = useState('');
  const [edges, setEdges] = useState({
    top: true,
    right: true,
    bottom: true,
    left: true,
  });

  const boundary = useMemo(() => {
    if (mode === 'divider') {
      return generateWaveDivider({
        width: 920,
        height: 180,
        seed,
        waves: Math.max(2, pointsPerEdge),
        amplitude: 16 + intensity * 1.15,
        position: edges.bottom ? 'bottom' : 'top',
      });
    }

    return generateCurvilinearBoundary({
      width,
      height,
      seed,
      intensity: intensity / 100,
      smoothness: smoothness / 100,
      pointsPerEdge,
      edges,
    });
  }, [mode, seed, width, height, intensity, smoothness, pointsPerEdge, edges]);

  const svgMarkup = useMemo(
    () => makeSvgMarkup({
      path: boundary.path,
      viewBox: boundary.viewBox,
      fill: mode === 'divider' ? '#f0b35a' : mode === 'container' ? '#7ba5ff' : '#58b6a6',
      stroke: '#17202a',
    }),
    [boundary, mode]
  );

  const apiSnippet = `import { generateCurvilinearBoundary } from '@organic-design/core';

const shape = generateCurvilinearBoundary({
  width: ${width},
  height: ${height},
  seed: ${seed},
  intensity: ${(intensity / 100).toFixed(2)},
  smoothness: ${(smoothness / 100).toFixed(2)},
  pointsPerEdge: ${pointsPerEdge},
  edges: ${JSON.stringify(edges)}
});

// Use shape.path inside an SVG <path d={shape.path} />`;

  const copyText = async (label, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      window.setTimeout(() => setCopied(''), 1600);
    } catch {
      setCopied('Copy failed');
    }
  };

  const toggleEdge = (edge) => {
    setEdges((current) => ({ ...current, [edge]: !current[edge] }));
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Design Science Artefact Prototype</p>
          <h1>Organic Design API</h1>
        </div>
        <button className="ghost-button" onClick={() => setSeed((value) => value + 1)}>
          New Seed
        </button>
      </header>

      <main className="workspace">
        <section className="preview-area" aria-label="Generated component preview">
          <div className="mode-tabs" role="tablist" aria-label="Component type">
            {componentModes.map((option) => (
              <button
                key={option.id}
                className={mode === option.id ? 'mode-tabs__button mode-tabs__button--active' : 'mode-tabs__button'}
                onClick={() => setMode(option.id)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className={`preview-stage preview-stage--${mode}`}>
            <svg viewBox={boundary.viewBox} className="generated-svg" aria-label="Generated curvilinear boundary">
              <defs>
                <linearGradient id="shapeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={mode === 'divider' ? '#ffd166' : '#8bd3c7'} />
                  <stop offset="100%" stopColor={mode === 'container' ? '#5e7ce2' : '#2f9e8f'} />
                </linearGradient>
              </defs>
              <path d={boundary.path} fill="url(#shapeGradient)" stroke="#17202a" strokeWidth="2" />
            </svg>

            {mode !== 'divider' && (
              <div className="preview-copy">
                <strong>{mode === 'card' ? 'Generated card boundary' : 'Generated container boundary'}</strong>
                <span>Seed {seed} / {pointsPerEdge} points per edge / {intensity}% intensity</span>
              </div>
            )}
          </div>
        </section>

        <aside className="control-panel" aria-label="Generator controls">
          <div className="panel-section">
            <h2>Parameters</h2>
            <Slider label="Seed" value={seed} min={1} max={200} onChange={setSeed} />
            {mode !== 'divider' && (
              <>
                <Slider label="Width" value={width} min={260} max={720} suffix="px" onChange={setWidth} />
                <Slider label="Height" value={height} min={180} max={520} suffix="px" onChange={setHeight} />
              </>
            )}
            <Slider label="Intensity" value={intensity} min={0} max={32} suffix="%" onChange={setIntensity} />
            <Slider label="Smoothness" value={smoothness} min={20} max={96} suffix="%" onChange={setSmoothness} />
            <Slider label={mode === 'divider' ? 'Waves' : 'Points'} value={pointsPerEdge} min={2} max={10} onChange={setPointsPerEdge} />
          </div>

          <div className="panel-section">
            <h2>Edges</h2>
            <div className="edge-grid">
              {edgeOptions.map((edge) => (
                <label key={edge.id} className={edges[edge.id] ? 'edge-toggle edge-toggle--active' : 'edge-toggle'}>
                  <input
                    type="checkbox"
                    checked={edges[edge.id]}
                    onChange={() => toggleEdge(edge.id)}
                  />
                  <span>{edge.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="panel-section">
            <h2>Export</h2>
            <div className="button-row">
              <button type="button" onClick={() => copyText('SVG', svgMarkup)}>Copy SVG</button>
              <button type="button" onClick={() => copyText('API', apiSnippet)}>Copy API</button>
            </div>
            <p className="copy-status" aria-live="polite">{copied ? `${copied} copied` : 'Ready to copy generated output'}</p>
          </div>
        </aside>

        <section className="code-area" aria-label="Generated code output">
          <div>
            <h2>Generated SVG path</h2>
            <pre>{boundary.path}</pre>
          </div>
          <div>
            <h2>API usage</h2>
            <pre>{apiSnippet}</pre>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

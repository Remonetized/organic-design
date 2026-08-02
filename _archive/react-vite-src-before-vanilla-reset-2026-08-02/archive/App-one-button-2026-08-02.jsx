import { useState } from 'react';
import { generateWavyCircle } from './lib/organicCurves.js';

function App() {
  const [shapePath, setShapePath] = useState(generateWavyCircle(260, 0));
  const [clickCount, setClickCount] = useState(0);

  function handleGenerateShape() {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    setShapePath(generateWavyCircle(260, nextCount));
  }

  return (
    <main className="page">
      <section className="workspace">
        <div className="intro">
          <p className="eyebrow">Prototype 1</p>
          <h1>Organic Shape Generator</h1>
          <p>
            This first prototype generates a simple curvilinear SVG shape. The
            current goal is to make the smallest working artefact before adding
            parameters, exports, or additional component types.
          </p>
        </div>

        <div className="preview">
          <svg viewBox="0 0 260 260" aria-label="Generated organic shape">
            <path d={shapePath} />
          </svg>
        </div>

        <button type="button" onClick={handleGenerateShape}>
          Generate Shape {clickCount > 0 ? `(${clickCount})` : ''}
        </button>

        <div className="code-block">
          <h2>Generated SVG Path</h2>
          <pre>{shapePath}</pre>
        </div>
      </section>
    </main>
  );
}

export default App;

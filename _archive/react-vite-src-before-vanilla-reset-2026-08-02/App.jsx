import { useState } from 'react';
import { generateOrganicDiv } from './lib/organicCurves.js';

const loremText = `Text in an aligned div. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet libero eu neque facilisis. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit architecto aspernatur suscipit error saepe laudantium ipsam sed laboriosam illum adipisci. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa exercitationem minus sint consequuntur voluptas harum quos error delectus deserunt quaerat quis veritatis cum, a amet sapiente architecto? Unde porro nihil magni blanditiis facere quam aliquid eum labore ipsum harum fuga nostrum minima voluptate quidem neque, saepe repellendus. Cumque ea excepturi consectetur vitae ipsa eligendi qui quisquam, alias autem rerum praesentium quam ex quod modi nesciunt, voluptatibus, ut nihil!`;

const edgeStyles = [
  'Rectangular Curved',
  'Rectangular Jagged',
  'Circular',
  'Circular Jagged',
];

function CodePanel({ title, children }) {
  return (
    <section className="code-panel">
      <h3>{title}</h3>
      <pre>{children}</pre>
    </section>
  );
}

function RangeControl({ label, min, max, value, onChange }) {
  return (
    <label className="control-row">
      <span>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function App() {
  const [width, setWidth] = useState(252);
  const [height, setHeight] = useState(135);
  const [detail, setDetail] = useState(60);
  const [variation, setVariation] = useState(18);
  const [background, setBackground] = useState('#bbbbbb');
  const [edgeStyle, setEdgeStyle] = useState('Rectangular Curved');
  const [phase, setPhase] = useState(1);
  const [generatedDiv, setGeneratedDiv] = useState(() => generateOrganicDiv());

  function handleGenerate() {
    const nextPhase = phase + 1;
    setPhase(nextPhase);
    setGeneratedDiv(generateOrganicDiv({
      width,
      height,
      detail,
      variation,
      style: edgeStyle,
      background,
      phase: nextPhase,
    }));
  }

  return (
    <div className="app">
      <header className="top-nav">
        <div className="logo-mark" aria-hidden="true">↻</div>
        <a href="#home">Home</a>
        <a href="#tutorials">Tutorials</a>
        <a href="#templates">Templates</a>
      </header>

      <div className="version-bar">Organic Design v.0</div>

      <div className="layout">
        <aside className="side-nav">
          <h2>Organic Design</h2>
          <a href="#home">Home</a>
          <a href="#div" className="active">Div</a>
        </aside>

        <main className="content">
          <h1>Organic Design Divs</h1>

          <div className="page-buttons">
            <button type="button">‹ Previous</button>
            <button type="button">Next ›</button>
          </div>

          <hr />

          <section className="intro">
            <h2>Unique Divs</h2>
            <p>
              Organic Design provides utilities to generate unique elements for
              your web pages. Use the tool below to generate a fixed-dimension
              Organic Design Div.
            </p>
          </section>

          <section className="tool-box">
            <div className="text-preview">
              <div className="organic-div" style={generatedDiv.style} />
              <p>{loremText}</p>
            </div>

            <div className="tool-grid">
              <section className="controls">
                <RangeControl label="Div Width" min="40" max="780" value={width} onChange={setWidth} />
                <RangeControl label="Div Height" min="40" max="420" value={height} onChange={setHeight} />

                <label className="control-row">
                  <span>Edge Style:</span>
                  <select value={edgeStyle} onChange={(event) => setEdgeStyle(event.target.value)}>
                    {edgeStyles.map((style) => (
                      <option key={style}>{style}</option>
                    ))}
                  </select>
                </label>

                <RangeControl label="Edge Detail" min="20" max="100" value={detail} onChange={setDetail} />
                <RangeControl label="Edge Variation" min="2" max="30" value={variation} onChange={setVariation} />

                <label className="control-row">
                  <span>Background Colour:</span>
                  <input
                    type="color"
                    value={background}
                    onChange={(event) => setBackground(event.target.value)}
                  />
                </label>

                <button type="button" className="generate-button" onClick={handleGenerate}>
                  Generate Div
                </button>
              </section>

              <section className="code-column">
                <CodePanel title="HTML">{generatedDiv.html}</CodePanel>
                <CodePanel title="CSS">{generatedDiv.css}</CodePanel>
                <CodePanel title="SASS Variables">{generatedDiv.sass}</CodePanel>
              </section>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;

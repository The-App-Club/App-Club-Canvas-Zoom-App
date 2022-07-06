import {createRoot} from 'react-dom/client';
import './styles/index.scss';
import {css} from '@emotion/css';
import {Slider} from '@mui/material';
import * as d3 from 'd3';
import {useState, useCallback, useRef, useEffect} from 'react';
import {SVG} from '@svgdotjs/svg.js';
import '@svgdotjs/svg.topoly.js';
import '@svgdotjs/svg.topath.js';
import * as R from 'ramda';

const App = () => {
  const svgDomRef = useRef(null);
  const [bg, setBg] = useState(`transparent`)
  const handleProgress = (e) => {
    const t = Number(e.target.value);
    console.log(t);
  };
  const makePath = (pathArray) => {
    const result = pathArray
      .map((paths) => {
        const first = paths[0];
        const remain = paths.slice(1);
        return first + ` ` + remain.join(',');
      })
      .join(' ');
    return result;
  };

  useEffect(() => {
    const svg = SVG(svgDomRef.current);
    const object = svg.circle(100, 10, 30);
    const pathData = object.toPath();
    const path = makePath([...pathData._array]);
    console.log(path);
  }, []);

  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
      `}
    >
      <div
        className={css`
          max-width: 10rem;
          width: 100%;
        `}
      >
        <Slider
          defaultValue={0}
          step={0.001}
          min={0}
          max={1}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={handleProgress}
        />
      </div>
      <svg
        ref={svgDomRef}
        width={300}
        height={400}
        viewBox={`0 0 300 400`}
        className={css`
          background: ${bg};
        `}
      ></svg>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);

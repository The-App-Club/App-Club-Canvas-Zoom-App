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
  const handleProgress = (e) => {
    const t = Number(e.target.value);
    console.log(t);
  };

  useEffect(() => {
    const svg = SVG(svgDomRef.current);
    const data =
      'M82.3,160.4c6.5,5.2,13.6,9.5,21.2,12.8c7.6,3.3,14.7,4.9,21.5,4.9c7.3,0,12.6-1.1,15.9-3.4c3.3-2.2,4.9-5.4,4.9-9.5 c0-2.2-0.6-4.1-1.7-5.6c-1.1-1.5-2.8-2.9-4.9-4.2c-2.2-1.3-4.7-2.6-7.7-3.8c-3-1.2-6.5-2.6-10.4-4.1l-22.7-9.5 c-4.9-1.9-9.5-4.3-14-7.4c-4.5-3.1-8.4-6.7-11.8-10.9c-3.4-4.2-6-9-8-14.5c-2-5.4-2.9-11.4-2.9-18c0-7.9,1.7-15.2,5.1-22 c3.4-6.8,8-12.8,14-18c6-5.1,13.1-9.2,21.5-12.2c8.3-3,17.4-4.5,27.4-4.5c10.5,0,21.1,2,31.9,5.9c10.8,3.9,20.3,10.1,28.8,18.5 L166,85.1c-6.2-4.3-12.1-7.6-17.8-9.8c-5.7-2.2-11.9-3.4-18.7-3.4c-6,0-10.7,1-14,3.1c-3.4,2.1-5.1,5.1-5.1,9.3 c0,4.3,2.4,7.6,7.2,10c4.8,2.3,11.4,5.1,19.8,8.3l22.2,8.7c11.4,4.5,20.2,10.8,26.4,18.8c6.2,8,9.3,18.4,9.3,31.2 c0,7.7-1.6,15.1-4.8,22.2c-3.2,7.1-7.8,13.3-13.9,18.7c-6.1,5.3-13.5,9.6-22.3,12.8c-8.8,3.2-18.9,4.8-30.3,4.8 c-11.6,0-23.5-2.1-35.8-6.3c-12.3-4.2-23.3-10.8-33.3-19.8L82.3,160.4z';

    const path = svg.path(data);

    const polygon = path.toPoly();

    console.log(polygon);
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
      ></svg>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);

import {createRoot} from 'react-dom/client';
import './styles/index.scss';
import {css} from '@emotion/css';
import {Slider} from '@mui/material';
import * as d3 from 'd3';
import {useState, useMemo, useRef} from 'react';
import {useResizeObserver} from './hooks/useResizeObserver';

const w = 260;
const h = 190;
const step = 10;
const k = 4.75;
const start = [30, 30, 40];
const end = [135, 85, 60];

const App = () => {
  const wrapperRef = useRef();
  const dimensions = useResizeObserver({ref: wrapperRef});
  const data = useMemo(() => {
    const result = [];
    for (let i = 0; i <= w / step; i++) {
      result.push({
        from: {
          x: i * step,
          y: 0,
        },
        to: {
          x: i * step,
          y: h,
        },
      });
    }
    for (let i = 0; i < h / step; i++) {
      result.push({
        from: {
          x: 0,
          y: i * step,
        },
        to: {
          x: w,
          y: i * step,
        },
      });
    }
    return result;
  }, [dimensions]);
  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: stretch;
        margin: 0 auto;
        max-width: 40rem;
        min-height: 100vh;
        @media screen and (max-width: 768px) {
          max-width: 100vw;
        }
      `}
    >
      <div
        ref={wrapperRef}
        className={css`
          border: 3px solid;
          padding: 60px;
          @media screen and (max-width: 768px) {
            padding: 40px;
          }
        `}
      >
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className={css`
            background: hsl(0, 100%, 100%);
            overflow: visible;
            display: block;
            width: 100%;
          `}
        >
          <g id="grid">
            {data.map(({from, to}, index) => {
              return (
                <line key={index} x1={from.x} x2={to.x} y1={from.y} y2={to.y} />
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);

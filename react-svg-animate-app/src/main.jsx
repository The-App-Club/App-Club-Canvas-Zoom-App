import {createRoot} from 'react-dom/client';
import './styles/index.scss';
import {css} from '@emotion/css';
import {Slider} from '@mui/material';
import * as d3 from 'd3';
import {useState} from 'react';
const App = () => {
  const width = 300;
  const height = 300;
  const handleProgress = (e) => {
    const t = Number(e.target.value);
  };
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
        width={`${width}px`}
        height={`${height}px`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="lds-bars"
      >
        <rect
          y="30"
          height="40"
          fill="#182731"
          x="15"
          width="10"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            values="1;0.2;1"
            keyTimes="0;0.5;1"
            dur="1"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.6s"
            repeatCount="indefinite"
          ></animate>
        </rect>
        <rect
          y="30"
          height="40"
          fill="#a7d4ec"
          x="35"
          width="10"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            values="1;0.2;1"
            keyTimes="0;0.5;1"
            dur="1"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.4s"
            repeatCount="indefinite"
          ></animate>
        </rect>
        <rect
          y="30"
          height="40"
          fill="#182731"
          x="55"
          width="10"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            values="1;0.2;1"
            keyTimes="0;0.5;1"
            dur="1"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.2s"
            repeatCount="indefinite"
          ></animate>
        </rect>
        <rect
          y="30"
          height="40"
          fill="#a7d4ec"
          x="75"
          width="10"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            values="1;0.2;1"
            keyTimes="0;0.5;1"
            dur="1"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="0s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </svg>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);

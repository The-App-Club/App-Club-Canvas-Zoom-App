import {createRoot} from 'react-dom/client';
import './styles/index.scss';
import {css} from '@emotion/css';
import {Slider} from '@mui/material';
import * as d3 from 'd3';
import {useState} from 'react';

const w = 260;
const h = 190;
const k = 4.75;
const start = [30, 30, 40];
const end = [135, 85, 60];

const App = () => {
  const [zoom, setZoom] = useState(`translate(0 0) scale(1)`);
  const handleProgress = (e) => {
    const t = Number(e.target.value);
    const z = transform(t);
    console.log(z, t);
    setZoom(z);
  };
  function transform(t) {
    const view = d3.interpolateZoom(start, end)(t);

    const k = Math.min(w, h) / view[2]; // scale
    const translate = [w / 2 - view[0] * k, h / 2 - view[1] * k]; // translate

    return `translate(${translate}) scale(${k})`;
  }
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
      <svg viewBox="-2 -2 264 194" style={{maxWidth: '600px'}}>
        <g id="view" transform={zoom}>
          <g id="start">
            <rect
              className={'bbox1'}
              x={10}
              y={10}
              width={40}
              height={40}
            ></rect>
            <circle cx={30} cy={30} r={13}></circle>
          </g>
          <g id="end">
            <rect
              className={'bbox2'}
              x={105}
              y={55}
              width={60}
              height={60}
            ></rect>
            <g transform="translate(135, 85)">
              <path d="M0,-28.314868574237753L6.357084071503433,-8.749775582932603L26.92904026556968,-8.749775582932605L10.285978097033123,3.342116878746329L16.64306216853656,22.907209870051478L2.6645352591003757e-15,10.815317408372547L-16.643062168536552,22.90720987005148L-10.285978097033121,3.342116878746331L-26.929040265569682,-8.749775582932598L-6.357084071503435,-8.749775582932601Z"></path>
            </g>
          </g>
          <g id="grid">
            <line x1={0} x2={0} y1={0} y2={190} />
            <line x1={10} x2={10} y1={0} y2={190} />
            <line x1={20} x2={20} y1={0} y2={190} />
            <line x1={30} x2={30} y1={0} y2={190} />
            <line x1={40} x2={40} y1={0} y2={190} />
            <line x1={50} x2={50} y1={0} y2={190} />
            <line x1={60} x2={60} y1={0} y2={190} />
            <line x1={70} x2={70} y1={0} y2={190} />
            <line x1={80} x2={80} y1={0} y2={190} />
            <line x1={90} x2={90} y1={0} y2={190} />
            <line x1={100} x2={100} y1={0} y2={190} />
            <line x1={110} x2={110} y1={0} y2={190} />
            <line x1={120} x2={120} y1={0} y2={190} />
            <line x1={130} x2={130} y1={0} y2={190} />
            <line x1={140} x2={140} y1={0} y2={190} />
            <line x1={150} x2={150} y1={0} y2={190} />
            <line x1={160} x2={160} y1={0} y2={190} />
            <line x1={170} x2={170} y1={0} y2={190} />
            <line x1={180} x2={180} y1={0} y2={190} />
            <line x1={190} x2={190} y1={0} y2={190} />
            <line x1={200} x2={200} y1={0} y2={190} />
            <line x1={210} x2={210} y1={0} y2={190} />
            <line x1={220} x2={220} y1={0} y2={190} />
            <line x1={230} x2={230} y1={0} y2={190} />
            <line x1={240} x2={240} y1={0} y2={190} />
            <line x1={250} x2={250} y1={0} y2={190} />
            <line x1={260} x2={260} y1={0} y2={190} />
            <line x1={0} x2={260} y1={0} y2={0} />
            <line x1={0} x2={260} y1={10} y2={10} />
            <line x1={0} x2={260} y1={20} y2={20} />
            <line x1={0} x2={260} y1={30} y2={30} />
            <line x1={0} x2={260} y1={40} y2={40} />
            <line x1={0} x2={260} y1={50} y2={50} />
            <line x1={0} x2={260} y1={60} y2={60} />
            <line x1={0} x2={260} y1={70} y2={70} />
            <line x1={0} x2={260} y1={80} y2={80} />
            <line x1={0} x2={260} y1={90} y2={90} />
            <line x1={0} x2={260} y1={100} y2={100} />
            <line x1={0} x2={260} y1={110} y2={110} />
            <line x1={0} x2={260} y1={120} y2={120} />
            <line x1={0} x2={260} y1={130} y2={130} />
            <line x1={0} x2={260} y1={140} y2={140} />
            <line x1={0} x2={260} y1={150} y2={150} />
            <line x1={0} x2={260} y1={160} y2={160} />
            <line x1={0} x2={260} y1={170} y2={170} />
            <line x1={0} x2={260} y1={180} y2={180} />
            <line x1={0} x2={260} y1={190} y2={190} />
          </g>
        </g>
      </svg>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);

import {createRoot} from 'react-dom/client';
import './styles/index.scss';
import {css} from '@emotion/css';
import {Slider} from '@mui/material';
import * as d3 from 'd3';
import {useEffect, useState, useMemo, useRef} from 'react';

const App = () => {
  const width = 350;
  const height = 350;
  const svgDomRef = useRef(null);
  const gDomRef = useRef(null);
  const pathDomRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [fitScale, setFitScale] = useState(1);
  const [prevPosInfo, setPrevPosInfo] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const gDom = gDomRef.current;
    const {x, y, width, height} = gDom.getBBox();
    setPrevPosInfo({x, y, width, height});
  }, []);

  useEffect(() => {
    const svg = svgDomRef.current;

    const {xMin, xMax, yMin, yMax} = [...svg.children].reduce(
      (acc, el) => {
        const {x, y, width, height} = el.getBBox();
        if (!acc.xMin || x < acc.xMin) {
          acc.xMin = x;
        }
        if (!acc.xMax || x + width > acc.xMax) {
          acc.xMax = x + width;
        }
        if (!acc.yMin || y < acc.yMin) {
          acc.yMin = y;
        }
        if (!acc.yMax || y + height > acc.yMax) {
          acc.yMax = y + height;
        }
        return acc;
      },
      {xMin: 0, yMin: 0, xMax: width, yMax: height}
    );

    const viewbox = `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`;

    svg.setAttribute('viewBox', viewbox);
  }, [scale]);

  const handleChange = (e) => {
    const scale = Number(e.target.value);
    const pathDom = pathDomRef.current;
    pathDom.setAttribute(
      'transform',
      `scale(${scale}) translate(${prevPosInfo.x - prevPosInfo.width / 2}, ${
        prevPosInfo.y - prevPosInfo.height / 2
      })`
    );
    setScale(scale);
  };

  return (
    <>
      <div
        className={css`
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;
          max-width: 40rem;
          min-height: 100vh;
          padding: 0 60px;
          @media screen and (max-width: 768px) {
            max-width: 100%;
            padding: 0 5px;
          }
        `}
      >
        <Slider
          onChange={handleChange}
          min={-1}
          max={100}
          defaultValue={1}
          step={0.1}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
        <p>{fitScale}</p>
        <svg
          ref={svgDomRef}
          width={width}
          height={height}
          className={css`
            background: #eee;
          `}
        >
          <g ref={gDomRef}>
            {/* <path
              ref={pathDomRef}
              d="M15.6,18.196c-0.777,0.371-1.48,0.631-2.109,0.781c-0.63,0.148-1.311,0.223-2.043,0.223c-0.831,0-1.566-0.107-2.205-0.318  c-0.639-0.213-1.183-0.516-1.635-0.908c-0.451-0.395-0.764-0.812-0.938-1.254c-0.174-0.443-0.261-1.086-0.261-1.926V8.339H4.4V5.735  c0.714-0.234,1.326-0.57,1.835-1.01c0.51-0.438,0.918-0.965,1.227-1.58C7.77,2.532,7.981,1.749,8.098,0.8h2.585v4.652h4.314v2.887  h-4.314v4.719c0,1.066,0.056,1.752,0.168,2.055c0.111,0.303,0.319,0.545,0.622,0.725c0.403,0.244,0.863,0.367,1.381,0.367  c0.92,0,1.836-0.303,2.746-0.908V18.196z"
            /> */}
            <path
              ref={pathDomRef}
              d="M324.39,279.13l-0.68,-0.39l-0.14,-0.41l-0.06,-1.39l0.23,-0.5l1.22,0.43l0.52,0.92l-0.16,1.5L324.39,279.13zM322.28,285.28l-0.33,2.29l-0.49,-0.4l-0.06,-0.52L322.28,285.28zM320.86,287.47l0.25,0.27l-0.61,0.2L320.86,287.47zM333.18,256.39l-0.82,-0.06l-0.2,-0.93l-0.5,0.44l-0.3,1.56l0.32,0.75l0.25,-0.15l0.44,0.71l-0.87,-0.2l-0.93,0.29l0,0l-0.01,-0.38l-0.48,-0.23l-0.33,-0.67l-2.68,-1.27l-0.76,0.91l-0.49,-0.47l-0.22,0.23l0.79,0.62l-0.19,2.02l-0.3,0.03l-1.35,-1.89L322.4,257l-0.86,0.16l-0.59,-0.99l-0.61,0.03l-0.46,-0.55l-0.6,-0.13l0,0l-2.1,-1.16l-1.58,-3.24l0,0l0.19,-0.44l1.38,-0.58l0.71,0.54l1.66,0.29l1.03,0.56l2.1,0.15l0.41,0.87l0.78,0.16l0.53,0.6l1.25,-0.04l1.59,-0.75l0.28,0.87l0.92,-0.37l0.55,0.29l0.67,-0.8l1.78,0.32l0.41,-0.75l0.45,0.28l0.52,-0.14l0.17,0.42l0.93,-0.07l0,0l1.08,2.26l0,0l0.35,0.76l-0.56,0.32l0.4,0.38l-0.83,0.57L333.18,256.39zM327.56,294.01l0.27,-0.46l-0.03,-0.53l-0.52,-0.53l-0.93,0.11l-0.4,1l0.18,0.63l0.69,0.09L327.56,294.01zM332.06,317.32l0.97,0.6l0.15,-0.7l0.39,-0.09l-0.25,-0.91l-0.55,-0.05l-0.88,-0.9l-0.48,0.01l-0.16,0.72l0.28,0.56l0.42,0.13L332.06,317.32zM332.06,317.32l0.97,0.6l0.15,-0.7l0.39,-0.09l-0.25,-0.91l-0.55,-0.05l-0.88,-0.9l-0.48,0.01l-0.16,0.72l0.28,0.56l0.42,0.13L332.06,317.32z"
            />
          </g>
        </svg>
      </div>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);

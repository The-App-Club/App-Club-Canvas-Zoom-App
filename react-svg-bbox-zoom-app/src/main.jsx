import {createRoot} from 'react-dom/client';
import './styles/index.scss';
import {css} from '@emotion/css';
import {Slider} from '@mui/material';
import * as d3 from 'd3';
import {useEffect, useState, useMemo, useRef, useCallback} from 'react';
import {samples} from 'culori';
import {transform} from 'framer-motion';

const matcher = (array = [], value) => {
  const result = array.findIndex((item) => {
    return item[0] <= value && value <= item[1];
  });
  return result;
};

const data = [
  [10, 10, 50],
  [10, 300, 50],
  [70, 275, 50],
  [300, 175, 50],
  [10, 10, 50],
  [150, 70, 50],
  [300, 175, 50],
  [70, 275, 50],
  [10, 300, 50],
  [150, 70, 50],
  [10, 10, 50],
];

const zoomPairs = d3.pairs(data);
const nuts = samples(data.length);
const progressPairs = d3.pairs(nuts);

const App = () => {
  const width = 300;
  const height = 300;
  const svgDomRef = useRef(null);
  const viewDomRef = useRef(null);
  const gDomRef = useRef(null);
  const pathDomRef1 = useRef(null);
  const pathDomRef2 = useRef(null);
  const pathDomRef3 = useRef(null);
  const pathDomRef4 = useRef(null);
  const pathDomRef5 = useRef(null);
  const [scale, setScale] = useState(1);

  const zoomTransform = (start, end) => {
    return (t) => {
      const view = d3.interpolateZoom(start, end)(t);
      const k = Math.min(width, height) / view[2]; // scale
      const translate = [width / 2 - view[0] * k, height / 2 - view[1] * k]; // translate
      return `translate(${translate}) scale(${k})`;
    };
  };
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

  const zoomer = useCallback(({progress, zoomStart, zoomEnd}) => {
    const viewDom = d3.select(viewDomRef.current);
    viewDom
      .transition()
      .duration(750)
      .ease(d3.easeLinear)
      .attrTween('transform', function (d) {
        const z = zoomTransform(zoomStart, zoomEnd);
        return () => {
          return z(progress);
        };
      });
  }, []);

  const handleChange = (e) => {
    const progress = Number(e.target.value);
    const matchIndex = matcher(progressPairs, progress);
    const [zoomStart, zoomEnd] = zoomPairs[matchIndex];
    const progressPair = progressPairs[matchIndex];
    const p = transform(progressPair, [0, 1])(progress);
    if (p === 0 || p === 1) {
      const viewDom = d3.select(viewDomRef.current);
      const t = d3.zoomIdentity.translate(0, 0).scale(1);
      viewDom
        .transition()
        .duration(350)
        .ease(d3.easeLinear)
        .attr('transform', t.toString());
      return;
    }
    zoomer({progress: p, zoomStart, zoomEnd});
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
          padding: 0 60px;
          @media screen and (max-width: 768px) {
            max-width: 100vw;
            padding: 0 5px;
          }
        `}
      >
        <div
          className={css`
            padding: 60px;
            width: 100%;
          `}
        >
          <Slider
            onChange={handleChange}
            min={0}
            max={1}
            defaultValue={0}
            step={0.001}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
        </div>

        <svg
          ref={svgDomRef}
          width={width}
          height={height}
          className={css`
            background: #eee;
          `}
        >
          <g ref={viewDomRef} transform="translate(0, 0) scale(1)">
            <g>
              <path
                ref={pathDomRef1}
                transform="translate(10, 300)"
                d="M15.6,18.196c-0.777,0.371-1.48,0.631-2.109,0.781c-0.63,0.148-1.311,0.223-2.043,0.223c-0.831,0-1.566-0.107-2.205-0.318  c-0.639-0.213-1.183-0.516-1.635-0.908c-0.451-0.395-0.764-0.812-0.938-1.254c-0.174-0.443-0.261-1.086-0.261-1.926V8.339H4.4V5.735  c0.714-0.234,1.326-0.57,1.835-1.01c0.51-0.438,0.918-0.965,1.227-1.58C7.77,2.532,7.981,1.749,8.098,0.8h2.585v4.652h4.314v2.887  h-4.314v4.719c0,1.066,0.056,1.752,0.168,2.055c0.111,0.303,0.319,0.545,0.622,0.725c0.403,0.244,0.863,0.367,1.381,0.367  c0.92,0,1.836-0.303,2.746-0.908V18.196z"
              />
            </g>
            <g>
              <path
                ref={pathDomRef2}
                transform="translate(300, 175)"
                d="M13.18,11.309c-0.718,0-1.3,0.807-1.3,1.799c0,0.994,0.582,1.801,1.3,1.801s1.3-0.807,1.3-1.801
              C14.479,12.116,13.898,11.309,13.18,11.309z M17.706,6.626c0.149-0.365,0.155-2.439-0.635-4.426c0,0-1.811,0.199-4.551,2.08
              c-0.575-0.16-1.548-0.238-2.519-0.238c-0.973,0-1.945,0.078-2.52,0.238C4.74,2.399,2.929,2.2,2.929,2.2
              C2.14,4.187,2.148,6.261,2.295,6.626C1.367,7.634,0.8,8.845,0.8,10.497c0,7.186,5.963,7.301,7.467,7.301
              c0.342,0,1.018,0.002,1.734,0.002c0.715,0,1.392-0.002,1.732-0.002c1.506,0,7.467-0.115,7.467-7.301
              C19.2,8.845,18.634,7.634,17.706,6.626z M10.028,16.915H9.972c-3.771,0-6.709-0.449-6.709-4.115c0-0.879,0.31-1.693,1.047-2.369
              c1.227-1.127,3.305-0.531,5.662-0.531c0.01,0,0.02,0,0.029,0c0.01,0,0.018,0,0.027,0c2.357,0,4.436-0.596,5.664,0.531
              c0.735,0.676,1.045,1.49,1.045,2.369C16.737,16.466,13.8,16.915,10.028,16.915z M6.821,11.309c-0.718,0-1.3,0.807-1.3,1.799
              c0,0.994,0.582,1.801,1.3,1.801c0.719,0,1.301-0.807,1.301-1.801C8.122,12.116,7.54,11.309,6.821,11.309z"
              />
            </g>
            <g>
              <path
                ref={pathDomRef3}
                transform="translate(150, 75)"
                d="M6.109,0.902L0.4,4.457l3.911,3.279L10,4.043L6.109,0.902z M13.452,15.992c-0.102,0-0.203-0.033-0.285-0.102L10,13.262
                l-3.167,2.629c-0.082,0.068-0.184,0.102-0.285,0.102c-0.085,0-0.17-0.023-0.244-0.072l-2.346-1.533v0.904L10,19.098l6.042-3.807
                v-0.904l-2.346,1.533C13.622,15.969,13.537,15.992,13.452,15.992z M19.6,4.457l-5.71-3.555L10,4.043l5.688,3.693L19.6,4.457z
                M10,11.291l3.528,2.928l5.641-3.688l-3.481-2.795L10,11.291z M6.472,14.219L10,11.291L4.311,7.736l-3.48,2.795L6.472,14.219z"
              />
            </g>
            <g>
              <path
                ref={pathDomRef4}
                transform="translate(10, 10)"
                d="M9.565,7.421C8.207,5.007,6.754,3.038,6.648,2.893C4.457,3.929,2.822,5.948,2.311,8.38C2.517,8.384,5.793,8.423,9.565,7.421
              z M10.543,10.061c0.102-0.033,0.206-0.064,0.309-0.094c-0.197-0.447-0.412-0.895-0.637-1.336C6.169,9.843,2.287,9.755,2.15,9.751
              c-0.003,0.084-0.007,0.166-0.007,0.25c0,2.019,0.763,3.861,2.016,5.252l-0.005-0.006C4.154,15.247,6.304,11.433,10.543,10.061z
              M5.171,16.194V16.19c-0.058-0.045-0.12-0.086-0.178-0.135C5.099,16.14,5.171,16.194,5.171,16.194z M8.118,2.372
              C8.111,2.374,8.103,2.376,8.103,2.376c0.006-0.002,0.014-0.002,0.014-0.002L8.118,2.372z M15.189,4.104
              C13.805,2.886,11.99,2.143,10,2.143c-0.639,0-1.258,0.078-1.852,0.221c0.12,0.16,1.595,2.119,2.938,4.584
              C14.048,5.839,15.167,4.136,15.189,4.104z M10,19.2c-5.08,0-9.199-4.119-9.199-9.199C0.8,4.919,4.919,0.8,10,0.8
              c5.082,0,9.2,4.119,9.2,9.201C19.2,15.081,15.082,19.2,10,19.2z M11.336,11.286c-4.611,1.607-6.134,4.838-6.165,4.904
              c1.334,1.041,3.006,1.666,4.828,1.666c1.088,0,2.125-0.221,3.067-0.621c-0.116-0.689-0.573-3.096-1.679-5.967
              C11.371,11.274,11.354,11.28,11.336,11.286z M11.69,8.12c0.184,0.373,0.358,0.754,0.523,1.139c0.059,0.135,0.114,0.272,0.17,0.406
              c2.713-0.342,5.385,0.238,5.473,0.256c-0.019-1.863-0.686-3.572-1.787-4.912C16.051,5.032,14.79,6.852,11.69,8.12z M12.861,10.905
              c1.031,2.836,1.449,5.142,1.529,5.611c1.764-1.191,3.018-3.08,3.367-5.27C17.601,11.196,15.401,10.499,12.861,10.905z"
              />
            </g>
            <g>
              <path
                ref={pathDomRef5}
                transform="translate(70, 275)"
                d="M8.617,13.227C8.091,15.981,7.45,18.621,5.549,20C4.963,15.838,6.41,12.713,7.083,9.395
                c-1.147-1.93,0.138-5.812,2.555-4.855c2.975,1.176-2.576,7.172,1.15,7.922c3.891,0.781,5.479-6.75,3.066-9.199
                C10.369-0.275,3.708,3.18,4.528,8.245c0.199,1.238,1.478,1.613,0.511,3.322c-2.231-0.494-2.897-2.254-2.811-4.6
                c0.138-3.84,3.449-6.527,6.771-6.9c4.201-0.471,8.144,1.543,8.689,5.494c0.613,4.461-1.896,9.293-6.389,8.945
                C10.081,14.411,9.571,13.807,8.617,13.227z"
              />
            </g>
          </g>
        </svg>
      </div>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);

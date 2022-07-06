import {css} from '@emotion/css';
import {useState, useEffect} from 'react';
import {transform} from 'framer-motion';
import * as d3 from 'd3';
import {samples} from 'culori';

const w = 260;
const h = 190;
const k = 4.75;

const zoomPairs = d3.pairs([
  [30, 30, 40],
  [205, 125, 80],
  [30, 125, 40],
]);
const nuts = samples(3);
const progressPairs = d3.pairs(nuts);

// const ccc = d3.zip(zoomPairs, progressPairs);
// console.log(ccc);

const Grid = ({color, progress, debugProgress}) => {
  const [transformer, setTransformer] = useState(`translate(0 0) scale(1)`);
  const zoom = (t, zoomStart, zoomEnd) => {
    const view = d3.interpolateZoom(zoomStart, zoomEnd)(t);
    const k = Math.min(w, h) / view[2]; // scale
    const translate = [w / 2 - view[0] * k, h / 2 - view[1] * k]; // translate
    return `translate(${translate}) scale(${k})`;
  };

  const matcher = (array = [], value) => {
    const result = array.findIndex((item) => {
      return item[0] <= value && value <= item[1];
    });
    return result;
  };

  useEffect(() => {
    if (debugProgress < 0.0001) {
      return;
    }
    const matchIndex = matcher(progressPairs, debugProgress);
    const [zoomStart, zoomEnd] = zoomPairs[matchIndex];
    const progressPair = progressPairs[matchIndex];
    const p = transform(progressPair, [0, 1])(debugProgress);
    const z = zoom(p, zoomStart, zoomEnd);
    setTransformer(z);
    // eslint-disable-next-line
  }, [debugProgress]);

  useEffect(() => {
    if (progress < 0.0001) {
      return;
    }
    const matchIndex = matcher(progressPairs, progress);
    const [zoomStart, zoomEnd] = zoomPairs[matchIndex];
    const progressPair = progressPairs[matchIndex];
    const p = transform(progressPair, [0, 1])(progress);
    const z = zoom(p, zoomStart, zoomEnd);
    setTransformer(z);
    // eslint-disable-next-line
  }, [progress]);
  return (
    <div
      className={css`
        position: relative;
      `}
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className={css`
          width: 100%;
          display: block;
        `}
      >
        <g id="view" transform={transformer}>
          <g id="start">
            <image
              x={10}
              y={10}
              width={40}
              height={40}
              href={'https://media.giphy.com/media/10VjiVoa9rWC4M/giphy.gif'}
            ></image>
          </g>
          <g>
            <image
              x={10}
              y={105}
              width={40}
              height={40}
              href={'https://media.giphy.com/media/3TACspcXhhQPK/giphy.gif'}
            ></image>
          </g>
          <g>
            <image
              x={175}
              y={85}
              width={80}
              height={80}
              href={'https://media.giphy.com/media/4ilFRqgbzbx4c/giphy.gif'}
            ></image>
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

export {Grid};

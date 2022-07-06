import {createRoot} from 'react-dom/client';
import './styles/index.scss';
import {css} from '@emotion/css';
import {Slider} from '@mui/material';
import * as d3 from 'd3';
import {transform} from 'framer-motion';
import {useState, useRef, useEffect} from 'react';
import anime from 'animejs/lib/anime.es.js';
const App = () => {
  const width = 300;
  const height = 300;

  const [color, setColor] = useState(`transparent`);
  const [rutsColor, setRutsColor] = useState(`transparent`);

  const handleProgress = (e) => {
    const t = Number(e.target.value);
    const animation = animationRef.current;
    animation.seek(animation.duration * t);
  };

  const animationRef = useRef(null);
  const gDomRef = useRef(null);
  const pathDomRef = useRef(null);
  const circleDomRef = useRef(null);

  useEffect(() => {
    const path = anime.path(pathDomRef.current);
    animationRef.current = anime({
      targets: circleDomRef.current,
      translateX: path('x'),
      translateY: path('y'),
      rotate: path('angle'),
      easing: 'linear',
      duration: 1800,
      autoplay: false,
      loop: false,
      update: function (anim) {
        const p = anim.progress / 100;
        const color = d3.interpolateOranges(transform([0, 1], [0.6, 0.8])(p));
        const rutsColor = d3.interpolateBlues(transform([0, 1], [0.8, 1])(p));
        setColor(color);
        setRutsColor(rutsColor);
      },
      begin: function (anim) {
        console.log(`begin`);
      },
      complete: function (anim) {
        console.log(`complete`);
      },
    });
  }, []);

  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-height: 100vh;
        max-width: 20rem;
        width: 100%;
        margin: 0 auto;
      `}
    >
      <div
        className={css`
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
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid"
        className={css`
          border: 1px solid;
        `}
      >
        <g>
          <path
            ref={pathDomRef}
            stroke={rutsColor}
            fill={'none'}
            strokeWidth={20}
            d="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z"
          />
        </g>
        <circle r="10" fill={color} ref={circleDomRef}></circle>
      </svg>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);

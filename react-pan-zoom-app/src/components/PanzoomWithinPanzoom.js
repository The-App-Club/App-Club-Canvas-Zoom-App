import React, { useEffect, useRef, useState } from 'react';
import Panzoom from '@panzoom/panzoom';
import { Code } from './Code';
import { Demo } from './Demo';

const code = (
  <Code>{`\
const panzoom = Panzoom(elem)
const panzoom2 = Panzoom(child, {
  setTransform: (elem, { x, y, scale }) => {
    // Adjust the panning according to the parent's scale
    const parentScale = panzoom.getScale()
    panzoom2.setStyle(
      'transform',
      \`scale(\${scale}) translate(\${x / parentScale}px, \${y / parentScale}px)\`
    )
  }
})
function adjustScale(zoomIn: boolean) {
  const oldScale = panzoom.getScale()
  if (zoomIn) {
    panzoom.zoomIn()
  } else {
    panzoom.zoomOut()
  }
  const newScale = panzoom.getScale()
  const pan = panzoom2.getPan()
  // Adjust child starting X/Y according the new scale for panning
  panzoom2.pan((pan.x / oldScale) * newScale, (pan.y / oldScale) * newScale, {
    animate: true
  })
}
zoomInButton.addEventListener('click', () => adjustScale(true))
zoomOutButton.addEventListener('click', () => adjustScale(false))
`}</Code>
);

function PanzoomWithinPanzoom({ active }) {
  if (!active) {
    return null;
  }

  const elem = useRef(null);
  const elemTwo = useRef(null);
  const panzoomRef = useRef(null);
  const panzoom2Ref = useRef(null);
  let panzoom = panzoomRef.current;
  let panzoom2 = panzoom2Ref.current;
  useEffect(() => {
    panzoom = panzoomRef.current = Panzoom(elem.current);
    panzoom2 = panzoom2Ref.current = Panzoom(elemTwo.current, {
      setTransform: (_elem, { x, y, scale }) => {
        // Adjust the panning according to the parent's scale
        const parentScale = panzoom.getScale();
        panzoom2.setStyle(
          'transform',
          `scale(${scale}) translate(${x / parentScale}px, ${
            y / parentScale
          }px)`
        );
      },
    });
  }, []);

  function adjustScale(zoomIn) {
    const oldScale = panzoom.getScale();
    if (zoomIn) {
      panzoom.zoomIn();
    } else {
      panzoom.zoomOut();
    }
    const newScale = panzoom.getScale();
    const pan = panzoom2.getPan();
    // Adjust child starting X/Y according the new scale for panning
    panzoom2.pan((pan.x / oldScale) * newScale, (pan.y / oldScale) * newScale, {
      animate: true,
    });
  }
  return (
    <Demo
      title="A Panzoom instance within another Panzoom instance"
      subtitle="With no zooming, this is trivial. However, if you want the parent to zoom, you must account for the parent's scale to pan the child element properly."
      code={code}
    >
      <div className="buttons">
        <button onClick={() => adjustScale(true)}>Zoom In</button>
        <button onClick={() => adjustScale(false)}>Zoom Out</button>
        <button
          onClick={() => {
            panzoom.reset();
            panzoom2.reset();
          }}
        >
          Reset
        </button>
      </div>
      <div className="panzoom-parent">
        <div
          className="panzoom"
          ref={elem}
          style={{
            width: '400px',
            border: '2px dotted',
            margin: '0 auto',
          }}
        >
          <div
            ref={elemTwo}
            style={{
              width: '200px',
              margin: '0 auto',
              padding: 20,
              backgroundColor: '#33DDDD',
              border: '1px solid #000000',
              color: 'black',
              textAlign: 'center',
            }}
          >
            This is a Panzoom element within another Panzoom element. See
            example code for panning within a zoomed parent.
          </div>
          <img
            style={{ width: '100%', height: '100%' }}
            src="./assets/awesome-tiger.svg"
          />
        </div>
      </div>
    </Demo>
  );
}

export { PanzoomWithinPanzoom };

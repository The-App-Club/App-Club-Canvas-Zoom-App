import React, { useEffect, useRef, useState } from 'react';
import Panzoom from '@panzoom/panzoom';
import { Code } from './Code';
import { Demo } from './Demo';

const code = <Code>{`Panzoom(elem, { contain: 'inside' })`}</Code>;

function ContainInside({ active }) {
  if (!active) {
    return null;
  }
  const elem = useRef(null);
  let panzoom;
  useEffect(() => {
    setTimeout(() => {
      panzoom = Panzoom(elem.current, { contain: 'inside' });
    }, 1000);
  }, []);
  return (
    <Demo title="Containment within the parent" code={code}>
      <div className="buttons">
        <label>Try me: </label>
        <button
          onClick={() => {
            panzoom.zoomIn();
          }}
        >
          Zoom in
        </button>
        <button
          onClick={() => {
            panzoom.zoomOut();
          }}
        >
          Zoom out
        </button>
        <button
          onClick={() => {
            panzoom.reset();
          }}
        >
          Reset
        </button>
      </div>
      <div className="panzoom-parent">
        <div
          className="panzoom"
          ref={elem}
          style={{ width: '400px', border: '2px dotted', margin: '0 auto' }}
        >
          <img
            style={{ width: '100%', height: '100%' }}
            src="./assets/awesome-tiger.svg"
          />
        </div>
      </div>
    </Demo>
  );
}
export { ContainInside };

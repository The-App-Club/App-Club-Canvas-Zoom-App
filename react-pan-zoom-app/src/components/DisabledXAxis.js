import React, { useEffect, useRef, useState } from 'react';
import Panzoom from '@panzoom/panzoom';
import { Code } from './Code';
import { Demo } from './Demo';

const code = <Code>{`Panzoom(elem, { disableXAxis: true })`}</Code>;

function DisabledXAxis({ active }) {
  if (!active) {
    return null;
  }

  const elem = useRef(null);
  useEffect(() => {
    Panzoom(elem.current, { disableXAxis: true });
  }, []);
  return (
    <Demo title="Disabling one axis" code={code}>
      <div className="panzoom-parent">
        <div
          className="panzoom"
          ref={elem}
          style={{ width: '400px', margin: '0 auto' }}
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

export { DisabledXAxis };

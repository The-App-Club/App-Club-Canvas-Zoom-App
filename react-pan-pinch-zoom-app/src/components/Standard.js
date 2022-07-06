import React, { Component } from 'react';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

function Standard({ active }) {
  if (!active) {
    return null;
  }

  const handleInit = (e) => {
    console.log(e);
  };

  return (
    // https://github.com/prc5/react-zoom-pan-pinch/blob/master/src/stories/examples/zoom-to-element/example.tsx#L11
    <TransformWrapper
      initialScale={1}
      initialPositionX={200}
      initialPositionY={100}
      onInit={handleInit}
    >
      {({
        centerView,
        instance,
        setTransform,
        state,
        zoomIn,
        zoomOut,
        zoomToElement,
        resetTransform,
      }) => {
        console.log(instance, state);
        return (
          <>
            <div className="tools">
              <button onClick={() => zoomIn()}>+</button>
              <button onClick={() => zoomOut()}>-</button>
              <button onClick={() => resetTransform()}>x</button>
            </div>
            <TransformComponent>
              <img src="./assets/SlackImage.png" alt="SlackImage" />
            </TransformComponent>
          </>
        );
      }}
    </TransformWrapper>
  );
}

export { Standard };

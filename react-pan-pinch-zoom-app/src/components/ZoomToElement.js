import styled from '@emotion/styled';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

function ZoomToElement({ active }) {
  const Element1 = styled.div`
    background-color: red;
    width: 200px;
    height: 400px;
  `;
  const Element2 = styled.div`
    background-color: blue;
    width: 250px;
    height: 150px;
    margin-top: 200px;
    margin-left: 200px;
  `;
  const Element3 = styled.div`
    background-color: green;
    width: 150px;
    height: 150px;
    margin-top: 200px;
    margin-left: 500px;
  `;
  const Button = styled.button`
    padding: 32px;
    background-color: hotpink;
    font-size: 24px;
    border-radius: 4px;
    color: black;
    font-weight: bold;
    &:hover {
      color: white;
    }
  `;

  const ControlButton = styled.button`
    padding: 6px 12px;
    background: white;
    border: 1px solid grey;
    border-radius: 5px;
    margin-right: 10px;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
    &:focus {
      filter: brightness(90%);
    }
    &:hover {
      filter: brightness(120%);
    }
    &:active {
      opacity: 0.9;
    }
  `;

  const Container = styled.div`
    background: #444;
    color: white,
    padding: 50px,
    min-height: 300px;
    width: 100%;
  `;

  if (!active) {
    return null;
  }
  return (
    <TransformWrapper>
      {({ zoomToElement, resetTransform }) => (
        <>
          <ControlButton onClick={() => zoomToElement('element1')}>
            Zoom to element 1
          </ControlButton>
          <ControlButton onClick={() => zoomToElement('element2')}>
            Zoom to element 2
          </ControlButton>
          <ControlButton onClick={() => zoomToElement('element3')}>
            Zoom to element 3
          </ControlButton>
          <ControlButton onClick={() => resetTransform()}>Reset</ControlButton>
          <TransformComponent
            wrapperStyle={{
              maxWidth: '100%',
              maxHeight: 'calc(100vh - 50px)',
            }}
          >
            <Container>
              <Element1 id="element1">Zoom element 1</Element1>
              <Element2 id="element2">Zoom element 2</Element2>
              <Element3 id="element3">Zoom element 3</Element3>
            </Container>
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
}

export { ZoomToElement };

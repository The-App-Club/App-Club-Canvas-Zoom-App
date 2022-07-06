function loadImageDom(publicURL) {
  return new Promise((resolve, reject) => {
    const imageDom = new Image();
    imageDom.crossOrigin = 'anonymous';
    imageDom.onload = (event) => {
      resolve({
        imageDom: imageDom,
        imageDomWidth: imageDom.width,
        imageDomHeight: imageDom.height,
      });
    };
    imageDom.onerror = (event) => {
      reject(event);
    };
    imageDom.src = publicURL;
  });
}

// constants
const ORIGIN = Object.freeze({x: 0, y: 0});
const SQUARE_SIZE = 20;
const ZOOM_SENSITIVITY = 500; // bigger for lower zoom per scroll
const MAX_SCALE = 50;
const MIN_SCALE = 0.1;

const debugDiv = document.getElementById('debug');

// "props"
const initialScale = 0.75;
const initialOffset = {x: 10, y: 20};

let imageDom, imageDomWidth, imageDomHeight;

let canvasDom, canvasDomContext;

// "state"
let mousePos = ORIGIN;
let lastMousePos = ORIGIN;
let offset = initialOffset;
let scale = initialScale;

(async () => {
  const publicURL = './images/SlackImage.png';
  const resultInfo = await loadImageDom(publicURL);
  imageDom = resultInfo.imageDom;
  imageDomWidth = resultInfo.imageDomWidth;
  imageDomHeight = resultInfo.imageDomHeight;

  canvasDom = document.querySelector('canvas');
  canvasDom.width = imageDomWidth * 0.5;
  canvasDom.height = imageDomHeight * 0.5;
  canvasDomContext = canvasDom.getContext('2d');

  function render() {
    window.requestAnimationFrame(() => {
      render();
    });

    // when setting up canvas, set width/height to devicePixelRation times normal

    canvasDomContext.save();
    canvasDomContext.clearRect(
      0,
      0,
      canvasDom.width * window.devicePixelRatio,
      canvasDom.height * window.devicePixelRatio
    );

    // スケール・移動したあとにテクスチャ等をレンダリングする

    // transform coordinates - scale multiplied by devicePixelRatio
    canvasDomContext.scale(
      scale * window.devicePixelRatio,
      scale * window.devicePixelRatio
    );
    canvasDomContext.translate(offset.x, offset.y);

    canvasDomContext.drawImage(
      imageDom,
      0,
      0,
      canvasDom.width,
      canvasDom.height
    );

    debugDiv.innerText = `scale: ${scale}
    mouse: ${JSON.stringify(mousePos)}
    offset: ${JSON.stringify(offset)}
    `;

    canvasDomContext.restore();
  }

  // calculate mouse position on canvas relative to top left canvas point on page
  function calculateMouse(event, canvas) {
    const viewportMousePos = {x: event.pageX, y: event.pageY};
    const boundingRect = canvas.getBoundingClientRect();
    const topLeftCanvasPos = {x: boundingRect.left, y: boundingRect.top};
    return diffPoints(viewportMousePos, topLeftCanvasPos);
  }

  function diffPoints(p1, p2) {
    return {
      x: p1.x - p2.x,
      y: p1.y - p2.y,
    };
  }

  function addPoints(p1, p2) {
    return {
      x: p1.x + p2.x,
      y: p1.y + p2.y,
    };
  }

  function scalePoint(p1, scale) {
    return {x: p1.x / scale, y: p1.y / scale};
  }

  // zoom
  function handleWheel(event) {
    event.preventDefault();

    // update mouse position
    const newMousePos = calculateMouse(event, canvas);
    lastMousePos = mousePos;
    mousePos = newMousePos;

    // calculate new scale/zoom
    const zoom = 1 - event.deltaY / ZOOM_SENSITIVITY;
    const newScale = scale * zoom;
    if (MIN_SCALE > newScale || newScale > MAX_SCALE) {
      return;
    }

    // offset the canvas such that the point under the mouse doesn't move
    const lastMouse = scalePoint(mousePos, scale);
    const newMouse = scalePoint(mousePos, newScale);
    const mouseOffset = diffPoints(lastMouse, newMouse);
    offset = diffPoints(offset, mouseOffset);
    scale = newScale;
  }
  // panning
  function mouseMove(event) {
    // update mouse position
    const newMousePos = calculateMouse(event, canvasDom);
    lastMousePos = mousePos;
    mousePos = newMousePos;
    const mouseDiff = scalePoint(diffPoints(mousePos, lastMousePos), scale);
    offset = addPoints(offset, mouseDiff);
  }
  function mouseUp() {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  }

  function startPan(event) {
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
    // set initial mouse position in case user hasn't moved mouse yet
    mousePos = calculateMouse(event, canvasDom);
  }

  canvasDom.addEventListener('mousedown', startPan);

  canvasDom.addEventListener('wheel', handleWheel);

  render();
})();

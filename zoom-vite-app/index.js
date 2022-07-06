(async () => {
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

  function trackTransforms(canvasDomContext) {
    // canvasをsvgマップに変換しているぽい 滑らかさを追求するとやっぱsvgがいいらしいな
    // https://stackoverflow.com/questions/5189968/zoom-canvas-to-mouse-cursor/5526721#5526721
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let xform = svg.createSVGMatrix();
    canvasDomContext.getTransform = function () {
      return xform;
    };

    let savedTransforms = [];
    let save = canvasDomContext.save;
    canvasDomContext.save = function () {
      savedTransforms.push(xform.translate(0, 0));
      return save.call(canvasDomContext);
    };
    let restore = canvasDomContext.restore;
    canvasDomContext.restore = function () {
      xform = savedTransforms.pop();
      return restore.call(canvasDomContext);
    };

    let scale = canvasDomContext.scale;
    canvasDomContext.scale = function (sx, sy) {
      xform = xform.scaleNonUniform(sx, sy);
      return scale.call(canvasDomContext, sx, sy);
    };
    let rotate = canvasDomContext.rotate;
    canvasDomContext.rotate = function (radians) {
      xform = xform.rotate((radians * 180) / Math.PI);
      return rotate.call(canvasDomContext, radians);
    };
    let translate = canvasDomContext.translate;
    canvasDomContext.translate = function (dx, dy) {
      xform = xform.translate(dx, dy);
      return translate.call(canvasDomContext, dx, dy);
    };
    let transform = canvasDomContext.transform;
    canvasDomContext.transform = function (a, b, c, d, e, f) {
      let m2 = svg.createSVGMatrix();
      m2.a = a;
      m2.b = b;
      m2.c = c;
      m2.d = d;
      m2.e = e;
      m2.f = f;
      xform = xform.multiply(m2);
      return transform.call(canvasDomContext, a, b, c, d, e, f);
    };
    let setTransform = canvasDomContext.setTransform;
    canvasDomContext.setTransform = function (a, b, c, d, e, f) {
      xform.a = a;
      xform.b = b;
      xform.c = c;
      xform.d = d;
      xform.e = e;
      xform.f = f;
      return setTransform.call(canvasDomContext, a, b, c, d, e, f);
    };
    let pt = svg.createSVGPoint();
    canvasDomContext.transformedPoint = function (x, y) {
      pt.x = x;
      pt.y = y;
      return pt.matrixTransform(xform.inverse());
    };
  }

  function redraw() {
    canvasDomContext.save();
    canvasDomContext.setTransform(1, 0, 0, 1, 0, 0);
    canvasDomContext.clearRect(0, 0, canvasDom.width, canvasDom.height);
    canvasDomContext.restore();
    canvasDomContext.drawImage(
      imageDom,
      0,
      0,
      canvasDom.width,
      canvasDom.height
    );
  }

  function handleMouseDown(evt) {
    lastX = evt.offsetX || evt.pageX - canvasDom.offsetLeft;
    lastY = evt.offsetY || evt.pageY - canvasDom.offsetTop;
    dragStart = canvasDomContext.transformedPoint(lastX, lastY);
    dragged = false;
  }

  function handleMouseMove(evt) {
    lastX = evt.offsetX || evt.pageX - canvasDom.offsetLeft;
    lastY = evt.offsetY || evt.pageY - canvasDom.offsetTop;
    dragged = true;
    if (dragStart) {
      const pt = canvasDomContext.transformedPoint(lastX, lastY);
      canvasDomContext.translate(pt.x - dragStart.x, pt.y - dragStart.y);
      redraw();
    }
  }
  function zoom(clicks) {
    const pt = canvasDomContext.transformedPoint(lastX, lastY);
    canvasDomContext.translate(pt.x, pt.y);
    const factor = Math.pow(scaleFactor, clicks);
    canvasDomContext.scale(factor, factor);
    canvasDomContext.translate(-pt.x, -pt.y);
    redraw();
  }

  function handleMouseUp(evt) {
    dragStart = null;
    if (!dragged) {
      zoom(evt.shiftKey ? -1 : 1);
    }
  }
  function handleScroll(evt) {
    const delta = evt.wheelDelta
      ? evt.wheelDelta / 40
      : evt.detail
      ? -evt.detail
      : 0;
    if (delta) {
      zoom(delta);
    }
    return evt.preventDefault() && false;
  }
  const canvasDom = document.querySelector('canvas');
  const skeltonDom = document.querySelector(`.skelton`);
  const canvasDomContext = canvasDom.getContext('2d');
  const defaultPreviewAreaDomWidth = 400;
  // const defaultPreviewAreaDomWidth = 600
  const previewAreaDomWidth = defaultPreviewAreaDomWidth || window.innerWidth;
  // const publicURL =
  //   'https://storage.googleapis.com/b-backet/asset/deer-portrait-3773wx5659h.jpg';
  const publicURL = 'https://storage.googleapis.com/b-backet/asset/deer-landscape-6000wx4000h.jpg';
  const {imageDom, imageDomWidth, imageDomHeight} = await loadImageDom(
    publicURL
  );
  const ratio = previewAreaDomWidth / imageDomWidth;
  canvasDom.width = imageDomWidth * ratio;
  canvasDom.height = imageDomHeight * ratio;
  skeltonDom.style.width = `${imageDomWidth * ratio}px`;
  skeltonDom.style.height = `${imageDomHeight * ratio}px`;
  const scaleFactor = 1.1;
  let lastX = canvasDom.width / 2;
  let lastY = canvasDom.height / 2;
  let dragStart = 0;
  let dragged = 0;
  trackTransforms(canvasDomContext);
  redraw();
  canvasDom.addEventListener('mousedown', handleMouseDown, false);
  canvasDom.addEventListener('mousemove', handleMouseMove, false);
  canvasDom.addEventListener('mouseup', handleMouseUp, false);
  canvasDom.addEventListener('mousewheel', handleScroll, false);
})();

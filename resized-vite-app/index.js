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

function getOrientation(imageDomWidth, imageDomHeight) {
  if (imageDomWidth > imageDomHeight) {
    return `landscape`;
  }
  return `portrait`;
}

function reflectImage2Canvas(
  imageDom,
  imageDomWidth,
  imageDomHeight,
  previewAreaDomWidth,
  previewAreaDomHeight
) {
  const canvasDom = document.querySelector(`.reflector`);
  const canvasDomContext = canvasDom.getContext('2d');
  const adjustedRatio = 0.85;
  const ratio =
    adjustedRatio *
    (getOrientation(imageDomWidth, imageDomHeight) === `landscape`
      ? previewAreaDomWidth / imageDomWidth
      : previewAreaDomHeight / imageDomHeight);

  canvasDom.width = previewAreaDomWidth;
  canvasDom.height = previewAreaDomHeight;

  const resizedImageDomWidth = imageDomWidth * ratio;
  const resizedImageDomHeight = imageDomHeight * ratio;

  const resizedImageDomCenterX = resizedImageDomWidth / 2;
  const resizedImageDomCenterY = resizedImageDomHeight / 2;
  const previewAreaDomCenterX = previewAreaDomWidth / 2;
  const previewAreaDomCenterY = previewAreaDomHeight / 2;

  const deltaParallelMoveX = previewAreaDomCenterX - resizedImageDomCenterX;
  const deltaParallelMoveY = previewAreaDomCenterY - resizedImageDomCenterY;

  canvasDomContext.drawImage(
    imageDom,
    deltaParallelMoveX,
    deltaParallelMoveY,
    imageDomWidth * ratio,
    imageDomHeight * ratio
  );
}

(async () => {
  const {imageDom, imageDomWidth, imageDomHeight} = await loadImageDom(
    `https://storage.googleapis.com/b-backet/asset/lion-landscape-5184wx3456h.jpg`
  );
  // const {imageDom, imageDomWidth, imageDomHeight} = await loadImageDom(`https://storage.googleapis.com/b-backet/asset/cheetah-portrait-2765wx4147h.jpg`);
  reflectImage2Canvas(imageDom, imageDomWidth, imageDomHeight, 800, 600);
})();

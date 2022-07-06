const boxDom = document.querySelector('.box');
const rows = document.querySelectorAll('.box');
// https://developer.mozilla.org/ja/docs/Web/CSS/zoom
const html = document.documentElement;
const handleScroll = (e) => {
  const scrolled = html.scrollTop / (html.scrollHeight - html.clientHeight);

  const total = 1 / rows.length;

  for (let [index, row] of rows.entries()) {
    const start = total * index;
    const end = total * (index + 1);

    let progress = (scrolled - start) / (end - start);

    if (progress !== 1) {
      row.classList.add('is-active');
    }

    if (progress >= 1) {
      row.classList.add('is-active');
      progress = 1;
    }
    if (progress <= 0) {
      row.classList.remove('is-active');
      progress = 0;
    }
    // boxDom.style.zoom = `${progress * 100}%`;
    boxDom.style.transform = `scale(${progress})`;
  }
};

window.addEventListener('scroll', handleScroll);

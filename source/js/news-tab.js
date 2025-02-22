export function initNewsTabScroll() {
  const tabWrapper = document.querySelector('.news__tab-wrapper');

  if (!tabWrapper) {
    return;
  }


  tabWrapper.addEventListener('wheel', (event) => {
    event.preventDefault();
    tabWrapper.scrollLeft += event.deltaY;
  });

  let isDown = false;
  let startX;
  let scrollLeft;

  tabWrapper.addEventListener('mousedown', (event) => {
    isDown = true;
    tabWrapper.classList.add('grabbing');
    startX = event.pageX - tabWrapper.offsetLeft;
    scrollLeft = tabWrapper.scrollLeft;
  });

  tabWrapper.addEventListener('mouseleave', () => {
    isDown = false;
    tabWrapper.classList.remove('grabbing');
  });

  tabWrapper.addEventListener('mouseup', () => {
    isDown = false;
    tabWrapper.classList.remove('grabbing');
  });

  tabWrapper.addEventListener('mousemove', (event) => {
    if (!isDown) {
      return;
    }
    event.preventDefault();
    const x = event.pageX - tabWrapper.offsetLeft;
    const walk = (x - startX) * 2;
    tabWrapper.scrollLeft = scrollLeft - walk;
  });
}

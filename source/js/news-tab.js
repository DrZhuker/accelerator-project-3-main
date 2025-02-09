export function initNewsTabScroll() {
  const tabWrapper = document.querySelector('.news__tab-wrapper');

  if (!tabWrapper) {
    return;
  }

  // Прокрутка колесиком мыши
  tabWrapper.addEventListener('wheel', (event) => {
    event.preventDefault(); // Отменяем стандартный скролл страницы
    tabWrapper.scrollLeft += event.deltaY; // Горизонтальный скролл
  });

  // Прокрутка при зажатой кнопке мыши (drag)
  let isDown = false;
  let startX;
  let scrollLeft;

  tabWrapper.addEventListener('mousedown', (event) => {
    isDown = true;
    tabWrapper.classList.add('grabbing'); // Добавляем класс для смены курсора
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
    const walk = (x - startX) * 2; // Ускоряем скролл
    tabWrapper.scrollLeft = scrollLeft - walk;
  });
}

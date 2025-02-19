export function initHeader() {
  const nav = document.querySelector('.header__nav');
  const menuButton = document.querySelector('.header__menu-button');
  const overlay = document.querySelector('.header__overlay');
  const body = document.body;
  const html = document.documentElement;
  const header = document.querySelector('.header');

  let scrollY = 0;
  let scrollbarWidth = 0;
  let headerWidth = 0;

  // Устанавливаем глобальное ограничение на горизонтальный скролл
  html.style.overflowX = 'hidden'; // Блокируем горизонтальную прокрутку на всю страницу
  body.style.overflowX = 'hidden'; // Блокируем горизонтальную прокрутку на body

  function toggleMenu(open) {
    if (open) {
      // Сохраняем текущую прокрутку страницы и ширину полосы прокрутки
      scrollY = window.scrollY;
      scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      headerWidth = header.offsetWidth; // Сохраняем текущую ширину хедера

      // Блокируем вертикальную прокрутку
      body.style.position = 'fixed'; // Зафиксировать body
      body.style.top = `-${scrollY}px`; // Сохраняем текущую позицию
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';

      body.style.overflow = 'hidden'; // Блокируем вертикальную прокрутку

      // Компенсируем исчезновение вертикальной полосы прокрутки
      body.style.paddingRight = `${scrollbarWidth}px`; // Добавляем отступ, чтобы избежать "прыжка"

      // Устанавливаем фиксированную ширину хедера
      header.style.position = 'fixed'; // Делаем хедер фиксированным
      header.style.width = `${headerWidth}px`; // Фиксируем ширину хедера

    } else {
      // Восстанавливаем прокрутку
      body.style.position = ''; // Восстанавливаем нормальное поведение body
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = ''; // Разрешаем прокрутку

      body.style.paddingRight = ''; // Убираем отступ

      // Восстанавливаем хедер в исходное состояние
      header.style.position = ''; // Возвращаем позицию хедера
      header.style.width = ''; // Возвращаем оригинальную ширину хедера

      // Возвращаем на исходную позицию
      window.scrollTo(0, scrollY);
    }
  }

  menuButton.addEventListener('click', () => {
    const isOpen = !nav.classList.contains('header__nav--open');
    nav.classList.toggle('header__nav--open', isOpen);
    menuButton.classList.toggle('button--alt', isOpen);
    overlay.classList.toggle('header__overlay--active', isOpen);
    toggleMenu(isOpen);
  });

  document.addEventListener('click', (event) => {
    // Проверяем, что клик произошел вне меню и оно открыто
    if (!nav.contains(event.target) && !menuButton.contains(event.target) && nav.classList.contains('header__nav--open')) {
      nav.classList.remove('header__nav--open');
      menuButton.classList.remove('button--alt');
      overlay.classList.remove('header__overlay--active');
      toggleMenu(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    // Проверяем, что клавиша Escape была нажата и меню открыто
    if (event.key === 'Escape' && nav.classList.contains('header__nav--open')) {
      nav.classList.remove('header__nav--open');
      menuButton.classList.remove('button--alt');
      overlay.classList.remove('header__overlay--active');
      toggleMenu(false);
    }
  });
}

export function setupToggle(buttonSelector, listSelector, buttonModifier) {
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector(buttonSelector);
    const list = document.querySelector(listSelector);

    if (button && list) {
      button.addEventListener('click', () => {
        const isOpen = list.classList.toggle('header__nav-list-secondary--open');
        button.classList.toggle(buttonModifier, isOpen);
      });
    }
  });
}

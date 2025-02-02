export function initHeader() {
  const nav = document.querySelector('.header__nav');
  const menuButton = document.querySelector('.header__menu-button');


  menuButton.addEventListener('click', () => {
    nav.classList.toggle('header__nav--open');
    menuButton.classList.toggle('button--alt');
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
      nav.classList.remove('header__nav--open');
      menuButton.classList.remove('button--alt');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      nav.classList.remove('header__nav--open');
      menuButton.classList.remove('button--alt');
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

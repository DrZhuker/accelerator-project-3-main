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

  html.style.overflowX = 'hidden';
  body.style.overflowX = 'hidden';

  function toggleMenu(open) {
    if (open) {
      scrollY = window.scrollY;
      scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      headerWidth = header.offsetWidth;

      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.style.overflow = 'hidden';

      body.style.paddingRight = `${scrollbarWidth}px`;

      header.style.position = 'fixed';
      header.style.width = `${headerWidth}px`;
    } else {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
      body.style.paddingRight = '';

      header.style.position = '';
      header.style.width = '';

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
    if (
      !nav.contains(event.target) &&
      !menuButton.contains(event.target) &&
      nav.classList.contains('header__nav--open')
    ) {
      nav.classList.remove('header__nav--open');
      menuButton.classList.remove('button--alt');
      overlay.classList.remove('header__overlay--active');
      toggleMenu(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('header__nav--open')) {
      nav.classList.remove('header__nav--open');
      menuButton.classList.remove('button--alt');
      overlay.classList.remove('header__overlay--active');
      toggleMenu(false);
    }
  });

  document.querySelectorAll('.header__nav-link[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const targetId = link.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        nav.classList.remove('header__nav--open');
        menuButton.classList.remove('button--alt');
        overlay.classList.remove('header__overlay--active');
        toggleMenu(false);

        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
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

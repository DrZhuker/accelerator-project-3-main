
import { initHeader, setupToggle } from './header.js';

initHeader();
setupToggle('.header__nav-link--programs', '.header__nav-list-secondary--programs', 'header__nav-link--active');
setupToggle('.header__nav-link--news', '.header__nav-list-secondary--news', 'header__nav-link--active');

import { initNewsTabScroll } from './news-tab.js';

document.addEventListener('DOMContentLoaded', () => {
  initNewsTabScroll();
});

import { initSwiper } from './swiper.js';

document.addEventListener('DOMContentLoaded', () => {
  initSwiper();
});

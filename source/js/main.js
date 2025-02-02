// https://swiperjs.com/get-started#installation
// import Swiper from "swiper";
// import {Navigation, Pagination} from "swiper/modules";
// import 'swiper/css';

import { initHeader, setupToggle } from './header.js';

initHeader();
setupToggle('.header__nav-link--programs', '.header__nav-list-secondary--programs', 'header__nav-link--active');
setupToggle('.header__nav-link--news', '.header__nav-list-secondary--news', 'header__nav-link--active');


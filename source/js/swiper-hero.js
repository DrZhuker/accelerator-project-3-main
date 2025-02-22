import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';

let heroSwiper;

function createSwiper() {
  heroSwiper = new Swiper('.hero__slider', {
    modules: [Pagination, Navigation, EffectFade],
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: '.hero__pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return `<button class="hero__pagination-button ${className}" data-index="${index}" type="button">
                  <span class="hero__pagination-button-span"></span>
                  <span class="visually-hidden">${index + 1}</span>
                </button>`;
      }
    },
    allowTouchMove: window.innerWidth < 1440,
  });

  function updatePaginationPosition() {
    const hero = document.querySelector('.hero');
    const activeSlide = document.querySelector('.swiper-slide-active .hero__title');
    const pagination = document.querySelector('.hero__pagination');

    if (!hero || !activeSlide || !pagination) {
      return;
    }

    const heroRect = hero.getBoundingClientRect();
    const titleRect = activeSlide.getBoundingClientRect();
    const titleTransformY = parseFloat(getComputedStyle(activeSlide).transform.split(',')[5]) || 0;
    const newTop = titleRect.top - heroRect.top - pagination.offsetHeight + titleTransformY;

    if (newTop >= 0) {
      pagination.style.position = 'absolute';
      pagination.style.top = `${newTop + 2}px`;
    }
  }

  heroSwiper.on('slideChange', () => {
    requestAnimationFrame(() => {
      updatePaginationPosition();
    });
  });

  heroSwiper.on('init', () => {
    updatePaginationPosition();
  });

  window.addEventListener('resize', () => {
    const isTouchMoveAllowed = window.innerWidth < 1440;

    const activeSlideIndex = heroSwiper.realIndex;

    if ((isTouchMoveAllowed && !heroSwiper.params.allowTouchMove) || (!isTouchMoveAllowed && heroSwiper.params.allowTouchMove)) {
      heroSwiper.destroy(true, true);
      createSwiper();

      heroSwiper.slideTo(activeSlideIndex);
    }

    requestAnimationFrame(() => {
      updatePaginationPosition();
    });
  });

  heroSwiper.init();

  requestAnimationFrame(() => {
    updatePaginationPosition();
  });
}

createSwiper();

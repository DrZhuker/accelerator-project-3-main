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
    loop: true, // Устанавливаем loop в true для бесконечного слайдера
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
    allowTouchMove: window.innerWidth < 1440, // Отключаем перетаскивание при ширине экрана 1440px и больше
  });

  // Функция для обновления позиции пагинации
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

  // Обновляем позицию после смены слайда
  heroSwiper.on('slideChange', () => {
    requestAnimationFrame(() => {
      updatePaginationPosition();
    });
  });

  // Обновляем позицию при инициализации слайдера
  heroSwiper.on('init', () => {
    updatePaginationPosition();
  });

  // Слушатель изменения размера окна
  window.addEventListener('resize', () => {
    const isTouchMoveAllowed = window.innerWidth < 1440;

    // Запоминаем индекс активного слайда перед уничтожением слайдера
    const activeSlideIndex = heroSwiper.realIndex;

    // Если текущая ширина экрана отличается от той, на которой мы инициализировали слайдер, перезапускаем слайдер
    if ((isTouchMoveAllowed && !heroSwiper.params.allowTouchMove) || (!isTouchMoveAllowed && heroSwiper.params.allowTouchMove)) {
      heroSwiper.destroy(true, true); // Уничтожаем текущий слайдер
      createSwiper(); // Перезапускаем слайдер с новыми параметрами

      // Восстанавливаем активный слайд после перезапуска
      heroSwiper.slideTo(activeSlideIndex); // Устанавливаем тот же активный слайд
    }

    // Пересчитываем позицию пагинации при изменении размера
    requestAnimationFrame(() => {
      updatePaginationPosition();
    });
  });

  // Инициализация слайдера
  heroSwiper.init();

  // Обновление позиции пагинации на старте, после инициализации
  requestAnimationFrame(() => {
    updatePaginationPosition();
  });
}

// Инициализируем слайдер
createSwiper();

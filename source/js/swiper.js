import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function initSwiper() {
  const swiperContainer = document.querySelector('.programs__swiper');

  if (!swiperContainer) {
    return null;
  } // Проверяем, есть ли слайдер на странице

  const swiper = new Swiper(swiperContainer, {
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: '.programs__swiper-button-next',
      prevEl: '.programs__swiper-button-prev',
    },
    scrollbar: {
      el: '.programs__swiper-scrollbar',
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    slidesOffsetBefore: 15,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
        slidesOffsetBefore: 0,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 32,
        slidesOffsetBefore: 0,
      },
    },
  });

  // Обновляем кнопки и скроллбар после инициализации
  updateNavigation(swiper);
  updateScrollbar(swiper);

  // Следим за завершением смены слайда
  swiper.on('slideChangeTransitionEnd', () => {
    updateNavigation(swiper);
    updateScrollbar(swiper);
  });

  // Следим за изменением размера окна
  window.addEventListener('resize', () => {
    updateScrollbar(swiper);
  });

  return swiper;
}

// Функция для обновления состояния кнопок
function updateNavigation(swiper) {
  const prevButton = document.querySelector('.programs__swiper-button-prev');
  const nextButton = document.querySelector('.programs__swiper-button-next');

  if (!prevButton || !nextButton) {
    return;
  }

  // Количество всех слайдов
  const totalSlides = swiper.slides.length;
  // Количество видимых слайдов
  const visibleSlides = Math.floor(swiper.params.slidesPerView);
  // Индекс последнего возможного слайда, который можно показать
  const lastPossibleIndex = totalSlides - visibleSlides;

  prevButton.toggleAttribute('disabled', swiper.activeIndex === 0);
  nextButton.toggleAttribute('disabled', swiper.activeIndex >= lastPossibleIndex);
}

// Функция для обновления положения скроллбара
function updateScrollbar(swiper) {
  const scrollbar = document.querySelector('.programs__swiper-scrollbar');
  const scrollButton = document.querySelector('.programs__swiper-scroll-button');

  if (!scrollbar || !scrollButton) {
    return;
  }

  // Количество всех слайдов
  const totalSlides = swiper.slides.length;
  // Количество видимых слайдов
  const visibleSlides = Math.floor(swiper.params.slidesPerView);

  // Ширина скроллбара в зависимости от ширины экрана
  const scrollbarWidth = window.innerWidth >= 1440 ? 1136 : 562; // 1440px и 768px+

  // Ширина кнопки скроллбара пропорциональна количеству слайдов, которое видно
  const buttonWidth = (visibleSlides / totalSlides) * scrollbarWidth;

  scrollButton.style.width = `${buttonWidth}px`;

  // Максимальное смещение скроллбара
  const maxTranslate = scrollbarWidth - buttonWidth;
  // Прогресс скролла
  const progress = swiper.activeIndex / (totalSlides - visibleSlides);
  // Смещение кнопки скроллбар на основе прогресса
  const translateX = maxTranslate * progress;

  // Применяем смещение
  scrollButton.style.transform = `translateX(${translateX}px)`;
}

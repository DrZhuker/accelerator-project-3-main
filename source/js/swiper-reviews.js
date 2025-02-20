import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function initReviewsSwiper() {
  const swiperContainer = document.querySelector('.reviews__swiper');
  if (!swiperContainer) {
    return null;
  } // Проверяем, есть ли слайдер на странице

  const swiper = new Swiper(swiperContainer, {
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: '.reviews__swiper-button--next',
      prevEl: '.reviews__swiper-button--prev',
    },
    scrollbar: {
      el: '.reviews__swiper-scrollbar',
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    slidesOffsetBefore: 15,
    breakpoints: {
      768: {
        slidesPerView: 1.3,
        spaceBetween: 0,
        slidesOffsetBefore: 45,
      },
      1440: {
        slidesPerView: 2,
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

// Обновление кнопок навигации
function updateNavigation(swiper) {
  const prevButton = document.querySelector('.reviews__swiper-button--prev');
  const nextButton = document.querySelector('.reviews__swiper-button--next');
  if (!prevButton || !nextButton) {
    return;
  }
  const totalSlides = swiper.slides.length;
  const visibleSlides = swiper.params.slidesPerView;
  const lastPossibleIndex = totalSlides - Math.floor(visibleSlides);
  prevButton.toggleAttribute('disabled', swiper.activeIndex === 0);
  nextButton.toggleAttribute('disabled', swiper.activeIndex >= lastPossibleIndex);
}

// Обновление скроллбара с учётом количества слайдов и видимой части
function updateScrollbar(swiper) {
  const scrollbar = document.querySelector('.reviews__swiper-scrollbar');
  const scrollButton = document.querySelector('.reviews__swiper-scroll-button');
  if (!scrollbar || !scrollButton) {
    return;
  }

  // Получаем реальные размеры контейнера скроллбара и кнопки
  const scrollbarWidth = scrollbar.clientWidth;
  const buttonWidth = scrollButton.offsetWidth;
  const maxTranslate = scrollbarWidth - buttonWidth;

  // Определяем общее число слайдов и максимально возможный индекс
  const totalSlides = swiper.slides.length;
  const slidesPerView = swiper.params.slidesPerView;
  // Если видимых слайдов больше 1, считаем максимально возможный индекс таким образом,
  // чтобы в конце кнопка точно совпала с правой границей
  const maxIndex = totalSlides - Math.floor(slidesPerView);
  // Ограничиваем activeIndex, если вдруг он выходит за maxIndex
  const currentIndex = Math.min(swiper.activeIndex, maxIndex);

  // Вычисляем прогресс от 0 до 1
  const progress = maxIndex > 0 ? currentIndex / maxIndex : 0;
  const translateX = progress * maxTranslate;

  scrollButton.style.transform = `translateX(${translateX}px)`;
}

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
    observer: true, // Следит за изменениями DOM
    observeParents: true, // Следит за изменениями родительских элементов
    navigation: {
      nextEl: '.programs__swiper-button--next',
      prevEl: '.programs__swiper-button--prev',
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
        slidesPerView: 2.25,
        spaceBetween: 30,
        slidesOffsetBefore: 45,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 32,
        slidesOffsetBefore: 0,
        allowTouchMove: false,
        simulateTouch: false,
      },
    },
  });


  updateNavigation(swiper);
  updateScrollbar(swiper);

  swiper.on('slideChangeTransitionEnd', () => {
    updateNavigation(swiper);
    updateScrollbar(swiper);
  });

  window.addEventListener('resize', () => {
    updateScrollbar(swiper);
  });

  return swiper;
}

function updateNavigation(swiper) {
  const prevButton = document.querySelector('.programs__swiper-button--prev');
  const nextButton = document.querySelector('.programs__swiper-button--next');

  if (!prevButton || !nextButton) {
    return;
  }
  prevButton.toggleAttribute('disabled', swiper.isBeginning);
  nextButton.toggleAttribute('disabled', swiper.isEnd);

  const totalSlides = swiper.slides.length;
  const visibleSlides = Math.floor(swiper.params.slidesPerView);
  const lastPossibleIndex = totalSlides - visibleSlides;

  prevButton.toggleAttribute('disabled', swiper.activeIndex === 0);
  nextButton.toggleAttribute('disabled', swiper.activeIndex >= lastPossibleIndex);
}

function updateScrollbar(swiper) {
  const scrollbar = document.querySelector('.programs__swiper-scrollbar');
  const scrollButton = document.querySelector('.programs__swiper-scroll-button');

  if (!scrollbar || !scrollButton) {
    return;
  }

  const totalSlides = swiper.slides.length;
  const visibleSlides = Math.floor(swiper.params.slidesPerView);

  const scrollbarWidth = window.innerWidth >= 1440 ? 1136 : 562;

  const buttonWidth = (visibleSlides / totalSlides) * scrollbarWidth;

  scrollButton.style.width = `${buttonWidth}px`;

  const maxTranslate = scrollbarWidth - buttonWidth;
  const progress = swiper.activeIndex / (totalSlides - visibleSlides);
  const translateX = maxTranslate * progress;

  scrollButton.style.transform = `translateX(${translateX}px)`;
}

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function initReviewsSwiper() {
  const swiperContainer = document.querySelector('.reviews__swiper');
  if (!swiperContainer) {
    return null;
  }

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
        spaceBetween: 32 ,
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

function updateScrollbar(swiper) {
  const scrollbar = document.querySelector('.reviews__swiper-scrollbar');
  const scrollButton = document.querySelector('.reviews__swiper-scroll-button');
  if (!scrollbar || !scrollButton) {
    return;
  }

  const scrollbarWidth = scrollbar.clientWidth;
  const buttonWidth = scrollButton.offsetWidth;
  const maxTranslate = scrollbarWidth - buttonWidth;

  const totalSlides = swiper.slides.length;
  const slidesPerView = swiper.params.slidesPerView;
  const maxIndex = totalSlides - Math.floor(slidesPerView);
  const currentIndex = Math.min(swiper.activeIndex, maxIndex);

  const progress = maxIndex > 0 ? currentIndex / maxIndex : 0;
  const translateX = progress * maxTranslate;

  scrollButton.style.transform = `translateX(${translateX}px)`;
}

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const heroSwiper = new Swiper('.hero__slider', {
  modules: [Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 0,
  loop: false, // Отключаем свайпы
  pagination: {
    el: '.hero__pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return `<button class="hero__pagination-button ${className}" data-index="${index}" type="button">
                <span class="hero__pagination-button-span"></span>
                <span class="visually-hidden">${index + 1}</span>
              </button>`;
    }
  }
});

// Функция для обновления позиции пагинации
function updatePaginationPosition() {
  const hero = document.querySelector('.hero');
  const title = document.querySelector('.hero__title');
  const pagination = document.querySelector('.hero__pagination');

  if (!hero || !title || !pagination) {
    return;
  }

  // Получаем координаты hero и title относительно окна
  const heroRect = hero.getBoundingClientRect();
  const titleRect = title.getBoundingClientRect();

  console.log('heroRect.top:', heroRect.top); // Позиция hero
  console.log('titleRect.top:', titleRect.top); // Позиция title

  // Вычисляем корректировку по transform для title (если оно используется)
  const titleTransformY = parseFloat(window.getComputedStyle(title).transform.split(',')[5]) || 0;
  console.log('titleTransformY:', titleTransformY);

  // Рассчитываем позицию top для пагинации, чтобы она была непосредственно над заголовком
  const newTop = titleRect.top - heroRect.top - pagination.offsetHeight + titleTransformY;

  console.log('newTop calculated:', newTop);

  // Устанавливаем новую позицию для пагинации
  if (newTop >= 0) {
    pagination.style.position = 'absolute';
    pagination.style.top = `${newTop}px`;
    console.log(`✅ Пагинация обновлена: top = ${newTop}px`);
  } else {
    console.warn(`⚠️ Ошибка расчета: top = ${newTop}px`);
  }
}

// Обновляем позицию при смене слайда
heroSwiper.on('slideChange', () => {
  console.log('Слайд изменен. Пересчитываем позицию пагинации.');
  updatePaginationPosition();
});

// Обновляем позицию при инициализации слайдера
heroSwiper.on('init', () => {
  console.log('Инициализация слайдера. Пересчитываем позицию пагинации.');
  updatePaginationPosition();
});

// Инициализация слайдера
heroSwiper.init();

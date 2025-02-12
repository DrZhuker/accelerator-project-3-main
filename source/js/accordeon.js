document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('faq__item--active');
    });
  });
});

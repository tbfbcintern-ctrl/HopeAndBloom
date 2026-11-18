// Hope and Bloom Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // Form submission handler
  const form = document.getElementById('f');
  const okStatus = document.getElementById('ok');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (okStatus) {
        okStatus.style.display = 'block';
        okStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      form.reset();
    });
  }

  // Setting chips interaction
  const chips = document.querySelectorAll('.chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.style.borderColor = 'var(--line)');
      chip.style.borderColor = 'var(--teal-primary)';
      chip.style.backgroundColor = 'var(--teal-soft)';
    });
  });

  // Floating chat button scrolls to contact form & focuses name input
  const floatingChat = document.querySelector('.floating-chat');
  if (floatingChat) {
    floatingChat.addEventListener('click', (e) => {
      const nameInput = document.getElementById('name');
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 600);
      }
    });
  }

  // Hero image carousel
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
    const previousButton = carousel.querySelector('.carousel-button-prev');
    const nextButton = carousel.querySelector('.carousel-button-next');
    let currentSlide = 0;
    let autoplayId;

    const showSlide = (index) => {
      currentSlide = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('active', slideIndex === currentSlide);
      });
      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === currentSlide;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', String(isActive));
      });
    };

    const stopAutoplay = () => window.clearInterval(autoplayId);
    const startAutoplay = () => {
      stopAutoplay();
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        autoplayId = window.setInterval(() => showSlide(currentSlide + 1), 5000);
      }
    };

    previousButton?.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      startAutoplay();
    });
    nextButton?.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      startAutoplay();
    });
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        startAutoplay();
      });
    });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);
    carousel.addEventListener('touchstart', stopAutoplay, { passive: true });
    carousel.addEventListener('touchend', startAutoplay);

    startAutoplay();
  }
});

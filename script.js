// Hope and Bloom Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // Open the matching details dialog from an About the Center card
  const aboutDetailDialog = document.getElementById('about-detail-dialog');
  if (aboutDetailDialog) {
    const aboutDetails = {
      focus: {
        title: 'Our Focus',
        icon: '🎯',
        summary: 'Individualized, evidence-based developmental and ABA services.',
        points: [
          'Growth plans are shaped around each child and the priorities their family shares.',
          'Play-based activities help children practice communication, imitation, and everyday skills.',
          'Progress is monitored and shared with families in clear, easy-to-understand updates.'
        ]
      },
      approach: {
        title: 'Our Approach',
        icon: '🧸',
        summary: 'Compassionate care, professional excellence, and a nurturing learning environment.',
        points: [
          'Sessions are warm, respectful, and guided by each child’s natural curiosity.',
          'Skills are practiced through games, songs, and familiar daily routines.',
          'Learning goals are broken into achievable steps, with every milestone celebrated.'
        ]
      },
      partners: {
        title: 'Our Partners',
        icon: '🤝',
        summary: 'Children, families, teachers, and qualified professionals.',
        points: [
          'Families help shape their child’s goals and receive practical coaching.',
          'Qualified professionals can work with teachers to support school transitions.',
          'Regular progress updates help everyone stay informed and support consistent learning.'
        ]
      }
    };
    const detailIcon = document.getElementById('about-detail-icon');
    const detailTitle = document.getElementById('about-detail-title');
    const detailSummary = document.getElementById('about-detail-summary');
    const detailPoints = document.getElementById('about-detail-points');
    const closeButton = aboutDetailDialog.querySelector('.about-detail-close');

    document.querySelectorAll('.about-center-card-trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const detail = aboutDetails[trigger.dataset.aboutDetail];
        if (!detail) {
          console.error(`Missing About the Center details for "${trigger.dataset.aboutDetail}".`);
          return;
        }

        const card = trigger.closest('.about-center-card');
        if (!card) {
          console.error('About the Center detail trigger is missing its card.');
          return;
        }

        const cardBounds = card.getBoundingClientRect();
        detailIcon.textContent = detail.icon;
        detailTitle.textContent = detail.title;
        detailSummary.textContent = detail.summary;
        detailPoints.replaceChildren();
        detail.points.forEach((point) => {
          const item = document.createElement('li');
          item.textContent = point;
          detailPoints.append(item);
        });

        aboutDetailDialog.classList.remove('is-opening');
        aboutDetailDialog.showModal();
        const dialogBounds = aboutDetailDialog.getBoundingClientRect();
        aboutDetailDialog.style.setProperty(
          '--origin-x',
          `${cardBounds.left + cardBounds.width / 2 - (dialogBounds.left + dialogBounds.width / 2)}px`
        );
        aboutDetailDialog.style.setProperty(
          '--origin-y',
          `${cardBounds.top + cardBounds.height / 2 - (dialogBounds.top + dialogBounds.height / 2)}px`
        );
        aboutDetailDialog.style.setProperty('--origin-scale-x', String(cardBounds.width / dialogBounds.width));
        aboutDetailDialog.style.setProperty('--origin-scale-y', String(cardBounds.height / dialogBounds.height));
        aboutDetailDialog.classList.add('is-opening');
      });
    });

    closeButton.addEventListener('click', () => aboutDetailDialog.close());
    aboutDetailDialog.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        aboutDetailDialog.close();
      }
    });
    aboutDetailDialog.addEventListener('click', (event) => {
      if (event.target === aboutDetailDialog) {
        aboutDetailDialog.close();
      }
    });
    aboutDetailDialog.addEventListener('animationend', (event) => {
      if (event.target === aboutDetailDialog && event.animationName === 'about-dialog-expand') {
        aboutDetailDialog.classList.remove('is-opening');
      }
    });
    aboutDetailDialog.addEventListener('close', () => {
      aboutDetailDialog.classList.remove('is-opening');
      aboutDetailDialog.style.removeProperty('--origin-x');
      aboutDetailDialog.style.removeProperty('--origin-y');
      aboutDetailDialog.style.removeProperty('--origin-scale-x');
      aboutDetailDialog.style.removeProperty('--origin-scale-y');
    });
  }

  // Hide the sticky navigation while scrolling down and restore it while scrolling up
  const header = document.querySelector('header.top');
  if (header) {
    let previousScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0 || currentScrollY < previousScrollY) {
        header.classList.remove('is-hidden');
      } else if (currentScrollY > previousScrollY && currentScrollY > 80) {
        header.classList.add('is-hidden');
      }

      previousScrollY = currentScrollY;
    }, { passive: true });
  }

  // Show the back-to-top control after scrolling away from the top
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const updateBackToTopVisibility = () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 300);
    };

    window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
    updateBackToTopVisibility();
  }

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

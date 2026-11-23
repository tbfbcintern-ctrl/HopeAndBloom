// Hope and Bloom Interactive Scripts
import { saveDemoInquiry } from './src/inquiries.js';

export function initializeInteractions() {
  const configureDialog = (dialog, onClose) => {
    const closeButton = dialog.querySelector('.about-detail-close');
    if (!closeButton) {
      console.error(`Missing close button for dialog "${dialog.id}".`);
      return null;
    }

    const closeDialog = () => {
      dialog.close();
      onClose?.();
    };

    closeButton.addEventListener('click', closeDialog);
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDialog();
      }
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        closeDialog();
      }
    });
    dialog.addEventListener('animationend', (event) => {
      if (event.target === dialog && event.animationName === 'about-dialog-expand') {
        dialog.classList.remove('is-opening');
      }
    });
    dialog.addEventListener('close', () => {
      dialog.classList.remove('is-opening');
      dialog.style.removeProperty('--origin-x');
      dialog.style.removeProperty('--origin-y');
      dialog.style.removeProperty('--origin-scale-x');
      dialog.style.removeProperty('--origin-scale-y');
    });

    return (origin) => {
      const originBounds = origin.getBoundingClientRect();
      dialog.classList.remove('is-opening');
      dialog.showModal();
      const dialogBounds = dialog.getBoundingClientRect();
      dialog.style.setProperty(
        '--origin-x',
        `${originBounds.left + originBounds.width / 2 - (dialogBounds.left + dialogBounds.width / 2)}px`
      );
      dialog.style.setProperty(
        '--origin-y',
        `${originBounds.top + originBounds.height / 2 - (dialogBounds.top + dialogBounds.height / 2)}px`
      );
      dialog.style.setProperty('--origin-scale-x', String(originBounds.width / dialogBounds.width));
      dialog.style.setProperty('--origin-scale-y', String(originBounds.height / dialogBounds.height));
      dialog.classList.add('is-opening');
    };
  };

  // Open the matching details dialog from an About the Center card
  const aboutDetailDialog = document.getElementById('about-detail-dialog');
  if (aboutDetailDialog) {
    const openAboutDetailDialog = configureDialog(aboutDetailDialog);
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
    if (openAboutDetailDialog) {
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

          detailIcon.textContent = detail.icon;
          detailTitle.textContent = detail.title;
          detailSummary.textContent = detail.summary;
          detailPoints.replaceChildren();
          detail.points.forEach((point) => {
            const item = document.createElement('li');
            item.textContent = point;
            detailPoints.append(item);
          });
          openAboutDetailDialog(card);
        });
      });
    }
  }

  // Collect a home-based support request without storing or sending personal details
  const homeBasedDialog = document.getElementById('home-based-dialog');
  if (homeBasedDialog) {
    const homeBasedTrigger = document.querySelector('.setting-chips [aria-controls="home-based-dialog"]');
    const homeRequestForm = document.getElementById('home-request-form');
    const homeRequestStatus = document.getElementById('home-request-status');

    if (homeBasedTrigger && homeRequestForm && homeRequestStatus) {
      const openHomeBasedDialog = configureDialog(homeBasedDialog, () => {
        homeRequestForm.reset();
        homeRequestStatus.classList.remove('is-visible');
        homeRequestStatus.textContent = '';
      });

      if (openHomeBasedDialog) {
        homeBasedTrigger.addEventListener('click', () => {
          homeRequestStatus.classList.remove('is-visible');
          openHomeBasedDialog(homeBasedTrigger);
        });

        homeRequestForm.addEventListener('submit', (event) => {
          event.preventDefault();
          const guardianName = document.getElementById('home-guardian-name').value.trim();
          homeRequestStatus.textContent = `Thank you, ${guardianName}. Review your details above. This website is not connected to a booking service, so your information has not been sent or saved.`;
          homeRequestStatus.classList.add('is-visible');
          homeRequestStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      }
    } else if (!homeRequestForm || !homeRequestStatus) {
      console.error('The home-based request form is missing a required element.');
    }
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
  const formError = document.getElementById('form-error');
  const formSuccess = document.getElementById('form-success');
  const submitAnotherButton = document.getElementById('submit-another');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      try {
        if (!formSuccess) {
          throw new Error('The confirmation panel is missing from the page.');
        }

        saveDemoInquiry({
          name: String(formData.get('name') || ''),
          email: String(formData.get('email') || ''),
          phone: String(formData.get('phone') || ''),
          program: String(formData.get('program') || ''),
          preferredContact: String(formData.get('preferredContact') || 'either'),
          age: String(formData.get('age') || ''),
          message: String(formData.get('msg') || '')
        });

        form.reset();
        form.hidden = true;
        formSuccess.hidden = false;
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } catch (error) {
        console.error('Unable to save the demo inquiry.', error);
        if (formError) {
          formError.textContent = `Unable to save this demo inquiry: ${error.message}`;
          formError.style.display = 'block';
          formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  }

  submitAnotherButton?.addEventListener('click', () => {
    if (!form || !formSuccess) {
      console.error('The consultation form or confirmation panel is missing.');
      return;
    }

    formSuccess.hidden = true;
    form.hidden = false;
    if (formError) {
      formError.textContent = '';
      formError.style.display = 'none';
    }
    document.getElementById('name')?.focus();
  });

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
}

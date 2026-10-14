(function initLifeMapLanding() {
  'use strict';

  const page = document.getElementById('landing-page');
  const modal = document.getElementById('pre-quiz-modal');
  if (!page || !modal) return;

  const menuButton = page.querySelector('.landing-menu-button');
  const menu = document.getElementById('landing-menu');
  const startQuizButton = document.getElementById('landing-start-quiz');
  const nav = page.querySelector('[data-landing-nav]');
  const carouselSlides = Array.from(modal.querySelectorAll('[data-carousel-slide]'));
  const carouselDots = Array.from(modal.querySelectorAll('[data-carousel-dot]'));
  const carouselBackButton = modal.querySelector('[data-carousel-back]');
  const carouselNextButton = modal.querySelector('[data-carousel-next]');
  const carouselStatus = document.getElementById('pre-quiz-slide-status');
  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  let lastFocusedElement = null;
  let activeSlide = 0;

  /**
   * Analytics bridge. The landing works with no analytics provider.
   * Future integrations can listen for "lifemap:analytics" or define
   * window.dataLayer without changing CTA code.
   */
  window.trackLifeMapEvent = window.trackLifeMapEvent || function trackLifeMapEvent(eventName, detail) {
    const payload = Object.assign({
      event: eventName,
      path: window.location.pathname,
      timestamp: new Date().toISOString()
    }, detail || {});

    window.dispatchEvent(new CustomEvent('lifemap:analytics', { detail: payload }));
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
  };

  function closeMenu() {
    if (!menuButton || !menu) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'เปิดเมนู');
    menu.classList.remove('is-open');
  }

  function showCarouselSlide(index, moveFocus) {
    const nextIndex = Math.max(0, Math.min(index, carouselSlides.length - 1));
    activeSlide = nextIndex;

    carouselSlides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeSlide;
      slide.hidden = !isActive;
      slide.classList.toggle('is-active', isActive);
    });

    carouselDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeSlide;
      dot.classList.toggle('is-active', isActive);
      if (isActive) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
    });

    if (carouselBackButton) carouselBackButton.hidden = activeSlide === 0;
    if (carouselNextButton) carouselNextButton.hidden = activeSlide === carouselSlides.length - 1;
    if (startQuizButton) startQuizButton.hidden = activeSlide !== carouselSlides.length - 1;
    if (carouselStatus) carouselStatus.textContent = `ขั้นที่ ${activeSlide + 1} จาก ${carouselSlides.length}`;

    if (moveFocus) {
      const activeHeading = carouselSlides[activeSlide] && carouselSlides[activeSlide].querySelector('h3');
      if (activeHeading) {
        activeHeading.setAttribute('tabindex', '-1');
        activeHeading.focus();
      }
    }
  }

  function openModal(trigger) {
    lastFocusedElement = trigger || document.activeElement;
    closeMenu();
    showCarouselSlide(0, false);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('landing-modal-open');
    window.trackLifeMapEvent('pre_quiz_modal_open');
    const closeButton = modal.querySelector('.landing-modal__close');
    window.requestAnimationFrame(() => closeButton && closeButton.focus());
  }

  function closeModal() {
    if (!modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('landing-modal-open');
    if (lastFocusedElement && document.contains(lastFocusedElement)) lastFocusedElement.focus();
  }

  function trapModalFocus(event) {
    if (event.key !== 'Tab' || !modal.classList.contains('is-open')) return;
    const focusable = Array.from(modal.querySelectorAll(focusableSelector)).filter((element) => {
      return element.offsetParent !== null && element.getAttribute('aria-hidden') !== 'true';
    });
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function enterExistingFlow() {
    window.trackLifeMapEvent('quiz_start_click');
    closeModal();
    document.body.classList.remove('landing-active');
    page.setAttribute('hidden', '');
    window.scrollTo({ top: 0, behavior: 'auto' });

    const existingStartButton = document.getElementById('btn-welcome-explore');
    if (existingStartButton) {
      existingStartButton.click();
      window.requestAnimationFrame(() => {
        const onboarding = document.getElementById('view-onboarding');
        const firstControl = onboarding && onboarding.querySelector('input, button, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstControl) firstControl.focus();
      });
    } else {
      document.body.classList.add('landing-active');
      page.removeAttribute('hidden');
      openModal(startQuizButton);
      console.error('LifeMap landing could not find the existing quiz entry point.');
    }
  }

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'เปิดเมนู' : 'ปิดเมนู');
      menu.classList.toggle('is-open', !isOpen);
    });
  }

  page.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  page.querySelectorAll('[data-open-quiz-modal]').forEach((button) => {
    button.addEventListener('click', () => openModal(button));
  });

  modal.querySelectorAll('[data-close-quiz-modal]').forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  if (carouselNextButton) carouselNextButton.addEventListener('click', () => showCarouselSlide(activeSlide + 1, true));
  if (carouselBackButton) carouselBackButton.addEventListener('click', () => showCarouselSlide(activeSlide - 1, true));
  carouselDots.forEach((dot) => {
    dot.addEventListener('click', () => showCarouselSlide(Number(dot.dataset.carouselDot), true));
  });

  if (startQuizButton) startQuizButton.addEventListener('click', enterExistingFlow);

  const onboardingBackButton = document.getElementById('btn-onboarding-back');
  if (onboardingBackButton) {
    onboardingBackButton.addEventListener('click', () => {
      document.body.classList.add('landing-active');
      page.removeAttribute('hidden');
      window.scrollTo({ top: 0, behavior: 'auto' });
      window.requestAnimationFrame(() => {
        const primaryCta = page.querySelector('.landing-hero [data-open-quiz-modal]');
        if (primaryCta) primaryCta.focus();
      });
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      event.preventDefault();
      closeModal();
      return;
    }
    if (modal.classList.contains('is-open') && event.key === 'ArrowRight' && activeSlide < carouselSlides.length - 1) {
      event.preventDefault();
      showCarouselSlide(activeSlide + 1, true);
      return;
    }
    if (modal.classList.contains('is-open') && event.key === 'ArrowLeft' && activeSlide > 0) {
      event.preventDefault();
      showCarouselSlide(activeSlide - 1, true);
      return;
    }
    trapModalFocus(event);
  });

  page.addEventListener('click', (event) => {
    const tracked = event.target.closest('[data-track]');
    if (tracked) window.trackLifeMapEvent(tracked.dataset.track);
  });

  if (nav) {
    const updateNavState = () => nav.classList.toggle('is-scrolled', window.scrollY > 12);
    updateNavState();
    window.addEventListener('scroll', updateNavState, { passive: true });
  }

  window.trackLifeMapEvent('landing_view');
})();

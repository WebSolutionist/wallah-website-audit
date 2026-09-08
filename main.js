/* ==========================================================================
   THE WEB SOLUTIONIST — INTERACTIVE ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initTypewriterEngine();
  initScrollRevealObserver();
  initWorkbenchTabs();
  initModalSystem();
  initMobileDockObserver();
});

/* 1. Header Blur on Scroll */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* 2. Realistic Typewriter & Delete-Back (Retract) Engine */
function initTypewriterEngine() {
  const textElement = document.getElementById('typewriter-text');
  if (!textElement) return;

  const phrases = [
    'WORKING FOR YOUR BUSINESS?',
    'CAPTURING REAL LEADS?',
    'SAVING YOU HOURS OF MANUAL WORK?'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeSpeed = 55;        // Speed of typing each letter
  const deleteSpeed = 30;      // Speed of backspacing/retracting
  const holdDuration = 2500;   // Pause duration when phrase completes

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      // Type next character
      textElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        // Hold full phrase
        isDeleting = true;
        setTimeout(typeLoop, holdDuration);
        return;
      }
    } else {
      // Retract/Delete back character
      textElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        // Move to next phrase after deletion completes
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(typeLoop, isDeleting ? deleteSpeed : typeSpeed);
  }

  // Start engine
  typeLoop();
}

/* 3. Dynamic Scroll Reveal Observer */
function initScrollRevealObserver() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve after revealing for smooth performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* 3. Workbench Tab Switcher (What I Turn Problems Into) */
function initWorkbenchTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(`tab-${targetTab}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}

/* 4. Application Modal System (Option A & Option 1 Integration) */
function initModalSystem() {
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const modalOverlayList = document.querySelectorAll('.modal-overlay');

  // Open modal
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-open-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        resetModalViews(modal);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal via backdrop or close buttons
  modalOverlayList.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-close')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => resetModalViews(modal), 300);
      }
    });
  });

  // Form 1: Initiative 01 (5 Free Websites - Option A: Intake -> Success Card with WhatsApp Button)
  const formWebsite = document.getElementById('form-website-apply');
  if (formWebsite) {
    formWebsite.addEventListener('submit', (e) => {
      e.preventDefault();
      const formView = document.getElementById('modal-website-form-view');
      const successView = document.getElementById('modal-website-success-view');

      if (formView && successView) {
        formView.style.display = 'none';
        successView.style.display = 'block';
        formWebsite.reset();
      }
    });
  }

  // Form 2: Initiative 02 (10 Free Diagnoses - Option 1: Intake -> Calendly Redirect)
  const formDiagnosis = document.getElementById('form-diagnosis-request');
  if (formDiagnosis) {
    formDiagnosis.addEventListener('submit', (e) => {
      e.preventDefault();
      const modal = document.getElementById('modal-diagnosis');
      
      // Open Calendly link in a new tab
      window.open('https://calendly.com/wallahwaijiprecious/30min', '_blank');

      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
      formDiagnosis.reset();
    });
  }

  // Form 3: General Contact / Conversation
  const formContact = document.getElementById('form-contact');
  if (formContact) {
    formContact.addEventListener('submit', (e) => {
      e.preventDefault();
      const modal = document.getElementById('modal-contact');
      alert('Thank you! Your message has been sent. Precious will contact you shortly.');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
      formContact.reset();
    });
  }
}

function resetModalViews(modal) {
  const formView = modal.querySelector('#modal-website-form-view');
  const successView = modal.querySelector('#modal-website-success-view');
  if (formView && successView) {
    formView.style.display = 'block';
    successView.style.display = 'none';
  }
}

/* 5. Mobile Dock Navigation Observer */
function initMobileDockObserver() {
  const sections = document.querySelectorAll('section[id]');
  const dockLinks = document.querySelectorAll('.dock-link[href^="#"]');

  if (!sections.length || !dockLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        dockLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

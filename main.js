/* ==========================================================================
   THE WEB SOLUTIONIST — INTERACTIVE ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initHeroProblemMatrix();
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

/* 2. Hero Interactive Problem-to-Solution Matrix */
function initHeroProblemMatrix() {
  const problemChips = document.querySelectorAll('.problem-chip');
  const problemStepTitle = document.getElementById('matrix-problem-title');
  const problemStepDesc = document.getElementById('matrix-problem-desc');
  const thinkStepTitle = document.getElementById('matrix-think-title');
  const thinkStepDesc = document.getElementById('matrix-think-desc');
  const solutionStepTitle = document.getElementById('matrix-solution-title');
  const solutionStepDesc = document.getElementById('matrix-solution-desc');

  const problemData = {
    'low-conversion': {
      problemTitle: 'High Traffic, Zero Leads',
      problemDesc: 'Visitors leave without taking action due to mixed messaging and lack of trust.',
      thinkTitle: 'Friction & Clarity Analysis',
      thinkDesc: 'Map real user drop-off points, strip fluff, and isolate the exact barrier to conversion.',
      solutionTitle: 'Strategic Conversion Engine',
      solutionDesc: 'High-speed website rebuilt around clear positioning, proof, and single-focus CTAs.'
    },
    'manual-chaos': {
      problemTitle: 'Manual Client Onboarding',
      problemDesc: 'Spending 5+ hours weekly answering repetitive inquiries and manually collecting data.',
      thinkTitle: 'Workflow Automation Mapping',
      thinkDesc: 'Identify repetitive touchpoints and build automated intake & routing rules.',
      solutionTitle: 'Digital Portal & Automation',
      solutionDesc: 'Self-service client portal with automated CRM syncing and instant scheduling.'
    },
    'no-website': {
      problemTitle: 'No Professional Web Presence',
      problemDesc: 'Operating solely on social media; losing high-ticket clients who demand credibility.',
      thinkTitle: 'Core Value Positioning',
      thinkDesc: 'Extract your core offer and define why you are the obvious choice.',
      solutionTitle: 'High-Impact Brand Website',
      solutionDesc: 'A fast, high-converting 1-page site that establishes immediate market authority.'
    },
    'ai-support': {
      problemTitle: 'Customer Support Bottlenecks',
      problemDesc: 'Support inbox flooded with basic questions, delaying response times for real leads.',
      thinkTitle: 'Knowledge Integration',
      thinkDesc: 'Train custom AI agent on business FAQs, services, and qualifying logic.',
      solutionTitle: 'Intelligent AI Concierge',
      solutionDesc: 'AI chatbot embedded on website to qualify visitors and book calls 24/7.'
    }
  };

  problemChips.forEach(chip => {
    chip.addEventListener('click', () => {
      // Toggle active chip
      problemChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const key = chip.getAttribute('data-problem');
      const data = problemData[key];

      if (!data) return;

      // Animate matrix content updates
      const matrix = document.querySelector('.blueprint-matrix');
      if (matrix) matrix.style.opacity = '0.7';

      setTimeout(() => {
        if (problemStepTitle) problemStepTitle.textContent = data.problemTitle;
        if (problemStepDesc) problemStepDesc.textContent = data.problemDesc;
        if (thinkStepTitle) thinkStepTitle.textContent = data.thinkTitle;
        if (thinkStepDesc) thinkStepDesc.textContent = data.thinkDesc;
        if (solutionStepTitle) solutionStepTitle.textContent = data.solutionTitle;
        if (solutionStepDesc) solutionStepDesc.textContent = data.solutionDesc;

        if (matrix) matrix.style.opacity = '1';
      }, 150);
    });
  });
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

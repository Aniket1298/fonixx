// ===================================
// FONIXX CONSULTANCY - MAIN SCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initNavigation();
  initScrollAnimations();
  initFormValidation();
});

// === NAVIGATION ===
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i') || mobileToggle;
      if (navMenu.classList.contains('active')) {
        icon.textContent = '✕';
      } else {
        icon.textContent = '☰';
      }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.querySelector('i').textContent = '☰';
      });
    });
  }

  // Set active link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  const elements = document.querySelectorAll('.card, .section-title, .hero-content');
  elements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// === FORM VALIDATION ===
function initFormValidation() {
  const form = document.querySelector('.contact-form');
  
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const phone = form.querySelector('[name="phone"]');
    const service = form.querySelector('[name="service"]');
    const message = form.querySelector('[name="message"]');
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Validate name
    if (!name.value.trim()) {
      showError(name, 'Name is required');
      isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      showError(email, 'Email is required');
      isValid = false;
    } else if (!emailRegex.test(email.value)) {
      showError(email, 'Please enter a valid email');
      isValid = false;
    }
    
    // Validate phone
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phone.value.trim()) {
      showError(phone, 'Phone is required');
      isValid = false;
    } else if (!phoneRegex.test(phone.value)) {
      showError(phone, 'Please enter a valid phone number');
      isValid = false;
    }
    
    // Validate service
    if (!service.value) {
      showError(service, 'Please select a service');
      isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
      showError(message, 'Message is required');
      isValid = false;
    }
    
    if (isValid) {
      // Show success message
      showSuccessMessage(form);
      // Reset form
      form.reset();
    }
  });
}

function showError(input, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.color = '#ff6b6b';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '0.25rem';
  errorDiv.textContent = message;
  input.parentElement.appendChild(errorDiv);
  input.style.borderColor = '#ff6b6b';
  
  // Reset border color on input
  input.addEventListener('input', () => {
    input.style.borderColor = '';
    errorDiv.remove();
  });
}

function showSuccessMessage(form) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.style.cssText = `
    background: linear-gradient(135deg, #D4AF37 0%, #F0D878 100%);
    color: #000;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
    text-align: center;
    font-weight: 600;
    animation: fadeInUp 0.5s ease;
  `;
  successDiv.textContent = '✓ Thank you! We will contact you soon.';
  form.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.style.animation = 'fadeOut 0.5s ease';
    setTimeout(() => successDiv.remove(), 500);
  }, 5000);
}

// === UTILITY FUNCTIONS ===
// Add loading animation on page transition
window.addEventListener('beforeunload', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease';
});

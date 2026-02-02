// ===========================
// PRELOADER
// ===========================
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  const mainWebsite = document.getElementById('main-website');
  
  // Hide preloader and show main website after 2.5 seconds
  setTimeout(function() {
    preloader.classList.add('fade-out');
    mainWebsite.classList.add('show');
    
    // Remove preloader from DOM after fade out
    setTimeout(function() {
      preloader.style.display = 'none';
    }, 500);
  }, 2500); // 2.5 seconds total (reduced from 3.5)
});

// ===========================
// TYPING ANIMATION
// ===========================
const professions = [
  'Dev Kumar Karmacharya'
];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function type() {
  const typingElement = document.getElementById('typing-text');
  
  // Check if element exists
  if (!typingElement) {
    return;
  }

  const currentProfession = professions[professionIndex];

  if (isDeleting) {
    typingElement.textContent = currentProfession.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentProfession.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeedVar = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && charIndex === currentProfession.length) {
    typeSpeedVar = pauseTime;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    professionIndex = (professionIndex + 1) % professions.length;
    typeSpeedVar = 500;
  }

  setTimeout(type, typeSpeedVar);
}

// ===========================
// THEME TOGGLE (WITH LOCALSTORAGE)
// ===========================
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  
  if (!themeIcon) {
    console.error('Theme icon element not found');
    return;
  }
  
  if (body.getAttribute('data-theme') === 'dark') {
    body.removeAttribute('data-theme');
    themeIcon.className = 'fas fa-moon';
    localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
    themeIcon.className = 'fas fa-sun';
    localStorage.setItem('theme', 'dark');
  }
}

// Load saved theme on page load
function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  
  if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    if (themeIcon) {
      themeIcon.className = 'fas fa-sun';
    }
  } else {
    body.removeAttribute('data-theme');
    if (themeIcon) {
      themeIcon.className = 'fas fa-moon';
    }
  }
}

// ===========================
// MOBILE MENU TOGGLE
// ===========================
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  
  if (!navLinks) {
    return;
  }
  
  navLinks.classList.toggle('mobile-active');
}

function closeMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  
  if (!navLinks) {
    return;
  }
  
  navLinks.classList.remove('mobile-active');
}

// ===========================
// ACTIVE NAVIGATION HIGHLIGHT
// ===========================
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (sections.length === 0 || navLinks.length === 0) {
    return;
  }

  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ===========================
// SMOOTH SCROLL
// ===========================
function setupSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  
  anchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      // Close mobile menu when navigation link is clicked
      closeMobileMenu();
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===========================
// INTERSECTION OBSERVER
// ===========================
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Observe all sections except hero
  const sections = document.querySelectorAll('.section:not(.hero)');
  sections.forEach(section => {
    observer.observe(section);
  });
}

// ===========================
// FORM SUBMISSION HANDLER
// ===========================
function setupFormHandler() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Don't prevent default - let Formspree handle the submission
      // Just show a loading state and clear form after a delay
      const submitBtn = this.querySelector('button[type="submit"]');
      const form = this;
      
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
      }
      
      // Clear form after submission (small delay to ensure submission goes through)
      setTimeout(() => {
        form.reset();
        if (submitBtn) {
          submitBtn.innerHTML = 'Send Message';
          submitBtn.disabled = false;
        }
      }, 1000);
    });
  }
}

// ===========================
// SIMPLE CONTACT FORM SUCCESS
// ===========================
function handleFormSuccess() {
  // Check if user came back from successful form submission
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('success') === 'true' && window.location.hash === '#contact') {
    // Clear the form first
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.reset();
    }
    
    // Show success message
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const successDiv = document.createElement('div');
      successDiv.className = 'form-success-simple';
      successDiv.innerHTML = `
        <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 25px; border-radius: 15px; text-align: center; margin: 30px 0; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);">
          <i class="fas fa-check-circle" style="font-size: 40px; margin-bottom: 15px; color: white;"></i>
          <h4 style="margin: 15px 0 10px 0; font-size: 22px; font-weight: 700;">Message Sent Successfully!</h4>
          <p style="margin: 0; font-size: 16px; opacity: 0.9;">Thank you for reaching out. I'll get back to you within 24 hours.</p>
        </div>
      `;
      
      // Insert after the section title
      const sectionTitle = contactSection.querySelector('.section-title');
      if (sectionTitle) {
        sectionTitle.insertAdjacentElement('afterend', successDiv);
      }
      
      // Remove success message after 8 seconds
      setTimeout(() => {
        successDiv.remove();
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname + '#contact');
      }, 8000);
    }
  }
}

// ===========================
// BACK TO TOP BUTTON
// ===========================
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function toggleQuickAccess() {
  const quickAccess = document.getElementById('quickAccess');
  
  if (!quickAccess) {
    return;
  }
  
  quickAccess.classList.toggle('active');
}

function toggleBackToTopButton() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (!backToTopBtn) {
    return;
  }
  
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
}

// ===========================
// ENHANCED FORM HANDLING
// ===========================
function setupEnhancedFormHandler() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Add input validation and styling
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      // Add focus and blur effects
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        if (!this.value) {
          this.parentElement.classList.remove('focused');
        }
      });
      
      // Real-time validation
      input.addEventListener('input', function() {
        if (this.checkValidity()) {
          this.classList.remove('invalid');
          this.classList.add('valid');
        } else {
          this.classList.remove('valid');
          this.classList.add('invalid');
        }
      });
    });
    
    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const successMessage = document.getElementById('successMessage');
      const formData = new FormData(this);
      
      // Show loading state
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
      }
      
      // Submit to Formspree
      fetch('https://formspree.io/f/mwvqnbnr', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Show success message
          successMessage.style.display = 'block';
          successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Clear form
          this.reset();
          inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
            input.parentElement.classList.remove('focused');
          });
          
          // Hide success message after 8 seconds
          setTimeout(() => {
            successMessage.style.display = 'none';
          }, 8000);
          
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        alert('Sorry, there was an error sending your message. Please try again or contact me directly via email.');
      })
      .finally(() => {
        // Reset button
        if (submitBtn) {
          submitBtn.innerHTML = 'Send Message';
          submitBtn.disabled = false;
        }
      });
    });
  }
}

// ===========================
// SCROLL PROGRESS INDICATOR
// ===========================
function updateScrollProgress() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  // You can add a progress bar here if needed
  document.documentElement.style.setProperty('--scroll-progress', scrollPercent + '%');
}

// ===========================
// LAZY LOADING IMAGES
// ===========================
function setupLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

// ===========================
// KEYBOARD NAVIGATION
// ===========================
function setupKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu and quick access
    if (e.key === 'Escape') {
      closeMobileMenu();
      const quickAccess = document.getElementById('quickAccess');
      if (quickAccess) {
        quickAccess.classList.remove('active');
      }
    }
    
    // Enter key on theme toggle
    if (e.key === 'Enter' && e.target.classList.contains('theme-toggle')) {
      toggleTheme();
    }
  });
  
  // Click outside to close mobile menu and quick access menu
  document.addEventListener('click', function(e) {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const quickAccess = document.getElementById('quickAccess');
    
    // Close mobile menu if clicking outside
    if (navLinks && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      closeMobileMenu();
    }
    
    // Close quick access menu if clicking outside
    if (quickAccess && !quickAccess.contains(e.target)) {
      quickAccess.classList.remove('active');
    }
  });
}

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
  updateActiveNav();
  toggleBackToTopButton();
  updateScrollProgress();
}, 10);

// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  // Load saved theme
  loadSavedTheme();

  // Start typing animation after a delay
  setTimeout(() => {
    type();
  }, 1000);

  // Setup smooth scroll
  setupSmoothScroll();

  // Setup intersection observer for animations
  setupIntersectionObserver();

  // Setup enhanced form handler
  setupEnhancedFormHandler();

  // Setup lazy loading
  setupLazyLoading();

  // Setup keyboard navigation
  setupKeyboardNavigation();

  // Add scroll event listener with debouncing
  window.addEventListener('scroll', debouncedScrollHandler);

  // Initial calls
  updateActiveNav();
  toggleBackToTopButton();
});

// ===========================
// ERROR HANDLING
// ===========================
window.addEventListener('error', function(e) {
  console.error('An error occurred:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
});

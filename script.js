// ===========================
// TYPING ANIMATION
// ===========================
const professions = ['Dev kumar karmacharya'];
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
// THEME TOGGLE (IN-MEMORY)
// ===========================
let currentTheme = 'light';

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
    currentTheme = 'light';
  } else {
    body.setAttribute('data-theme', 'dark');
    themeIcon.className = 'fas fa-sun';
    currentTheme = 'dark';
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
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };
      
      // Log form data (in production, you'd send this to a server)
      console.log('Form submitted with data:', data);
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      
      // Reset form
      this.reset();
    });
  }
}

// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme icon
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.className = 'fas fa-moon';
  }

  // Start typing animation after a delay
  setTimeout(() => {
    type();
  }, 1000);

  // Setup smooth scroll
  setupSmoothScroll();

  // Setup intersection observer for animations
  setupIntersectionObserver();

  // Setup form handler
  setupFormHandler();

  // Add scroll event listener
  window.addEventListener('scroll', updateActiveNav);

  // Initial call to set active nav
  updateActiveNav();
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
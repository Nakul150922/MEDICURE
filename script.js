// ========== NAVIGATION FUNCTIONALITY ==========

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
navToggle.addEventListener('click', function() {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  if (navMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  if (!navbar.contains(event.target)) {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling for anchor links
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Only handle internal links
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Active link highlighting based on scroll position
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const correspondingLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      // Remove active class from all links
      navLinks.forEach(link => link.classList.remove('active'));
      // Add active class to current link
      if (correspondingLink) {
        correspondingLink.classList.add('active');
      }
    }
  });
});

// ========== ANIMATION EFFECTS ==========

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.service-card, .doctor-card, .testimonial-card');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// ========== FORM VALIDATION ==========

// Contact form validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('#name').value.trim();
    const email = this.querySelector('#email').value.trim();
    const message = this.querySelector('#message').value.trim();
    
    if (!name || !email || !message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    this.reset();
  });
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ========== NOTIFICATION SYSTEM ==========

function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#e53e3e' : '#667eea'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
    font-weight: 500;
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 300);
    }
  }, 5000);
}

// ========== PERFORMANCE OPTIMIZATIONS ==========

// Debounce function for scroll events
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

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
  // Navbar scroll effect
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Scroll to top button visibility
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if (scrollToTopBtn) {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  }
  
  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const correspondingLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (correspondingLink) {
        correspondingLink.classList.add('active');
      }
    }
  });
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Scroll to top functionality
const scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========== ACCESSIBILITY ENHANCEMENTS ==========

// Keyboard navigation for mobile menu
navToggle.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    this.click();
  }
});

// Focus management for mobile menu
navMenu.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
    navToggle.focus();
  }
});

// ========== INITIALIZATION ==========

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set initial active state for home link
  const homeLink = document.querySelector('.nav-menu a[href="#home"]');
  if (homeLink && window.scrollY < 100) {
    homeLink.classList.add('active');
  }
  
  // Handle loading screen - show for 2 seconds
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    // Hide loading screen after 2 seconds
    setTimeout(function() {
      loadingScreen.classList.add('hidden');
      // Remove from DOM after transition
      setTimeout(function() {
        if (loadingScreen.parentNode) {
          loadingScreen.parentNode.removeChild(loadingScreen);
        }
      }, 500);
    }, 2000);
  }

  // Ripple effect for all .btn elements
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
});

// ========== UTILITY FUNCTIONS ==========

// Smooth scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ========== ABOUT STATS COUNT-UP ANIMATION ==========
function animateCount({el, bar, target, duration, formatFn}) {
  let startTime = null;
  const barMaxWidth = 100; // percent
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = progress * target;
    el.textContent = formatFn ? formatFn(value) : Math.floor(value);
    if (bar) bar.style.width = (progress * barMaxWidth) + '%';
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = formatFn ? formatFn(target) : target;
      if (bar) bar.style.width = barMaxWidth + '%';
    }
  }
  requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', function() {
  // About stats animation
  const yearsCount = document.getElementById('yearsCount');
  const yearsBar = document.getElementById('yearsBar');
  const appointmentsCount = document.getElementById('appointmentsCount');
  const appointmentsBar = document.getElementById('appointmentsBar');
  const satisfactionCount = document.getElementById('satisfactionCount');
  const satisfactionBar = document.getElementById('satisfactionBar');
  const doctorsCount = document.getElementById('doctorsCount');
  const doctorsBar = document.getElementById('doctorsBar');
  const aboutStats = document.querySelector('.about-stats');
  let statsAnimated = false;

  if (aboutStats && yearsCount && appointmentsCount && satisfactionCount && doctorsCount) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          animateCount({
            el: yearsCount,
            bar: yearsBar,
            target: 10,
            duration: 1000,
            formatFn: v => Math.round(v)
          });
          animateCount({
            el: appointmentsCount,
            bar: appointmentsBar,
            target: 100000,
            duration: 1800,
            formatFn: v => Math.floor(v).toLocaleString()
          });
          animateCount({
            el: satisfactionCount,
            bar: satisfactionBar,
            target: 4.9,
            duration: 1200,
            formatFn: v => v.toFixed(1)
          });
          animateCount({
            el: doctorsCount,
            bar: doctorsBar,
            target: 1000,
            duration: 1200,
            formatFn: v => Math.floor(v).toLocaleString()
          });
          statsAnimated = true;
          obs.disconnect();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(aboutStats);
  }
});

// ========== ADVANCED BOOKING WIZARD INTERACTIVITY ==========

document.addEventListener('DOMContentLoaded', function() {
  // Animate wizard step transitions (slide/fade)
  const wizardSteps = document.querySelectorAll('.wizard-step');
  let lastStep = 1;
  window.showStep = function(step) {
    wizardSteps.forEach((el, idx) => {
      if (idx === step - 1) {
        el.classList.add('active');
        el.style.animation = (step > lastStep) ? 'fadeInUp 0.7s' : 'fadeIn 0.7s';
      } else {
        el.classList.remove('active');
        el.style.animation = '';
      }
    });
    // Animate vertical progress indicator
    const icons = document.querySelectorAll('.wizard-step-icon');
    icons.forEach((icon, idx) => {
      if (idx < step) {
        icon.classList.add('active');
      } else {
        icon.classList.remove('active');
      }
    });
    lastStep = step;
  };

  // Floating help button logic
  const helpBtn = document.querySelector('.booking-help-btn');
  if (helpBtn) {
    let helpModal = document.getElementById('bookingHelpModal');
    if (!helpModal) {
      helpModal = document.createElement('div');
      helpModal.id = 'bookingHelpModal';
      helpModal.className = 'modal';
      helpModal.innerHTML = `
        <div class="modal-content">
          <h3>Need Help?</h3>
          <ul style="text-align:left; margin-bottom:1.5rem;">
            <li>Fill all required fields to proceed to the next step.</li>
            <li>Use the vertical progress bar to track your booking journey.</li>
            <li>Hover or tap on step icons for more info.</li>
            <li>For urgent queries, contact <a href='mailto:info@medicure.com'>info@medicure.com</a>.</li>
          </ul>
          <button class="btn btn-primary" onclick="document.getElementById('bookingHelpModal').style.display='none'">Close</button>
        </div>
      `;
      document.body.appendChild(helpModal);
    }
    helpBtn.addEventListener('click', function() {
      helpModal.style.display = 'flex';
    });
  }

  // Floating label input focus glow
  document.querySelectorAll('.floating-label input, .floating-label select, .floating-label textarea').forEach(input => {
    input.addEventListener('focus', function() {
      this.style.boxShadow = '0 0 0 3px #667eea44';
      this.style.borderColor = '#667eea';
    });
    input.addEventListener('blur', function() {
      this.style.boxShadow = '';
      this.style.borderColor = '';
    });
  });
});

// Export functions for global use
window.MediCure = {
  showNotification,
  scrollToTop,
  isInViewport
}; 
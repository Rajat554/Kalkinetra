// ========================================
// KALKINETRA JOINS / COLLABORATE PAGE
// Cleaned: No Navbar | No Background Effects
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const offset = 100;
        const targetPosition = target.offsetTop - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ========================================
  // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
  // ========================================
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all animated elements
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));
  
  // ========================================
  // CARD TILT EFFECT (DESKTOP ONLY)
  // ========================================
  if (window.innerWidth > 768) {
    const cards = document.querySelectorAll('.feature-card, .collab-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });
      
      card.addEventListener('mouseleave', function() {
        card.style.transform = '';
      });
    });
  }
  
  // ========================================
  // FORM HANDLING
  // ========================================
  const form = document.querySelector('.join-form');
  const emailInput = document.getElementById('email');
  const submitButton = form?.querySelector('.btn-submit');
  
  if (form) {
    // Email validation
    emailInput?.addEventListener('blur', function() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.value) && this.value !== '') {
        this.style.borderColor = '#ff4444';
        
        if (!this.parentElement.querySelector('.error-message')) {
          const errorMsg = document.createElement('small');
          errorMsg.className = 'error-message';
          errorMsg.style.color = '#ff4444';
          errorMsg.style.display = 'block';
          errorMsg.style.marginTop = '0.5rem';
          errorMsg.textContent = 'Please enter a valid email address';
          this.parentElement.appendChild(errorMsg);
        }
      } else {
        this.style.borderColor = 'rgba(0, 102, 255, 0.2)';
        const errorMsg = this.parentElement.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
      }
    });
    
    // Character counter for textarea
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
      messageTextarea.addEventListener('input', function() {
        const charCount = this.value.length;
        
        if (!this.parentElement.querySelector('.char-count')) {
          const counter = document.createElement('small');
          counter.className = 'char-count';
          counter.style.cssText = 'color: var(--color-text-muted); float: right; margin-top: 0.5rem; font-size: 0.875rem;';
          this.parentElement.appendChild(counter);
        }
        
        const counterElement = this.parentElement.querySelector('.char-count');
        counterElement.textContent = `${charCount} characters`;
        
        if (charCount > 500) {
          counterElement.style.color = 'var(--color-secondary)';
        }
      });
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate all required fields
      const requiredFields = this.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#ff4444';
          setTimeout(() => {
            field.style.borderColor = 'rgba(0, 102, 255, 0.2)';
          }, 2000);
        }
      });
      
      if (isValid) {
        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          organization: document.getElementById('organization').value,
          interest: document.getElementById('interest').value,
          message: document.getElementById('message').value
        };
        
        console.log('Form submitted:', formData);
        showLoadingState(submitButton);
        
        // Reset form after successful submission
        setTimeout(() => {
          this.reset();
          const charCounter = this.querySelector('.char-count');
          if (charCounter) charCounter.remove();
        }, 2000);
      } else {
        showNotification('Please fill in all required fields', 'error');
      }
    });
  }
  
  // ========================================
  // LOADING STATE FOR SUBMIT BUTTON
  // ========================================
  function showLoadingState(button) {
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Submitting...';
    button.style.opacity = '0.7';
    
    setTimeout(() => {
      button.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Submitted!';
      button.style.background = 'rgba(0, 255, 136, 0.2)';
      
      setTimeout(() => {
        button.disabled = false;
        button.innerHTML = originalText;
        button.style.opacity = '1';
        button.style.background = '';
      }, 2000);
    }, 1500);
  }
  
  // ========================================
  // NOTIFICATION SYSTEM
  // ========================================
  function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    
    const icon = type === 'success' ? 'check-circle-fill' : 
                 type === 'error' ? 'exclamation-circle-fill' : 
                 'info-circle-fill';
    
    notification.innerHTML = `
      <i class="bi bi-${icon} me-2"></i>
      <span>${message}</span>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('style[data-notification]')) {
      const notificationStyles = document.createElement('style');
      notificationStyles.setAttribute('data-notification', 'true');
      notificationStyles.textContent = `
        .custom-notification {
          position: fixed;
          top: 100px;
          right: 20px;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          border: 1px solid rgba(0, 102, 255, 0.3);
          box-shadow: 0 10px 40px rgba(0, 102, 255, 0.3);
          display: flex;
          align-items: center;
          z-index: 10000;
          transform: translateX(400px);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 0.95rem;
          font-weight: 500;
        }
        
        .custom-notification.show {
          transform: translateX(0);
          opacity: 1;
        }
        
        .custom-notification.success {
          border-color: rgba(0, 255, 136, 0.5);
        }
        
        .custom-notification.error {
          border-color: rgba(255, 100, 100, 0.5);
        }
        
        .custom-notification i {
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .custom-notification {
            right: 10px;
            left: 10px;
            top: 80px;
          }
        }
      `;
      document.head.appendChild(notificationStyles);
    }
    
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }
  
  // ========================================
  // PARALLAX EFFECT FOR GLOW ELEMENTS
  // ========================================
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const glows = document.querySelectorAll('.glow-effect');
    
    glows.forEach((glow, index) => {
      const speed = 0.3 + (index * 0.1);
      const yPos = -(scrolled * speed);
      glow.style.transform = `translateY(${yPos}px)`;
    });
  });
  
  // ========================================
  // BUTTON RIPPLE EFFECT
  // ========================================
  function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.classList.add('ripple');
    
    if (!document.querySelector('style[data-ripple]')) {
      const rippleStyle = document.createElement('style');
      rippleStyle.setAttribute('data-ripple', 'true');
      rippleStyle.textContent = `
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          animation: ripple-animation 0.6s ease-out;
          pointer-events: none;
        }
        
        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(rippleStyle);
    }
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }
  
  const buttons = document.querySelectorAll('.btn-primary-cta, .btn-outline-cta, .btn-submit');
  buttons.forEach(button => {
    button.addEventListener('click', createRipple);
  });
  
  // ========================================
  // MAGNETIC EFFECT FOR BUTTONS (Desktop Only)
  // ========================================
  if (window.innerWidth > 768) {
    const magneticButtons = document.querySelectorAll('.btn-primary-cta, .btn-outline-cta, .btn-submit');
    
    magneticButtons.forEach(button => {
      button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.15;
        const moveY = y * 0.15;
        
        this.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
      
      button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
      });
    });
  }
  
  // ========================================
  // DYNAMIC PAGE TITLE ON BLUR
  // ========================================
  const originalTitle = document.title;
  
  // window.addEventListener('blur', function() {
  //   document.title = '👋 Come back! - ' + originalTitle;
  // });
  
  window.addEventListener('focus', function() {
    document.title = originalTitle;
  });
  
  // ========================================
  // CONSOLE BRANDING
  // ========================================
  console.log('%c🔒 KalkiNetra - AI Security Research Lab', 'color: #0066ff; font-size: 20px; font-weight: bold;');
  console.log('%cJoin/Collaborate Page', 'color: #3388ff; font-size: 14px;');
  console.log('%cInterested in joining? Fill out the form!', 'color: #1a75ff; font-size: 12px;');
  
  // ========================================
  // PREFETCH LINKS ON HOVER
  // ========================================
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('mouseenter', function() {
      const href = this.getAttribute('href');
      
      if (href && href.endsWith('.html') && !href.startsWith('http')) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        document.head.appendChild(prefetchLink);
      }
    });
  });
  
  // ========================================
  // PERFORMANCE MONITORING
  // ========================================
  window.addEventListener('load', function() {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    console.log('Page Load Time:', pageLoadTime + 'ms');
    
    if (pageLoadTime > 3000) {
      console.warn('Page load time is high. Consider optimizing assets.');
    }
  });
  
  // ========================================
  // LAZY LOAD IMAGES
  // ========================================
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }
  
  // ========================================
  // ADD LOADED CLASS TO BODY
  // ========================================
  document.body.classList.add('page-loaded');
  
  console.log('✅ Collaborate page initialized successfully');
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ========================================
// EASTER EGG - KONAMI CODE
// ========================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  // Keep only last 10 keys
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.join('') === konamiSequence.join('')) {
    document.body.style.animation = 'rainbow 2s infinite';
    
    // Add rainbow animation if not exists
    if (!document.querySelector('style[data-rainbow]')) {
      const rainbowStyle = document.createElement('style');
      rainbowStyle.setAttribute('data-rainbow', 'true');
      rainbowStyle.textContent = `
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `;
      document.head.appendChild(rainbowStyle);
    }
    
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

// ========================================
// END OF FILE
// ========================================
// ========================================
// KALKINETRA INSIGHTS PAGE SCRIPT
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
  // ARTICLE CARD TILT EFFECT (Desktop Only)
  // ========================================
  const articleCards = document.querySelectorAll('.article-card');
  
  if (window.innerWidth > 768) {
    articleCards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
      });
      
      card.addEventListener('mouseleave', function() {
        card.style.transform = '';
      });
    });
  }
  
  // ========================================
  // NEWSLETTER FORM HANDLING
  // ========================================
  const newsletterForm = document.querySelector('.newsletter-form');
  const emailInput = newsletterForm?.querySelector('input[type="email"]');
  const subscribeBtn = newsletterForm?.querySelector('.btn-subscribe');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = emailInput.value.trim();
      
      if (email && isValidEmail(email)) {
        // Disable button and show loading state
        subscribeBtn.disabled = true;
        subscribeBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Subscribing...';
        
        // Simulate API call
        setTimeout(() => {
          // Success state
          subscribeBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Subscribed!';
          subscribeBtn.style.background = 'linear-gradient(135deg, #00ff88, #0066ff)';
          
          // Reset form
          emailInput.value = '';
          
          // Show success message
          showNotification('Successfully subscribed! Check your email for confirmation.', 'success');
          
          // Reset button after delay
          setTimeout(() => {
            subscribeBtn.disabled = false;
            subscribeBtn.innerHTML = 'Subscribe <i class="bi bi-send-fill ms-2"></i>';
            subscribeBtn.style.background = '';
          }, 3000);
        }, 1500);
      } else {
        showNotification('Please enter a valid email address.', 'error');
        emailInput.focus();
      }
    });

    // Email validation on input
    emailInput?.addEventListener('input', function() {
      if (this.value && !isValidEmail(this.value)) {
        this.style.borderColor = 'rgba(255, 100, 100, 0.5)';
      } else {
        this.style.borderColor = '';
      }
    });
  }

  // Email validation helper
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  // ========================================
  // NOTIFICATION SYSTEM
  // ========================================
  function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    
    const icon = type === 'success' ? 'check-circle-fill' : 
                 type === 'error' ? 'exclamation-circle-fill' : 
                 'info-circle-fill';
    
    notification.innerHTML = `
      <i class="bi bi-${icon}"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto remove after 4 seconds
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
  
  const buttons = document.querySelectorAll('.btn-subscribe, .article-link, .insight-link');
  buttons.forEach(button => {
    button.addEventListener('click', createRipple);
  });
  
  // ========================================
  // ARTICLE LINK CLICK TRACKING
  // ========================================
  const articleLinks = document.querySelectorAll('.article-link, .insight-link');
  
  articleLinks.forEach(link => {
    link.addEventListener('click', function() {
      const articleTitle = this.closest('.article-card, .insight-item')?.querySelector('.article-title, .insight-title')?.textContent;
      console.log('Article clicked:', articleTitle);
    });
  });
  
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
  console.log('%cInsights Page', 'color: #3388ff; font-size: 14px;');
  console.log('%cExplore our latest thoughts on AI security', 'color: #1a75ff; font-size: 12px;');
  
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
  // ADD LOADED CLASS TO BODY
  // ========================================
  document.body.classList.add('page-loaded');
  
  console.log('✅ Insights page initialized successfully');
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
// SMOOTH CARD LINK TRANSITIONS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const cardLinks = document.querySelectorAll('.article-link, .insight-link');
  
  cardLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'translateX(5px)';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'translateX(0)';
      }
    });
  });
});

// ========================================
// LAZY LOAD IMAGES
// ========================================
document.addEventListener('DOMContentLoaded', function() {
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
});

// ========================================
// END OF FILE
// ========================================


// ========================================
// ARTICLES & NEWSLETTER INTERACTIONS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // SCROLL ANIMATIONS
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
  // ARTICLE CARDS HOVER EFFECT
  // ========================================
  const articleCards = document.querySelectorAll('.article-card');
  
  articleCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });
  
  // ========================================
  // NEWSLETTER FORM SUBMISSION
  // ========================================
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const submitBtn = this.querySelector('.btn-subscribe');
      const email = emailInput.value;
      
      // Validate email
      if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }
      
      // Disable button during submission
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Subscribing...';
      
      // Simulate API call (replace with your actual API endpoint)
      setTimeout(() => {
        // Success
        submitBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Subscribed!';
        submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00c896)';
        emailInput.value = '';
        
        showNotification('Successfully subscribed! Check your email for confirmation.', 'success');
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Subscribe <i class="bi bi-send-fill ms-2"></i>';
          submitBtn.style.background = '';
        }, 3000);
        
      }, 1500);
    });
  }
  
  // Email validation
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Notification system
  function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.custom-notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `custom-notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="bi bi-${type === 'success' ? 'check-circle-fill' : 'exclamation-circle-fill'} me-2"></i>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
  
  // Add notification styles
  if (!document.querySelector('style[data-notification-styles]')) {
    const style = document.createElement('style');
    style.setAttribute('data-notification-styles', 'true');
    style.textContent = `
      .custom-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        border: 1px solid rgba(0, 102, 255, 0.4);
        border-radius: 12px;
        padding: 1rem 1.5rem;
        z-index: 9999;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 40px rgba(0, 102, 255, 0.3);
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s ease;
      }
      
      .custom-notification.show {
        transform: translateX(0);
        opacity: 1;
      }
      
      .notification-content {
        display: flex;
        align-items: center;
        color: #ffffff;
        font-size: 0.95rem;
        font-weight: 500;
      }
      
      .notification-success {
        border-color: rgba(0, 255, 136, 0.4);
        box-shadow: 0 10px 40px rgba(0, 255, 136, 0.3);
      }
      
      .notification-success i {
        color: #00ff88;
      }
      
      .notification-error {
        border-color: rgba(255, 68, 102, 0.4);
        box-shadow: 0 10px 40px rgba(255, 68, 102, 0.3);
      }
      
      .notification-error i {
        color: #ff4466;
      }
      
      @media (max-width: 768px) {
        .custom-notification {
          right: 15px;
          left: 15px;
          top: 80px;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // ========================================
  // COUNTER ANIMATION FOR STATS
  // ========================================
  function animateCounter(element, target, suffix = '') {
    let startTime = null;
    const duration = 2000;
    const startValue = 0;
    
    function updateCounter(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const currentValue = Math.floor(progress * (target - startValue) + startValue);
      element.textContent = currentValue + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + suffix;
      }
    }
    
    requestAnimationFrame(updateCounter);
  }
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text = entry.target.textContent.trim();
        
        if (text.includes('+')) {
          const num = parseInt(text.replace('+', ''));
          animateCounter(entry.target, num, '+');
        } else if (text.includes('%')) {
          const num = parseInt(text.replace('%', ''));
          animateCounter(entry.target, num, '%');
        }
        
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const statNumbers = document.querySelectorAll('.newsletter-stats .stat-number');
  statNumbers.forEach(stat => statsObserver.observe(stat));
  
  // ========================================
  // ARTICLE CARD CLICK TO OPEN LINK
  // ========================================
  articleCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't trigger if clicking the link directly
      if (e.target.closest('.article-link')) return;
      
      const link = this.querySelector('.article-link');
      if (link) {
        link.click();
      }
    });
  });
  
  // ========================================
  // PARALLAX EFFECT FOR CURVED BACKGROUND
  // ========================================
  const curvedBg = document.querySelector('.curved-bg');
  
  if (curvedBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const bgRect = curvedBg.getBoundingClientRect();
      
      // Only apply parallax when section is in view
      if (bgRect.top < window.innerHeight && bgRect.bottom > 0) {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        
        // Apply subtle parallax to pseudo-elements
        curvedBg.style.setProperty('--parallax-y', `${yPos * 0.3}px`);
      }
    });
  }
  
  // ========================================
  // EMAIL INPUT FOCUS EFFECT
  // ========================================
  const emailInput = document.querySelector('.newsletter-form input[type="email"]');
  
  if (emailInput) {
    emailInput.addEventListener('focus', function() {
      this.parentElement.style.transform = 'scale(1.02)';
    });
    
    emailInput.addEventListener('blur', function() {
      this.parentElement.style.transform = 'scale(1)';
    });
  }
  
  // ========================================
  // RIPPLE EFFECT ON BUTTONS
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
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }
  
  // Add ripple styles
  if (!document.querySelector('style[data-ripple]')) {
    const rippleStyle = document.createElement('style');
    rippleStyle.setAttribute('data-ripple', 'true');
    rippleStyle.textContent = `
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
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
  
  const subscribeBtn = document.querySelector('.btn-subscribe');
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', createRipple);
  }
  
  // ========================================
  // ARTICLE CARD TILT EFFECT (DESKTOP ONLY)
  // ========================================
  if (window.innerWidth > 768) {
    articleCards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateY(-15px)
        `;
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
  }
  
  // ========================================
  // KEYBOARD NAVIGATION
  // ========================================
  const focusableElements = document.querySelectorAll(
    '.article-link, .btn-subscribe, input[type="email"]'
  );
  
  focusableElements.forEach(element => {
    element.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        if (this.tagName === 'A' || this.tagName === 'BUTTON') {
          this.click();
        }
      }
    });
  });
  
  // ========================================
  // LAZY LOAD OPTIMIZATION
  // ========================================
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          lazyObserver.unobserve(entry.target);
        }
      });
    });
    
    articleCards.forEach(card => lazyObserver.observe(card));
  }
  
  // ========================================
  // CONSOLE BRANDING
  // ========================================
  console.log(
    '%c📰 Articles & Newsletter Loaded',
    'color: #0066ff; font-size: 16px; font-weight: bold;'
  );
  console.log(
    '%cStay informed about AI security threats',
    'color: #3388ff; font-size: 12px;'
  );
  
  // ========================================
  // PERFORMANCE MONITORING
  // ========================================
  window.addEventListener('load', function() {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    if (pageLoadTime > 3000) {
      console.warn('Page load time is high:', pageLoadTime + 'ms');
    }
  });
  
  console.log('✅ Articles & Newsletter section initialized successfully');
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

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

// Smooth scroll to element
function smoothScrollTo(element, offset = 0) {
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}
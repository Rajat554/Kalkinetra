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
  
  window.addEventListener('blur', function() {
    document.title = '👋 Come back! - ' + originalTitle;
  });
  
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
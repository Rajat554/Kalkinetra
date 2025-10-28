// ========================================
// KALKINETRA INSIGHTS PAGE - JAVASCRIPT
// Animation & Interaction Controller
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // SCROLL REVEAL ANIMATIONS
  // ========================================
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll('.animate-on-scroll, .slide-from-left, .slide-from-right, .fade-in');
  animatedElements.forEach(el => observer.observe(el));

  // ========================================
  // ARTICLE CARD ANIMATIONS
  // ========================================
  
  const articleCards = document.querySelectorAll('.article-card');
  
  articleCards.forEach((card, index) => {
    // Stagger the initial reveal
    setTimeout(() => {
      card.classList.add('visible');
    }, index * 200);

    // Add magnetic mouse effect
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      const rotateX = deltaY * 5;
      const rotateY = deltaX * -5;

      card.style.transform = `translateY(-15px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
    });
  });

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
          subscribeBtn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
          
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
      <i class="bi bi-${icon} me-2"></i>
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

  // Add notification styles dynamically
  const notificationStyles = document.createElement('style');
  notificationStyles.textContent = `
    .custom-notification {
      position: fixed;
      top: 100px;
      right: 20px;
      background: linear-gradient(135deg, rgba(10, 10, 10, 0.95), rgba(0, 153, 204, 0.2));
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      border: 1px solid rgba(0, 212, 255, 0.3);
      backdrop-filter: blur(20px);
      box-shadow: 0 10px 40px rgba(0, 212, 255, 0.3);
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

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#' && href !== '#login') {
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 80;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ========================================
  // NAVBAR SCROLL EFFECT
  // ========================================
  
  const navbar = document.querySelector('.glass-navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.style.padding = '0.5rem 0';
      navbar.style.background = 'rgba(0, 0, 0, 0.95)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 212, 255, 0.25)';
    } else {
      navbar.style.padding = '';
      navbar.style.background = '';
      navbar.style.boxShadow = '';
    }

    lastScroll = currentScroll;
  });

  // ========================================
  // PARALLAX EFFECT FOR GLOW ELEMENTS
  // ========================================
  
  const glowElements = document.querySelectorAll('.glow-effect');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    glowElements.forEach((glow, index) => {
      const speed = 0.3 + (index * 0.1);
      const yPos = -(scrolled * speed);
      glow.style.transform = `translateY(${yPos}px)`;
    });
  });

  // ========================================
  // CURSOR GLOW EFFECT
  // ========================================
  
  const createCursorGlow = () => {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      
      requestAnimationFrame(animateGlow);
    }
    
    animateGlow();
  };

  // Add cursor glow styles
  const cursorStyles = document.createElement('style');
  cursorStyles.textContent = `
    .cursor-glow {
      position: fixed;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.08), transparent 60%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease;
      opacity: 0;
    }
    
    body:hover .cursor-glow {
      opacity: 1;
    }

    @media (max-width: 1024px) {
      .cursor-glow {
        display: none;
      }
    }
  `;
  document.head.appendChild(cursorStyles);
  
  // Only create cursor glow on desktop
  if (window.innerWidth > 1024) {
    createCursorGlow();
  }

  // ========================================
  // ARTICLE LINK CLICK TRACKING
  // ========================================
  
  const articleLinks = document.querySelectorAll('.article-link, .insight-link');
  
  articleLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const articleTitle = this.closest('.article-card, .insight-item')?.querySelector('.article-title, .insight-title')?.textContent;
      
      // Add ripple effect
      const ripple = document.createElement('span');
      ripple.className = 'link-ripple';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
      
      console.log('Article clicked:', articleTitle);
    });
  });

  // Add ripple styles
  const rippleStyles = document.createElement('style');
  rippleStyles.textContent = `
    .link-ripple {
      position: absolute;
      width: 20px;
      height: 20px;
      background: rgba(0, 212, 255, 0.5);
      border-radius: 50%;
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyles);

  // ========================================
  // PERFORMANCE OPTIMIZATION
  // ========================================
  
  // Lazy load images if any
  const lazyImages = document.querySelectorAll('img[data-src]');
  
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

  // ========================================
  // CONSOLE EASTER EGG
  // ========================================
  
  console.log('%c🔒 KalkiNetra Research Lab', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
  console.log('%cInterested in AI Security? Visit: https://kalkinetra.com', 'color: #5ce1ff; font-size: 14px;');
  console.log('%cWe\'re always looking for talented researchers!', 'color: #00ffff; font-size: 12px;');

  // ========================================
  // INITIALIZATION COMPLETE
  // ========================================
  
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
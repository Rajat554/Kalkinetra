// ========================================
// SOLUTIONS PAGE - CLEANED JAVASCRIPT
// KalkiNetra Theme (No Navbar | No Background Effects)
// ========================================

// ========================================
// MAIN APPLICATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // SMOOTH SCROLL
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
  // COUNTER ANIMATION
  // ========================================
  
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }
  
  // Intersection Observer for counters
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
  });
  
  // ========================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ========================================
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Add specific animation classes
        if (entry.target.classList.contains('intro-content')) {
          entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
        if (entry.target.classList.contains('timeline-item')) {
          entry.target.style.animation = 'fadeInLeft 0.8s ease-out forwards';
        }
        if (entry.target.classList.contains('access-content')) {
          entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
        if (entry.target.classList.contains('closing-content')) {
          entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
        
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  document.querySelectorAll('.intro-content, .access-content, .closing-content').forEach(el => {
    fadeObserver.observe(el);
  });

  // Separate observer for timeline items
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animate', 'animated');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
  });
  
  // Solution cards observer - prevent multiple triggers
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animate', 'animated');
        entry.target.style.animationPlayState = 'running';
        cardObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.solution-card').forEach(card => {
    cardObserver.observe(card);
  });
  
  // ========================================
  // MODAL FUNCTIONALITY
  // ========================================
  
  const modal = document.getElementById('requestModal');
  const modalClose = document.getElementById('modalClose');
  const requestForm = document.getElementById('requestForm');
  
  // Open modal when clicking "Request Access" buttons
  document.querySelectorAll('.btn-request').forEach(btn => {
    btn.addEventListener('click', function() {
      const solution = this.getAttribute('data-solution');
      const solutionSelect = document.getElementById('solution');
      
      if (solutionSelect) {
        solutionSelect.value = solution;
      }
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  // Close modal when clicking outside
  modal?.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeModal();
    }
  });
  
  // Handle form submission
  if (requestForm) {
    requestForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        solution: document.getElementById('solution').value,
        message: document.getElementById('message').value
      };
      
      console.log('Form submitted:', formData);
      
      // Show success message
      alert('Thank you for your interest! We will contact you shortly.');
      
      // Reset form and close modal
      requestForm.reset();
      closeModal();
      
      // Here you would typically send the data to your backend
      // Example:
      // fetch('/api/request-access', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
    });
  }
  
  // ========================================
  // BACK TO TOP BUTTON
  // ========================================
  
  const backToTop = document.getElementById('backToTop');
  
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // ========================================
  // CARD HOVER EFFECTS (3D TILT)
  // ========================================
  if (window.innerWidth > 768) {
    const cards = document.querySelectorAll('.solution-card, .timeline-content, .benefit-item');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease';
      });
      
      card.addEventListener('mousemove', function(e) {
        if (!this.classList.contains('animated')) return;
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transition = 'transform 0.5s ease';
        this.style.transform = 'none';
      });
    });
  }
  
  // ========================================
  // PARALLAX EFFECT ON SCROLL
  // ========================================
  const handleParallax = throttle(function() {
    const scrolled = window.pageYOffset;
    
    // Parallax for particles only
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      const speed = 0.3 + (index % 3) * 0.1;
      const yPos = -(scrolled * speed);
      particle.style.transform = `translateY(${yPos}px)`;
    });
  }, 16);

  window.addEventListener('scroll', handleParallax, { passive: true });
  
  // ========================================
  // PROGRESSIVE IMAGE LOADING
  // ========================================
  
  const images = document.querySelectorAll('img[data-src]');
  
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
  
  images.forEach(img => imageObserver.observe(img));
  
  // ========================================
  // TYPING EFFECT FOR HERO SUBTITLE
  // ========================================
  
  function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }
  
  // Optional: Uncomment to enable typing effect
  // const heroSubtitle = document.querySelector('.hero-subtitle');
  // if (heroSubtitle) {
  //   const originalText = heroSubtitle.textContent;
  //   setTimeout(() => {
  //     typeWriter(heroSubtitle, originalText, 30);
  //   }, 2000);
  // }
  
  // ========================================
  // CARD INTERACTION TRACKING
  // ========================================
  
  const solutionCards = document.querySelectorAll('.solution-card');
  
  solutionCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const solutionNumber = this.getAttribute('data-solution');
      console.log(`User viewing solution ${solutionNumber}`);
    });
  });
  
  // ========================================
  // DYNAMIC YEAR IN FOOTER
  // ========================================
  
  const currentYear = new Date().getFullYear();
  const copyrightElement = document.querySelector('.footer-copyright');
  if (copyrightElement) {
    copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2025', currentYear);
  }
  
  // ========================================
  // PREVENT DOUBLE CLICK ON BUTTONS
  // ========================================
  
  document.querySelectorAll('button[type="submit"]').forEach(btn => {
    btn.addEventListener('click', function() {
      this.disabled = true;
      setTimeout(() => {
        this.disabled = false;
      }, 2000);
    });
  });
  
  // ========================================
  // KEYBOARD NAVIGATION
  // ========================================
  
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to open search (if you implement it)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      console.log('Search triggered');
    }
    
    // Arrow keys for card navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const focusedElement = document.activeElement;
      if (focusedElement.classList.contains('solution-card')) {
        e.preventDefault();
        // Navigate to next/previous card
      }
    }
  });
  
  // ========================================
  // COOKIE CONSENT (OPTIONAL)
  // ========================================
  
  function showCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      console.log('Show cookie consent banner');
    }
  }
  
  // Uncomment to enable
  // showCookieConsent();
  
  // ========================================
  // PERFORMANCE MONITORING
  // ========================================
  
  window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
  });
  
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // Scroll ended
    }, 150);
  }, { passive: true });
  
  // ========================================
  // ERROR HANDLING FOR IMAGES
  // ========================================
  
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      console.warn('Failed to load image:', this.src);
    });
  });
  
  // ========================================
  // VISIBILITY CHANGE HANDLER
  // ========================================
  
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      console.log('Page hidden');
    } else {
      console.log('Page visible');
    }
  });
  
  // ========================================
  // COPY TO CLIPBOARD FUNCTIONALITY
  // ========================================
  
  function copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard:', text);
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    }
  }
  
  // ========================================
  // TOOLTIP FUNCTIONALITY
  // ========================================
  
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', function(e) {
      const tooltipText = this.getAttribute('data-tooltip');
      
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = tooltipText;
      tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.85rem;
        z-index: 10000;
        pointer-events: none;
        white-space: nowrap;
        border: 1px solid rgba(0, 102, 255, 0.3);
      `;
      
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
      
      this._tooltip = tooltip;
    });
    
    element.addEventListener('mouseleave', function() {
      if (this._tooltip) {
        this._tooltip.remove();
        this._tooltip = null;
      }
    });
  });
  
  // ========================================
  // LAZY LOAD SECTIONS
  // ========================================
  
  const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
        lazyLoadObserver.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '100px'
  });
  
  document.querySelectorAll('section').forEach(section => {
    lazyLoadObserver.observe(section);
  });
  
  // ========================================
  // CONSOLE BRANDING
  // ========================================
  
  console.log(
    '%cKalkiNetra',
    'color: #0066ff; font-size: 48px; font-weight: bold; text-shadow: 0 0 10px rgba(0, 102, 255, 0.5);'
  );
  console.log(
    '%cAI Security Solutions',
    'color: #3388ff; font-size: 20px; font-weight: 600;'
  );
  console.log(
    '%cBuilt with research, secured with innovation.',
    'color: rgba(255, 255, 255, 0.7); font-size: 14px;'
  );
  console.log(
    '%c\n💼 Interested in joining our team? Visit: kalkinetra.com/careers',
    'color: #3388ff; font-size: 12px;'
  );
  
  // ========================================
  // PREFETCH LINKS
  // ========================================
  
  const prefetchLinks = document.querySelectorAll('a[href^="/"], a[href^="./"]');
  
  prefetchLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const href = this.getAttribute('href');
      const prefetch = document.createElement('link');
      prefetch.rel = 'prefetch';
      prefetch.href = href;
      document.head.appendChild(prefetch);
    }, { once: true });
  });
  
  // ========================================
  // NETWORK STATUS INDICATOR
  // ========================================
  
  function updateOnlineStatus() {
    if (!navigator.onLine) {
      console.warn('You are offline');
    } else {
      console.log('You are online');
    }
  }
  
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  // ========================================
  // PRINT STYLES HANDLER
  // ========================================
  
  window.addEventListener('beforeprint', function() {
    console.log('Preparing to print');
  });
  
  window.addEventListener('afterprint', function() {
    console.log('Print completed');
  });
    // ========================================
  // INITIALIZATION COMPLETE
  // ========================================
  
  console.log('%c✓ Solutions page initialized successfully', 'color: #00ff00; font-weight: bold;');
  
  // Trigger initial animations
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
  
});

// ========================================
// SERVICE WORKER REGISTRATION (OPTIONAL)
// ========================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js').then(
    //   function(registration) {
    //     console.log('ServiceWorker registration successful:', registration.scope);
    //   },
    //   function(err) {
    //     console.log('ServiceWorker registration failed:', err);
    //   }
    // );
  });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function
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

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
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

// Get scroll percentage
function getScrollPercent() {
  const h = document.documentElement;
  const b = document.body;
  const st = 'scrollTop';
  const sh = 'scrollHeight';
  return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
}

// ========================================
// EXPORT FOR MODULE USAGE (OPTIONAL)
// ========================================

// Uncomment if using as module
// export { debounce, throttle, isInViewport, getScrollPercent };

// ========================================
// END OF SOLUTIONS.JS
// ========================================
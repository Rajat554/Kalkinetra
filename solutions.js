// ========================================
// SOLUTIONS PAGE - COMPLETE JAVASCRIPT
// KalkiNetra Theme
// ========================================

// ========================================
// DARKVEIL BACKGROUND
// ========================================

class DarkVeil {
  constructor(container) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.time = 0;
    this.speed = 5;
    this.hueShift = 0;
    this.noiseIntensity = 0.02;
    this.scanlineIntensity = 3;
    this.scanlineFrequency = 0;
    this.warpAmount = 4;
    
    this.container.appendChild(this.canvas);
    this.resize();
    this.init();
    
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);
    
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
    this.ctx.scale(dpr, dpr);
    
    this.width = width;
    this.height = height;
  }
  
  init() {
    this.animate();
  }
  
  cppn(x, y, t) {
    const scale = 1.5;
    x = x * scale;
    y = y * scale;
    
    const l1_1 = Math.sin(x * 3 + t * 0.3);
    const l1_2 = Math.cos(y * 3 - t * 0.5);
    const l1_3 = Math.sin((x + y) * 2 + t * 0.4);
    const l1_4 = Math.cos((x - y) * 2.5 - t * 0.6);
    
    const l2_1 = Math.tanh(l1_1 * 2 + l1_3 * 1.5);
    const l2_2 = Math.tanh(l1_2 * 1.8 + l1_4 * 2.2);
    const l2_3 = Math.tanh((l1_1 + l1_2) * 1.3);
    
    const intensity = ((Math.sin(l2_1 * Math.PI + t * 0.2) + Math.cos(l2_3 * Math.PI - t * 0.2)) + 2) / 4;
    const r = 0.0 * intensity;
    const g = 0.15 * intensity;
    const b = 0.8 * intensity;
    
    return { r, g, b };
  }
  
  hueShiftRGB(r, g, b, deg) {
    const rad = (deg * Math.PI) / 180;
    const cosA = Math.cos(rad);
    const sinA = Math.sin(rad);
    
    const y = 0.299 * r + 0.587 * g + 0.114 * b;
    const i = 0.596 * r - 0.274 * g - 0.322 * b;
    const q = 0.211 * r - 0.523 * g + 0.312 * b;
    
    const i2 = i * cosA - q * sinA;
    const q2 = i * sinA + q * cosA;
    
    r = y + 0.956 * i2 + 0.621 * q2;
    g = y - 0.272 * i2 - 0.647 * q2;
    b = y - 1.106 * i2 + 1.703 * q2;
    
    return {
      r: Math.max(0, Math.min(1, r)),
      g: Math.max(0, Math.min(1, g)),
      b: Math.max(0, Math.min(1, b))
    };
  }
  
  animate() {
    const width = this.width;
    const height = this.height;
    
    this.time += 0.016 * this.speed;
    
    const imageData = this.ctx.createImageData(width, height);
    const data = imageData.data;
    
    const step = window.innerWidth < 768 ? 3 : 2;
    
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        let nx = (x / width) * 2 - 1;
        let ny = (y / height) * 2 - 1;
        
        nx += this.warpAmount * Math.sin(ny * 6.283 + this.time * 0.5) * 0.05;
        ny += this.warpAmount * Math.cos(nx * 6.283 + this.time * 0.5) * 0.05;
        
        let color = this.cppn(nx, ny, this.time);
        color = this.hueShiftRGB(color.r, color.g, color.b, this.hueShift);
        
        const scanline = Math.sin(y * this.scanlineFrequency) * 0.5 + 0.5;
        const scanlineMult = 1 - (scanline * scanline) * this.scanlineIntensity;
        
        const noise = (Math.random() - 0.5) * this.noiseIntensity;
        
        const r = Math.max(0, Math.min(255, (color.r * scanlineMult + noise) * 255));
        const g = Math.max(0, Math.min(255, (color.g * scanlineMult + noise) * 255));
        const b = Math.max(0, Math.min(255, (color.b * scanlineMult + noise) * 255));
        
        for (let dy = 0; dy < step && y + dy < height; dy++) {
          for (let dx = 0; dx < step && x + dx < width; dx++) {
            const idx = ((y + dy) * width + (x + dx)) * 4;
            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
            data[idx + 3] = 255;
          }
        }
      }
    }
    
    this.ctx.putImageData(imageData, 0, 0);
    
    requestAnimationFrame(() => this.animate());
  }
}

// ========================================
// PARTICLE SYSTEM
// ========================================

class ParticleSystem {
  constructor(container, count = 50) {
    this.container = container;
    this.particles = [];
    this.count = count;
    
    this.init();
  }
  
  init() {
    for (let i = 0; i < this.count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: radial-gradient(circle, rgba(0, 102, 255, ${Math.random() * 0.5 + 0.3}), transparent);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
        pointer-events: none;
      `;
      this.container.appendChild(particle);
      this.particles.push(particle);
    }
  }
}

// ========================================
// MAIN APPLICATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize DarkVeil Background
  const darkVeilContainer = document.getElementById('darkveil-background');
  if (darkVeilContainer) {
    new DarkVeil(darkVeilContainer);
  }
  
  // Initialize Particle Systems
  const heroParticles = document.getElementById('heroParticles');
  if (heroParticles) {
    new ParticleSystem(heroParticles, 30);
  }
  
  const accessParticles = document.getElementById('accessParticles');
  if (accessParticles) {
    new ParticleSystem(accessParticles, 20);
  }
  
  // ========================================
  // NAVBAR FUNCTIONALITY
  // ========================================
  
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
      }
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }
  
  // Navbar scroll effect
  function updateNavbar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', updateNavbar);
  updateNavbar();
  
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
  
  // Solution cards already have data-solution animations in CSS
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
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
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
// CARD HOVER EFFECTS (3D TILT) - Fixed to prevent animation conflict
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
  
 // PARALLAX EFFECT ON SCROLL - Throttled to prevent jank
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
  // ACTIVE NAVIGATION ON SCROLL
  // ========================================
  
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    const scrollPos = window.pageYOffset + 200;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
  
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
      
      // Track analytics here if needed
      // Example: gtag('event', 'view_solution', { solution_id: solutionNumber });
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
      // Implement search functionality here
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
      // Show cookie banner
      console.log('Show cookie consent banner');
      // Implement your cookie consent UI here
    }
  }
  
  // Uncomment to enable
  // showCookieConsent();
  
  // ========================================
  // PERFORMANCE MONITORING
  // ========================================
  
  // Log page load time
  window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
  });
  
  // Monitor scroll performance
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
      // Set placeholder image
      // this.src = 'assets/placeholder.png';
    });
  });
  
  // ========================================
  // VISIBILITY CHANGE HANDLER
  // ========================================
  
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      console.log('Page hidden');
      // Pause animations, videos, etc.
    } else {
      console.log('Page visible');
      // Resume animations, videos, etc.
    }
  });
  
  // ========================================
  // COPY TO CLIPBOARD FUNCTIONALITY
  // ========================================
  
  function copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard:', text);
        // Show success message
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
      // Show offline indicator
    } else {
      console.log('You are online');
      // Hide offline indicator
    }
  }
  
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  // ========================================
  // PRINT STYLES HANDLER
  // ========================================
  
  window.addEventListener('beforeprint', function() {
    console.log('Preparing to print');
    // Expand all collapsed sections, etc.
  });
  
  window.addEventListener('afterprint', function() {
    console.log('Print completed');
    // Restore collapsed sections
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
// export { DarkVeil, ParticleSystem, debounce, throttle, isInViewport, getScrollPercent };

// ========================================
// END OF SOLUTIONS.JS
// ========================================
// ========================================
// DARKVEIL BACKGROUND CLASS
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
    
    // Layer 1
    const l1_1 = Math.sin(x * 3 + t * 0.3);
    const l1_2 = Math.cos(y * 3 - t * 0.5);
    const l1_3 = Math.sin((x + y) * 2 + t * 0.4);
    const l1_4 = Math.cos((x - y) * 2.5 - t * 0.6);
    
    // Layer 2
    const l2_1 = Math.tanh(l1_1 * 2 + l1_3 * 1.5);
    const l2_2 = Math.tanh(l1_2 * 1.8 + l1_4 * 2.2);
    const l2_3 = Math.tanh((l1_1 + l1_2) * 1.3);
    
    // Layer 3 - Blue Output
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
// MAIN APPLICATION
// ========================================

window.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // INITIALIZE DARKVEIL BACKGROUND
  // ========================================
  let darkVeilContainer = document.getElementById('darkveil-background');
  
  if (!darkVeilContainer) {
    darkVeilContainer = document.createElement('div');
    darkVeilContainer.id = 'darkveil-background';
    document.body.insertBefore(darkVeilContainer, document.body.firstChild);
  }
  
  new DarkVeil(darkVeilContainer);
  
  // ========================================
  // NAVBAR SCROLL EFFECT
  // ========================================
  const navbar = document.querySelector('.pill-navbar');
  
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
  // MOBILE MENU TOGGLE
  // ========================================
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('show');
        menuToggle.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navbar.contains(e.target) && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        menuToggle.classList.remove('active');
      }
    });
  }
  
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
  // CARDS TILT EFFECT ON MOUSE MOVE (DESKTOP ONLY)
  // ========================================
  if (window.innerWidth > 768) {
    const cards = document.querySelectorAll('.research-project-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', handleTilt);
      card.addEventListener('mouseleave', resetTilt);
    });
    
    function handleTilt(e) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    }
    
    function resetTilt(e) {
      const card = e.currentTarget;
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    }
  }
  
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
  
  const buttons = document.querySelectorAll('.btn-cta-primary, .btn-cta-outline');
  buttons.forEach(button => {
    button.addEventListener('click', createRipple);
  });
  
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
  // CONSOLE BRANDING
  // ========================================
  console.log('%c🔒 KalkiNetra - AI Security Research Lab', 'color: #0066ff; font-size: 20px; font-weight: bold;');
  console.log('%cResearch & Publications Page', 'color: #3388ff; font-size: 14px;');
  console.log('%cExplore our cutting-edge security research', 'color: #1a75ff; font-size: 12px;');
  
  // ========================================
  // DETECT SCROLL DIRECTION
  // ========================================
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
      document.body.classList.add('scrolling-down');
      document.body.classList.remove('scrolling-up');
    } else {
      document.body.classList.add('scrolling-up');
      document.body.classList.remove('scrolling-down');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, false);
  
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
  // DYNAMIC PAGE TITLE ON BLUR
  // ========================================
  let originalTitle = document.title;
  
  window.addEventListener('blur', function() {
    document.title = '👋 Come back! - ' + originalTitle;
  });
  
  window.addEventListener('focus', function() {
    document.title = originalTitle;
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
  
  console.log('Research page initialized successfully');
});

// ========================================
// SMOOTH CARD LINK TRANSITIONS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const cardLinks = document.querySelectorAll('.card-link');
  
  cardLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add visual feedback
      this.style.transform = 'translateX(15px)';
      
      setTimeout(() => {
        this.style.transform = 'translateX(0)';
        // Navigate or trigger action here
        console.log('Navigating to:', this.getAttribute('href'));
      }, 300);
    });
  });
});

// class DarkVeil {
//   constructor(container) {
//     this.container = container;
//     this.canvas = document.createElement('canvas');
//     this.ctx = this.canvas.getContext('2d', { alpha: false });
//     this.time = 0;
//     this.speed = 5;
//     this.hueShift = 0;
//     this.noiseIntensity = 0.02;
//     this.scanlineIntensity = 3;
//     this.scanlineFrequency = 0;
//     this.warpAmount = 4;
    
//     this.container.appendChild(this.canvas);
//     this.resize();
//     this.init();
    
//     window.addEventListener('resize', () => this.resize());
//   }
  
//   resize() {
//     const dpr = Math.min(window.devicePixelRatio, 2);
//     this.canvas.width = this.container.clientWidth * dpr;
//     this.canvas.height = this.container.clientHeight * dpr;
//     this.canvas.style.width = this.container.clientWidth + 'px';
//     this.canvas.style.height = this.container.clientHeight + 'px';
//     this.ctx.scale(dpr, dpr);
//   }
  
//   init() {
//     this.animate();
//   }
  
//   // CPPN Neural Network Renderer (Simplified version)
//   cppn(x, y, t) {
//     const scale = 1.5;
//     x = x * scale;
//     y = y * scale;
    
//     // Layer 1
//     const l1_1 = Math.sin(x * 3 + t * 0.3);
//     const l1_2 = Math.cos(y * 3 - t * 0.5);
//     const l1_3 = Math.sin((x + y) * 2 + t * 0.4);
//     const l1_4 = Math.cos((x - y) * 2.5 - t * 0.6);
    
//     // Layer 2
//     const l2_1 = Math.tanh(l1_1 * 2 + l1_3 * 1.5);
//     const l2_2 = Math.tanh(l1_2 * 1.8 + l1_4 * 2.2);
//     const l2_3 = Math.tanh((l1_1 + l1_2) * 1.3);
    
//     // Layer 3 - RGB output
// // Layer 3 - Single Blue Output
// const intensity = ((Math.sin(l2_1 * Math.PI + t * 0.2) + Math.cos(l2_3 * Math.PI - t * 0.2)) + 2) / 4;
// const r = 0.0 * intensity;       // no red
// const g = 0.15 * intensity;
// const b = 0.8 * intensity;
//       // blue channel dominates

    
//     return { r, g, b };
//   }
  
//   hueShiftRGB(r, g, b, deg) {
//     const rad = (deg * Math.PI) / 180;
//     const cosA = Math.cos(rad);
//     const sinA = Math.sin(rad);
    
//     // RGB to YIQ
//     const y = 0.299 * r + 0.587 * g + 0.114 * b;
//     const i = 0.596 * r - 0.274 * g - 0.322 * b;
//     const q = 0.211 * r - 0.523 * g + 0.312 * b;
    
//     // Rotate hue
//     const i2 = i * cosA - q * sinA;
//     const q2 = i * sinA + q * cosA;
    
//     // YIQ to RGB
//     r = y + 0.956 * i2 + 0.621 * q2;
//     g = y - 0.272 * i2 - 0.647 * q2;
//     b = y - 1.106 * i2 + 1.703 * q2;
    
//     return {
//       r: Math.max(0, Math.min(1, r)),
//       g: Math.max(0, Math.min(1, g)),
//       b: Math.max(0, Math.min(1, b))
//     };
//   }
  
//   animate() {
//     const width = this.container.clientWidth;
//     const height = this.container.clientHeight;
    
//     this.time += 0.016 * this.speed;
    
//     const imageData = this.ctx.createImageData(width, height);
//     const data = imageData.data;
    
//     for (let y = 0; y < height; y += 2) {
//       for (let x = 0; x < width; x += 2) {
//         // Normalize coordinates to -1 to 1
//         let nx = (x / width) * 2 - 1;
//         let ny = (y / height) * 2 - 1;
        
//         // Add warp effect
//         nx += this.warpAmount * Math.sin(ny * 6.283 + this.time * 0.5) * 0.05;
//         ny += this.warpAmount * Math.cos(nx * 6.283 + this.time * 0.5) * 0.05;
        
//         // Get color from CPPN
//         let color = this.cppn(nx, ny, this.time);
        
//         // Apply hue shift
//         color = this.hueShiftRGB(color.r, color.g, color.b, this.hueShift);
        
//         // Apply scanline effect
//         const scanline = Math.sin(y * this.scanlineFrequency) * 0.5 + 0.5;
//         const scanlineMult = 1 - (scanline * scanline) * this.scanlineIntensity;
        
//         // Add noise
//         const noise = (Math.random() - 0.5) * this.noiseIntensity;
        
//         // Final color
// // Final color
// const r = Math.max(0, Math.min(255, (color.r * scanlineMult + noise) * 255));
// const g = Math.max(0, Math.min(255, (color.g * scanlineMult + noise) * 255));
// const b = Math.max(0, Math.min(255, (color.b * scanlineMult + noise) * 255));

        
//         // Draw 2x2 block for performance
//         for (let dy = 0; dy < 2 && y + dy < height; dy++) {
//           for (let dx = 0; dx < 2 && x + dx < width; dx++) {
//             const idx = ((y + dy) * width + (x + dx)) * 4;
//             data[idx] = r;
//             data[idx + 1] = g;
//             data[idx + 2] = b;
//             data[idx + 3] = 255;
//           }
//         }
//       }
//     }
    
//     this.ctx.putImageData(imageData, 0, 0);
    
//     requestAnimationFrame(() => this.animate());
//   }
// }

// // ========================================
// // MAIN APPLICATION
// // ========================================

// window.addEventListener('load', function () {
//   // Initialize DarkVeil Background
//   const darkVeilContainer = document.getElementById('darkveil-background');
//   if (darkVeilContainer) {
//     new DarkVeil(darkVeilContainer);
//   }

//   // Split Text Animation
//   function initSplitText() {
//     const splitTextElements = document.querySelectorAll('.split-text');

//     splitTextElements.forEach((element, lineIndex) => {
//       const text = element.getAttribute('data-text');
//       if (!text) return;

//       element.innerHTML = '';
//       element.style.display = 'inline-block';

//       const letters = text.split('');
//       letters.forEach((char, charIndex) => {
//         const span = document.createElement('span');
//         span.className = 'letter';

//         if (char === ' ') {
//           span.innerHTML = '&nbsp;';
//         } else {
//           span.textContent = char;
//         }

//         const baseDelay = lineIndex * 1000;
//         const charDelay = charIndex * 40;
//         span.style.animationDelay = `${baseDelay + charDelay}ms`;

//         element.appendChild(span);
//       });
//     });
//   }

//   initSplitText();

//   // Smooth scroll for anchor links
//   document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//     anchor.addEventListener('click', function (e) {
//       e.preventDefault();
//       const target = document.querySelector(this.getAttribute('href'));
//       if (target) {
//         const offset = 80;
//         const targetPosition = target.offsetTop - offset;
//         window.scrollTo({
//           top: targetPosition,
//           behavior: 'smooth',
//         });
//       }
//     });
//   });

//   // Navbar scroll effect
//   const navbar = document.querySelector('.modern-navbar');
  
//   function updateNavbar() {
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
//     if (scrollTop > 50) {
//       navbar.classList.add('scrolled');
//     } else {
//       navbar.classList.remove('scrolled');
//     }
//   }

//   window.addEventListener('scroll', updateNavbar);
//   updateNavbar();

//   // Navbar active state on scroll
//   function updateActiveNav() {
//     const sections = document.querySelectorAll('section[id]');
//     const navLinks = document.querySelectorAll('.nav-link');

//     let current = 'home';
//     const scrollPos = window.pageYOffset + 200;

//     sections.forEach((section) => {
//       const sectionTop = section.offsetTop;
//       const sectionBottom = sectionTop + section.offsetHeight;

//       if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
//         current = section.getAttribute('id');
//       }
//     });

//     navLinks.forEach((link) => {
//       link.classList.remove('active');
//       if (link.getAttribute('href') === '#' + current) {
//         link.classList.add('active');
//       }
//     });
//   }

//   window.addEventListener('scroll', updateActiveNav);
//   updateActiveNav();

//   // Intersection Observer for slide-in animations
//   const observerOptions = {
//     threshold: 0.15,
//     rootMargin: '0px 0px -100px 0px',
//   };

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add('animate');
//         observer.unobserve(entry.target);
//       }
//     });
//   }, observerOptions);

//   setTimeout(() => {
//     document
//       .querySelectorAll('.slide-in-left, .slide-in-right')
//       .forEach((el) => {
//         observer.observe(el);
//       });
//   }, 100);

//   // Newsletter form submission
//   const newsletterForm = document.querySelector('.newsletter-form');
//   if (newsletterForm) {
//     newsletterForm.addEventListener('submit', function (e) {
//       e.preventDefault();
//       const email = this.querySelector('input[type="email"]').value;
//       alert('Thank you for subscribing! We\'ll send updates to: ' + email);
//       this.reset();
//     });
//   }

//   // Count Up Animation for Impact Numbers
//   function initCountUp() {
//     const impactNumbers = document.querySelectorAll('.impact-number');

//     const countUpObserverOptions = {
//       threshold: 0.5,
//       rootMargin: '0px',
//     };

//     const countUp = (element) => {
//       const target = parseInt(element.getAttribute('data-target'));
//       const duration = 2000;
//       const increment = target / (duration / 16);
//       let current = 0;

//       const timer = setInterval(() => {
//         current += increment;
//         if (current >= target) {
//           element.textContent = target + '+';
//           clearInterval(timer);
//         } else {
//           element.textContent = Math.floor(current) + '+';
//         }
//       }, 16);
//     };

//     const countUpObserver = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (
//           entry.isIntersecting &&
//           !entry.target.classList.contains('counted')
//         ) {
//           entry.target.classList.add('counted');
//           countUp(entry.target);
//         }
//       });
//     }, countUpObserverOptions);

//     impactNumbers.forEach((number) => countUpObserver.observe(number));
//   }

//   initCountUp();

//   // Fade-up animation for tool cards
//   const toolObserver = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('show');
//         }
//       });
//     },
//     { threshold: 0.2 }
//   );

//   document
//     .querySelectorAll('.tool-card')
//     .forEach((card) => toolObserver.observe(card));

//   // Add parallax effect on scroll (subtle)
//   window.addEventListener('scroll', function() {
//     const scrolled = window.pageYOffset;
//     const parallaxElements = document.querySelectorAll('.section-title, .section-subtitle');
    
//     parallaxElements.forEach(element => {
//       const speed = 0.5;
//       const yPos = -(scrolled * speed);
//       element.style.transform = `translateY(${yPos}px)`;
//     });
//   });

//   // Mouse move effect for cards (subtle 3D tilt)
//   document.querySelectorAll('.impact-card, .research-card, .tool-card').forEach(card => {
//     card.addEventListener('mousemove', function(e) {
//       const rect = card.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
      
//       const centerX = rect.width / 2;
//       const centerY = rect.height / 2;
      
//       const rotateX = (y - centerY) / 20;
//       const rotateY = (centerX - x) / 20;
      
//       card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
//     });
    
//     card.addEventListener('mouseleave', function() {
//       card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
//     });
//   });

//   // Animate elements on scroll
//   const animateOnScroll = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.style.opacity = '1';
//           entry.target.style.transform = 'translateY(0)';
//         }
//       });
//     },
//     {
//       threshold: 0.1,
//       rootMargin: '0px 0px -50px 0px'
//     }
//   );

//   document.querySelectorAll('.founder-quote-card, .impact-card, .newsletter-card').forEach((el) => {
//     el.style.opacity = '0';
//     el.style.transform = 'translateY(30px)';
//     el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
//     animateOnScroll.observe(el);
//   });

//   console.log('KalkiNetra - Research & Threat Intelligence Lab initialized');
// });


// // Add blue-glow on scroll
// window.addEventListener('scroll', () => {
//   const navbar = document.querySelector('.pill-navbar');
//   if (window.scrollY > 50) navbar.classList.add('scrolled');
//   else navbar.classList.remove('scrolled');
// });

// // Mobile toggle logic
// const toggleBtn = document.getElementById('menuToggle');
// const navLinks = document.getElementById('navLinks');

// toggleBtn.addEventListener('click', () => {
//   navLinks.classList.toggle('open');
//   toggleBtn.classList.toggle('active');
// });


















































// ========================================
// DARKVEIL BACKGROUND IMPLEMENTATION
// ========================================


// ST FOX Style Navbar JavaScript

document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile Menu Toggle
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarMenu = document.getElementById('navbarMenu');
  
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });
  }

  // Dropdown Menu Toggle for Mobile
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      // Only prevent default and toggle on mobile
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const parentLi = this.closest('li');
        parentLi.classList.toggle('dropdown-open');
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.main-navbar')) {
      navbarMenu.classList.remove('active');
      navbarToggle.classList.remove('active');
    }
  });

  // Close mobile menu when window is resized to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
      navbarMenu.classList.remove('active');
      navbarToggle.classList.remove('active');
      document.querySelectorAll('.has-dropdown').forEach(item => {
        item.classList.remove('dropdown-open');
      });
    }
  });

  // Navbar scroll effect (optional - adds shadow on scroll)
  const mainNavbar = document.querySelector('.main-navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      mainNavbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      mainNavbar.style.boxShadow = 'none';
    }
  });
  
});

// ========================================
// KALKINETRA - Clean JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // MOBILE NAVIGATION TOGGLE
  // ========================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');
  const body = document.body;

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      mainNav.classList.toggle('active');
      body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.stfox-navbar')) {
        mainNav.classList.remove('active');
        mobileToggle.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });

    // Close menu on window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 992) {
        mainNav.classList.remove('active');
        mobileToggle.classList.remove('active');
        body.classList.remove('menu-open');
        document.querySelectorAll('.has-dropdown').forEach(item => {
          item.classList.remove('dropdown-open');
        });
      }
    });
  }

  // ========================================
  // DROPDOWN TOGGLE FOR MOBILE
  // ========================================
  window.toggleDropdown = function(element) {
    if (window.innerWidth <= 992) {
      const parentLi = element.closest('li');
      parentLi.classList.toggle('dropdown-open');
    }
  };

  // ========================================
  // FADE-IN ANIMATION ON SCROLL
  // ========================================
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  const fadeElements = document.querySelectorAll(`
    .logo-loop-section,
    .founder-image-wrapper,
    .founder-quote-card,
    .impact-card,
    .research-card,
    .tool-card,
    .collaboration-section,
    .newsletter-card,
    .section-title,
    .section-subtitle
  `);

  fadeElements.forEach(el => {
    el.classList.add('fade-in-element');
    fadeInObserver.observe(el);
  });

  // ========================================
  // COUNT-UP ANIMATION FOR IMPACT NUMBERS
  // ========================================
  const impactNumbers = document.querySelectorAll('.impact-number');
  
  const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCountUp(entry.target);
      }
    });
  }, { threshold: 0.5 });

  function animateCountUp(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + '+';
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + '+';
      }
    }, 16);
  }

  impactNumbers.forEach(number => {
    countUpObserver.observe(number);
  });

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 80;
          const targetPosition = target.offsetTop - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileToggle.classList.remove('active');
            body.classList.remove('menu-open');
          }
        }
      }
    });
  });

  // ========================================
  // NEWSLETTER FORM SUBMISSION
  // ========================================
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      alert('Thank you for subscribing! We\'ll send updates to: ' + email);
      this.reset();
    });
  }

  // ========================================
  // NAVBAR SCROLL EFFECT (OPTIONAL)
  // ========================================
  const navbar = document.querySelector('.stfox-navbar');
  
  function updateNavbar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  if (navbar) {
    window.addEventListener('scroll', updateNavbar);
    updateNavbar();
  }

  // ========================================
  // ACTIVE NAV LINK ON SCROLL
  // ========================================
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.stfox-nav-link[href^="#"]');
    
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
  // MOUSE MOVE EFFECT FOR CARDS (SUBTLE 3D)
  // ========================================
  const interactiveCards = document.querySelectorAll('.impact-card, .research-card, .tool-card');
  
  interactiveCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ========================================
  // PREVENT HORIZONTAL OVERFLOW
  // ========================================
  function checkOverflow() {
    const body = document.body;
    const html = document.documentElement;
    
    if (body.scrollWidth > html.clientWidth) {
      console.warn('Horizontal overflow detected');
    }
  }

  window.addEventListener('resize', checkOverflow);
  checkOverflow();

  console.log('✅ KalkiNetra - Research & Threat Intelligence Lab initialized');
});
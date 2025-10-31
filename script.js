
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
    // Get actual viewport dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Set canvas size to match viewport exactly
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
    
    // Store dimensions for rendering
    this.width = width;
    this.height = height;
  }
  
  init() {
    this.animate();
  }
  
  // CPPN Neural Network Renderer
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
    
    // RGB to YIQ
    const y = 0.299 * r + 0.587 * g + 0.114 * b;
    const i = 0.596 * r - 0.274 * g - 0.322 * b;
    const q = 0.211 * r - 0.523 * g + 0.312 * b;
    
    // Rotate hue
    const i2 = i * cosA - q * sinA;
    const q2 = i * sinA + q * cosA;
    
    // YIQ to RGB
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
    
    // Dynamic step size for performance
    const step = window.innerWidth < 768 ? 4 : 2;
    
    for (let py = 0; py < height; py += step) {
      for (let px = 0; px < width; px += step) {
        // Normalize coordinates to -1 to 1
        let nx = (px / width) * 2 - 1;
        let ny = (py / height) * 2 - 1;
        
        // Add warp effect
        nx += this.warpAmount * Math.sin(ny * 6.283 + this.time * 0.5) * 0.05;
        ny += this.warpAmount * Math.cos(nx * 6.283 + this.time * 0.5) * 0.05;
        
        // Get color from CPPN
        let color = this.cppn(nx, ny, this.time);
        
        // Apply hue shift
        color = this.hueShiftRGB(color.r, color.g, color.b, this.hueShift);
        
        // Apply scanline effect
        const scanline = Math.sin(py * this.scanlineFrequency) * 0.5 + 0.5;
        const scanlineMult = 1 - (scanline * scanline) * this.scanlineIntensity;
        
        // Add noise
        const noise = (Math.random() - 0.5) * this.noiseIntensity;
        
        // Final color
        const r = Math.max(0, Math.min(255, (color.r * scanlineMult + noise) * 255));
        const g = Math.max(0, Math.min(255, (color.g * scanlineMult + noise) * 255));
        const b = Math.max(0, Math.min(255, (color.b * scanlineMult + noise) * 255));
        
        // Fill block
        for (let dy = 0; dy < step && py + dy < height; dy++) {
          for (let dx = 0; dx < step && px + dx < width; dx++) {
            const idx = ((py + dy) * width + (px + dx)) * 4;
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

window.addEventListener('load', function () {
  // Initialize DarkVeil Background
  const darkVeilContainer = document.getElementById('darkveil-background');
  if (darkVeilContainer) {
    new DarkVeil(darkVeilContainer);
  }

  // ========================================
  // SPLIT TEXT ANIMATION
  // ========================================
function initSplitText() {
  const splitTextElements = document.querySelectorAll('.split-text');

  splitTextElements.forEach((element, lineIndex) => {
    const text = element.getAttribute('data-text');
    if (!text) return;

    element.innerHTML = '';
    element.style.display = 'inline-block';
    element.style.whiteSpace = 'normal';
    element.style.wordBreak = 'keep-all';
    element.style.overflowWrap = 'normal';

    const words = text.split(' '); // split by words
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap'; // letters stay together in one word

      // Split letters for animation
      word.split('').forEach((char, charIndex) => {
        const span = document.createElement('span');
        span.className = 'letter';
        const baseDelay = lineIndex * 1000;
        const charDelay = (wordIndex * 100 + charIndex * 40);
        span.style.animationDelay = `${baseDelay + charDelay}ms`;
        span.textContent = char;
        wordSpan.appendChild(span);
      });

      element.appendChild(wordSpan);

      // Add a real space (allows wrapping)
      if (wordIndex < words.length - 1) {
        element.appendChild(document.createTextNode(' '));
      }
    });
  });
}

initSplitText();


  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

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
  // NAVBAR ACTIVE STATE ON SCROLL
  // ========================================
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = 'home';
    const scrollPos = window.pageYOffset + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
      }
    });
  }

  // ========================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ========================================
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  setTimeout(() => {
    document.querySelectorAll('.fade-in, .fade-up, .fade-left, .fade-right').forEach((el) => {
      observer.observe(el);
    });
  }, 100);

  // ========================================
  // COUNT UP ANIMATION FOR IMPACT NUMBERS
  // ========================================
  function initCountUp() {
    const impactNumbers = document.querySelectorAll('.impact-number');

    const countUpObserverOptions = {
      threshold: 0.5,
      rootMargin: '0px',
    };

    const countUp = (element) => {
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
    };

    const countUpObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          countUp(entry.target);
        }
      });
    }, countUpObserverOptions);

    impactNumbers.forEach((number) => countUpObserver.observe(number));
  }

  initCountUp();

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
        behavior: 'smooth',
      });
    });
  }

  // ========================================
  // NEWSLETTER FORM SUBMISSION
  // ========================================
  const newsletterForm = document.getElementById('newsletterForm');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      alert('Thank you for subscribing! We\'ll send updates to: ' + email);
      this.reset();
    });
  }

  // ========================================
  // 3D TILT EFFECT ON CARDS (DESKTOP ONLY)
  // ========================================
  if (window.innerWidth > 768) {
    const tiltCards = document.querySelectorAll('.research-card, .tool-card, .impact-card');

    tiltCards.forEach(card => {
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
  }

  // ========================================
  // CONSOLE MESSAGE
  // ========================================
  console.log('KalkiNetra - Research & Threat Intelligence Lab initialized');
});
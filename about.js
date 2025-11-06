// // ========================================
// // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// // ========================================
// const observerOptions = {
//   threshold: 0.15,
//   rootMargin: '0px 0px -100px 0px'
// };

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry, index) => {
//     if (entry.isIntersecting) {
//       const animation = entry.target.getAttribute('data-animation');
//       const delay = index * 0.15;
      
//       setTimeout(() => {
//         entry.target.classList.add('visible');
//       }, delay * 1000);
      
//       observer.unobserve(entry.target);
//     }
//   });
// }, observerOptions);

// // Observe all animated elements
// document.addEventListener('DOMContentLoaded', () => {
//   const animatedElements = document.querySelectorAll('.animate-on-scroll');
//   animatedElements.forEach(el => observer.observe(el));
// });

// // ========================================
// // NAVBAR SCROLL EFFECT
// // ========================================
// const navbar = document.querySelector('.glass-navbar');

// window.addEventListener('scroll', function() {
//   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
//   if (scrollTop > 50) {
//     navbar.classList.add('scrolled');
//   } else {
//     navbar.classList.remove('scrolled');
//   }
// });

// // ========================================
// // SMOOTH SCROLL FOR ANCHOR LINKS
// // ========================================
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//   anchor.addEventListener('click', function (e) {
//     e.preventDefault();
//     const target = document.querySelector(this.getAttribute('href'));
    
//     if (target) {
//       const offset = 80;
//       const targetPosition = target.offsetTop - offset;
      
//       window.scrollTo({
//         top: targetPosition,
//         behavior: 'smooth'
//       });
//     }
//   });
// });

// // ========================================
// // SPLIT TEXT ANIMATION FOR HERO TITLE
// // ========================================
// function splitText() {
//   const splitTextElements = document.querySelectorAll('.split-text');
  
//   splitTextElements.forEach((element, elementIndex) => {
//     const text = element.textContent;
//     element.textContent = '';
//     element.style.opacity = '1';
    
//     const words = text.split(' ');
    
//     words.forEach((word, wordIndex) => {
//       const wordSpan = document.createElement('span');
//       wordSpan.style.display = 'inline-block';
//       wordSpan.style.whiteSpace = 'nowrap';
      
//       word.split('').forEach((char, charIndex) => {
//         const span = document.createElement('span');
//         span.textContent = char === ' ' ? '\u00A0' : char;
//         span.className = 'letter';
        
//         const totalDelay = (elementIndex * 0.5) + (wordIndex * 0.1) + (charIndex * 0.03);
//         span.style.animationDelay = `${totalDelay}s`;
        
//         wordSpan.appendChild(span);
//       });
      
//       element.appendChild(wordSpan);
      
//       if (wordIndex < words.length - 1) {
//         element.appendChild(document.createTextNode(' '));
//       }
//     });
//   });
// }

// // Initialize split text on load
// window.addEventListener('load', splitText);

// // ========================================
// // COUNTER ANIMATION FOR STATS
// // ========================================
// function animateCounter(element, target, duration = 2000) {
//   let startTime = null;
//   const startValue = 0;
  
//   function updateCounter(currentTime) {
//     if (!startTime) startTime = currentTime;
//     const progress = Math.min((currentTime - startTime) / duration, 1);
    
//     const currentValue = Math.floor(progress * (target - startValue) + startValue);
//     element.textContent = currentValue + '+';
    
//     if (progress < 1) {
//       requestAnimationFrame(updateCounter);
//     } else {
//       element.textContent = target + '+';
//     }
//   }
  
//   requestAnimationFrame(updateCounter);
// }

// // Observe stat numbers
// const statsObserver = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       const target = parseInt(entry.target.getAttribute('data-count'));
//       animateCounter(entry.target, target);
//       statsObserver.unobserve(entry.target);
//     }
//   });
// }, { threshold: 0.5 });

// document.addEventListener('DOMContentLoaded', () => {
//   const statNumbers = document.querySelectorAll('.stat-number');
//   statNumbers.forEach(stat => statsObserver.observe(stat));
// });

// // ========================================
// // PARALLAX EFFECT FOR GLOW ELEMENTS
// // ========================================
// window.addEventListener('scroll', () => {
//   const scrolled = window.pageYOffset;
//   const glows = document.querySelectorAll('.glow-effect');
  
//   glows.forEach((glow, index) => {
//     const speed = 0.3 + (index * 0.1);
//     const yPos = -(scrolled * speed);
//     glow.style.transform = `translateY(${yPos}px)`;
//   });
// });

// // ========================================
// // CARDS TILT EFFECT ON MOUSE MOVE
// // ========================================
// function addTiltEffect(cards) {
//   cards.forEach(card => {
//     card.addEventListener('mousemove', handleTilt);
//     card.addEventListener('mouseleave', resetTilt);
//   });
// }

// function handleTilt(e) {
//   const card = e.currentTarget;
//   const rect = card.getBoundingClientRect();
//   const x = e.clientX - rect.left;
//   const y = e.clientY - rect.top;
  
//   const centerX = rect.width / 2;
//   const centerY = rect.height / 2;
  
//   const rotateX = (y - centerY) / 20;
//   const rotateY = (centerX - x) / 20;
  
//   card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
// }

// function resetTilt(e) {
//   const card = e.currentTarget;
//   card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
// }

// // Apply tilt effect to cards
// document.addEventListener('DOMContentLoaded', () => {
//   const philosophyCards = document.querySelectorAll('.philosophy-card');
//   const valueCards = document.querySelectorAll('.value-card');
  
//   addTiltEffect([...philosophyCards, ...valueCards]);
// });

// // ========================================
// // TIMELINE ANIMATION
// // ========================================
// const timelineObserver = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
//       timelineObserver.unobserve(entry.target);
//     }
//   });
// }, { threshold: 0.3 });

// document.addEventListener('DOMContentLoaded', () => {
//   const timelineItems = document.querySelectorAll('.timeline-item');
//   timelineItems.forEach((item, index) => {
//     item.style.opacity = '0';
//     item.style.animationDelay = `${index * 0.2}s`;
//     timelineObserver.observe(item);
//   });
// });

// // ========================================
// // APPROACH STEPS PROGRESS ANIMATION
// // ========================================
// const approachObserver = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       const stepLine = entry.target.querySelector('.step-line');
//       if (stepLine) {
//         stepLine.style.animation = 'lineGrow 1s ease-out forwards';
//       }
//     }
//   });
// }, { threshold: 0.5 });

// // Add line grow animation
// const style = document.createElement('style');
// style.textContent = `
//   @keyframes lineGrow {
//     from {
//       height: 0;
//       opacity: 0;
//     }
//     to {
//       height: 100%;
//       opacity: 1;
//     }
//   }
// `;
// document.head.appendChild(style);

// document.addEventListener('DOMContentLoaded', () => {
//   const approachSteps = document.querySelectorAll('.approach-step');
//   approachSteps.forEach(step => approachObserver.observe(step));
// });

// // ========================================
// // DYNAMIC PAGE TITLE ON BLUR
// // ========================================
// let originalTitle = document.title;

// window.addEventListener('blur', function() {
//   document.title = '👋 Come back! - ' + originalTitle;
// });

// window.addEventListener('focus', function() {
//   document.title = originalTitle;
// });

// // ========================================
// // BUTTON RIPPLE EFFECT
// // ========================================
// function createRipple(event) {
//   const button = event.currentTarget;
//   const ripple = document.createElement('span');
//   const rect = button.getBoundingClientRect();
  
//   const diameter = Math.max(rect.width, rect.height);
//   const radius = diameter / 2;
  
//   ripple.style.width = ripple.style.height = `${diameter}px`;
//   ripple.style.left = `${event.clientX - rect.left - radius}px`;
//   ripple.style.top = `${event.clientY - rect.top - radius}px`;
//   ripple.classList.add('ripple');
  
//   const rippleStyle = document.createElement('style');
//   rippleStyle.textContent = `
//     .ripple {
//       position: absolute;
//       border-radius: 50%;
//       background: rgba(255, 255, 255, 0.3);
//       transform: scale(0);
//       animation: ripple-animation 0.6s ease-out;
//       pointer-events: none;
//     }
    
//     @keyframes ripple-animation {
//       to {
//         transform: scale(4);
//         opacity: 0;
//       }
//     }
//   `;
  
//   if (!document.querySelector('style[data-ripple]')) {
//     rippleStyle.setAttribute('data-ripple', 'true');
//     document.head.appendChild(rippleStyle);
//   }
  
//   const existingRipple = button.querySelector('.ripple');
//   if (existingRipple) {
//     existingRipple.remove();
//   }
  
//   button.style.position = 'relative';
//   button.style.overflow = 'hidden';
//   button.appendChild(ripple);
  
//   setTimeout(() => ripple.remove(), 600);
// }

// // Add ripple effect to all buttons
// document.addEventListener('DOMContentLoaded', () => {
//   const buttons = document.querySelectorAll('.btn-cta-primary, .btn-cta-secondary, .btn-get-started');
//   buttons.forEach(button => {
//     button.addEventListener('click', createRipple);
//   });
// });

// // ========================================
// // PERFORMANCE MONITORING
// // ========================================
// window.addEventListener('load', function() {
//   const perfData = window.performance.timing;
//   const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  
//   console.log('Page Load Time:', pageLoadTime + 'ms');
  
//   if (pageLoadTime > 3000) {
//     console.warn('Page load time is high. Consider optimizing assets.');
//   }
// });

// // ========================================
// // CONSOLE BRANDING
// // ========================================
// console.log('%c🔒 KalkiNetra - AI Security Research Lab', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
// console.log('%cExplore. Secure. Innovate.', 'color: #5ce1ff; font-size: 14px;');
// console.log('%cInterested in joining our mission? Visit: https://kalkinetra.com/join', 'color: #00ffff; font-size: 12px;');

// // ========================================
// // DETECT SCROLL DIRECTION
// // ========================================
// let lastScrollTop = 0;

// window.addEventListener('scroll', function() {
//   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
//   if (scrollTop > lastScrollTop) {
//     // Scrolling down
//     document.body.classList.add('scrolling-down');
//     document.body.classList.remove('scrolling-up');
//   } else {
//     // Scrolling up
//     document.body.classList.add('scrolling-up');
//     document.body.classList.remove('scrolling-down');
//   }
  
//   lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
// }, false);

// // ========================================
// // PREFETCH LINKS ON HOVER
// // ========================================
// document.querySelectorAll('a[href]').forEach(link => {
//   link.addEventListener('mouseenter', function() {
//     const href = this.getAttribute('href');
    
//     if (href && href.endsWith('.html') && !href.startsWith('http')) {
//       const prefetchLink = document.createElement('link');
//       prefetchLink.rel = 'prefetch';
//       prefetchLink.href = href;
//       document.head.appendChild(prefetchLink);
//     }
//   });
// });

// // ========================================
// // INITIALIZE ALL FEATURES
// // ========================================
// document.addEventListener('DOMContentLoaded', function() {
//   console.log('About page initialized successfully');
  
//   // Add loaded class to body for CSS transitions
//   document.body.classList.add('page-loaded');
// });



// ========================================
// ABOUT PAGE - SPECIFIC FUNCTIONALITY
// ========================================

window.addEventListener('DOMContentLoaded', function() {
  
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
  // COUNTER ANIMATION FOR STATS
  // ========================================
  function animateCounter(element, target, duration = 2000) {
    let startTime = null;
    const startValue = 0;
    
    function updateCounter(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const currentValue = Math.floor(progress * (target - startValue) + startValue);
      element.textContent = currentValue + '+';
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + '+';
      }
    }
    
    requestAnimationFrame(updateCounter);
  }
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        animateCounter(entry.target, target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => statsObserver.observe(stat));
  
  // ========================================
  // CARDS TILT EFFECT ON MOUSE MOVE (DESKTOP ONLY)
  // ========================================
  if (window.innerWidth > 768) {
    function addTiltEffect(cards) {
      cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
      });
    }
    
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
    
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    const valueCards = document.querySelectorAll('.value-card');
    
    addTiltEffect([...philosophyCards, ...valueCards]);
  }
  
  // ========================================
  // TIMELINE ANIMATION
  // ========================================
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.animationDelay = `${index * 0.2}s`;
    timelineObserver.observe(item);
  });
  
  // ========================================
  // APPROACH STEPS PROGRESS ANIMATION
  // ========================================
  const approachObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stepLine = entry.target.querySelector('.step-line');
        if (stepLine) {
          stepLine.style.animation = 'lineGrow 1s ease-out forwards';
        }
      }
    });
  }, { threshold: 0.5 });
  
  // Add line grow animation dynamically
  if (!document.querySelector('style[data-line-grow]')) {
    const style = document.createElement('style');
    style.setAttribute('data-line-grow', 'true');
    style.textContent = `
      @keyframes lineGrow {
        from {
          height: 0;
          opacity: 0;
        }
        to {
          height: 100%;
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  const approachSteps = document.querySelectorAll('.approach-step');
  approachSteps.forEach(step => approachObserver.observe(step));
  
  // ========================================
  // DYNAMIC PAGE TITLE ON BLUR
  // ========================================
  let originalTitle = document.title;
  
  // window.addEventListener('blur', function() {
  //   document.title = '👋 Come back! - ' + originalTitle;
  // });
  
  window.addEventListener('focus', function() {
    document.title = originalTitle;
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
  
  const buttons = document.querySelectorAll('.btn-cta-primary, .btn-cta-secondary, .btn-get-started');
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
  console.log('%cExplore. Secure. Innovate.', 'color: #3388ff; font-size: 14px;');
  console.log('%cInterested in joining our mission? Visit the About page', 'color: #1a75ff; font-size: 12px;');
  
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
  
  console.log('About page initialized successfully');
});
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
  // PILLAR CARDS INTERACTION
  // ========================================
  const pillarCards = document.querySelectorAll('.pillar-card');
  
  pillarCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });
  
  // ========================================
  // TILT EFFECT ON CARDS (DESKTOP ONLY)
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
      
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    }
    
    function resetTilt(e) {
      const card = e.currentTarget;
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    }
    
    const featureCards = document.querySelectorAll('.feature-card');
    addTiltEffect([...pillarCards, ...featureCards]);
  }
  
  // ========================================
  // PARALLAX EFFECT FOR GLOW ELEMENTS
  // ========================================
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const glows = document.querySelectorAll('.glow-effect');
    
    glows.forEach((glow, index) => {
      const speed = 0.2 + (index * 0.1);
      const yPos = -(scrolled * speed);
      glow.style.transform = `translateY(${yPos}px)`;
    });
  });
  
  // ========================================
  // SMOOTH SCROLL TO ANCHOR LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
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
  
  const buttons = document.querySelectorAll('.btn-cta-primary, .btn-cta-secondary, .btn-research');
  buttons.forEach(button => {
    button.addEventListener('click', createRipple);
  });
  
  // ========================================
  // DYNAMIC PAGE TITLE ON BLUR/FOCUS
  // ========================================
  let originalTitle = document.title;
  
  // window.addEventListener('blur', function() {
  //   document.title = '🔮 See the Future of AI Security - ' + originalTitle;
  // });
  
  window.addEventListener('focus', function() {
    document.title = originalTitle;
  });
  
  // ========================================
  // PILLAR CARDS SEQUENTIAL ANIMATION
  // ========================================
  const pillarObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }, index * 100);
        pillarObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  document.querySelectorAll('.pillar-card').forEach(card => {
    card.style.opacity = '0';
    pillarObserver.observe(card);
  });
  
  // ========================================
  // CONSOLE BRANDING
  // ========================================
  console.log('%c🔮 DRISHTI Framework', 'color: #0066ff; font-size: 24px; font-weight: bold;');
  console.log('%cPerceive Deeper. Defend Smarter.', 'color: #3388ff; font-size: 16px; font-weight: 600;');
  console.log('%cExplore the future of AI security at KalkiNetra', 'color: #1a75ff; font-size: 14px;');
  
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
    
    console.log('DRISHTI Page Load Time:', pageLoadTime + 'ms');
    
    if (pageLoadTime > 3000) {
      console.warn('Page load time is high. Consider optimizing assets.');
    }
  });
  
  // ========================================
  // ADD LOADED CLASS TO BODY
  // ========================================
  document.body.classList.add('page-loaded');
  
  console.log('✅ DRISHTI Framework page initialized successfully');
});














// ADD THIS CODE TO THE EXISTING framework.js (after the DOMContentLoaded function)

// ========================================
// INTERACTIVE DRISHTI CIRCLE
// ========================================
(function() {
  const circle = document.querySelector(".drishti-circle");
  const letterItems = document.querySelectorAll(".pillar-letter-item");
  const dotItems = document.querySelectorAll(".pillar-dot");
  const contentItems = document.querySelectorAll(".pillar-content-item");
  
  if (!circle || !letterItems.length) return;

  let currentRotation = 0;
  let isAnimating = false;
  const degrees = 360 / letterItems.length; // 51.43 degrees per item
  
  // Position dots and letters around the circle
  function positionElements() {
    const dotsTranslateY = window.innerWidth <= 576 ? "-149px" :
                           window.innerWidth <= 767 ? "-169px" :
                           window.innerWidth <= 991 ? "-189px" :
                           window.innerWidth <= 1200 ? "-209px" : "-239px";
                           
    const lettersTranslateY = window.innerWidth <= 576 ? "-175px" :
                              window.innerWidth <= 767 ? "-195px" :
                              window.innerWidth <= 991 ? "-215px" :
                              window.innerWidth <= 1200 ? "-235px" : "-270px";

    letterItems.forEach((item) => {
      const letterInner = item.querySelector(".letter-inner");
      const angle = parseInt(item.getAttribute("data-angle"));
      item.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(${lettersTranslateY})`;
      letterInner.style.transform = `rotate(${-angle}deg)`;
    });

    dotItems.forEach((dot) => {
      const angle = parseInt(dot.getAttribute("data-angle"));
      dot.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(${dotsTranslateY})`;
    });
  }

  positionElements();
  window.addEventListener("resize", positionElements);
  window.addEventListener("orientationchange", positionElements);

  // Update active state based on rotation
  function updateActiveState() {
    const circleRect = circle.getBoundingClientRect();
    const circleCenterX = circleRect.left + circleRect.width / 2;
    const circleCenterY = circleRect.top + circleRect.height / 2;
    const tolerance = Math.PI / 6;

    letterItems.forEach((letter, index) => {
      const letterRect = letter.getBoundingClientRect();
      const letterCenterX = letterRect.left + letter.offsetWidth / 2;
      const letterCenterY = letterRect.top + letter.offsetHeight / 2;
      const angle = Math.atan2(letterCenterY - circleCenterY, letterCenterX - circleCenterX);
      const angleDifference = Math.abs(angle);

      if (angleDifference <= tolerance) {
        letter.classList.add("active");
        
        contentItems.forEach((content, contentIndex) => {
          if (index === contentIndex) {
            content.classList.add("active");
          } else {
            content.classList.remove("active");
          }
        });

        dotItems.forEach((dot, dotIndex) => {
          if (index === dotIndex) {
            dot.classList.add("active");
          } else {
            dot.classList.remove("active");
          }
        });
      } else {
        letter.classList.remove("active");
      }
    });
  }

  // Rotate circle animation
  function rotateCircle(direction) {
    if (isAnimating) return;
    
    isAnimating = true;
    const step = direction === 1 ? degrees : -degrees;
    const newRotation = currentRotation + step;
    
    // Animate circle rotation
    circle.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    circle.style.transform = `rotate(${newRotation}deg)`;
    
    // Animate letters counter-rotation
    letterItems.forEach(item => {
      const letterInner = item.querySelector(".letter-inner");
      letterInner.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
      const angle = parseInt(item.getAttribute("data-angle"));
      letterInner.style.transform = `rotate(${-angle - newRotation}deg)`;
    });
    
    currentRotation = newRotation;
    
    setTimeout(() => {
      updateActiveState();
      isAnimating = false;
    }, 500);
  }

  // Desktop: Mouse wheel scroll
  let scrollTimeout;
  circle.addEventListener("wheel", (e) => {
    e.preventDefault();
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (e.deltaY > 0) {
        rotateCircle(-1); // Scroll down, rotate clockwise
      } else {
        rotateCircle(1); // Scroll up, rotate counter-clockwise
      }
    }, 50);
  }, { passive: false });

  // Mobile: Touch swipe
  let touchStartY = 0;
  let touchEndY = 0;
  
  circle.addEventListener("touchstart", (e) => {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  
  circle.addEventListener("touchend", (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeDistance = touchStartY - touchEndY;
    const minSwipeDistance = 30;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        rotateCircle(-1); // Swipe up
      } else {
        rotateCircle(1); // Swipe down
      }
    }
  }

  // Click on letters/dots to navigate
  letterItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (isAnimating) return;
      
      // Calculate how many steps to rotate
      const currentIndex = Array.from(letterItems).findIndex(l => l.classList.contains("active"));
      const steps = index - currentIndex;
      
      if (steps !== 0) {
        isAnimating = true;
        const newRotation = currentRotation + (steps * degrees);
        
        circle.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        circle.style.transform = `rotate(${newRotation}deg)`;
        
        letterItems.forEach(item => {
          const letterInner = item.querySelector(".letter-inner");
          letterInner.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
          const angle = parseInt(item.getAttribute("data-angle"));
          letterInner.style.transform = `rotate(${-angle - newRotation}deg)`;
        });
        
        currentRotation = newRotation;
        
        setTimeout(() => {
          updateActiveState();
          isAnimating = false;
        }, 600);
      }
    });
  });

  dotItems.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      letterItems[index].click();
    });
  });

  // Keyboard navigation (arrow keys)
  document.addEventListener("keydown", (e) => {
    const pillarsSection = document.querySelector(".pillars-section");
    const rect = pillarsSection.getBoundingClientRect();
    
    // Only respond to arrow keys when pillars section is in view
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        rotateCircle(1);
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        rotateCircle(-1);
      }
    }
  });

  // Initialize
  updateActiveState();
  
  console.log("✅ Interactive DRISHTI circle initialized");
})();
// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const animation = entry.target.getAttribute('data-animation');
      const delay = index * 0.15;
      
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay * 1000);
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Form submission handler
const form = document.querySelector('.join-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      organization: document.getElementById('organization').value,
      interest: document.getElementById('interest').value,
      message: document.getElementById('message').value
    };
    
    // Here you would normally send the data to your server
    console.log('Form submitted:', formData);
    
    // Show success message (you can customize this)
    alert('Thank you for your interest! We will get back to you soon.');
    
    // Reset form
    form.reset();
  });
}

// Parallax effect for glow elements
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const glows = document.querySelectorAll('.glow-effect');
  
  glows.forEach((glow, index) => {
    const speed = 0.3 + (index * 0.1);
    const yPos = -(scrolled * speed);
    glow.style.transform = `translateY(${yPos}px)`;
  });
});

// Add hover effect to form inputs
const inputs = document.querySelectorAll('.glass-input');
inputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'translateY(-2px)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'translateY(0)';
  });
});

// Animate counter or stats if needed
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Add particle effect on button hover (optional enhancement)
document.querySelectorAll('.btn-primary-cta, .btn-submit').forEach(button => {
  button.addEventListener('mouseenter', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Navbar scroll effect (if you're including it)
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.glass-navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// Form validation with real-time feedback
const emailInput = document.getElementById('email');
if (emailInput) {
  emailInput.addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value) && this.value !== '') {
      this.style.borderColor = '#ff4444';
      
      // Add error message if doesn't exist
      if (!this.parentElement.querySelector('.error-message')) {
        const errorMsg = document.createElement('small');
        errorMsg.className = 'error-message';
        errorMsg.style.color = '#ff4444';
        errorMsg.textContent = 'Please enter a valid email address';
        this.parentElement.appendChild(errorMsg);
      }
    } else {
      this.style.borderColor = 'rgba(0, 212, 255, 0.2)';
      const errorMsg = this.parentElement.querySelector('.error-message');
      if (errorMsg) errorMsg.remove();
    }
  });
}

// Add typing indicator for textarea
const messageTextarea = document.getElementById('message');
if (messageTextarea) {
  let typingTimer;
  const doneTypingInterval = 1000;
  
  messageTextarea.addEventListener('keyup', function() {
    clearTimeout(typingTimer);
    const charCount = this.value.length;
    
    // Add character counter if doesn't exist
    if (!this.parentElement.querySelector('.char-count')) {
      const counter = document.createElement('small');
      counter.className = 'char-count';
      counter.style.cssText = 'color: var(--color-text-muted); float: right; margin-top: 0.5rem;';
      this.parentElement.appendChild(counter);
    }
    
    const counterElement = this.parentElement.querySelector('.char-count');
    counterElement.textContent = `${charCount} characters`;
    
    if (charCount > 500) {
      counterElement.style.color = 'var(--color-blue-light)';
    }
  });
}

// Intersection observer for counting animations (if you add stats)
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const endValue = parseInt(target.getAttribute('data-count'));
      animateValue(target, 0, endValue, 2000);
      statsObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });

// Add magnetic effect to buttons (advanced interaction)
document.querySelectorAll('.btn-primary-cta, .btn-outline-cta, .btn-submit').forEach(button => {
  button.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const moveX = x * 0.15;
    const moveY = y * 0.15;
    
    this.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = 'translate(0, 0)';
  });
});

// Loading animation for form submission
function showLoadingState(button) {
  const originalText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Submitting...';
  button.style.opacity = '0.7';
  
  // Simulate processing
  setTimeout(() => {
    button.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Submitted!';
    button.style.background = 'linear-gradient(135deg, rgba(0, 255, 0, 0.2), rgba(0, 200, 0, 0.2))';
    
    setTimeout(() => {
      button.disabled = false;
      button.innerHTML = originalText;
      button.style.opacity = '1';
      button.style.background = '';
    }, 2000);
  }, 1500);
}

// Update form submission with loading state
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('.btn-submit');
    
    // Validate all required fields
    const requiredFields = this.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#ff4444';
        setTimeout(() => {
          field.style.borderColor = 'rgba(0, 212, 255, 0.2)';
        }, 2000);
      }
    });
    
    if (isValid) {
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        organization: document.getElementById('organization').value,
        interest: document.getElementById('interest').value,
        message: document.getElementById('message').value
      };
      
      console.log('Form submitted:', formData);
      showLoadingState(submitButton);
      
      // Reset form after successful submission
      setTimeout(() => {
        this.reset();
      }, 2000);
    } else {
      // Show error notification
      const errorNotif = document.createElement('div');
      errorNotif.className = 'error-notification';
      errorNotif.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(255, 68, 68, 0.9);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        backdrop-filter: blur(10px);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
      `;
      errorNotif.innerHTML = '<i class="bi bi-exclamation-circle-fill me-2"></i>Please fill in all required fields';
      document.body.appendChild(errorNotif);
      
      setTimeout(() => {
        errorNotif.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => errorNotif.remove(), 300);
      }, 3000);
    }
  });
}

// Add CSS for notifications dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  .btn-ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    width: 20px;
    height: 20px;
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(10);
      opacity: 0;
    }
  }
  
  .error-message {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    animation: fadeInUp 0.3s ease-out;
  }
`;
document.head.appendChild(style);

// Add Easter egg - Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
  
  if (konamiCode.join('') === konamiSequence.join('')) {
    document.body.style.animation = 'rainbow 2s infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

// Performance optimization - Lazy load images if any
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Console message for developers
console.log('%c🔒 KalkiNetra - AI Security Research Lab', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cInterested in AI Security? Check out our opportunities!', 'color: #5ce1ff; font-size: 14px;');
console.log('%cVisit: https://kalkinetra.com/join', 'color: #00ffff; font-size: 12px;');




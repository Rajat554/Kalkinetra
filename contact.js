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
  // NAVBAR FUNCTIONALITY
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
  
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
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
        const animation = entry.target.getAttribute('data-animation');
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all animated elements
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));
  
  // ========================================
  // CHARACTER COUNTER FOR MESSAGE TEXTAREA
  // ========================================
  const messageTextarea = document.getElementById('message');
  const charCountDisplay = document.getElementById('charCount');
  const maxChars = 1000;
  
  if (messageTextarea && charCountDisplay) {
    messageTextarea.addEventListener('input', function() {
      const charCount = this.value.length;
      charCountDisplay.textContent = charCount;
      
      const counter = charCountDisplay.parentElement;
      
      if (charCount > maxChars) {
        counter.classList.add('error');
        counter.classList.remove('warning');
        this.value = this.value.substring(0, maxChars);
      } else if (charCount > maxChars * 0.9) {
        counter.classList.add('warning');
        counter.classList.remove('error');
      } else {
        counter.classList.remove('warning', 'error');
      }
    });
  }
  
  // ========================================
  // FORM VALIDATION FUNCTIONS
  // ========================================
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Add error class
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="bi bi-exclamation-circle me-1"></i>${message}`;
    formGroup.appendChild(errorDiv);
  }
  
  function showFieldSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    // Remove error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Add success class
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
  }
  
  function clearFieldValidation(fieldId) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    formGroup.classList.remove('error', 'success');
    const errorMsg = formGroup.querySelector('.error-message');
    if (errorMsg) errorMsg.remove();
  }
  
  // Real-time email validation
  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      if (this.value && !validateEmail(this.value)) {
        showFieldError('email', 'Please enter a valid email address');
      } else if (this.value) {
        showFieldSuccess('email');
      }
    });
    
    emailInput.addEventListener('focus', function() {
      clearFieldValidation('email');
    });
    
    // Detect paste
    emailInput.addEventListener('paste', function() {
      setTimeout(() => {
        const pastedValue = this.value.trim();
        if (validateEmail(pastedValue)) {
          showFieldSuccess('email');
        }
      }, 100);
    });
  }
  
  // ========================================
  // NOTIFICATION SYSTEM
  // ========================================
  function showNotification(type, title, message, duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const iconMap = {
      success: 'bi-check-circle-fill',
      error: 'bi-exclamation-circle-fill',
      info: 'bi-info-circle-fill'
    };
    
    notification.innerHTML = `
      <i class="bi ${iconMap[type]} notification-icon"></i>
      <div class="notification-content">
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
      </div>
      <button class="notification-close" aria-label="Close notification">
        <i class="bi bi-x"></i>
      </button>
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after duration
    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
      }
    }, duration);
  }
  
  // ========================================
  // CONTACT FORM SUBMISSION
  // ========================================
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        organization: document.getElementById('organization').value.trim(),
        inquiryType: document.getElementById('inquiryType').value,
        message: document.getElementById('message').value.trim(),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      
      // Validate required fields
      let isValid = true;
      
      if (!formData.name) {
        showFieldError('name', 'Name is required');
        isValid = false;
      } else if (formData.name.length < 2) {
        showFieldError('name', 'Name must be at least 2 characters');
        isValid = false;
      }
      
      if (!formData.email) {
        showFieldError('email', 'Email is required');
        isValid = false;
      } else if (!validateEmail(formData.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
      }
      
      if (!formData.inquiryType) {
        showFieldError('inquiryType', 'Please select an inquiry type');
        isValid = false;
      }
      
      if (!formData.message) {
        showFieldError('message', 'Message is required');
        isValid = false;
      } else if (formData.message.length < 10) {
        showFieldError('message', 'Message must be at least 10 characters');
        isValid = false;
      }
      
      // Check honeypot
      const honeypot = this.querySelector('input[name="website"]');
      if (honeypot && honeypot.value !== '') {
        console.warn('Spam detected - honeypot filled');
        return false;
      }
      
      if (!isValid) {
        showNotification('error', 'Validation Error', 'Please fill in all required fields correctly.');
        return;
      }
      
      // Show loading state
      const submitBtn = this.querySelector('.btn-submit');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');
      
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoader.style.display = 'flex';
      
      // Simulate API call (replace with actual API endpoint)
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // ========================================
        // PRINT FORM DATA TO CONSOLE
        // ========================================
        console.log('%c=================================', 'color: #0066ff; font-weight: bold;');
        console.log('%c📧 CONTACT FORM SUBMISSION', 'color: #0066ff; font-size: 16px; font-weight: bold;');
        console.log('%c=================================', 'color: #0066ff; font-weight: bold;');
        console.log('%cSubmission Details:', 'color: #3388ff; font-weight: bold; font-size: 14px;');
        console.table(formData);
        console.log('%c=================================', 'color: #0066ff; font-weight: bold;');
        console.log('%c=================================', 'color: #0066ff; font-weight: bold;');
        console.log('%c📧 CONTACT FORM SUBMISSION', 'color: #0066ff; font-size: 16px; font-weight: bold;');
        console.log('%c=================================', 'color: #0066ff; font-weight: bold;');
        console.log('%cSubmission Details:', 'color: #3388ff; font-weight: bold; font-size: 14px;');
        console.table(formData);
        console.log('%cRaw Data Object:', 'color: #3388ff; font-weight: bold;');
        console.log(JSON.stringify(formData, null, 2));
        console.log('%c=================================', 'color: #0066ff; font-weight: bold;');
        
        // Success
        showNotification(
          'success',
          'Message Sent!',
          'Thank you for contacting us. We\'ll get back to you within 24-48 hours.'
        );
        
        // Reset form
        contactForm.reset();
        
        // Clear all validations
        ['name', 'email', 'organization', 'inquiryType', 'message'].forEach(id => {
          clearFieldValidation(id);
        });
        
        // Reset character counter
        if (charCountDisplay) {
          charCountDisplay.textContent = '0';
        }
        
        // Clear draft from localStorage
        localStorage.removeItem('contactFormDraft');
        
      } catch (error) {
        console.error('Error submitting form:', error);
        showNotification(
          'error',
          'Submission Failed',
          'There was an error sending your message. Please try again.'
        );
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'flex';
        btnLoader.style.display = 'none';
      }
    });
  }
  
  // ========================================
  // NEWSLETTER FORM SUBMISSION
  // ========================================
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('.newsletter-input');
      const email = emailInput.value.trim();
      
      if (!validateEmail(email)) {
        showNotification('error', 'Invalid Email', 'Please enter a valid email address.');
        emailInput.focus();
        return;
      }
      
      const submitBtn = this.querySelector('.btn-newsletter');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Subscribing...';
      
      try {
        // Simulate API call (replace with actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Log newsletter subscription
        console.log('%c=================================', 'color: #0066ff; font-weight: bold;');
        console.log('%c📰 NEWSLETTER SUBSCRIPTION', 'color: #0066ff; font-size: 16px; font-weight: bold;');
        console.log('%c=================================', 'color: #0066ff; font-weight: bold;');
        console.log('Email:', email);
        console.log('Timestamp:', new Date().toISOString());
        console.log('%c=================================', 'color: #0066ff; font-weight: bold;');
        
        // Success
        showNotification(
          'success',
          'Subscribed!',
          'You\'ve been successfully subscribed to our newsletter.'
        );
        
        // Reset form
        newsletterForm.reset();
        
      } catch (error) {
        console.error('Error subscribing:', error);
        showNotification(
          'error',
          'Subscription Failed',
          'There was an error. Please try again later.'
        );
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
  
  // ========================================
  // FAQ ACCORDION
  // ========================================
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function() {
      const faqItem = this.closest('.faq-item');
      const wasActive = faqItem.classList.contains('active');
      
      // Close all FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Open clicked item if it wasn't already active
      if (!wasActive) {
        faqItem.classList.add('active');
      }
    });
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
  // DYNAMIC PLACEHOLDER TEXT
  // ========================================
  const placeholderExamples = {
    general: 'I have a question about your research on adversarial AI...',
    collaboration: 'I would like to explore a partnership opportunity for...',
    research: 'We are conducting research on AI security and would like to collaborate on...',
    'early-access': 'I am interested in testing your prompt injection prevention toolkit for...',
    media: 'I am writing an article about AI security and would like to interview...',
    careers: 'I am interested in the AI Security Researcher position and have experience in...',
    support: 'I am experiencing an issue with...',
    other: 'Tell us about your inquiry, project, or how we can help...'
  };
  
  const inquiryTypeSelect = document.getElementById('inquiryType');
  if (inquiryTypeSelect && messageTextarea) {
    inquiryTypeSelect.addEventListener('change', function() {
      const selectedType = this.value;
      if (placeholderExamples[selectedType]) {
        messageTextarea.placeholder = placeholderExamples[selectedType];
        messageTextarea.style.animation = 'fadeInUp 0.3s ease-out';
      }
    });
  }
  
  // ========================================
  // FORM AUTO-SAVE TO LOCAL STORAGE (DRAFT)
  // ========================================
  const formFields = ['name', 'email', 'organization', 'inquiryType', 'message'];
  let autoSaveInterval;
  
  if (contactForm) {
    // Save draft every 15 seconds
    autoSaveInterval = setInterval(() => {
      const draft = {};
      formFields.forEach(field => {
        const element = document.getElementById(field);
        if (element && element.value) {
          draft[field] = element.value;
        }
      });
      
      if (Object.keys(draft).length > 0) {
        localStorage.setItem('contactFormDraft', JSON.stringify(draft));
        console.log('Draft auto-saved');
      }
    }, 15000);
    
    // Load draft on page load
    const savedDraft = localStorage.getItem('contactFormDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        
        // Ask user if they want to restore draft
        setTimeout(() => {
          const restore = confirm('We found a saved draft of your message. Would you like to restore it?');
          
          if (restore) {
            Object.keys(draft).forEach(field => {
              const element = document.getElementById(field);
              if (element) {
                element.value = draft[field];
                
                // Update character counter if message field
                if (field === 'message' && charCountDisplay) {
                  charCountDisplay.textContent = draft[field].length;
                }
              }
            });
            
            showNotification('info', 'Draft Restored', 'Your previous message has been restored.');
          } else {
            localStorage.removeItem('contactFormDraft');
          }
        }, 1000);
      } catch (error) {
        console.error('Error loading draft:', error);
        localStorage.removeItem('contactFormDraft');
      }
    }
  }
  
  // ========================================
  // BUSINESS HOURS DETECTION
  // ========================================
  function isBusinessHours() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    
    // Business hours: Mon-Fri, 9 AM - 6 PM
    const isWeekday = day >= 1 && day <= 5;
    const isWorkingHours = hour >= 9 && hour < 18;
    
    return isWeekday && isWorkingHours;
  }
  
  // Update response banner based on business hours
  const bannerDescription = document.querySelector('.banner-description');
  if (bannerDescription) {
    const statusHtml = isBusinessHours() 
      ? '<span class="business-hours-indicator"><span class="status-dot"></span>We\'re online now!</span>'
      : '<span class="business-hours-indicator offline"><i class="bi bi-moon-fill me-1"></i>Outside business hours</span>';
    
    bannerDescription.innerHTML += '<br>' + statusHtml;
  }
  
  // ========================================
  // SPAM PROTECTION - HONEYPOT FIELD
  // ========================================
  function createHoneypot() {
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.style.position = 'absolute';
    honeypot.style.left = '-9999px';
    honeypot.style.top = '-9999px';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';
    honeypot.setAttribute('aria-hidden', 'true');
    
    if (contactForm) {
      contactForm.appendChild(honeypot);
    }
  }
  
  createHoneypot();
  
  // ========================================
  // RATE LIMITING - PREVENT SPAM SUBMISSIONS
  // ========================================
  const SUBMISSION_COOLDOWN = 60000; // 1 minute
  let lastSubmissionTime = 0;
  
  function canSubmitForm() {
    const now = Date.now();
    const timeSinceLastSubmission = now - lastSubmissionTime;
    return timeSinceLastSubmission >= SUBMISSION_COOLDOWN;
  }
  
  function getRemainingCooldown() {
    const now = Date.now();
    const timeSinceLastSubmission = now - lastSubmissionTime;
    const remainingMs = SUBMISSION_COOLDOWN - timeSinceLastSubmission;
    return Math.ceil(remainingMs / 1000);
  }
  
  if (contactForm) {
    const originalSubmit = contactForm.onsubmit;
    contactForm.addEventListener('submit', function(e) {
      if (!canSubmitForm() && lastSubmissionTime > 0) {
        e.preventDefault();
        const remainingSeconds = getRemainingCooldown();
        showNotification(
          'error',
          'Please Wait',
          `You can submit another message in ${remainingSeconds} seconds.`
        );
        
        // Reset button state
        const submitBtn = this.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        submitBtn.disabled = false;
        btnText.style.display = 'flex';
        btnLoader.style.display = 'none';
        
        return false;
      }
      lastSubmissionTime = Date.now();
    }, true);
  }
  
  // ========================================
  // KEYBOARD SHORTCUTS
  // ========================================
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      if (document.activeElement.tagName === 'TEXTAREA') {
        e.preventDefault();
        const form = document.activeElement.closest('form');
        if (form) {
          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      }
    }
    
    // ESC to close notifications
    if (e.key === 'Escape') {
      const notifications = document.querySelectorAll('.notification');
      notifications.forEach(notification => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
      });
    }
  });
  
  // ========================================
  // COPY EMAIL ON CLICK
  // ========================================
  document.querySelectorAll('.contact-method').forEach(method => {
    method.addEventListener('click', function(e) {
      // Only for email links
      if (this.href && this.href.startsWith('mailto:')) {
        e.preventDefault();
        
        const email = this.href.replace('mailto:', '');
        
        // Try to copy to clipboard
        if (navigator.clipboard) {
          navigator.clipboard.writeText(email).then(() => {
            showNotification('success', 'Email Copied!', `${email} has been copied to your clipboard.`, 3000);
          }).catch(() => {
            // Fallback: just open email client
            window.location.href = this.href;
          });
        } else {
          // No clipboard API, just open email client
          window.location.href = this.href;
        }
      }
    });
  });
  
  // ========================================
  // INPUT ANIMATIONS
  // ========================================
  document.querySelectorAll('.glass-input').forEach(input => {
    input.addEventListener('focus', function() {
      this.style.transition = 'all 0.3s ease';
      this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'translateY(0)';
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
  
  const buttons = document.querySelectorAll('.btn-submit, .btn-newsletter');
  buttons.forEach(button => {
    button.addEventListener('click', createRipple);
  });
  
  // ========================================
  // NETWORK STATUS MONITORING
  // ========================================
  window.addEventListener('online', function() {
    showNotification('success', 'Back Online', 'Your internet connection has been restored.', 3000);
  });
  
  window.addEventListener('offline', function() {
    showNotification('error', 'No Internet', 'You appear to be offline. Please check your connection.', 5000);
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
  // PREFETCH LINKS ON HOVER
  // ========================================
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('mouseenter', function() {
      const href = this.getAttribute('href');
      
      // Only prefetch internal pages
      if (href && href.endsWith('.html') && !href.startsWith('http')) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        document.head.appendChild(prefetchLink);
      }
    });
  });
  
  // ========================================
  // CONSOLE BRANDING
  // ========================================
  console.log('%c🔒 KalkiNetra - AI Security Research Lab', 'color: #0066ff; font-size: 20px; font-weight: bold;');
  console.log('%cContact Page', 'color: #3388ff; font-size: 14px;');
  console.log('%cNeed help? Email: contact@kalkinetra.com', 'color: #1a75ff; font-size: 12px;');
  
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
  // TRACK



    // ========================================
  // TRACK FORM ANALYTICS (WITHOUT PERSONAL DATA)
  // ========================================
  function trackFormInteraction(action, label = '') {
    console.log('%cForm Analytics:', 'color: #0066ff; font-weight: bold;', {
      action,
      label,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
    
    // Replace with your analytics service (Google Analytics, Mixpanel, etc.)
    // Example: gtag('event', action, { 'event_label': label });
  }
  
  // Track form start
  if (contactForm) {
    let formStarted = false;
    
    contactForm.addEventListener('focusin', function() {
      if (!formStarted) {
        trackFormInteraction('form_started');
        formStarted = true;
      }
    });
  }
  
  // Track inquiry type selection
  if (inquiryTypeSelect) {
    inquiryTypeSelect.addEventListener('change', function() {
      trackFormInteraction('inquiry_type_selected', this.value);
    });
  }
  
  // ========================================
  // PERFORMANCE MONITORING
  // ========================================
  window.addEventListener('load', function() {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    console.log('%cPerformance Metrics:', 'color: #0066ff; font-weight: bold;');
    console.log('Page Load Time:', pageLoadTime + 'ms');
    
    if (pageLoadTime > 3000) {
      console.warn('⚠️ Page load time is high. Consider optimizing assets.');
    } else {
      console.log('✅ Page load time is optimal');
    }
  });
  
  // ========================================
  // ANALYTICS: TRACK TIME ON PAGE
  // ========================================
  let pageLoadTime = Date.now();
  
  window.addEventListener('beforeunload', function() {
    const timeOnPage = Math.floor((Date.now() - pageLoadTime) / 1000);
    console.log('Time on page:', timeOnPage, 'seconds');
    
    // Send to analytics
    trackFormInteraction('time_on_page', `${timeOnPage}s`);
  });
  
  // ========================================
  // FORM FIELD AUTO-FILL DETECTION
  // ========================================
  document.querySelectorAll('.glass-input').forEach(input => {
    // Detect browser autofill
    const checkAutofill = () => {
      if (input.matches(':-webkit-autofill')) {
        input.classList.add('autofilled');
        console.log('Autofill detected for:', input.id);
      }
    };
    
    requestAnimationFrame(checkAutofill);
    
    // Check periodically
    setTimeout(checkAutofill, 100);
    setTimeout(checkAutofill, 500);
  });
  
  // ========================================
  // SCROLL TO TOP ON PAGE LOAD IF HASH
  // ========================================
  if (window.location.hash) {
    setTimeout(() => {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
  
  // ========================================
  // EASTER EGG - KONAMI CODE
  // ========================================
  let konamiCode = [];
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
      showNotification('success', '🎉 Secret Unlocked!', 'You found the Konami code! Welcome to the secret club.', 5000);
      
      // Add fun animation
      document.body.style.animation = 'rainbow 3s ease infinite';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 10000);
      
      console.log('%c🎮 KONAMI CODE ACTIVATED! 🎮', 'color: #00ff88; font-size: 20px; font-weight: bold;');
    }
  });
  
  // Add rainbow animation
  if (!document.querySelector('style[data-rainbow]')) {
    const style = document.createElement('style');
    style.setAttribute('data-rainbow', 'true');
    style.textContent = `
      @keyframes rainbow {
        0%, 100% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(360deg); }
      }
      
      .autofilled {
        animation: autofill-detected 0.3s ease-out;
      }
      
      @keyframes autofill-detected {
        from {
          transform: scale(0.98);
        }
        to {
          transform: scale(1);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // ========================================
  // ERROR HANDLING
  // ========================================
  window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Optionally show user-friendly error message in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      showNotification('error', 'Error Detected', 'A JavaScript error occurred. Check console for details.', 5000);
    }
  });
  
  // ========================================
  // PREVENT FORM RESUBMISSION ON PAGE REFRESH
  // ========================================
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
  
  // ========================================
  // DETECT ADBLOCK (OPTIONAL)
  // ========================================
  function detectAdBlock() {
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox ad-placement ad-placeholder';
    testAd.style.height = '1px';
    document.body.appendChild(testAd);
    
    window.setTimeout(function() {
      if (testAd.offsetHeight === 0) {
        console.log('ℹ️ Ad blocker detected - Some features may be affected');
      }
      testAd.remove();
    }, 100);
  }
  
  detectAdBlock();
  
  // ========================================
  // SMART FORM SUGGESTIONS
  // ========================================
  if (contactForm) {
    // Suggest name capitalization
    const nameInput = document.getElementById('name');
    if (nameInput) {
      nameInput.addEventListener('blur', function() {
        if (this.value) {
          // Capitalize first letter of each word
          this.value = this.value
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        }
      });
    }
    
    // Email domain suggestions
    const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
    if (emailInput) {
      emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        if (email.includes('@')) {
          const [localPart, domain] = email.split('@');
          
          // Check for common typos
          const typoFixes = {
            'gmial.com': 'gmail.com',
            'gmai.com': 'gmail.com',
            'yahooo.com': 'yahoo.com',
            'outlok.com': 'outlook.com',
            'hotmial.com': 'hotmail.com'
          };
          
          if (typoFixes[domain]) {
            const suggestion = `${localPart}@${typoFixes[domain]}`;
            const useSuggestion = confirm(`Did you mean: ${suggestion}?`);
            if (useSuggestion) {
              this.value = suggestion;
              showFieldSuccess('email');
            }
          }
        }
      });
    }
  }
  
  // ========================================
  // ACCESSIBILITY ENHANCEMENTS
  // ========================================
  
  // Announce form errors to screen readers
  function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => announcement.remove(), 3000);
  }
  
  // Add screen reader only class
  if (!document.querySelector('style[data-sr-only]')) {
    const srStyle = document.createElement('style');
    srStyle.setAttribute('data-sr-only', 'true');
    srStyle.textContent = `
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    `;
    document.head.appendChild(srStyle);
  }
  
  // ========================================
  // MOBILE OPTIMIZATIONS
  // ========================================
  if (window.innerWidth < 768) {
    // Disable parallax on mobile for better performance
    window.removeEventListener('scroll', () => {});
    
    // Reduce animation complexity
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.style.animation = 'fadeIn 0.5s ease-out forwards';
    });
    
    console.log('📱 Mobile optimizations applied');
  }
  
  // ========================================
  // SESSION STORAGE FOR FORM PROGRESS
  // ========================================
  if (contactForm) {
    // Save form progress on input
    contactForm.addEventListener('input', function(e) {
      const progress = {
        currentField: e.target.id,
        timestamp: Date.now()
      };
      sessionStorage.setItem('formProgress', JSON.stringify(progress));
    });
    
    // Check if user was filling form recently
    const savedProgress = sessionStorage.getItem('formProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        const timeDiff = Date.now() - progress.timestamp;
        
        // If less than 5 minutes ago
        if (timeDiff < 300000) {
          const field = document.getElementById(progress.currentField);
          if (field) {
            setTimeout(() => {
              field.focus();
              field.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
          }
        }
      } catch (error) {
        console.error('Error loading form progress:', error);
      }
    }
  }
  
  // ========================================
  // INITIALIZE ALL FEATURES
  // ========================================
  console.log('%c✅ Contact page initialized successfully', 'color: #00ff88; font-weight: bold;');
  
  // Track page view
  trackFormInteraction('page_view', window.location.pathname);
  
  // Log system info for debugging
  console.log('%cSystem Info:', 'color: #3388ff; font-weight: bold;');
  console.table({
    'User Agent': navigator.userAgent,
    'Screen Size': `${window.innerWidth}x${window.innerHeight}`,
    'Time Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    'Business Hours': isBusinessHours() ? 'Yes' : 'No',
    'Online Status': navigator.onLine ? 'Online' : 'Offline'
  });
  
  // Add page loaded class
  document.body.classList.add('page-loaded');
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', function() {
    if (autoSaveInterval) {
      clearInterval(autoSaveInterval);
    }
  });
  
});

// ========================================
// END OF SCRIPT
// ========================================
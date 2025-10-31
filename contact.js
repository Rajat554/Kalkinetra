// ========================================
// KALKINETRA CONTACT PAGE SCRIPT
// Cleaned: No Navbar | No Background Effects
// ========================================

window.addEventListener('DOMContentLoaded', function() {
  
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
    
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="bi bi-exclamation-circle me-1"></i>${message}`;
    formGroup.appendChild(errorDiv);
  }
  
  function showFieldSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();
    
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
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    });
    
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
      
      const honeypot = contactForm.querySelector('input[name="website"]');
      if (honeypot && honeypot.value !== '') {
        console.warn('Spam detected - honeypot filled');
        return false;
      }
      
      if (!isValid) {
        showNotification('error', 'Validation Error', 'Please fill in all required fields correctly.');
        return;
      }
      
      const submitBtn = contactForm.querySelector('.btn-submit');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');
      
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoader.style.display = 'flex';
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('%c=================================', 'color: #0066ff; font-weight: bold;');
        console.log('%c📧 CONTACT FORM SUBMISSION', 'color: #0066ff; font-size: 16px; font-weight: bold;');
        console.log('%c=================================', 'color: #0066ff; font-weight: bold;');
        console.log('%cSubmission Details:', 'color: #3388ff; font-weight: bold; font-size: 14px;');
        console.table(formData);
        console.log('%cRaw Data Object:', 'color: #3388ff; font-weight: bold;');
        console.log(JSON.stringify(formData, null, 2));
        console.log('%c=================================', 'color: #0066ff; font-weight: bold;');
        
        showNotification(
          'success',
          'Message Sent!',
          'Thank you for contacting us. We\'ll get back to you within 24-48 hours.'
        );
        
        contactForm.reset();
        
        ['name', 'email', 'organization', 'inquiryType', 'message'].forEach(id => {
          clearFieldValidation(id);
        });
        
        if (charCountDisplay) charCountDisplay.textContent = '0';
        localStorage.removeItem('contactFormDraft');
        
      } catch (error) {
        console.error('Error submitting form:', error);
        showNotification(
          'error',
          'Submission Failed',
          'There was an error sending your message. Please try again.'
        );
      } finally {
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
      
      const input = this.querySelector('.newsletter-input');
      const email = input.value.trim();
      
      if (!validateEmail(email)) {
        showNotification('error', 'Invalid Email', 'Please enter a valid email address.');
        input.focus();
        return;
      }
      
      const submitBtn = this.querySelector('.btn-newsletter');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Subscribing...';
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('%c=================================', 'color: #0066ff; font-weight: bold;');
        console.log('%c📰 NEWSLETTER SUBSCRIPTION', 'color: #0066ff; font-size: 16px; font-weight: bold;');
        console.log('%c=================================', 'color: #0066ff; font-weight: bold;');
        console.log('Email:', email);
        console.log('Timestamp:', new Date().toISOString());
        console.log('%c=================================', 'color: #0066ff; font-weight: bold;');
        
        showNotification('success', 'Subscribed!', 'You\'ve been successfully subscribed to our newsletter.');
        newsletterForm.reset();
        
      } catch (error) {
        console.error('Error subscribing:', error);
        showNotification('error', 'Subscription Failed', 'There was an error. Please try again later.');
      } finally {
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
      
      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
      
      if (!wasActive) faqItem.classList.add('active');
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
      }
    }, 15000);
    
    const savedDraft = localStorage.getItem('contactFormDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        
        setTimeout(() => {
          const restore = confirm('We found a saved draft of your message. Would you like to restore it?');
          
          if (restore) {
            Object.keys(draft).forEach(field => {
              const element = document.getElementById(field);
              if (element) {
                element.value = draft[field];
                
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
    
    const isWeekday = day >= 1 && day <= 5;
    const isWorkingHours = hour >= 9 && hour < 18;
    
    return isWeekday && isWorkingHours;
  }
  
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
    contactForm.addEventListener('submit', function(e) {
      if (!canSubmitForm() && lastSubmissionTime > 0) {
        e.preventDefault();
        const remainingSeconds = getRemainingCooldown();
        showNotification(
          'error',
          'Please Wait',
          `You can submit another message in ${remainingSeconds} seconds.`
        );
        
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
      if (document.activeElement?.tagName === 'TEXTAREA') {
        const form = document.activeElement.closest('form');
        if (form) {
          form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }
      }
    }
    
    // ESC to close notifications
    if (e.key === 'Escape') {
      document.querySelectorAll('.notification').forEach(notification => {
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
      if (this.href && this.href.startsWith('mailto:')) {
        e.preventDefault();
        
        const email = this.href.replace('mailto:', '');
        
        if (navigator.clipboard) {
          navigator.clipboard.writeText(email).then(() => {
            showNotification('success', 'Email Copied!', `${email} has been copied to your clipboard.`, 3000);
          }).catch(() => {
            window.location.href = this.href;
          });
        } else {
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
          to { transform: scale(4); opacity: 0; }
        }
      `;
      document.head.appendChild(rippleStyle);
    }
    
    const existing = button.querySelector('.ripple');
    if (existing) existing.remove();
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }
  
  const buttons = document.querySelectorAll('.btn-submit, .btn-newsletter');
  buttons.forEach(btn => btn.addEventListener('click', createRipple));
  
  // ========================================
  // NETWORK STATUS MONITORING
  // ========================================
  window.addEventListener('online', () => {
    showNotification('success', 'Back Online', 'Your internet connection has been restored.', 3000);
  });
  
  window.addEventListener('offline', () => {
    showNotification('error', 'No Internet', 'You appear to be offline. Please check your connection.', 5000);
  });
  
  // ========================================
  // DYNAMIC PAGE TITLE ON BLUR
  // ========================================
  const originalTitle = document.title;
  
  window.addEventListener('blur', () => {
    document.title = '👋 Come back! - ' + originalTitle;
  });
  
  window.addEventListener('focus', () => {
    document.title = originalTitle;
  });
  
  // ========================================
  // PREFETCH LINKS ON HOVER
  // ========================================
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('mouseenter', function() {
      const href = this.getAttribute('href');
      if (href && href.endsWith('.html') && !href.startsWith('http')) {
        const prefetch = document.createElement('link');
        prefetch.rel = 'prefetch';
        prefetch.href = href;
        document.head.appendChild(prefetch);
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
  // FORM ANALYTICS TRACKING
  // ========================================
  function trackFormInteraction(action, label = '') {
    console.log('%cForm Analytics:', 'color: #0066ff; font-weight: bold;', {
      action,
      label,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
  }
  
  // Track form start
  if (contactForm) {
    let formStarted = false;
    contactForm.addEventListener('focusin', () => {
      if (!formStarted) {
        trackFormInteraction('form_started');
        formStarted = true;
      }
    });
  }
  
  // Track inquiry type
  if (inquiryTypeSelect) {
    inquiryTypeSelect.addEventListener('change', function() {
      trackFormInteraction('inquiry_type_selected', this.value);
    });
  }
  
  // ========================================
  // PERFORMANCE MONITORING
  // ========================================
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    console.log('%cPerformance Metrics:', 'color: #0066ff; font-weight: bold;');
    console.log('Page Load Time:', loadTime + 'ms');
    
    if (loadTime > 3000) {
      console.warn('⚠️ Page load time is high. Consider optimizing assets.');
    } else {
      console.log('✅ Page load time is optimal');
    }
  });
  
  // ========================================
  // TIME ON PAGE TRACKING
  // ========================================
  const pageLoadTime = Date.now();
  
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.floor((Date.now() - pageLoadTime) / 1000);
    console.log('Time on page:', timeOnPage, 'seconds');
    trackFormInteraction('time_on_page', `${timeOnPage}s`);
  });
  
  // ========================================
  // AUTO-FILL DETECTION
  // ========================================
  document.querySelectorAll('.glass-input').forEach(input => {
    const checkAutofill = () => {
      if (input.matches(':-webkit-autofill')) {
        input.classList.add('autofilled');
        console.log('Autofill detected for:', input.id);
      }
    };
    
    requestAnimationFrame(checkAutofill);
    [100, 500].forEach(t => setTimeout(checkAutofill, t));
  });
  
  // ========================================
  // SCROLL TO HASH ON LOAD
  // ========================================
  if (window.location.hash) {
    setTimeout(() => {
      const el = document.querySelector(window.location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
  
  // ========================================
  // EASTER EGG - KONAMI CODE
  // ========================================
  let konamiCode = [];
  const konamiSequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  
  document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
      showNotification('success', '🎉 Secret Unlocked!', 'You found the Konami code! Welcome to the secret club.', 5000);
      
      document.body.style.animation = 'rainbow 3s ease infinite';
      setTimeout(() => document.body.style.animation = '', 10000);
      
      console.log('%c🎮 KONAMI CODE ACTIVATED! 🎮', 'color: #00ff88; font-size: 20px; font-weight: bold;');
    }
  });
  
  // Add rainbow animation if not present
  if (!document.querySelector('style[data-rainbow]')) {
    const style = document.createElement('style');
    style.setAttribute('data-rainbow', 'true');
    style.textContent = `
      @keyframes rainbow { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }
      @keyframes autofill-detected { from { transform: scale(0.98); } to { transform: scale(1); } }
    `;
    document.head.appendChild(style);
  }
  
  // ========================================
  // ERROR HANDLING
  // ========================================
  window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
  });
  
  // ========================================
  // PREVENT FORM RESUBMISSION ON REFRESH
  // ========================================
  if (history.replaceState) {
    history.replaceState(null, null, window.location.href);
  }
  
  // ========================================
  // ADBLOCK DETECTION (OPTIONAL)
  // ========================================
  function detectAdBlock() {
    const test = document.createElement('div');
    test.innerHTML = '&nbsp;';
    test.className = 'adsbox ad-placement';
    test.style.height = '1px';
    document.body.appendChild(test);
    
    setTimeout(() => {
      if (test.offsetHeight === 0) {
        console.log('ℹ️ Ad blocker detected - Some features may be affected');
      }
      test.remove();
    }, 100);
  }
  
  detectAdBlock();
  
  // ========================================
  // SMART FORM SUGGESTIONS
  // ========================================
  if (contactForm) {
    const nameInput = document.getElementById('name');
    if (nameInput) {
      nameInput.addEventListener('blur', function() {
        if (this.value) {
          this.value = this.value
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        }
      });
    }
    
    if (emailInput) {
      emailInput.addEventListener('blur',      function() {
        const email = this.value.trim();
        if (email.includes('@')) {
          const [localPart, domain] = email.split('@');
          
          const typoFixes = {
            'gmial.com': 'gmail.com',
            'gmai.com': 'gmail.com',
            'yahooo.com': 'yahoo.com',
            'outlok.com': 'outlook.com',
            'hotmial.com': 'hotmail.com'
          };
          
          if (typoFixes[domain]) {
            const suggestion = `${localPart}@${typoFixes[domain]}`;
            if (confirm(`Did you mean: ${suggestion}?`)) {
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
  function announceToScreenReader(message) {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.className = 'sr-only';
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }

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
        border: 0;
      }
    `;
    document.head.appendChild(srStyle);
  }
  
  // ========================================
  // MOBILE OPTIMIZATIONS
  // ========================================
  if (window.innerWidth < 768) {
    // Reduce animation intensity
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.style.animation = 'fadeIn 0.5s ease-out forwards';
    });
    
    // Log device context
    console.log('📱 Mobile optimizations applied');
  }
  
  // ========================================
  // SESSION STORAGE FOR FORM PROGRESS
  // ========================================
  if (contactForm) {
    contactForm.addEventListener('input', function(e) {
      const progress = {
        currentField: e.target.id,
        timestamp: Date.now()
      };
      sessionStorage.setItem('formProgress', JSON.stringify(progress));
    });
    
    const savedProgress = sessionStorage.getItem('formProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        const timeDiff = Date.now() - progress.timestamp;
        
        if (timeDiff < 300000) { // < 5 minutes
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
  // FINAL INITIALIZATION
  // ========================================
  console.log('%c✅ Contact page initialized successfully', 'color: #00ff88; font-weight: bold;');
  
  // Track initial page view
  console.log('%cPage View:', 'color: #3388ff; font-weight: bold;', window.location.pathname);
  
  // Log system info (for debugging)
  console.log('%cSystem Info:', 'color: #3388ff; font-weight: bold;');
  console.log({
    'User Agent': navigator.userAgent,
    'Screen Size': `${window.innerWidth}×${window.innerHeight}`,
    'Time Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    'Is Business Hours': isBusinessHours(),
    'Online': navigator.onLine
  });
  
  // Add loaded class to body
  document.body.classList.add('page-loaded');
  
  // Cleanup interval on unload
  window.addEventListener('beforeunload', function() {
    if (autoSaveInterval) {
      clearInterval(autoSaveInterval);
    }
  });
});
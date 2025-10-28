// ========================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ========================================
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
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

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
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

// ========================================
// CHARACTER COUNTER FOR MESSAGE TEXTAREA
// ========================================
const messageTextarea = document.getElementById('message');
const charCountDisplay = document.getElementById('charCount');

if (messageTextarea && charCountDisplay) {
  messageTextarea.addEventListener('input', function() {
    const charCount = this.value.length;
    charCountDisplay.textContent = charCount;
    
    if (charCount > 500) {
      charCountDisplay.style.color = 'var(--color-blue-light)';
    } else {
      charCountDisplay.style.color = 'var(--color-text-muted)';
    }
  });
}

// ========================================
// FORM VALIDATION
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
      message: document.getElementById('message').value.trim()
    };
    
    // Validate required fields
    let isValid = true;
    
    if (!formData.name) {
      showFieldError('name', 'Name is required');
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
      
      // Log form data (replace with actual API call)
      console.log('Form submitted:', formData);
      
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
      
      console.log('Newsletter subscription:', email);
      
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
// COPY TO CLIPBOARD FUNCTIONALITY
// ========================================
document.querySelectorAll('.contact-method').forEach(method => {
  const emailMethod = method.querySelector('.method-value');
  if (emailMethod && emailMethod.textContent.includes('@')) {
    method.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      
      const email = emailMethod.textContent;
      navigator.clipboard.writeText(email).then(() => {
        showNotification('info', 'Copied!', `${email} copied to clipboard.`, 2000);
      });
    });
  }
});

// ========================================
// INPUT ANIMATIONS
// ========================================
document.querySelectorAll('.glass-input').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'translateY(-2px)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'translateY(0)';
  });
});

// ========================================
// CONSOLE BRANDING
// ========================================
console.log('%c🔒 KalkiNetra - AI Security Research Lab', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cNeed help? Contact us at contact@kalkinetra.com', 'color: #5ce1ff; font-size: 14px;');

// ========================================
// PREVENT FORM RESUBMISSION ON PAGE REFRESH
// ========================================
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

// ========================================
// ACCESSIBILITY: ESC KEY TO CLOSE NOTIFICATIONS
// ========================================
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    });
  }
});

// ========================================
// FORM AUTO-SAVE TO LOCAL STORAGE (DRAFT)
// ========================================
const formFields = ['name', 'email', 'organization', 'inquiryType', 'message'];

// Save draft every 10 seconds
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
  }, 10000);
  
  // Load draft on page load
  const savedDraft = localStorage.getItem('contactFormDraft');
  if (savedDraft) {
    try {
      const draft = JSON.parse(savedDraft);
      
      // Ask user if they want to restore draft
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
    } catch (error) {
      console.error('Error loading draft:', error);
      localStorage.removeItem('contactFormDraft');
    }
  }
  
  // Clear draft on successful submission
  contactForm.addEventListener('submit', () => {
    localStorage.removeItem('contactFormDraft');
    clearInterval(autoSaveInterval);
  });
}

// ========================================
// DETECT USER'S TIME ZONE FOR RESPONSE TIME
// ========================================
function getUserTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

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
  if (isBusinessHours()) {
    bannerDescription.innerHTML = `
      <i class="bi bi-circle-fill text-success me-2" style="font-size: 0.6rem;"></i>
      We're currently online! Our team typically responds within 2-4 hours during business hours.
    `;
  } else {
    bannerDescription.innerHTML += `
      <br><small style="color: var(--color-text-muted);">
        <i class="bi bi-moon-fill me-1"></i>
        Outside business hours - We'll respond on the next business day.
      </small>
    `;
  }
}

// ========================================
// TRACK FORM ANALYTICS (WITHOUT PERSONAL DATA)
// ========================================
function trackFormInteraction(action, label = '') {
  console.log('Form Analytics:', {
    action,
    label,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    timeZone: getUserTimeZone()
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
const inquiryTypeSelect = document.getElementById('inquiryType');
if (inquiryTypeSelect) {
  inquiryTypeSelect.addEventListener('change', function() {
    trackFormInteraction('inquiry_type_selected', this.value);
  });
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

// Check honeypot on form submission
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const honeypot = this.querySelector('input[name="website"]');
    if (honeypot && honeypot.value !== '') {
      e.preventDefault();
      console.warn('Spam detected - honeypot filled');
      // Don't show error to potential spammer
      return false;
    }
  });
}

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
  
  return Math.ceil(remainingMs / 1000); // Convert to seconds
}

if (contactForm) {
  const originalSubmitHandler = contactForm.onsubmit;
  
  contactForm.addEventListener('submit', function(e) {
    if (!canSubmitForm()) {
      e.preventDefault();
      const remainingSeconds = getRemainingCooldown();
      showNotification(
        'error',
        'Please Wait',
        `You can submit another message in ${remainingSeconds} seconds.`
      );
      return false;
    }
    
    lastSubmissionTime = Date.now();
  });
}

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

if (inquiryTypeSelect && messageTextarea) {
  inquiryTypeSelect.addEventListener('change', function() {
    const selectedType = this.value;
    if (placeholderExamples[selectedType]) {
      messageTextarea.placeholder = placeholderExamples[selectedType];
    }
  });
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
        form.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    }
  }
});

// ========================================
// ADD VISUAL FEEDBACK FOR COPY ACTION
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
// DETECT PASTE IN EMAIL FIELD
// ========================================
if (emailInput) {
  emailInput.addEventListener('paste', function(e) {
    setTimeout(() => {
      const pastedValue = this.value.trim();
      
      // Check if it looks like an email
      if (validateEmail(pastedValue)) {
        showFieldSuccess('email');
      }
    }, 100);
  });
}

// ========================================
// ADD LOADING SKELETON FOR SLOW CONNECTIONS
// ========================================
window.addEventListener('load', function() {
  // Remove any loading skeletons if they exist
  document.querySelectorAll('.skeleton-loader').forEach(skeleton => {
    skeleton.classList.add('loaded');
    setTimeout(() => skeleton.remove(), 300);
  });
});

// ========================================
// DETECT ADBLOCK AND SHOW FRIENDLY MESSAGE
// ========================================
function detectAdBlock() {
  const testAd = document.createElement('div');
  testAd.innerHTML = '&nbsp;';
  testAd.className = 'adsbox ad-placement ad-placeholder';
  testAd.style.height = '1px';
  document.body.appendChild(testAd);
  
  window.setTimeout(function() {
    if (testAd.offsetHeight === 0) {
      console.log('Ad blocker detected - Some features may be affected');
    }
    testAd.remove();
  }, 100);
}

detectAdBlock();

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
// SHOW NETWORK STATUS
// ========================================
window.addEventListener('online', function() {
  showNotification('success', 'Back Online', 'Your internet connection has been restored.', 3000);
});

window.addEventListener('offline', function() {
  showNotification('error', 'No Internet', 'You appear to be offline. Please check your connection.', 5000);
});

// ========================================
// FORM FIELD AUTO-FILL DETECTION
// ========================================
document.querySelectorAll('.glass-input').forEach(input => {
  // Detect browser autofill
  if (input.matches(':-webkit-autofill')) {
    input.classList.add('autofilled');
  }
  
  // Animation frame check for autofill
  const checkAutofill = () => {
    if (input.matches(':-webkit-autofill')) {
      input.classList.add('autofilled');
    }
  };
  
  requestAnimationFrame(checkAutofill);
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
// SCROLL TO TOP ON PAGE LOAD IF HASH
// ========================================
window.addEventListener('load', function() {
  if (window.location.hash) {
    setTimeout(() => {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
});

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
  }
});

// Add rainbow animation
const style = document.createElement('style');
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

// ========================================
// INITIALIZE ALL FEATURES ON DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('Contact page initialized successfully');
  
  // Track page view
  trackFormInteraction('page_view', window.location.pathname);
  
  // Log system info for debugging
  console.log('System Info:', {
    userAgent: navigator.userAgent,
    screenSize: `${window.innerWidth}x${window.innerHeight}`,
    timeZone: getUserTimeZone(),
    businessHours: isBusinessHours()
  });
});

// ========================================
// ERROR HANDLING
// ========================================
window.addEventListener('error', function(e) {
  console.error('JavaScript Error:', e.error);
  
  // Optionally show user-friendly error message
  if (process.env.NODE_ENV !== 'production') {
    showNotification('error', 'Error Detected', 'A JavaScript error occurred. Check console for details.', 5000);
  }
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
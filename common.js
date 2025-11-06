// ========================================
// DARKVEIL BACKGROUND IMPLEMENTATION
// Animated blue neural network background
// ========================================



// ========================================
// COMMON JAVASCRIPT
// Navbar functionality and shared utilities
// ========================================

window.addEventListener('load', function () {
  
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

  if (navbar) {
    window.addEventListener('scroll', updateNavbar);
    updateNavbar();
  }

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
  // MOBILE MENU TOGGLE (BURGER MENU)
  // ========================================
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    // Toggle menu on button click
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
      if (navbar && !navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
      }
    });
  }

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
  // CONSOLE MESSAGE
  // ========================================
  console.log('KalkiNetra - Common JS initialized');
});





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




// ========================================
// SECURITY INCIDENT MODAL
// ========================================

function openSecurityModal() {
  const modal = document.getElementById('securityModal');
  const body = document.body;
  
  if (modal) {
    modal.classList.add('active');
    body.style.overflow = 'hidden';
    
    // Reset form
    const form = document.getElementById('securityForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form) {
      form.reset();
      form.style.display = 'flex';
    }
    if (successMessage) {
      successMessage.style.display = 'none';
    }
  }
}

function closeSecurityModal() {
  const modal = document.getElementById('securityModal');
  const body = document.body;
  
  if (modal) {
    modal.classList.remove('active');
    body.style.overflow = '';
    
    // Optional: Reset form after close animation
    setTimeout(() => {
      const form = document.getElementById('securityForm');
      const successMessage = document.getElementById('successMessage');
      
      if (form) {
        form.reset();
        form.style.display = 'flex';
      }
      if (successMessage) {
        successMessage.style.display = 'none';
      }
    }, 300);
  }
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('securityModal');
    if (modal && modal.classList.contains('active')) {
      closeSecurityModal();
    }
  }
});

// Prevent modal content click from closing modal
document.addEventListener('DOMContentLoaded', function() {
  const modalContent = document.querySelector('.security-modal-content');
  if (modalContent) {
    modalContent.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
});

// ========================================
// FORM SUBMISSION HANDLER
// ========================================

function handleSecuritySubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitBtn = form.querySelector('.btn-submit');
  
  // Collect form data
  const formData = {
    organization: form.orgName.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    urgency: form.urgency.value,
    description: form.description.value.trim(),
    timestamp: new Date().toISOString(),
    referenceId: generateReferenceId()
  };
  
  // Validate form data
  if (!validateFormData(formData)) {
    return;
  }
  
  // Show loading state
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Submitting...';
  submitBtn.disabled = true;
  
  // Log data to console (for testing)
  console.log('Security Incident Report:', formData);
  
  // Simulate API call (replace with actual backend call)
  setTimeout(() => {
    // Show success message
    showSuccessMessage(formData.referenceId);
    
    // Reset button
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
    
    // Optional: Send to backend
    // sendToBackend(formData);
  }, 1500);
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function generateReferenceId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `SEC-${timestamp}-${random}`;
}

function validateFormData(data) {
  // Basic validation (browser handles required fields)
  if (!data.organization || data.organization.length < 2) {
    alert('Please enter a valid name or organization.');
    return false;
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    alert('Please enter a valid email address.');
    return false;
  }
  
  if (!data.phone || data.phone.length < 10) {
    alert('Please enter a valid phone number.');
    return false;
  }
  
  if (!data.urgency) {
    alert('Please select an urgency level.');
    return false;
  }
  
  if (!data.description || data.description.length < 20) {
    alert('Please provide a detailed description (minimum 20 characters).');
    return false;
  }
  
  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showSuccessMessage(referenceId) {
  const form = document.getElementById('securityForm');
  const successMessage = document.getElementById('successMessage');
  const referenceIdSpan = document.getElementById('referenceId');
  
  if (form && successMessage && referenceIdSpan) {
    // Hide form
    form.style.display = 'none';
    
    // Show success message
    referenceIdSpan.textContent = referenceId;
    successMessage.style.display = 'block';
    
    // Scroll to top of modal
    const modalContent = document.querySelector('.security-modal-content');
    if (modalContent) {
      modalContent.scrollTop = 0;
    }
  }
}

// ========================================
// BACKEND INTEGRATION (OPTIONAL)
// ========================================

function sendToBackend(formData) {
  // Example 1: Using Fetch API
  fetch('https://your-api-endpoint.com/api/security-reports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add authentication if needed
      // 'Authorization': 'Bearer YOUR_TOKEN'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
    // Use server-generated reference ID if available
    if (data.referenceId) {
      showSuccessMessage(data.referenceId);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to submit report. Please try again or contact us directly at security@kalkinetra.com');
    
    // Reset submit button
    const submitBtn = document.querySelector('.btn-submit');
    if (submitBtn) {
      submitBtn.innerHTML = '<i class="bi bi-send-fill"></i> Submit Report';
      submitBtn.disabled = false;
    }
  });
}

// Example 2: Using EmailJS
function sendViaEmailJS(formData) {
  // Add EmailJS script to HTML: 
  // <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
  
  emailjs.init('YOUR_PUBLIC_KEY');
  
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    to_email: 'security@kalkinetra.com',
    from_name: formData.organization,
    from_email: formData.email,
    phone: formData.phone,
    urgency: formData.urgency.toUpperCase(),
    message: formData.description,
    reference_id: formData.referenceId,
    timestamp: new Date(formData.timestamp).toLocaleString()
  })
  .then(function(response) {
    console.log('Email sent successfully:', response);
    showSuccessMessage(formData.referenceId);
  })
  .catch(function(error) {
    console.error('Email send failed:', error);
    alert('Failed to send report. Please contact us directly.');
  });
}

// Example 3: Using Formspree
function sendViaFormspree(formData) {
  fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      organization: formData.organization,
      email: formData.email,
      phone: formData.phone,
      urgency: formData.urgency,
      description: formData.description,
      referenceId: formData.referenceId,
      timestamp: formData.timestamp
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Formspree success:', data);
    showSuccessMessage(formData.referenceId);
  })
  .catch(error => {
    console.error('Formspree error:', error);
    alert('Failed to submit report. Please try again.');
  });
}

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('Security modal initialized');
  
  // Optional: Open modal with URL parameter
  // Example: yoursite.com?reportIncident=true
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('reportIncident') === 'true') {
    openSecurityModal();
  }
});
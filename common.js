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
/* =========================================
   SANTHIYA SACHIN — PORTFOLIO SCRIPT
   ========================================= */

'use strict';
emailjs.init({
    publicKey: "TpWtwhZOkvmXQqbbB"
});

// ─── TYPING ANIMATION ───────────────────────────────────────
const typingStrings = [
  'Data Analytics Student',
  'Web Development Student',
  'Python & SQL Enthusiast',
  'Power BI Dashboard Creator',
];

let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  if (!typingEl) return;
  const current = typingStrings[typeIndex];

  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 50 : 90;

  if (!isDeleting && charIndex === current.length) {
    speed = 1800; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typeIndex = (typeIndex + 1) % typingStrings.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

// Start after a short delay
setTimeout(type, 800);

// ─── NAVBAR SCROLL ──────────────────────────────────────────
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // run once on load

// ─── ACTIVE NAV LINK ────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

// ─── HAMBURGER MENU ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
  document.body.style.overflow = navLinksEl.classList.contains('open') ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinksEl.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── SMOOTH SCROLL ──────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 70; // navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── SCROLL REVEAL ──────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

// ─── BACK TO TOP ────────────────────────────────────────────
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── CONTACT FORM VALIDATION ────────────────────────────────
const form      = document.getElementById('contactForm');
const successEl = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.add('error');
  error.textContent = message;
  return false;
}

function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.remove('error');
  error.textContent = '';
}

// Live validation on blur
['name', 'email', 'subject', 'message'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', () => {
    clearError(id, `${id}Error`);
  });
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Clear previous errors
  ['name', 'email', 'subject', 'message'].forEach(id => clearError(id, `${id}Error`));
  successEl.style.display = 'none';

  let isValid = true;

  if (!name) {
    showError('name', 'nameError', 'Full name is required.');
    isValid = false;
  } else if (name.length < 2) {
    showError('name', 'nameError', 'Name must be at least 2 characters.');
    isValid = false;
  }

  if (!email) {
    showError('email', 'emailError', 'Email address is required.');
    isValid = false;
  } else if (!validateEmail(email)) {
    showError('email', 'emailError', 'Please enter a valid email address.');
    isValid = false;
  }

  if (!subject) {
    showError('subject', 'subjectError', 'Subject is required.');
    isValid = false;
  }

  if (!message) {
    showError('message', 'messageError', 'Message is required.');
    isValid = false;
  } else if (message.length < 10) {
    showError('message', 'messageError', 'Message must be at least 10 characters.');
    isValid = false;
  }

  if (!isValid) return;

  // Simulate sending
  submitBtn.textContent = 'Sending...';
submitBtn.disabled = true;

emailjs.sendForm(
    "default_service",
    "template_thj924q",
    form
)
.then(() => {
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;

    form.reset();
    successEl.style.display = 'block';

    setTimeout(() => {
        successEl.style.display = 'none';
    }, 5000);
})
.catch((error) => {
    console.error("EmailJS Error:", error);

    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;

    alert("EmailJS Error: " + JSON.stringify(error));
});
});

// ─── SKILL CARD ENTRANCE STAGGER ────────────────────────────
// ─── SKILLS SECTION INTERACTION ─────────────────────────────

const skillDetails = {
  HTML: {
    level: "Advanced",
    description: "Semantic markup, forms, accessibility and modern webpage structure."
  },
  CSS: {
    level: "Advanced",
    description: "Responsive layouts, Flexbox, Grid, animations and modern UI design."
  },
  JavaScript: {
    level: "Intermediate",
    description: "DOM manipulation, events, animations and interactive web applications."
  },
  Python: {
    level: "Intermediate",
    description: "Data analysis, automation, scripting and machine learning basics."
  },
  SQL: {
    level: "Intermediate",
    description: "Database design, queries, joins, filtering and data management."
  },
  Excel: {
    level: "Advanced",
    description: "Pivot tables, formulas, charts and business reporting."
  },
  "Power BI": {
    level: "Intermediate",
    description: "Interactive dashboards, reports and business intelligence."
  },
  "Google Colab": {
    level: "Intermediate",
    description: "Cloud notebooks for Python, data science and machine learning."
  }
};

document.querySelectorAll('.skill-card').forEach(card => {

  card.style.cursor = 'pointer';

  card.addEventListener('click', function () {

    const skillName = this.querySelector('.skill-name')?.textContent;

    if (!skillName) return;

    // Remove previous active card
    document.querySelectorAll('.skill-card').forEach(c => {
      c.classList.remove('active-skill');
    });

    // Add active effect
    this.classList.add('active-skill');

    // Get skill information
    const skill = skillDetails[skillName];

    if (!skill) return;

    // Create popup
    const popup = document.createElement('div');

    popup.innerHTML = `
      <div class="skill-popup-overlay">
        <div class="skill-popup">
          <span class="close-popup">&times;</span>
          <h2>${skillName}</h2>
          <h4>Level: ${skill.level}</h4>
          <p>${skill.description}</p>
        </div>
      </div>
    `;

    document.body.appendChild(popup);

    // Close button
    popup.querySelector('.close-popup').addEventListener('click', () => {
      popup.remove();
    });

    // Close on overlay click
    popup.querySelector('.skill-popup-overlay').addEventListener('click', (e) => {
      if (e.target.classList.contains('skill-popup-overlay')) {
        popup.remove();
      }
    });

  });

});

// ─── INIT COMPLETE ──────────────────────────────────────────
console.log('%cSanthiya Sachin Portfolio — Loaded ✅', 'color:#0d6efd;font-weight:700;font-size:14px;');

const navbarLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
  // Toggle mobile menu visibility
  document.body.classList.toggle("show-mobile-menu");
});

// Close menu when the close button is clicked
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

// Close menu when nav link is clicked
navbarLinks.forEach((link) => {
  link.addEventListener("click", () => menuOpenButton.click());
});

/* Initializing Swiper */
let swiper = new Swiper(".slider-wrapper", {
  loop: true,
  grabCursor: true,
  spaceBetween: 25,

  // Pagination bullets
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  /* Responsive breakpoints */
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Scroll button functionality
const scrollBtn = document.querySelector('.scroll_btn');
const footer = document.querySelector('footer');

window.addEventListener('scroll', () => {
    // Get the footer's position relative to the viewport
    const footerRect = footer.getBoundingClientRect();
    const footerVisible = footerRect.top <= window.innerHeight;
    
    // Show button when footer is visible and we're scrolling up
    if (footerVisible && window.scrollY > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

// Smooth scroll to top when button is clicked
scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const faders = document.querySelectorAll('.fade-in');
const sliders = document.querySelectorAll('.slide-in-left, .slide-in-right');

const appearOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

sliders.forEach(slider => {
  appearOnScroll.observe(slider);
});

function countUp(elementId, start, end, duration) {
  let element = document.getElementById(elementId);
  let range = end - start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  
  let current = start;
  let timer = setInterval(function() {
    current += increment;
    element.innerText = current;
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}
// Create an Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Check if the statistics section is in view
    if (entry.isIntersecting) {
      // Start the counters
      countUp("packages", 0, 250, 1000);
      countUp("clients", 0, 200, 1000);
      countUp("ports", 0, 2, 1000);
      countUp("goods", 0, 150, 1000);
      // Disconnect the observer after triggering the animation
      observer.disconnect();
    }
  });
}, { threshold: 0.5 }); // Trigger when 50% of the section is visible
// Observe the statistics section
document.addEventListener('DOMContentLoaded', () => {
  const statsSection = document.querySelector('.statistics-section');
  observer.observe(statsSection);
});

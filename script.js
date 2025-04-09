// JavaScript for Construction Landing Page

// DOM Elements
const header = document.getElementById("header");
const backToTop = document.getElementById("back-to-top");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const testimonialSlider = document.getElementById("testimonial-slider");
const dots = document.querySelectorAll(".dot");
const slides = document.querySelectorAll(".testimonial-slide");
let currentSlide = 0;

// Scroll Event Listener
window.addEventListener("scroll", function () {
  // Header Scroll Class
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
    backToTop.classList.add("active");
  } else {
    header.classList.remove("scrolled");
    backToTop.classList.remove("active");
  }

  // Animate elements on scroll
  animateOnScroll();
});

// Animate elements when they enter the viewport
function animateOnScroll() {
  const animatedElements = document.querySelectorAll(
    ".service-card, .benefit-card, .about-img, .contact-form, .about-stats"
  );

  animatedElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight * 0.8) {
      el.classList.add("aos-animate");
    }
  });
}

function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  slides[index].classList.add("active");
  dots[index].classList.add("active");
  currentSlide = index;
}

// Initialize animation on page load
document.addEventListener("DOMContentLoaded", function () {
  // Trigger initial animations
  animateOnScroll();

  // Remove initial blur from images after they load
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.onload = function () {
      this.classList.add("loaded");
    };

    // If image is already loaded
    if (img.complete) {
      img.classList.add("loaded");
    }
  });

  // Mobile Navigation
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking a nav link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Testimonial Slider - Dot Click Events
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Auto slide testimonials
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);

  // Back to Top Button Click Event
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  // Form Submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Form validation and submission logic would go here
      // This is just a placeholder
      alert("Form submitted successfully! We will contact you soon.");
      contactForm.reset();
    });
  }

  // Add 3D tilt effect to service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;

      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;

      const rotateY = mouseX / 10;
      const rotateX = -mouseY / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
      card.style.transition = "transform 0.5s ease";
    });
  });
});

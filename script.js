// Track color state
let isDefaultBackground = true;
const defaultBackground = 'linear-gradient(80deg, darkblue, lightblue)';

function changeColor(color) { 
  if (isDefaultBackground) {
    document.body.style.background = color;
    isDefaultBackground = false;
  } else {
    document.body.style.background = defaultBackground;
    isDefaultBackground = true;
  }
}

           const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

document.addEventListener("DOMContentLoaded", function () {

  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");

  burger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

});

// === CAROUSEL FUNCTIONALITY ===
let currentSlide = 0;

function getItemsPerView() {
  return window.innerWidth > 768 ? 2 : 1;
}

function initializeCarousel() {
  const carousel = document.getElementById('carouselProjects');
  const items = carousel.querySelectorAll('.carousel-item');
  const itemsPerView = getItemsPerView();
  const totalSlides = Math.ceil(items.length / itemsPerView);
  
  // Create dots
  const dotsContainer = document.getElementById('carouselDots');
  dotsContainer.innerHTML = ''; // Clear existing dots
  
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  }
  
  currentSlide = 0;
  updateCarousel();
}

function getCarouselGap() {
  const carousel = document.getElementById('carouselProjects');
  const style = window.getComputedStyle(carousel);
  return parseFloat(style.gap || style.columnGap || 0) || 0;
}

function updateCarousel() {
  const carousel = document.getElementById('carouselProjects');
  const items = carousel.querySelectorAll('.carousel-item');
  if (items.length === 0) return;
  const itemsPerView = getItemsPerView();
  const gap = getCarouselGap();
  const itemWidth = items[0].getBoundingClientRect().width;
  const offset = currentSlide * itemsPerView * (itemWidth + gap);
  carousel.style.transform = `translateX(-${offset}px)`;
  
  // Update dots
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateCarousel();
}

function nextProject() {
  const carousel = document.getElementById('carouselProjects');
  const items = carousel.querySelectorAll('.carousel-item');
  const itemsPerView = getItemsPerView();
  const totalSlides = Math.ceil(items.length / itemsPerView);
  
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function previousProject() {
  const carousel = document.getElementById('carouselProjects');
  const items = carousel.querySelectorAll('.carousel-item');
  const itemsPerView = getItemsPerView();
  const totalSlides = Math.ceil(items.length / itemsPerView);
  
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

// Initialize carousel when page loads
window.addEventListener('load', initializeCarousel);

// Reinitialize on window resize for responsive behavior
window.addEventListener('resize', () => {
  initializeCarousel();
});
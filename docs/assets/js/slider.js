/**
 * SLIDER.JS - Gestione di tutti gli slider del sito
 */

class SimpleSlider {
  constructor(selector, options = {}) {
    this.slider = document.querySelector(selector);
    this.slides = this.slider.querySelectorAll('.slide');
    this.currentSlide = 0;
    this.interval = options.interval || 5000;
    this.autoPlay = options.autoPlay !== false;
    
    this.init();
  }

  init() {
    // Mostra la prima slide
    this.showSlide(this.currentSlide);
    
    // Auto-play
    if (this.autoPlay) {
      this.startAutoPlay();
      
      // Pausa al hover
      this.slider.addEventListener('mouseenter', () => clearInterval(this.intervalId));
      this.slider.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    // Dots di navigazione (se presenti)
    if (this.slider.querySelector('.slider-dots')) {
      this.createDots();
    }
  }

  showSlide(index) {
    // Nascondi tutte le slide
    this.slides.forEach(slide => slide.classList.remove('active'));
    
    // Mostra la slide corrente
    this.slides[index].classList.add('active');
    
    // Aggiorna dots
    if (this.dots) {
      this.dots.forEach(dot => dot.classList.remove('active'));
      this.dots[index].classList.add('active');
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(this.currentSlide);
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.currentSlide);
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => this.nextSlide(), this.interval);
  }

  createDots() {
    const dotsContainer = this.slider.querySelector('.slider-dots');
    this.dots = [];
    
    this.slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      
      dot.addEventListener('click', () => {
        this.currentSlide = i;
        this.showSlide(i);
      });
      
      dotsContainer.appendChild(dot);
      this.dots.push(dot);
    });
  }
}

// Inizializzazione slider
document.addEventListener('DOMContentLoaded', () => {
  // Hero Slider
  if (document.querySelector('.hero-slider')) {
    new SimpleSlider('.hero-slider', { 
      interval: 6000,
      autoPlay: true
    });
  }

  // Slider Prodotti (mobile)
  if (window.innerWidth < 768 && document.querySelector('.products-slider')) {
    new SimpleSlider('.products-slider', {
      autoPlay: false
    });
  }

  // Slider Recensioni
  if (document.querySelector('.testimonials-slider')) {
    new SimpleSlider('.testimonials-slider', {
      interval: 8000,
      autoPlay: true
    });
  }
});
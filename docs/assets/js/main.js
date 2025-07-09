/* MAIN.JS - Funzioni globali del sito */

document.addEventListener('DOMContentLoaded', () => {
  // ================ MENU MOBILE ================
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    // Animazione hamburger
    hamburger.classList.toggle('active');
    // Mostra/nascondi menu
    navLinks.classList.toggle('active');
  });

  // Chiudi menu al click su un link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ================ ANIMAZIONI AL SCROLL ================
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .product-card, .team-member, .testimonial-card');
    
    elements.forEach(el => {
      const elementPosition = el.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        el.classList.add('show');
      }
    });
  };

  // Attiva al caricamento e allo scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);

  // ================ SMOOTH SCROLL PER LINK INTERNI ================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Gestione contatore carrello globale
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'inline-block' : 'none';
    });
}

// Aggiorna il contatore al caricamento di ogni pagina
document.addEventListener('DOMContentLoaded', updateCartCount);

let lastScroll = 0;
const header = document.querySelector('header'); // Assicurati di selezionare il tuo header
const scrollThreshold = 100; // Imposta la soglia a 100px

window.addEventListener("scroll", function() {
  let currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
    // Scorri giù e hai superato i 100px
    header.classList.add("nascosto");
  } else {
    // Scorri su o sei ancora nei primi 100px
    header.classList.remove("nascosto");
  }

  lastScroll = currentScroll;
});
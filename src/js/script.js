let imagens = [
  "src/assets/banner.png",
  "src/assets/area-alagada.png",
  "src/assets/voluntarios.png",
];

let i = 0;
let tempo = 5000;

function slideShow() {
  const banner = document.getElementById("banner-container");
  if (banner) {
    banner.style.backgroundImage = `url('${imagens[i]}')`;
    i++;
    if (i === imagens.length) {
      i = 0;
    }
  }
  setTimeout(slideShow, tempo);
}

slideShow();

const toggleBtn = document.getElementById("menu-toggle");
const menu = document.querySelector("#menu nav ul");

if (toggleBtn && menu) {
  toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  const menuLinks = menu.querySelectorAll("a");
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
}

const buttons = document.querySelectorAll(".theme-btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const color = btn.getAttribute("data-color");
    
    // Aplicar cor ao body
    document.body.style.backgroundColor = color;
    
    // Aplicar cor às seções que têm cores específicas
    const sectionsWithBackground = document.querySelectorAll('section:nth-child(even), #objetivos, #beneficios');
    sectionsWithBackground.forEach(section => {
      section.style.backgroundColor = color;
    });
    
    // Aplicar cor aos elementos com fundo alternativo
    const altBackgroundElements = document.querySelectorAll('.question-block label, #progress-container, #quiz-container, #result-container');
    altBackgroundElements.forEach(element => {
      element.style.backgroundColor = color;
    });
    
    // Ajustar a opacidade para elementos que precisam de um tom mais claro
    const lightBackgroundElements = document.querySelectorAll('.question-block label');
    lightBackgroundElements.forEach(element => {
      element.style.backgroundColor = color;
      element.style.opacity = '0.7';
    });
    
    // Para a chamada do quiz
    const quizCall = document.querySelector('.chamada-quiz');
    if (quizCall) {
      // Manter o gradiente do quiz mas com tons da cor escolhida
      if (color === '#f0f8ff') {
        quizCall.style.background = 'linear-gradient(135deg, #4285f4, #1e88e5)';
      } else if (color === '#fffacd') {
        quizCall.style.background = 'linear-gradient(135deg, #ff9800, #f57c00)';
      } else if (color === '#e6ffe6') {
        quizCall.style.background = 'linear-gradient(135deg, #4caf50, #2e7d32)';
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('#menu').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const headerHeight = document.querySelector('#menu').offsetHeight;
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerHeight - 50;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

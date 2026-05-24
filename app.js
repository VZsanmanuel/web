/**
 * VIZELEC - Lógica de Interactividad y UX Premium
 * Implementación de efectos visuales modernos, animaciones por scroll,
 * micro-interacciones dinámicas y validación avanzada de formularios.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de componentes
  initStickyHeader();
  initMobileMenu();
  initScrollReveal();
  initActiveSectionHighlighter();
  initCardHoverGlow();
  initWhatsAppLinks();
  initProjectSliders();
});

/**
 * 1. HEADER / NAVBAR STICKY
 * Agrega una clase con efecto de desenfoque y reducción de padding
 * al hacer scroll vertical mayor a 50 píxeles.
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  const scrollThreshold = 50;

  const toggleHeaderClass = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Ejecución inicial por si se recarga la página a mitad del documento
  toggleHeaderClass();
  window.addEventListener('scroll', toggleHeaderClass);
}

/**
 * 2. MENÚ MÓVIL (DRAWER RESPONSIVE)
 * Controla la apertura, cierre y accesibilidad del menú móvil
 * con efecto de deslizamiento y cambio de icono hamburguesa.
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  const toggleMenu = () => {
    const isOpen = navMenu.classList.contains('open');
    toggleBtn.classList.toggle('open', !isOpen);
    navMenu.classList.toggle('open', !isOpen);
    
    // Bloquear/desbloquear scroll del cuerpo al abrir el menú
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    toggleBtn.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', toggleMenu);

  // Cerrar menú al hacer clic en cualquier enlace
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar menú si se cambia el tamaño de la pantalla a escritorio
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
      closeMenu();
    }
  });
}

/**
 * 3. SISTEMA DE REVELADO AL HACER SCROLL (SCROLL REVEAL)
 * Utiliza IntersectionObserver para activar animaciones fluidas
 * cuando los componentes interactivos entran al viewport del usuario.
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-scale');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null, // viewport
      threshold: 0.15, // Se activa cuando el 15% del elemento es visible
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Dejar de observar el elemento una vez animado
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback para navegadores antiguos: hacer todo visible de inmediato
    revealElements.forEach(element => {
      element.classList.add('active');
    });
  }
}

/**
 * 4. ILUMINACIÓN ACTIVA DEL NAVBAR (SCROLL HIGHLIGHT)
 * Detecta qué sección está actualmente en pantalla y actualiza
 * la clase activa del enlace correspondiente en la barra de navegación.
 */
function initActiveSectionHighlighter() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // Compensación de navbar
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);
  highlightNav(); // Ejecutar en carga inicial
}

/**
 * 5. EFECTO HOVER DE SEGUIMIENTO DE MOUSE (CARD GLOW)
 * Registra las coordenadas relativas del mouse sobre las tarjetas de servicios
 * para proyectar un foco de luz radial inteligente en su fondo CSS.
 */
function initCardHoverGlow() {
  const cards = document.querySelectorAll('.service-card, .advantage-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // Coordenada X relativa
      const y = e.clientY - rect.top;  // Coordenada Y relativa

      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });
}


/**
 * 7. ENLACES AUTOMÁTICOS A WHATSAPP
 * Configura dinámicamente todos los botones de WhatsApp de la página
 * apuntando al número de la empresa VIZELEC (+542915761644) con mensajes personalizados.
 */
function initWhatsAppLinks() {
  const waNumber = '542915761644';
  const defaultMsg = encodeURIComponent('Hola VIZELEC, me pongo en contacto desde su sitio web para solicitar más información sobre sus servicios de ingeniería.');
  const budgetMsg = encodeURIComponent('Hola VIZELEC, me gustaría solicitar un presupuesto detallado para un proyecto de ingeniería/automatización.');

  // Botón flotante y botones estándar de WhatsApp
  const waFloat = document.querySelector('.whatsapp-float');
  const waBudgetBtns = document.querySelectorAll('[data-action="whatsapp-budget"]');
  const waContactBtns = document.querySelectorAll('[data-action="whatsapp-contact"]');

  if (waFloat) {
    waFloat.setAttribute('href', `https://wa.me/${waNumber}?text=${defaultMsg}`);
    waFloat.setAttribute('target', '_blank');
    waFloat.setAttribute('rel', 'noopener noreferrer');
  }

  waBudgetBtns.forEach(btn => {
    btn.setAttribute('href', `https://wa.me/${waNumber}?text=${budgetMsg}`);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  waContactBtns.forEach(btn => {
    btn.setAttribute('href', `https://wa.me/${waNumber}?text=${defaultMsg}`);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });
}

/**
 * 8. SLIDER DE IMÁGENES EN CASOS DE ÉXITO
 * Permite navegar de forma interactiva entre las imágenes reales de los proyectos
 * usando botones deslizantes prev/next y dots indicadores de posición.
 */
function initProjectSliders() {
  const sliders = document.querySelectorAll('.project-slider');
  
  sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');
    const dots = slider.querySelectorAll('.slider-dots .dot');
    
    if (!slides.length || !prevBtn || !nextBtn || !dots.length) return;
    
    let currentIndex = 0;
    
    const updateSlider = (index) => {
      // Ajustar límites cíclicos
      if (index < 0) {
        currentIndex = slides.length - 1;
      } else if (index >= slides.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
      
      // Actualizar visibilidad de diapositivas
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });
      
      // Actualizar estado activo de dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    };
    
    // Asignar controladores de eventos a botones prev/next
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Evitar disparar eventos hover/click de la tarjeta completa
      updateSlider(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateSlider(currentIndex + 1);
    });
    
    // Asignar controladores de eventos a los dots
    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        updateSlider(i);
      });
    });
  });
}


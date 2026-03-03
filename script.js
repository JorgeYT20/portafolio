/**
 * JORGE YATACO - PORTFOLIO SCRIPTS
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. ANIMACIÓN DE CONTADORES (HERO STATS)
    const stats = document.querySelectorAll('.stat-val');
    const statsSection = document.querySelector('.hero-stats-bar');

    const animateStats = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const updateCount = () => {
                const count = +stat.innerText;
                const increment = target / 50; // Velocidad de subida

                if (count < target) {
                    stat.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 30);
                } else {
                    stat.innerText = target;
                }
            };
            updateCount();
        });
    };

    // 2. REVEAL ON SCROLL (HABILIDADES Y ELEMENTOS)
    const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 120;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add("active");
            }
        });
    };

    // 3. FORMULARIO DE CONTACTO
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const status = document.getElementById("formStatus");
            status.textContent = "Mensaje enviado correctamente ✔️";
            status.style.color = "#22c55e";
            this.reset();
            setTimeout(() => { status.textContent = ""; }, 4000);
        });
    }

    // 4. OBSERVADOR PARA INICIAR CONTADORES CUANDO SEAN VISIBLES
    const statsObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            animateStats();
            statsObserver.disconnect(); // Solo se anima una vez
        }
    }, { threshold: 0.5 });

    if(statsSection) statsObserver.observe(statsSection);

    // EVENTOS DE SCROLL
    window.addEventListener("scroll", revealOnScroll);
    
    // EJECUCIÓN INICIAL
    revealOnScroll();
});

// LÓGICA PARA MENÚ MÓVIL
            const menuToggle = document.querySelector('.menu-toggle');
            const navMenu = document.querySelector('.nav-menu');

            if (menuToggle) {
                menuToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    // Opcional: animar el botón hamburguesa
                    menuToggle.classList.toggle('is-active');
                });
            }

            // Cerrar menú al hacer click en un link (móvil)
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });

// LÓGICA DE TABS DE HABILIDADES
const tabBtns = document.querySelectorAll('.tab-btn');
const skillGrids = document.querySelectorAll('.skills-grid');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Quitar clase active de todos los botones
        tabBtns.forEach(b => b.classList.remove('active'));
        // Quitar clase active de todas las grids
        skillGrids.forEach(g => g.classList.remove('active'));

        // Activar el seleccionado
        btn.classList.add('active');
        const target = btn.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
    });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card'); // Asegúrate de que tus tarjetas tengan esta clase

// Filtrar bonotes en proyectos
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Cambiar estado activo de botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.classList.contains(filterValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
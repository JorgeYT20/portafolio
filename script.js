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

// --- LÓGICA DE CERTIFICACIONES ---
// Estructura de datos para facilitar la asignación de 1 o 2 imágenes
const certificatesData = [
    {
        id: 1,
        title: "Modelamiento de datos SQL server",
        institution: "IDAT",
        // Ejemplo de 2 imágenes (frente y reverso)
        images: ["img-certificados/cert-idat-1.png", "img-certificados/cert-idat-2.png"] 
    },
    {
        id: 2,
        title: "Bases de datos",
        institution: "UNIVERSIDAD NACIONAL DE INGENIERIA",
        // Ejemplo de 1 imagen
        images: ["img-certificados/cert-uni-1.png", "img-certificados/cert-uni-2.png"]
    },
    {
        id: 3,
        title: "Especialización Python",
        institution: "Netzun",
        images: ["img-certificados/cert-netzun.png"]
    },
    {
        id: 4,
        title: "Microsoft Excel",
        institution: "Coursera",
        // Ejemplo de 2 imágenes (frente y reverso)
        images: ["img-certificados/cert-coursera.png"]
    },
    {
        id: 5,
        title: "Gestión de Proyectos Ágiles",
        institution: "Scrum Alliance",
        images: ["img/fondo.png"]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const certGrid = document.getElementById("certifications-grid");
    const certModal = document.getElementById("cert-modal");
    const certModalImg = document.getElementById("cert-modal-img");
    const certModalTitle = document.getElementById("cert-modal-title");
    const certModalInst = document.getElementById("cert-modal-institution");
    const certCloseBtn = document.getElementById("cert-modal-close");
    const btnPrev = document.getElementById("cert-nav-prev");
    const btnNext = document.getElementById("cert-nav-next");

    let currentCertIndex = null;
    let currentImageIndex = 0;

    // Renderizar tarjetas
    if (certGrid) {
        certificatesData.forEach((cert, index) => {
            const hasMultiple = cert.images.length > 1;
            
            const card = document.createElement("div");
            card.className = "cert-card";
            card.innerHTML = `
                <div class="cert-thumb">
                    <img src="${cert.images[0]}" alt="${cert.title}" loading="lazy">
                    ${hasMultiple ? '<div class="cert-badge">📄 2 Páginas</div>' : ''}
                    <div class="cert-overlay">
                        <span class="cert-view-btn">Ver Certificado</span>
                    </div>
                </div>
                <div class="cert-info">
                    <h4>${cert.title}</h4>
                    <p>${cert.institution}</p>
                </div>
            `;
            
            card.addEventListener("click", () => openModal(index));
            certGrid.appendChild(card);
        });
    }

    function openModal(index) {
        currentCertIndex = index;
        currentImageIndex = 0;
        updateModalContent();
        certModal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevenir scroll de fondo
    }

    function closeModal() {
        certModal.classList.remove("active");
        document.body.style.overflow = "";
        
        // Retrasar reseteo para que la animación termine
        setTimeout(() => {
            certModalImg.src = "";
        }, 300);
    }

    function updateModalContent() {
        const cert = certificatesData[currentCertIndex];
        certModalTitle.textContent = cert.title;
        certModalInst.textContent = cert.institution;
        certModalImg.src = cert.images[currentImageIndex];

        if (cert.images.length > 1) {
            btnPrev.style.display = "flex";
            btnNext.style.display = "flex";
        } else {
            btnPrev.style.display = "none";
            btnNext.style.display = "none";
        }
    }

    // Eventos de Modal
    if (certCloseBtn) {
        certCloseBtn.addEventListener("click", closeModal);
    }

    if (certModal) {
        certModal.addEventListener("click", (e) => {
            if (e.target === certModal) closeModal();
        });
    }

    // Navegación de múltiples imágenes
    if (btnPrev) {
        btnPrev.addEventListener("click", (e) => {
            e.stopPropagation(); // Evitar cerrar modal
            const cert = certificatesData[currentCertIndex];
            currentImageIndex = (currentImageIndex - 1 + cert.images.length) % cert.images.length;
            certModalImg.src = cert.images[currentImageIndex];
        });
    }

    if (btnNext) {
        btnNext.addEventListener("click", (e) => {
            e.stopPropagation(); // Evitar cerrar modal
            const cert = certificatesData[currentCertIndex];
            currentImageIndex = (currentImageIndex + 1) % cert.images.length;
            certModalImg.src = cert.images[currentImageIndex];
        });
    }
});
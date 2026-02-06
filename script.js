document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar animaciones de entrada (ScrollReveal)
    initScrollAnimations();

    // 2. Inicializar Gráficos (Chart.js)
    initImpactChart();

    // 3. Inicializar Contadores dinámicos
    initCounters();

    // 4. Inicializar Navegación Móvil
    initMobileMenu();
});

/* --- Módulos de Funcionalidad --- */

function initScrollAnimations() {
    if (typeof ScrollReveal === 'undefined') return;

    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1200,
        delay: 200,
        reset: false
    });

    sr.reveal('.reveal');
    sr.reveal('.stat-card', { interval: 200 });
}

function initImpactChart() {
    const canvas = document.getElementById('impactChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Día 1', 'Día 20', 'Día 40', 'Día 60', 'Día 80', 'Día 90'],
            datasets: [{
                label: 'Degradación y Nutrición (%)',
                data: [0, 15, 40, 75, 95, 100],
                borderColor: '#52b788',
                backgroundColor: 'rgba(82, 183, 136, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { display: false },
                x: { ticks: { color: '#b7e4c7' }, grid: { display: false } }
            }
        }
    });
}

function initCounters() {
    const counter = document.getElementById('co2-counter');
    if (!counter) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateValue(counter, 0, 450, 1800); // 1800ms de duración
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counter);
}

// Función auxiliar para una animación de números más fluida
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + "g";
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
function initMobileMenu() {
    const checkbox = document.getElementById('check');
    const navLinks = document.querySelector('.nav-links');
    const icon = document.querySelector('.checkbtn i');

    if (!checkbox || !navLinks || !icon) return;

    // Cambiar ícono cuando se abre / cierra
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            navLinks.classList.add('active');
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            navLinks.classList.remove('active');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });

    // Cerrar menú al hacer click en un link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            checkbox.checked = false;
            navLinks.classList.remove('active');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}


/* --- Eventos Globales --- */

// Efecto Parallax en marcas de agua
window.addEventListener('scroll', () => {
    const leftMark = document.querySelector('.watermark-side.left');
    const rightMark = document.querySelector('.watermark-side.right');
    
    if(!leftMark || !rightMark) return;

    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    
    leftMark.style.transform = `translateY(${scrollPercent * 50}px)`;
    rightMark.style.transform = `translateY(-${scrollPercent * -50}px)`;
});



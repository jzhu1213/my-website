document.getElementById('resizeBtn').addEventListener('click', function() {
    const textElement = document.getElementById('text');
    const currentSize = window.getComputedStyle(textElement).fontSize;
    const newSize = parseInt(currentSize) + 2 + 'px';

    textElement.style.fontSize = newSize;
});

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav .right a');
    let current = '';

    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    try {
        const swiper = new Swiper(".card-swiper", {
            centeredSlides: false,
            spaceBetween: 0,
            slidesPerView: 'auto',
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });
    } catch (error) {
        console.warn('Swiper initialization failed:', error);
    }

    const navLinks = document.querySelectorAll('nav .right a');
    navLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.classList.add('nav-link-animate');
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('section-hidden');
                entry.target.classList.add('section-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-hidden');
        observer.observe(section);
    });

    const firstSection = document.querySelector('section');
    if (firstSection) {
        setTimeout(() => {
            firstSection.classList.remove('section-hidden');
            firstSection.classList.add('section-visible');
        }, 100);
    }
});

document.addEventListener('keydown', (e) => {
    const navLinks = document.querySelectorAll('nav .right a');
    const currentActive = document.querySelector('nav .right a.active');
    let currentIndex = Array.from(navLinks).indexOf(currentActive);

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % navLinks.length;
        navLinks[currentIndex].click();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        currentIndex = currentIndex === 0 ? navLinks.length - 1 : currentIndex - 1;
        navLinks[currentIndex].click();
    }
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const navLinks = document.querySelectorAll('nav .right a');
    const currentActive = document.querySelector('nav .right a.active');
    let currentIndex = Array.from(navLinks).indexOf(currentActive);
    
    if (touchEndX < touchStartX - 50) {
        currentIndex = (currentIndex + 1) % navLinks.length;
        navLinks[currentIndex].click();
    } else if (touchEndX > touchStartX + 50) {
        currentIndex = currentIndex === 0 ? navLinks.length - 1 : currentIndex - 1;
        navLinks[currentIndex].click();
    }
}
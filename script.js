document.getElementById('resizeBtn').addEventListener('click', function() {
    const textElement = document.getElementById('text');
    const currentSize = window.getComputedStyle(textElement).fontSize;
    const newSize = parseInt(currentSize) + 2 + 'px';

    textElement.style.fontSize = newSize;
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 60;
        if (pageYOffset >= sectionTop) {
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


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('year').textContent = new Date().getFullYear();

    const swiper = new Swiper(".card-swiper", {
        centeredSlides: false,
        spaceBetween: 0,
        slidesPerView: 'auto'
    });
});
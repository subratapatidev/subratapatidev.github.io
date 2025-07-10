document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links li a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('section');
    const animatedItems = document.querySelectorAll('.animated-item');
    const logoSpan = document.querySelector('.logo span');


    // Hamburger menu functionality
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth scrolling and close mobile menu
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu after click
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Intersection Observer for section animations and nav link highlighting
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // 50% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Change background color
                const newColor = entry.target.dataset.color;
                document.body.style.backgroundColor = newColor;

                // Highlight active nav link
                // Highlight active nav link
                const desktopNavLinks = document.querySelectorAll('.nav-links:not(.active) li a');
                desktopNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });

                // Change logo and active link color based on section
                let activeColor;
                switch (id) {
                    case 'hero':
                        activeColor = '#ff6b81';
                        break;
                    case 'skills':
                        activeColor = '#ff8c00'; // Orange
                        break;
                    case 'projects':
                        activeColor = 'var(--color-purple)';
                        break;
                    case 'certificates':
                        activeColor = 'var(--color-blue)';
                        break;
                    case 'contact':
                        activeColor = '#808080'; // Gray
                        break;
                }
                logoSpan.style.color = activeColor;
                document.documentElement.style.setProperty('--color-active-link', activeColor);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedItems.forEach(item => {
        animationObserver.observe(item);
    });
});
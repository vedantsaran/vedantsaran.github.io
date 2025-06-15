// Smooth scrolling with error handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.warn(`Target element not found: ${targetId}`);
        }
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburger = document.getElementById('hamburger');
        if (mobileMenu?.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            hamburger?.classList.remove('active');
        }
    });
});

// Mobile menu functionality with error handling
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Handle window resize
    const handleResize = () => {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    };

    // Debounce resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });
}

// Intersection Observer for animations
const observerOptions = { 
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            // Unobserve after animation is triggered
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with error handling
document.querySelectorAll('.card, .award-item, .skill-category').forEach(el => {
    if (el) observer.observe(el);
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (themeToggle && body) {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

// Mobile menu dropdown functionality with error handling
const frivolitiesLink = document.querySelector('.mobile-menu a[href="frivolities.html"]');
if (frivolitiesLink) {
    frivolitiesLink.addEventListener('click', function(e) {
        e.preventDefault();
        const dropdown = this.nextElementSibling;
        if (dropdown) {
            dropdown.classList.toggle('active');
        }
    });
}

// Header scroll behavior
let lastScrollTop = 0;
const header = document.querySelector('header');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
        // Scrolling down
        header.classList.add('hidden');
    } else {
        // Scrolling up
        header.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
}); 
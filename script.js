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
        // Close mobile menu when clicking internal links
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburger = document.getElementById('hamburger');
        if (mobileMenu?.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            hamburger?.classList.remove('active');
        }
    });
});

// Close mobile menu when clicking on any navigation link
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
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

// Notification Banner and Header references (needed for scroll behavior)
const notificationBanner = document.getElementById('notificationBanner');
const header = document.querySelector('header');

// Header scroll behavior
let lastScrollTop = 0;
const scrollThreshold = 100;

if (header) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Scrolling down
            header.classList.add('hidden');
            // Keep banner visible but adjust its position when header is hidden
            if (notificationBanner && !notificationBanner.classList.contains('hidden')) {
                notificationBanner.style.top = '0';
            }
        } else {
            // Scrolling up
            header.classList.remove('hidden');
            // Reset banner position when header is visible
            if (notificationBanner && !notificationBanner.classList.contains('hidden') && header) {
                const headerHeight = header.offsetHeight;
                notificationBanner.style.top = `${headerHeight}px`;
            }
        }
        
        lastScrollTop = scrollTop;
    });
} 


// Notification Banner Functionality
const notificationClose = document.getElementById('notificationClose');

// Set initial banner position based on header height
const updateBannerPosition = () => {
    if (header && notificationBanner && !notificationBanner.classList.contains('hidden')) {
        const headerHeight = header.offsetHeight;
        notificationBanner.style.top = `${headerHeight}px`;
    }
};

// Wait for DOM to be fully loaded before setting initial position
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateBannerPosition);
} else {
    // DOM is already loaded
    setTimeout(updateBannerPosition, 0);
}

if (notificationBanner && notificationClose) {
    // Update position on window resize
    window.addEventListener('resize', updateBannerPosition);
    
    // Check if notification was previously dismissed
    const notificationDismissed = localStorage.getItem('notificationDismissed');
    
    if (notificationDismissed === 'true') {
        notificationBanner.classList.add('hidden');
        document.body.classList.add('notification-dismissed');
    }
    
    // Handle close button click
    notificationClose.addEventListener('click', () => {
        notificationBanner.classList.add('hidden');
        document.body.classList.add('notification-dismissed');
        localStorage.setItem('notificationDismissed', 'true');
    });
    
    // Smooth scroll to awards section when clicking the links
    const awardLinks = notificationBanner.querySelectorAll('a[href="#awards"]');
    awardLinks.forEach(awardLink => {
        awardLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#awards');
            if (target) {
                // Account for fixed header and banner
                const headerHeight = header?.offsetHeight || 70;
                const bannerHeight = notificationBanner.offsetHeight;
                const offset = headerHeight + bannerHeight + 20;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
} 
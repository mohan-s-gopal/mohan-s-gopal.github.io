/* ===================================================================
 * Clean Portfolio - Minimal JavaScript
 * Simple interactions and smooth scrolling
 * =================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================================================
    // # ROTATING WORDS ANIMATION
    // ===================================================================
    
    const words = document.querySelectorAll('.word');
    let currentWordIndex = 0;
    
    function rotateWords() {
        // Remove active class from current word
        words[currentWordIndex].classList.remove('active');
        
        // Move to next word
        currentWordIndex = (currentWordIndex + 1) % words.length;
        
        // Add active class to new word
        words[currentWordIndex].classList.add('active');
    }
    
    // Start rotation if words exist
    if (words.length > 0) {
        setInterval(rotateWords, 2000); // Change every 2 seconds
    }
    
    // ===================================================================
    // # MOBILE MENU TOGGLE
    // ===================================================================
    
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // ===================================================================
    // # SMOOTH SCROLLING
    // ===================================================================
    
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    const headerHeight = 60; // Fixed header height
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================================================
    // # ACTIVE NAVIGATION & HEADER SCROLL EFFECT
    // ===================================================================
    
    const sections = document.querySelectorAll('section[id]');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateNavigation() {
        const scrollPosition = window.pageYOffset + headerHeight + 100;
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
        
        // Header scroll effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // ===================================================================
    // # HERO STATS ANIMATION
    // ===================================================================
    
    function animateHeroStats() {
        const heroStats = document.querySelectorAll('.hero-stat-number');
        
        heroStats.forEach(stat => {
            const text = stat.textContent;
            const isPercentage = text.includes('%');
            const isPlus = text.includes('+');
            const target = parseFloat(text.replace(/[%+]/g, ''));
            
            let current = 0;
            const increment = target / 50;
            
            function updateStat() {
                current += increment;
                if (current < target) {
                    let displayValue = Math.floor(current);
                    if (isPercentage && target === 99.9) {
                        displayValue = current.toFixed(1);
                    }
                    stat.textContent = displayValue + (isPercentage ? '%' : '') + (isPlus ? '+' : '');
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = text;
                }
            }
            
            updateStat();
        });
    }
    
    // ===================================================================
    // # INTERSECTION OBSERVER FOR ANIMATIONS
    // ===================================================================
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate hero stats when hero section is visible
                if (entry.target.classList.contains('hero')) {
                    setTimeout(() => animateHeroStats(), 500);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.card, .project-card, .skill-card, .contact-item, .hero');
    animatedElements.forEach(el => {
        if (!el.classList.contains('hero')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });
    
    // ===================================================================
    // # ENHANCED INTERACTIONS
    // ===================================================================
    
    // Skill tag hover effects
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
    
    // ===================================================================
    // # EVENT LISTENERS
    // ===================================================================
    
    // Throttled scroll events for performance
    let ticking = false;
    
    function throttledScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateNavigation();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', throttledScroll);
    
    // ===================================================================
    // # DYNAMIC GREETING
    // ===================================================================
    
    function updateGreeting() {
        const greetingElement = document.querySelector('.hero-greeting');
        if (!greetingElement) return;
        
        const hour = new Date().getHours();
        let greeting;
        
        if (hour < 12) {
            greeting = "Good morning, I'm";
        } else if (hour < 17) {
            greeting = "Good afternoon, I'm";
        } else {
            greeting = "Good evening, I'm";
        }
        
        greetingElement.textContent = greeting;
    }
    
    updateGreeting();
    
    // ===================================================================
    // # PERFORMANCE & ACCESSIBILITY
    // ===================================================================
    
    // Performance monitoring
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        
        if (performance.timing) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Portfolio loaded in ${loadTime}ms`);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
        
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navList && navList.classList.contains('active')) {
            navList.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('user-is-tabbing');
    });
    
});

// ===================================================================
// # UTILITY FUNCTIONS
// ===================================================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

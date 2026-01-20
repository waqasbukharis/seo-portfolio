// ============================================
// BRUTALIST PORTFOLIO - JAVASCRIPT
// Interactive animations and functionality
// ============================================

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = 'var(--shadow-xl)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-md)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-card, .timeline-item, .skill-tag, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;
        
        // Simulate delay
        setTimeout(() => {
            submitBtn.textContent = 'SENT!';
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${type === 'success' ? '#2d8659' : '#e63946'};
        color: #f5f1e8;
        border: 2px solid #1a1a1a;
        font-weight: 700;
        font-size: 14px;
        letter-spacing: 1px;
        text-transform: uppercase;
        border-radius: 0;
        box-shadow: 0 8px 16px rgba(26, 26, 26, 0.2);
        z-index: 10000;
        animation: slideInRight 0.4s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 3000);
}

// Add interactive color animations on scroll
const colorElements = document.querySelectorAll('.section-title, .job-title, .service-title, h1');
const colors = ['--color-blue', '--color-green', '--color-yellow', '--color-red'];
let colorIndex = 0;

window.addEventListener('scroll', () => {
    // Subtle color shift effect every time we scroll past a section
    const scrollPos = window.pageYOffset;
    const sectionHeight = window.innerHeight;
    const currentSection = Math.floor(scrollPos / sectionHeight);
    
    colorElements.forEach((el, index) => {
        const elementPos = el.offsetTop;
        const distance = Math.abs(scrollPos - elementPos);
        
        if (distance < 500 && distance > 0) {
            const colorVar = colors[currentSection % colors.length];
            el.style.borderColor = `var(${colorVar})`;
        }
    });
});



// Hover effect for service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--color-blue)';
        this.style.background = 'linear-gradient(135deg, #f5f1e8 0%, rgba(0, 71, 171, 0.05) 100%)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--color-dark)';
        this.style.background = 'white';
    });
});

// Active navigation link highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--color-red)';
        } else {
            link.style.color = 'var(--color-dark)';
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Animate numbers on scroll
const statNumbers = document.querySelectorAll('.stat-number');

const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;
            const isPercentage = finalValue.includes('%');
            const numericValue = parseInt(finalValue);
            
            let currentValue = 0;
            const increment = numericValue / 30;
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    target.textContent = finalValue;
                    clearInterval(counter);
                } else {
                    target.textContent = Math.floor(currentValue) + (isPercentage ? '%' : '+');
                }
            }, 50);
            
            numberObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => numberObserver.observe(num));

// Dynamic theme based on scroll position (optional color shift)
function updateThemeColor() {
    const scrollPos = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollPos / maxScroll;
    
    // Subtle hue rotation based on scroll
    const hueRotation = scrollPercent * 30;
    document.documentElement.style.setProperty('--hue-rotation', hueRotation);
}

window.addEventListener('scroll', updateThemeColor);

// Mobile menu toggle (for future enhancement)
const navMobileMenu = document.querySelector('.nav-links');
if (window.innerWidth <= 768) {
    // Mobile optimizations
    document.addEventListener('DOMContentLoaded', () => {
        // Optimize touch interactions
        document.addEventListener('touchstart', function() {}, false);
    });
}

// Performance optimization - lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add debug logging for analytics
console.log('[Portfolio] Website loaded successfully');
console.log('[Portfolio] SEO Expert Portfolio - Waqas Bukhari');

// Track page view (for future analytics integration)
function trackPageView() {
    const gtag = window.gtag; // Declare gtag variable
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view');
    }
}

window.addEventListener('load', trackPageView);

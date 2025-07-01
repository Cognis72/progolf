// ===== Global Variables =====
let currentLang = localStorage.getItem('language') || 'th';

// ===== DOM Elements =====
let themeToggle, langToggle, hamburger, navMenu, contactForm;

// Initialize DOM elements after page load
function initDOMElements() {
    langToggle = document.getElementById('lang-toggle');
    hamburger = document.querySelector('.hamburger');
    navMenu = document.querySelector('.nav-menu');
    contactForm = document.getElementById('contactForm');
}

// ===== Theme Management =====
function initTheme() {
    // Always use dark theme
    document.documentElement.setAttribute('data-theme', 'dark');
}

// ===== Language Management =====
function initLanguage() {
    console.log('Initializing language, current:', currentLang);
    
    if (currentLang === 'en') {
        document.documentElement.setAttribute('lang', 'en');
        updateLanguageText('TH');
        updatePageContent('en');
    } else {
        document.documentElement.setAttribute('lang', 'th');
        updateLanguageText('EN');
        updatePageContent('th');
    }
    
    // Apply language-specific styling
    document.body.setAttribute('data-lang', currentLang);
    console.log('Language initialized, button shows:', document.querySelector('.lang-text')?.textContent);
}

function updateLanguageText(text) {
    const langText = document.querySelector('.lang-text');
    if (langText) {
        langText.textContent = text;
    } else {
        console.log('Lang text element not found');
    }
}

function toggleLanguage() {
    console.log('Language toggle clicked, current:', currentLang);
    
    if (currentLang === 'th') {
        currentLang = 'en';
        document.documentElement.setAttribute('lang', 'en');
        updateLanguageText('TH');
        updatePageContent('en');
        showNotification('Language switched to English', 'info');
    } else {
        currentLang = 'th';
        document.documentElement.setAttribute('lang', 'th');
        updateLanguageText('EN');
        updatePageContent('th');
        showNotification('เปลี่ยนภาษาเป็นไทยแล้ว', 'info');
    }
    
    // Save language preference
    localStorage.setItem('language', currentLang);
    console.log('Language saved:', currentLang);
    console.log('Button text updated to:', document.querySelector('.lang-text')?.textContent);
    
    // Apply language-specific styling if needed
    document.body.setAttribute('data-lang', currentLang);
}

function updatePageContent(lang) {
    const elementsWithLang = document.querySelectorAll('[data-th][data-en]');
    
    elementsWithLang.forEach(element => {
        const content = lang === 'th' ? element.getAttribute('data-th') : element.getAttribute('data-en');
        if (content) {
            element.textContent = content;
        }
    });
    
    console.log(`Updated ${elementsWithLang.length} elements to ${lang} language`);
}

// ===== Mobile Navigation =====
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Reset hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
}

// ===== Contact Form Handling =====
function handleContactForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const course = formData.get('course');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !phone || !message) {
        showNotification('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน', 'error');
        return;
    }
    
    // Phone number validation (Thai format)
    const phoneRegex = /^[0-9]{9,10}$/;
    if (!phoneRegex.test(phone.replace(/[-\s]/g, ''))) {
        showNotification('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง', 'error');
        return;
    }
    
    // Email validation (if provided)
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('กรุณากรอกอีเมลให้ถูกต้อง', 'error');
            return;
        }
    }
    
    // Submit to Formspree
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังส่ง...';
    submitButton.disabled = true;
    
    // Submit form to Formspree
    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('ส่งข้อความเรียบร้อยแล้ว เราจะติดต่อกลับโดยเร็วที่สุด', 'success');
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Form submission error:', error);
        showNotification('เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง', 'error');
    })
    .finally(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Handle close button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#2ECC71';
        case 'error': return '#E74C3C';
        case 'warning': return '#F39C12';
        default: return '#3498DB';
    }
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // Skip empty or invalid anchors
            if (!targetId || targetId === '#') {
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// ===== Header Scroll Effect =====
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(27, 38, 44, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '';
            header.style.backdropFilter = '';
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// ===== Animation on Scroll =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.course-card, .feature-card, .instructor-card, .facility-item, .value-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== Form Enhancement =====
function enhanceFormFields() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Real-time validation
        if (input.type === 'tel') {
            input.addEventListener('input', (e) => {
                // Format phone number
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 3 && value.length <= 6) {
                    value = value.replace(/(\d{3})(\d+)/, '$1-$2');
                } else if (value.length > 6) {
                    value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
                }
                e.target.value = value;
            });
        }
    });
}

// ===== Add notification styles to head =====
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 5px;
            margin-left: auto;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
}

// ===== Event Listeners =====
function initEventListeners() {
    // Language toggle
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on links
    if (navMenu) {
        navMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                closeMobileMenu();
            }
        });
    }
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

// ===== URL Parameter Handling =====
function checkUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if form was successfully submitted
    if (urlParams.get('success') === '1') {
        showNotification('ส่งข้อความเรียบร้อยแล้ว เราจะติดต่อกลับโดยเร็วที่สุด!', 'success');
        
        // Clean URL by removing the success parameter
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
    }
}

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Pro Tana Golf Studio - Website loaded successfully');
    
    // Initialize DOM elements first
    initDOMElements();
    
    // Initialize all components
    initTheme();
    initLanguage();
    initEventListeners();
    initSmoothScrolling();
    initHeaderScroll();
    initScrollAnimations();
    enhanceFormFields();
    addNotificationStyles();
    checkUrlParameters();
    
    // Add loading complete class
    document.body.classList.add('loaded');
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        });
    }
});

// ===== Error Handling =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could send error reports to analytics service
});

// ===== Utility Functions =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleTheme,
        showNotification,
        handleContactForm
    };
}

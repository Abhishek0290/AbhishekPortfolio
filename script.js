// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const mobileMenu = document.getElementById('mobile-menu');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const contactForm = document.getElementById('contact-form');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');

// Intro Animation Elements
const introScreen = document.getElementById('intro-screen');
const homeSection = document.querySelector('.home');
const homeText = document.querySelector('.home-text');
const homeImage = document.querySelector('.home-image');

// Enhanced intro animation sequence when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Create dynamic background elements
    createIntroBackgroundEffects();
    
    // Add typing effect to intro title
    setTimeout(() => {
        startTypewriterEffect();
    }, 2500);
    
    setTimeout(() => {
        introScreen.classList.add('hidden');
        
        // Show home section after intro disappears
        setTimeout(() => {
            homeSection.classList.add('visible');
            
            // Animate home content
            setTimeout(() => {
                homeText.classList.add('animate');
                homeImage.classList.add('animate');
            }, 300);
        }, 400);
    }, 4500); // Extended to 4.5 seconds for better effect
});

// Create dynamic background effects for intro
function createIntroBackgroundEffects() {
    const introScreen = document.getElementById('intro-screen');
    
    // Create floating geometric shapes
    for (let i = 0; i < 6; i++) {
        const shape = document.createElement('div');
        shape.className = 'intro-bg-shape';
        shape.style.cssText = `
            position: absolute;
            width: ${20 + Math.random() * 40}px;
            height: ${20 + Math.random() * 40}px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: ${Math.random() > 0.5 ? '50%' : '10%'};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatShape ${8 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        introScreen.appendChild(shape);
    }
    
    // Add floating shapes animation
    const shapeStyle = document.createElement('style');
    shapeStyle.textContent = `
        @keyframes floatShape {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-30px) rotate(180deg);
                opacity: 0.8;
            }
        }
    `;
    document.head.appendChild(shapeStyle);
}

// Enhanced typewriter effect for intro title
function startTypewriterEffect() {
    const titleElement = document.querySelector('.intro-title');
    if (titleElement) {
        const text = titleElement.textContent;
        titleElement.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                // Remove cursor after typing is complete
                setTimeout(() => {
                    titleElement.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    }
}

// Theme Toggle Functionality
function initializeTheme() {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update toggle button state
    updateThemeToggleState(savedTheme);
}

function updateThemeToggleState(theme) {
    if (themeToggle) {
        themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
        themeToggle.setAttribute('data-theme', theme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Add transition effect
    document.documentElement.style.transition = 'all 0.3s ease';
    
    // Update theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update toggle state
    updateThemeToggleState(newTheme);
    
    // Remove transition after animation completes
    setTimeout(() => {
        document.documentElement.style.transition = '';
    }, 300);
    
    // Add sunrise/sunset effect
    createThemeTransitionEffect(newTheme);
}

function createThemeTransitionEffect(theme) {
    const effectContainer = document.createElement('div');
    effectContainer.className = 'theme-transition-effect';
    
    // Create multiple animated elements for the transition
    const gradientOverlay = document.createElement('div');
    gradientOverlay.className = 'gradient-overlay';
    
    if (theme === 'dark') {
        // Sunset effect
        gradientOverlay.style.background = `
            radial-gradient(circle at 50% 60%, 
            rgba(255, 94, 77, 0.8) 0%, 
            rgba(255, 154, 0, 0.6) 25%, 
            rgba(255, 206, 84, 0.4) 50%, 
            rgba(74, 144, 226, 0.2) 75%, 
            rgba(26, 35, 126, 0.1) 100%)
        `;
    } else {
        // Sunrise effect
        gradientOverlay.style.background = `
            radial-gradient(circle at 50% 40%, 
            rgba(255, 223, 0, 0.8) 0%, 
            rgba(255, 154, 0, 0.6) 25%, 
            rgba(135, 206, 235, 0.4) 50%, 
            rgba(176, 224, 230, 0.2) 75%, 
            rgba(255, 255, 255, 0.1) 100%)
        `;
    }
    
    gradientOverlay.style.cssText += `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.6s ease-in-out;
    `;
    
    effectContainer.appendChild(gradientOverlay);
    document.body.appendChild(effectContainer);
    
    // Animate the effect
    setTimeout(() => {
        gradientOverlay.style.opacity = '1';
    }, 50);
    
    setTimeout(() => {
        gradientOverlay.style.opacity = '0';
    }, 600);
    
    setTimeout(() => {
        effectContainer.remove();
    }, 1200);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initializeTheme);

// Add theme toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Resume Button Enhancements
document.addEventListener('DOMContentLoaded', () => {
    const previewBtn = document.querySelector('.resume-btn-preview');
    const downloadBtn = document.querySelector('.resume-btn-download');
    
    if (previewBtn) {
        previewBtn.addEventListener('click', function(e) {
            // Add visual feedback for preview
            showNotification('Opening resume preview...', 'success');
            
            // Add loading effect
            const icon = this.querySelector('i');
            const originalClass = icon.className;
            icon.className = 'fas fa-spinner fa-spin';
            
            setTimeout(() => {
                icon.className = originalClass;
            }, 1000);
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Add visual feedback for download
            showNotification('Downloading resume...', 'success');
            
            // Add download animation
            const icon = this.querySelector('i');
            const originalClass = icon.className;
            icon.className = 'fas fa-check';
            this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                icon.className = originalClass;
                this.style.background = '';
            }, 2000);
        });
    }
});

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
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

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close notification
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about-card, .project-card, .certification-card, .hackathon-card, .contact-item');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.dataset.animation = `fadeInUp 0.8s ease ${index * 0.1}s forwards`;
        observer.observe(el);
    });
});

// Add fadeInUp animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Typing effect for home section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        typeWriter(nameElement, originalText, 150);
    }
});

// Parallax effect for home section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.image-backdrop');
    
    parallaxElements.forEach(element => {
        if (element && element.style) {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });
});

// Enhanced hover effects for skill items
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px) scale(1.1) rotate(5deg)';
            item.style.background = 'linear-gradient(135deg, #2563eb, #7c3aed)';
            item.style.color = 'white';
            item.style.boxShadow = '0 15px 30px rgba(37, 99, 235, 0.4)';
            
            // Add stagger effect to adjacent items
            skillItems.forEach((otherItem, otherIndex) => {
                if (Math.abs(index - otherIndex) === 1) {
                    otherItem.style.transform = 'translateY(-2px) scale(1.02)';
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            item.style.background = '#f8fafc';
            item.style.color = '';
            item.style.boxShadow = '';
            
            // Reset adjacent items
            skillItems.forEach((otherItem, otherIndex) => {
                if (Math.abs(index - otherIndex) === 1) {
                    otherItem.style.transform = 'translateY(0) scale(1)';
                }
            });
        });
    });
});

// Enhanced click effects for buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Add hover magnetic effect
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translateY(-3px) scale(1.02) translate(${x * 0.1}px, ${y * 0.1}px)`;
            this.style.transition = 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        button.addEventListener('click', function(e) {
            // Create multiple ripple effects
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height) * (1 + i * 0.3);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255, 255, 255, ${0.4 - i * 0.1});
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple ${0.8 + i * 0.2}s ease-out;
                        pointer-events: none;
                        z-index: 10;
                    `;
                    
                    this.style.position = 'relative';
                    this.style.overflow = 'hidden';
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 1000);
                }, i * 100);
            }
            
            // Add button pulse effect
            this.style.animation = 'pulse 0.3s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
    
    // Enhanced ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
        @keyframes buttonPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(rippleStyle);
});

// Enhanced project card effects
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-15px) scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            this.style.transition = 'all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            this.style.boxShadow = `${(x - centerX) / 5}px ${(y - centerY) / 5}px 25px rgba(0, 0, 0, 0.2)`;
        });
        
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.project-image img');
            const techTags = card.querySelectorAll('.tech-tag');
            
            if (image) {
                image.style.transform = 'scale(1.15) rotate(2deg)';
                image.style.filter = 'brightness(1.1) contrast(1.1)';
            }
            
            // Animate tech tags
            techTags.forEach((tag, tagIndex) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-3px) scale(1.05)';
                    tag.style.background = 'linear-gradient(135deg, #2563eb, #7c3aed)';
                    tag.style.color = 'white';
                }, tagIndex * 100);
            });
            
            // Add floating particles effect
            createFloatingParticles(card);
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.project-image img');
            const techTags = this.querySelectorAll('.tech-tag');
            
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            if (image) {
                image.style.transform = 'scale(1) rotate(0deg)';
                image.style.filter = '';
                image.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }
            
            // Reset tech tags with staggered timing
            techTags.forEach((tag, index) => {
                if (tag) {
                    setTimeout(() => {
                        tag.style.transform = '';
                        tag.style.background = '';
                        tag.style.color = '';
                        tag.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }, index * 50);
                }
            });
        });
    });
    
    // Floating particles function
    function createFloatingParticles(container) {
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(37, 99, 235, 0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: floatParticle ${2 + Math.random() * 2}s ease-out forwards;
            `;
            
            const rect = container.getBoundingClientRect();
            particle.style.left = Math.random() * rect.width + 'px';
            particle.style.top = rect.height + 'px';
            
            container.style.position = 'relative';
            container.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 4000);
        }
    }
    
    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0) scale(0);
                opacity: 1;
            }
            50% {
                transform: translateY(-50px) scale(1);
                opacity: 0.8;
            }
            100% {
                transform: translateY(-100px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
});

// Enhanced loading animation with staggered reveals
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Staggered animation for main sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (section) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                section.style.transition = 'all 0.8s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
    
    // Remove any loading screens if they exist
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
    
    // Cursor trail effect removed per user request
});

// Cursor trail effect removed per user request

// Performance optimization: Throttle scroll events
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
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Navbar background
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Scroll to top button
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
    
    // Active navigation
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 16)); // ~60fps

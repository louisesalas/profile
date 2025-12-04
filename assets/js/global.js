/**
 * Portfolio Global JavaScript
 * Handles typing effect, mobile navigation, and scroll animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // Register GSAP Plugins
    // ========================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initScrollAnimations();
    }

    // ========================================
    // ScrollTrigger Animations
    // ========================================
    function initScrollAnimations() {
        // Hero section fade in on load
        gsap.from('.hero-text', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3
        });

        gsap.from('.hero-avatar', {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: 'back.out(1.7)',
            delay: 0.5
        });

        // Tech Stack Cards
        const techCards = gsap.utils.toArray('.tech-card');
        gsap.set(techCards, { opacity: 0, y: 60 });
        
        ScrollTrigger.create({
            trigger: '.tech-stack-section',
            start: 'top 80%',
            onEnter: () => {
                gsap.to(techCards, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out'
                });
            },
            once: true
        });

        // Tech Pills
        const techPills = gsap.utils.toArray('.tech-pill');
        gsap.set(techPills, { opacity: 0, scale: 0.8 });
        
        ScrollTrigger.create({
            trigger: '.tech-pills',
            start: 'top 85%',
            onEnter: () => {
                gsap.to(techPills, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: 'back.out(1.7)'
                });
            },
            once: true
        });

        // About Section
        const aboutText = document.querySelector('.about-text');
        if (aboutText) {
            gsap.set(aboutText, { opacity: 0, x: -50 });
            
            ScrollTrigger.create({
                trigger: '.about-section',
                start: 'top 75%',
                onEnter: () => {
                    gsap.to(aboutText, {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: 'power3.out'
                    });
                },
                once: true
            });
        }

        const aboutCards = gsap.utils.toArray('.about-card');
        gsap.set(aboutCards, { opacity: 0, y: 40 });
        
        ScrollTrigger.create({
            trigger: '.about-section',
            start: 'top 70%',
            onEnter: () => {
                gsap.to(aboutCards, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.12,
                    ease: 'power3.out'
                });
            },
            once: true
        });

        // Portfolio Cards
        const portfolioCards = gsap.utils.toArray('.portfolio-card');
        gsap.set(portfolioCards, { opacity: 0, y: 60 });
        
        ScrollTrigger.create({
            trigger: '.portfolio-section',
            start: 'top 80%',
            onEnter: () => {
                gsap.to(portfolioCards, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: 'power3.out'
                });
            },
            once: true
        });

        // Timeline Items
        const timelineItems = gsap.utils.toArray('.timeline-item');
        gsap.set(timelineItems, { opacity: 0, x: -30 });
        
        ScrollTrigger.create({
            trigger: '.experience-section',
            start: 'top 75%',
            onEnter: () => {
                gsap.to(timelineItems, {
                    opacity: 1,
                    x: 0,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'power3.out'
                });
            },
            once: true
        });

        // Contact Section
        const contactElements = gsap.utils.toArray('.contact-section .section-title, .contact-description, .contact-links');
        gsap.set(contactElements, { opacity: 0, y: 40 });
        
        ScrollTrigger.create({
            trigger: '.contact-section',
            start: 'top 80%',
            onEnter: () => {
                gsap.to(contactElements, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out'
                });
            },
            once: true
        });

        // Section Titles (except contact which is handled above)
        gsap.utils.toArray('.section-title').forEach(title => {
            if (!title.closest('.contact-section')) {
                gsap.set(title, { opacity: 0, x: -30 });
                
                ScrollTrigger.create({
                    trigger: title,
                    start: 'top 85%',
                    onEnter: () => {
                        gsap.to(title, {
                            opacity: 1,
                            x: 0,
                            duration: 0.6,
                            ease: 'power3.out'
                        });
                    },
                    once: true
                });
            }
        });
    }

    // ========================================
    // Typing Effect
    // ========================================
    const typingText = document.querySelector('.typing-text');
    const words = ['Louise', 'a Web Developer', 'a WordPress Expert', 'a Shopify Developer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at end of word
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect
    if (typingText) {
        setTimeout(typeEffect, 1000);
    }

    // ========================================
    // Mobile Navigation Toggle
    // ========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ========================================
    // Active Navigation Link on Scroll
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // Header Background on Scroll
    // ========================================
    const header = document.querySelector('.main-header');
    
    function updateHeaderBackground() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            header.style.background = 'rgba(10, 10, 15, 0.85)';
        }
    }

    if (header) {
        window.addEventListener('scroll', updateHeaderBackground);
    }

    // ========================================
    // Hero Image Flip Rotation with GSAP
    // ========================================
    const heroImage = document.getElementById('hero-image');
    const heroImages = [
        'assets/img/louise.jpeg',
        'assets/img/profile.png'
    ];
    let currentImageIndex = 0;

    function flipHeroImage() {
        if (!heroImage || typeof gsap === 'undefined') return;

        const tl = gsap.timeline();

        // Flip out animation
        tl.to(heroImage, {
            rotateY: 90,
            scale: 0.9,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
                // Switch image at midpoint
                currentImageIndex = (currentImageIndex + 1) % heroImages.length;
                heroImage.src = heroImages[currentImageIndex];
            }
        })
        // Flip in animation
        .to(heroImage, {
            rotateY: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
        });
    }

    // Flip every 4 seconds
    if (heroImage) {
        setInterval(flipHeroImage, 4000);
    }

    // ========================================
    // Contact Form Handling
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('.form-input');
        const submitBtn = contactForm.querySelector('.form-submit');
        
        // Add focus/blur animations
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                // Validate on blur
                validateInput(this);
            });
        });
        
        // Input validation function
        function validateInput(input) {
            const value = input.value.trim();
            
            if (input.hasAttribute('required') && !value) {
                input.classList.add('error');
                input.classList.remove('success');
                return false;
            }
            
            if (input.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    input.classList.add('error');
                    input.classList.remove('success');
                    return false;
                }
            }
            
            input.classList.remove('error');
            if (value) {
                input.classList.add('success');
            }
            return true;
        }
        
        // Form submission
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate all inputs
            let isValid = true;
            formInputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                showFormMessage('Please fill in all fields correctly.', 'error');
                return;
            }
            
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                });
                
                if (response.ok) {
                    showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                    formInputs.forEach(input => {
                        input.classList.remove('success', 'error');
                    });
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                showFormMessage('Oops! Something went wrong. Please try again or email directly.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
        
        // Show form message
        function showFormMessage(message, type) {
            // Remove existing message if any
            const existingMessage = contactForm.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Create and insert message element
            const messageEl = document.createElement('div');
            messageEl.className = `form-message ${type} show`;
            messageEl.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
            contactForm.insertBefore(messageEl, contactForm.firstChild);
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                messageEl.classList.remove('show');
                setTimeout(() => messageEl.remove(), 300);
            }, 5000);
        }
        
        // Add GSAP animation for the contact form
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.set('.contact-form-wrapper', { opacity: 0, y: 40 });
            gsap.set('.contact-divider', { opacity: 0, scaleX: 0 });
            
            ScrollTrigger.create({
                trigger: '.contact-form-wrapper',
                start: 'top 85%',
                onEnter: () => {
                    gsap.to('.contact-form-wrapper', {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out'
                    });
                    gsap.to('.contact-divider', {
                        opacity: 1,
                        scaleX: 1,
                        duration: 0.6,
                        delay: 0.3,
                        ease: 'power3.out'
                    });
                },
                once: true
            });
        }
    }
});


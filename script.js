// ============================================
// CONFIGURAÇÕES GLOBAIS
// ============================================

const config = {
    navOffset: 80,
    scrollThreshold: 50,
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseTime: 2000
};

// ============================================
// MENU MÓVEL
// ============================================

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!menuToggle) return;

    menuToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', false);
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// EFEITO TYPING (Digitação)
// ============================================

function initTypingEffect() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;

    const texts = ['desenvolvo', 'crio', 'inovo', 'codifico', 'construo', 'resolvo'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = texts[textIndex];
        const displayText = currentText.substring(0, charIndex);

        typedTextElement.textContent = displayText;

        if (!isDeleting && charIndex < currentText.length) {
            charIndex++;
            setTimeout(typeEffect, config.typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, config.deletingSpeed);
        } else if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, config.pauseTime);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeEffect, 500);
        }
    }

    typeEffect();
}

// ============================================
// HEADER STICKY COM SCROLL
// ============================================

function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > config.scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = currentScroll;
    }, { passive: true });
}

// ============================================
// ATIVAR LINK NAVEGAÇÃO ATIVO
// ============================================

function initActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 200;

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href').substring(1);

            if (href === currentSection) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
}

// ============================================
// SCROLL SUAVE
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (!target) return;

            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - config.navOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ============================================
// INTERSECTION OBSERVER - SCROLL REVEAL
// ============================================

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll(
        'section, .skill-category, .project-card, .timeline-item, .social-icon, .contact-form-card, .contact-info'
    );

    elementsToObserve.forEach(el => observer.observe(el));
}

// ============================================
// SKILL BARS ANIMATION
// ============================================

function initSkillBarsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillSection = document.querySelector('#skills');

    if (!skillSection || skillBars.length === 0) return;

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.style.width || bar.style.getPropertyValue('--progress');
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                skillObserver.unobserve(skillSection);
            }
        });
    }, { threshold: 0.3 });

    skillObserver.observe(skillSection);
}

// ============================================
// ANIMAÇÃO DE NÚMEROS
// ============================================

function initNumberAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const aboutSection = document.querySelector('#about');

    if (!statNumbers.length || !aboutSection) return;

    let animated = false;

    function animateNumbers() {
        if (animated) return;

        statNumbers.forEach(stat => {
            const text = stat.textContent.trim();
            const numberMatch = text.match(/\d+/);

            if (!numberMatch) return;

            const number = parseInt(numberMatch[0]);
            let current = 0;
            const increment = Math.max(1, Math.floor(number / 50));
            const duration = number / increment;

            const timer = setInterval(() => {
                current += increment;

                if (current >= number) {
                    stat.textContent = text.replace(/\d+/, number);
                    clearInterval(timer);
                } else {
                    stat.textContent = text.replace(/\d+/, current);
                }
            }, 30);
        });

        animated = true;
    }

    const numberObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateNumbers();
            numberObserver.disconnect();
        }
    }, { threshold: 0.3 });

    numberObserver.observe(aboutSection);
}

// ============================================
// FORMULÁRIO DE CONTATO
// ============================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Coletar dados do formulário
        const formData = {
            name: document.getElementById('contactName')?.value.trim(),
            email: document.getElementById('contactEmail')?.value.trim(),
            phone: document.getElementById('contactPhone')?.value.trim(),
            subject: document.getElementById('contactSubject')?.value,
            message: document.getElementById('contactMessage')?.value.trim()
        };

        // Validação
        if (!validateForm(formData)) {
            showFormMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        if (!isValidEmail(formData.email)) {
            showFormMessage('Por favor, insira um e-mail válido.', 'error');
            return;
        }

        // Preparar submissão
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        try {
            // Aqui você pode adicionar integração com backend/API
            // Por enquanto, simularemos o envio
            await simulateFormSubmission(formData);

            showFormMessage('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            form.reset();
        } catch (error) {
            showFormMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
            console.error('Form submission error:', error);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

function validateForm(data) {
    return data.name && data.email && data.subject && data.message;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form data:', data);
            resolve();
        }, 1500);
    });
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    setTimeout(() => {
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
    }, 5000);
}

// ============================================
// PARALLAX EFFECT
// ============================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('#about');
    if (!parallaxElements.length) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        parallaxElements.forEach(el => {
            const rate = Math.min(scrolled * 0.3, 100);
            el.style.backgroundPositionY = `${rate}px`;
        });
    }, { passive: true });
}

// ============================================
// PRELOAD COMPLETO
// ============================================

function onPageLoad() {
    // Fade in suave quando carregado
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    console.log('✅ Portfólio carregado com sucesso!');
}

// ============================================
// PERFORMANCE - LAZY LOADING
// ============================================

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ============================================
// PREVENIR CLIQUE DIREITO EM IMAGENS
// ============================================

function initContextMenuProtection() {
    document.addEventListener('contextmenu', (e) => {
        if (e.target.closest('img')) {
            e.preventDefault();
        }
    });
}

// ============================================
// DETECCAO DE TEMA (DARK/LIGHT MODE)
// ============================================

function initThemeDetection() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(isDark) {
        if (isDark) {
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.style.colorScheme = 'light';
        }
    }

    applyTheme(prefersDark.matches);
    prefersDark.addEventListener('change', (e) => applyTheme(e.matches));
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

function initKeyboardNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link, index) => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && index < navLinks.length - 1) {
                navLinks[index + 1].focus();
            } else if (e.key === 'ArrowLeft' && index > 0) {
                navLinks[index - 1].focus();
            }
        });
    });
}

// ============================================
// INICIALIZAR TUDO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initTypingEffect();
    initHeaderScroll();
    initActiveNavigation();
    initSmoothScroll();
    initScrollReveal();
    initSkillBarsAnimation();
    initNumberAnimation();
    initContactForm();
    initParallax();
    initLazyLoading();
    initContextMenuProtection();
    initThemeDetection();
    initKeyboardNavigation();
});

window.addEventListener('load', onPageLoad);

// ============================================
// PERFORMANCE - MONITORAMENTO
// ============================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⏱️ Tempo total de carregamento: ${pageLoadTime}ms`);
    });
}

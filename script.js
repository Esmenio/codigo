
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});


const typedTextElement = document.querySelector('.typed-text');
if (typedTextElement) {
    const texts = ['desenvolvo', 'crio', 'inovo', 'codifico', 'construo'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = texts[textIndex];
       
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }
   
    typeEffect();
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
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

document.querySelectorAll('section, .skill-category, .project-card, .timeline-item, .contact-card, .collab-info-card, .collab-form-card').forEach(el => {
    observer.observe(el);
});

// ============================================
// SKILL BARS ANIMATION
// ============================================
const skillBars = document.querySelectorAll('.skill-progress');
const skillSection = document.querySelector('#Skill');

if (skillSection) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
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
// ACTIVE NAVIGATION LINK
// ============================================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;
   
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
       
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
   
    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href').substring(1);
        if (href === current) {
            item.classList.add('active');
        }
    });
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
       
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
           
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// FORM SUBMISSION
// ============================================
const form = document.getElementById('projectForm');
const formMessage = document.getElementById('formMessage');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
       
        const nome = document.getElementById('nome')?.value;
        const email = document.getElementById('email')?.value;
        const telefone = document.getElementById('telefone')?.value;
        const habilidade = document.getElementById('habilidade')?.value;
        const descricao = document.getElementById('descricao')?.value;
       
        if (!nome || !email || !habilidade || !descricao) {
            showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
       
        if (!email.includes('@') || !email.includes('.')) {
            showMessage('Por favor, insira um e-mail válido.', 'error');
            return;
        }
       
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
       
        setTimeout(() => {
            showMessage('Proposta enviada com sucesso! Entrarei em contato em breve.', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

function showMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
       
        setTimeout(() => {
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';
        }, 5000);
    }
}

// ============================================
// PARALLAX EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('#about_me');
   
    parallaxElements.forEach(el => {
        const rate = scrolled * 0.3;
        if (rate < 100) {
            el.style.backgroundPositionY = `${rate}px`;
        }
    });
});

// ============================================
// PRELOADER (opcional)
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// ANIMAÇÃO DE NÚMEROS
// ============================================
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateNumbers() {
    if (animated) return;
   
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        if (isNaN(number)) return;
       
        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                stat.textContent = text.replace(/\d+/, number);
                clearInterval(timer);
            } else {
                stat.textContent = text.replace(/\d+/, Math.floor(current));
            }
        }, 30);
    });
   
    animated = true;
}

const aboutSection = document.querySelector('#about_me');
if (aboutSection) {
    const numberObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateNumbers();
            numberObserver.disconnect();
        }
    }, { threshold: 0.5 });
   
    numberObserver.observe(aboutSection);
}

// ============================================
// PREVENT CONTEXT MENU (opcional)
// ============================================
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('img')) {
        e.preventDefault();
    }
});

console.log('🚀 Portfólio carregado com sucesso!');

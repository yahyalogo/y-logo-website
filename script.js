// تأثيرات التمرير السلس
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

// تأثير شريط التنقل عند التمرير
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// تأثيرات الظهور عند التمرير
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// مراقبة العناصر للتأثيرات
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .contact-item, .about-text');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// تأثير النقر على زر الاستدعاء للعمل
document.querySelector('.cta-button').addEventListener('click', function() {
    document.querySelector('#about').scrollIntoView({
        behavior: 'smooth'
    });
});

// تأثيرات إضافية للشعار
document.querySelectorAll('.logo, .hero-logo, .logo-showcase, .service-icon').forEach(logo => {
    logo.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// معالجة إرسال النموذج
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // إظهار رسالة نجاح
    const button = this.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = 'تم الإرسال بنجاح!';
    button.style.background = '#28a745';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '#000';
        this.reset();
    }, 3000);
});

// تأثير الكتابة المتحركة للعنوان الرئيسي
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

// تطبيق تأثير الكتابة عند تحميل الصفحة
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 80);
    }, 1500);
});

// تأثير انفجار الألوان عند الضغط على الشاشة
document.addEventListener('click', function(e) {
    createColorExplosion(e.clientX, e.clientY);
});

function createColorExplosion(x, y) {
    // مصفوفة الألوان المتنوعة والجذابة
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
        '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
        '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
        '#10AC84', '#EE5A24', '#0984E3', '#A29BFE', '#FD79A8'
    ];
    
    // إنشاء عدد عشوائي من الجسيمات (بين 10-18)
    const particleCount = Math.random() * 8 + 10;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(x, y, colors);
    }
}

function createParticle(x, y, colors) {
    const particle = document.createElement('div');
    
    // تحديد لون عشوائي
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // تحديد حجم عشوائي للجسيم
    const size = Math.random() * 10 + 6; // بين 6px و 16px
    
    // تحديد اتجاه وسرعة عشوائية
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 120 + 60; // بين 60px و 180px
    const deltaX = Math.cos(angle) * velocity;
    const deltaY = Math.sin(angle) * velocity;
    
    // تحديد شكل عشوائي (دائري أو مربع)
    const isCircle = Math.random() > 0.3;
    
    // تطبيق الأنماط على الجسيم
    particle.style.cssText = `
        position: fixed;
        left: ${x - size/2}px;
        top: ${y - size/2}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: ${isCircle ? '50%' : '20%'};
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 8px ${color}60, 0 0 16px ${color}30;
        transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        opacity: 0.9;
    `;
    
    // إضافة الجسيم إلى الصفحة
    document.body.appendChild(particle);
    
    // تحريك الجسيم وإزالته
    setTimeout(() => {
        particle.style.transform = `translate(${deltaX}px, ${deltaY + 80}px) scale(0) rotate(${Math.random() * 360}deg)`;
        particle.style.opacity = '0';
        
        // إزالة الجسيم من DOM بعد انتهاء الحركة
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }, 10);
}

// تأثير إضافي: انفجار ألوان خاص عند النقر على الشعار
document.querySelectorAll('.logo-img, .hero-logo').forEach(logo => {
    logo.addEventListener('click', function(e) {
        e.stopPropagation(); // منع تشغيل التأثير العادي
        
        // إنشاء انفجار ألوان أكبر وأكثر كثافة
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // إنشاء انفجار مضاعف
        for (let burst = 0; burst < 3; burst++) {
            setTimeout(() => {
                createColorExplosion(centerX, centerY);
            }, burst * 100);
        }
    });
});

// تشغيل قائمة الهاتف
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

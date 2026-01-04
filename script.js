document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initTypingEffect();
    initScrollAnimations();
    initScrollToTop();
});

/* --- Star Background Animation --- */
function initStars() {
    const canvas = document.getElementById('stars-canvas');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let stars = [];
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        createStars();
    }
    
    function createStars() {
        stars = [];
        const starCount = Math.floor((width * height) / 3000); // Density
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5,
                alpha: Math.random(),
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                direction: Math.random() > 0.5 ? 1 : -1
            });
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        stars.forEach(star => {
            // Twinkle effect
            star.alpha += star.twinkleSpeed * star.direction;
            
            if (star.alpha >= 1) {
                star.alpha = 1;
                star.direction = -1;
            } else if (star.alpha <= 0.2) {
                star.alpha = 0.2;
                star.direction = 1;
            }
            
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', resize);
    resize();
    animate();
}

/* --- Typing Effect --- */
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = "Still Being Written.";
    // Create a wrapper for text and cursor
    subtitle.innerHTML = '<span class="typing-text"></span><span class="typing-cursor"></span>';
    
    const textSpan = subtitle.querySelector('.typing-text');
    let i = 0;
    
    function type() {
        if (i < text.length) {
            textSpan.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    
    setTimeout(type, 1000); // Start delay
}

/* --- Scroll Animations --- */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Animate Timeline Items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        observer.observe(item);
    });
    
    // Animate Card Content (Staggered)
    document.querySelectorAll('.timeline-content').forEach(content => {
        content.style.opacity = '0';
        content.style.transform = 'scale(0.95)';
        content.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s'; // Slight delay
        observer.observe(content);
    });
}

function initScrollToTop() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if(scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const timeline = document.querySelector('.timeline');
            if(timeline) timeline.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    const toTopBtn = document.getElementById('scroll-to-top');
    if(toTopBtn) {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 500) {
                toTopBtn.classList.add('visible');
            } else {
                toTopBtn.classList.remove('visible');
            }
        });
        
        toTopBtn.addEventListener('click', () => {
             window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

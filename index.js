// 监听滚动事件，添加动画效果
document.addEventListener('DOMContentLoaded', () => {
    // 创建观察器实例
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // 动画只执行一次
            }
        });
    }, {
        threshold: 0.1 // 元素出现10%时触发
    });

    // 需要添加动画的元素
    const animateElements = document.querySelectorAll('.feature-card, .team-card, .about-content, .hero');
    animateElements.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });

    // 添加按钮悬停效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseover', (e) => {
            const x = e.pageX - btn.offsetLeft;
            const y = e.pageY - btn.offsetTop;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            btn.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 添加导航栏滚动效果
    let lastScroll = 0;
    const nav = document.querySelector('.main-nav');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            // 向下滚动
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            // 向上滚动
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 数字增长动画
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const statItem = entry.target.closest('.stat-item');
                let current = 0;
                const duration = 2000; // 动画持续2秒
                const increment = target / (duration / 16); // 每16ms更新一次
                
                statItem.classList.add('animate');
                
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(counter);
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }
                }, 16);
                
                observer.unobserve(entry.target);
            }
        });
    }, options);

    stats.forEach(stat => observer.observe(stat));
}

// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelector('.slide-dots');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    
    // 创建轮播点
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dots.appendChild(dot);
    });

    // 显示指定幻灯片
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots.children[index].classList.add('active');
    }
    
    // 切换到指定幻灯片
    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }
    
    // 下一张幻灯片
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // 添加按钮事件监听
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // 自动播放
    setInterval(nextSlide, 5000);

    // 其他动画效果
    // ... rest of the code ...
}); 
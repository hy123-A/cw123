// 平滑滚动功能
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

// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.prev-slide');
    const nextBtn = slider.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    // 切换到指定幻灯片
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // 下一张幻灯片
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // 上一张幻灯片
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // 自动播放
    function startSlideShow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(nextSlide, 5000); // 每5秒切换一次
    }

    // 停止自动播放
    function stopSlideShow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // 事件监听
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideShow();
        startSlideShow();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideShow();
        startSlideShow();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopSlideShow();
            startSlideShow();
        });
    });

    // 鼠标悬停时停止自动播放
    slider.addEventListener('mouseenter', stopSlideShow);
    slider.addEventListener('mouseleave', startSlideShow);

    // 开始自动播放
    startSlideShow();
});

// 心愿墙功能
document.addEventListener('DOMContentLoaded', function() {
    const wishModal = document.getElementById('wishModal');
    const writeWishBtn = document.getElementById('writeWishBtn');
    const closeBtn = document.querySelector('.close-btn');
    const wishForm = document.getElementById('wishForm');
    const wishGrid = document.getElementById('wishGrid');
    const showMoreBtn = document.getElementById('showMoreBtn');

    // 存储所有心愿
    let wishes = [
        {
            message: "小白，已经一年了。每次下班回家，还是会习惯性地等你来迎接。希望在天堂的你也能过得开心。",
            authorName: "晓华",
            petName: "小白",
            time: "2024-01-15"
        },
        {
            message: "亲爱的咪咪，谢谢你陪伴我度过最困难的那段时光。你的爱让我变得更坚强。永远想念你。",
            authorName: "小美",
            petName: "咪咪",
            time: "2024-01-10"
        },
        {
            message: "豆豆，还记得我们一起看日出的时光吗？那些美好的回忆永远珍藏在心里。愿你在彩虹桥那边安好。",
            authorName: "阿杰",
            petName: "豆豆",
            time: "2024-01-05"
        }
    ];

    // 显示弹窗
    writeWishBtn.addEventListener('click', () => {
        wishModal.classList.add('show');
    });

    // 关闭弹窗
    closeBtn.addEventListener('click', () => {
        wishModal.classList.remove('show');
    });

    // 点击弹窗外部关闭
    wishModal.addEventListener('click', (e) => {
        if (e.target === wishModal) {
            wishModal.classList.remove('show');
        }
    });

    // 提交表单
    wishForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newWish = {
            message: document.getElementById('wishMessage').value,
            authorName: document.getElementById('authorName').value,
            petName: document.getElementById('petName').value,
            time: new Date().toISOString().split('T')[0]
        };

        // 添加新心愿到数组开头
        wishes.unshift(newWish);
        
        // 更新显示
        renderWishes();
        
        // 重置表单并关闭弹窗
        wishForm.reset();
        wishModal.classList.remove('show');
    });

    // 渲染心愿卡片
    function renderWishes(showAll = false) {
        const displayWishes = showAll ? wishes : wishes.slice(0, 3);
        wishGrid.innerHTML = displayWishes.map(wish => `
            <div class="wish-card">
                <div class="wish-card-content">
                    <p class="wish-message">"${wish.message}"</p>
                    <div class="wish-author">
                        <span class="author-name">${wish.authorName}</span>
                        <span class="pet-name">致：${wish.petName}</span>
                    </div>
                    <div class="wish-time">${wish.time}</div>
                </div>
            </div>
        `).join('');
    }

    // 查看更多按钮功能
    let isExpanded = false;
    showMoreBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        renderWishes(isExpanded);
        showMoreBtn.textContent = isExpanded ? '收起' : '查看更多';
    });

    // 初始化显示
    renderWishes();
});

// 服务详情功能
document.addEventListener('DOMContentLoaded', function() {
    const serviceModal = document.getElementById('serviceModal');
    const serviceTitle = document.getElementById('serviceTitle');
    const serviceDescription = document.getElementById('serviceDescription');
    const serviceFeatures = document.getElementById('serviceFeatures');
    const closeBtn = serviceModal.querySelector('.close-btn');
    const contactBtn = serviceModal.querySelector('.contact-btn');

    // 服务详情数据
    const serviceDetails = {
        care: {
            title: '生命关怀服务',
            description: '我们提供全方位的生命关怀服务，让每一个生命都能得到最专业的照顾。从日常护理到专业医疗，我们始终坚持以爱心和专业的态度，为每一位宠物提供最贴心的服务。',
            features: [
                '24小时专业兽医团队待命',
                '定制化护理方案',
                '舒适的疗养环境',
                '专业的医疗设备',
                '营养师定制膳食',
                '定期健康评估报告'
            ]
        },
        counseling: {
            title: '心理疏导服务',
            description: '失去挚爱的宠物是一段艰难的经历，我们理解这种失落感。我们的心理疏导服务旨在帮助您度过这段时期，重拾生活的信心和力量。',
            features: [
                '一对一心理咨询',
                '团体互助活动',
                '哀伤辅导课程',
                '家庭关系调适',
                '情感支持小组',
                '在线心理咨询服务'
            ]
        },
        memorial: {
            title: '永恒纪念服务',
            description: '让美好的回忆永远保存，我们提供多样化的纪念服务，帮助您以最适合的方式纪念您心爱的宠物，让爱永远延续。',
            features: [
                '专业摄影服务',
                '个性化纪念品定制',
                '主题纪念相册制作',
                '生命故事记录',
                '永久纪念空间',
                '线上纪念馆'
            ]
        }
    };

    // 显示服务详情
    function showServiceDetails(serviceType) {
        const details = serviceDetails[serviceType];
        serviceTitle.textContent = details.title;
        serviceDescription.textContent = details.description;
        serviceFeatures.innerHTML = `
            <h4>服务特点</h4>
            <ul>
                ${details.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
        serviceModal.classList.add('show');
    }

    // 添加点击事件监听
    document.querySelectorAll('.learn-more-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceType = btn.dataset.service;
            showServiceDetails(serviceType);
        });
    });

    // 关闭弹窗
    closeBtn.addEventListener('click', () => {
        serviceModal.classList.remove('show');
    });

    // 点击弹窗外部关闭
    serviceModal.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
            serviceModal.classList.remove('show');
        }
    });

    // 联系按钮点击事件
    contactBtn.addEventListener('click', () => {
        // 滚动到联系我们部分
        const contactSection = document.querySelector('.contact-section');
        contactSection.scrollIntoView({ behavior: 'smooth' });
        serviceModal.classList.remove('show');
    });

    // 添加卡片悬停效果
    document.querySelectorAll('.philosophy-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.card-details').style.opacity = '1';
            card.querySelector('.card-details').style.transform = 'translateY(0)';
        });

        card.addEventListener('mouseleave', () => {
            card.querySelector('.card-details').style.opacity = '0';
            card.querySelector('.card-details').style.transform = 'translateY(20px)';
        });
    });
});

// 建议添加页面滚动进度条
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
});

// 添加图片懒加载
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}); 
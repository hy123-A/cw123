document.addEventListener('DOMContentLoaded', () => {
    // 视频卡片动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // 添加动画效果
    const animateElements = document.querySelectorAll('.video-card, .story-card');
    animateElements.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });

    // 视频播放优化
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // 视频进入视图时自动播放
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });

        videoObserver.observe(video);

        // 添加加载提示
        video.addEventListener('waiting', () => {
            video.parentElement.classList.add('loading');
        });

        video.addEventListener('playing', () => {
            video.parentElement.classList.remove('loading');
        });
    });

    // 导航栏滚动效果
    let lastScroll = 0;
    const nav = document.querySelector('.main-nav');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // 添加加载更多功能
    const loadMoreBtn = document.querySelector('.load-more .btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', async () => {
            loadMoreBtn.textContent = '加载中...';
            loadMoreBtn.disabled = true;

            try {
                // 模拟加载更多内容
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // 这里可以通过AJAX加载更多内容
                const storyGrid = document.querySelector('.story-grid');
                const newStories = createNewStoryCards(3); // 创建3个新故事卡片
                storyGrid.append(...newStories);

                // 为新添加的卡片添加动画
                newStories.forEach(story => {
                    story.classList.add('animate-ready');
                    observer.observe(story);
                });

            } catch (error) {
                console.error('加载更多故事失败:', error);
            } finally {
                loadMoreBtn.textContent = '加载更多故事';
                loadMoreBtn.disabled = false;
            }
        });
    }

    // 创建新的故事卡片
    function createNewStoryCards(count) {
        const stories = [];
        for (let i = 0; i < count; i++) {
            const storyCard = document.createElement('article');
            storyCard.className = 'story-card';
            storyCard.innerHTML = `
                <img src="assets/images/story-${4 + i}.jpg" alt="新故事">
                <div class="story-content">
                    <h3>新的故事标题 ${i + 1}</h3>
                    <p>这是一个新的温馨故事...</p>
                    <div class="story-meta">
                        <span class="author">作者：新作者${i + 1}</span>
                        <span class="date">2024-03-${20 + i}</span>
                    </div>
                    <a href="#" class="read-more">阅读更多</a>
                </div>
            `;
            stories.push(storyCard);
        }
        return stories;
    }

    // 添加视频播放完成提示
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('ended', () => {
            const notification = document.createElement('div');
            notification.className = 'video-notification';
            notification.textContent = '视频播放完成';
            video.parentElement.appendChild(notification);

            setTimeout(() => {
                notification.remove();
            }, 2000);
        });
    });

    // 添加故事卡片点击事件
    document.querySelectorAll('.story-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('read-more')) {
                const readMoreLink = card.querySelector('.read-more');
                readMoreLink.click();
            }
        });
    });
}); 
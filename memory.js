// 数字动画函数
function animateNumber(element, target) {
    const duration = 2000; // 动画持续2秒
    const start = 0;
    const increment = target / (duration / 16); // 每16ms更新一次
    let current = start;
    
    const animate = () => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
        } else {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(animate);
        }
    };
    
    animate();
}

// 观察统计区域
document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItem = entry.target;
                const numberElement = statItem.querySelector('.stat-number');
                const targetNumber = parseInt(numberElement.textContent.replace(/,/g, ''));
                
                // 添加动画类
                statItem.classList.add('animate');
                numberElement.classList.add('animate');
                
                // 开始数字动画
                animateNumber(numberElement, targetNumber);
                
                // 动画只执行一次
                observer.unobserve(statItem);
            }
        });
    }, {
        threshold: 0.2
    });

    stats.forEach(stat => observer.observe(stat));
});

// 头像上传预览
document.addEventListener('DOMContentLoaded', function() {
    const avatarInput = document.getElementById('avatarInput');
    const avatarPreview = document.getElementById('avatarPreview');

    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // 验证文件大小
            if (file.size > 2 * 1024 * 1024) { // 2MB
                alert('头像图片大小不能超过2MB');
                this.value = '';
                return;
            }

            // 验证文件类型
            if (!file.type.match('image.*')) {
                alert('请上传图片文件');
                this.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                avatarPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // 修改表单提交处理
    const memoryForm = document.getElementById('memoryForm');
    const memoriesContainer = document.querySelector('.memories-container');
    const loadMoreBtn = document.querySelector('.load-more .btn');
    let page = 1;

    memoryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(memoryForm);
        const memoryData = {
            author: formData.get('author'),
            petName: formData.get('petName'),
            message: formData.get('message'),
            date: new Date().toISOString().split('T')[0],
            likes: 0
        };

        // 处理头像上传
        const avatarFile = formData.get('avatar');
        if (avatarFile && avatarFile.size > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                memoryData.avatarUrl = e.target.result;
                // 处理宠物照片
                const photoFile = formData.get('photo');
                if (photoFile && photoFile.size > 0) {
                    const photoReader = new FileReader();
                    photoReader.onload = function(e) {
                        memoryData.photoUrl = e.target.result;
                        addMemoryCard(memoryData);
                    };
                    photoReader.readAsDataURL(photoFile);
                } else {
                    addMemoryCard(memoryData);
                }
            };
            reader.readAsDataURL(avatarFile);
        } else {
            // 如果没有上传头像，使用默认头像
            memoryData.avatarUrl = 'assets/images/avatar-default.jpg';
            // 处理宠物照片
            const photoFile = formData.get('photo');
            if (photoFile && photoFile.size > 0) {
                const photoReader = new FileReader();
                photoReader.onload = function(e) {
                    memoryData.photoUrl = e.target.result;
                    addMemoryCard(memoryData);
                };
                photoReader.readAsDataURL(photoFile);
            } else {
                addMemoryCard(memoryData);
            }
        }

        // 重置表单和预览
        memoryForm.reset();
        avatarPreview.src = 'assets/images/avatar-default.jpg';
    });

    // 修改添加留言卡片函数
    function addMemoryCard(data) {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.innerHTML = `
            <div class="memory-header">
                <img src="${data.avatarUrl}" alt="用户头像" class="user-avatar">
                <div class="user-info">
                    <h4>${data.author}</h4>
                    <time>${data.date}</time>
                </div>
            </div>
            ${data.photoUrl ? `
            <div class="memory-image">
                <img src="${data.photoUrl}" alt="宠物照片" class="pet-photo">
            </div>
            ` : ''}
            <div class="memory-content">
                <div class="to-pet">致：${data.petName}</div>
                <p class="memory-text">${data.message}</p>
                <div class="memory-actions">
                    <span class="like-count">
                        <i class="bi bi-heart"></i>
                        ${data.likes}
                    </span>
                </div>
            </div>
        `;

        // 添加点赞功能
        const likeBtn = card.querySelector('.like-count');
        likeBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const count = this.textContent.trim();
            if (icon.classList.contains('bi-heart')) {
                icon.classList.replace('bi-heart', 'bi-heart-fill');
                this.innerHTML = `
                    <i class="bi bi-heart-fill"></i>
                    ${parseInt(count) + 1}
                `;
            } else {
                icon.classList.replace('bi-heart-fill', 'bi-heart');
                this.innerHTML = `
                    <i class="bi bi-heart"></i>
                    ${parseInt(count) - 1}
                `;
            }
        });

        // 将新卡片插入到容器的开头
        const firstCard = memoriesContainer.querySelector('.memory-card');
        if (firstCard) {
            memoriesContainer.insertBefore(card, firstCard);
        } else {
            memoriesContainer.appendChild(card);
        }
    }

    // 加载更多功能
    loadMoreBtn.addEventListener('click', function() {
        // 这里可以添加加载更多数据的逻辑
        page++;
        // 示例：加载更多数据
        const moreData = {
            author: "用户" + page,
            petName: "宠物" + page,
            message: "这是第" + page + "页加载的示例留言内容...",
            date: new Date().toISOString().split('T')[0],
            likes: Math.floor(Math.random() * 100)
        };
        addMemoryCard(moreData);
    });

    // 排序功能
    const sortSelect = document.querySelector('.sort-dropdown select');
    sortSelect.addEventListener('change', function() {
        const cards = Array.from(document.querySelectorAll('.memory-card'));
        const sortedCards = cards.sort((a, b) => {
            const dateA = new Date(a.querySelector('time').textContent);
            const dateB = new Date(b.querySelector('time').textContent);
            return this.value === 'newest' ? dateB - dateA : dateA - dateB;
        });

        // 清空容器
        while (memoriesContainer.firstChild) {
            memoriesContainer.removeChild(memoriesContainer.firstChild);
        }

        // 重新添加排序后的卡片
        sortedCards.forEach(card => memoriesContainer.appendChild(card));
    });
}); 
// 使用数据属性存储天数，避免重复创建
function initTimeline() {
    document.querySelectorAll('.event:not([data-days-initialized])').forEach(event => {
        // 标记已处理
        event.dataset.daysInitialized = 'true';
        
        // 计算天数
        const dateStr = event.dataset.date;
        const eventDate = new Date(dateStr.replace(/\./g, '-'));
        const diffDays = Math.floor((new Date() - eventDate) / 86400000);
        
        // 创建显示元素
        const daysEl = document.createElement('span');
        daysEl.className = 'days-counter';
        daysEl.textContent = getDayText(event.dataset.eventType, diffDays);
       
        
        // 智能插入位置
        const insertTarget = event.querySelector('p') || event.querySelector('h3');
        insertTarget.insertAdjacentElement('afterend', daysEl);
    });
}


function getDayText(type, days) {
    const templates = {
        // 初次见面模板
        meet: (days) => {
            if (days < 0) return `👫距离相遇还有 ${Math.abs(days)} 天`;
            return `👫已相识 ${days} 天`;
        },
        // 成为情侣模板
        couple: (days) => {
            if (days < 0) return `💞距离确认关系还有 ${Math.abs(days)} 天`;
            return `💞确认关系 ${days} 天`;
        },
        // 结婚模板
        marry: (days) => {
            if (days < 0) return `💐距离结婚还有 ${Math.abs(days)} 天`;
            return `💐已结婚 ${days} 天`;
        },
        // 旅行模板
        travel: (days) => {
            if (days < 0) return `🚲距离旅行还有 ${Math.abs(days)} 天`;
            return `🚲旅行 ${days} 天`;
        },
        // 默认模板
        default: () => "未知事件类型"
    };

    return (templates[type] || templates.default)(days);
}


// // 页面加载时执行
document.addEventListener('DOMContentLoaded', initTimeline);


// 图片灯箱效果
class Lightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.initEvents();
    }

    initEvents() {
        // 图片点击
        document.querySelectorAll('.gallery-img').forEach(img => {
            img.addEventListener('click', () => this.open(img));
        });

        // 关闭操作
        this.lightbox.addEventListener('click', (e) => {
            if (e.target.classList.contains('close') || e.target === this.lightbox) {
                this.close();
            }
        });

        // 键盘控制
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.classList.contains('active') && e.key === 'Escape') {
                this.close();
            }
        });
    }

    open(img) {
        this.lightboxImg.src = img.dataset.full || img.src;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // 加载失败处理
        this.lightboxImg.onerror = () => {
            this.lightboxImg.alt = '图片加载失败';
            console.error('图片加载失败:', this.lightboxImg.src);
        };
    }

    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// 初始化
new Lightbox();

document.querySelectorAll('.preview-image').forEach(img => {
    img.addEventListener('click', function() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.querySelector('.lightbox-image');
        
        // 重置状态
        lightbox.style.display = 'block';
        lightboxImg.src = '';
        lightbox.scrollTop = 0;
        
        // 加载图片
        lightboxImg.src = this.dataset.fullsize || this.src;
        
        // 锁定页面滚动
        document.body.style.overflow = 'hidden';
    });
});

// 关闭灯箱
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
});

// 点击背景关闭
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});


document.querySelectorAll('.wish-list li').forEach(item => {
    item.addEventListener('click', function() {
        // 切换完成状态
        const isDone = this.getAttribute('data-done') === 'true';
        this.setAttribute('data-done', !isDone);
        
        // 可选：保存状态到本地存储
        saveWishList();
    });
});

// 保存状态函数
function saveWishList() {
    const items = Array.from(document.querySelectorAll('.wish-list li')).map(li => {
        return {
            text: li.textContent.replace('✓', '').trim(),
            done: li.getAttribute('data-done') === 'true'
        };
    });
    localStorage.setItem('wishList', JSON.stringify(items));
}

// 页面加载时恢复状态
function loadWishList() {
    const saved = JSON.parse(localStorage.getItem('wishList'));
    if (saved) {
        document.querySelectorAll('.wish-list li').forEach((li, index) => {
            if (saved[index]) {
                li.setAttribute('data-done', saved[index].done);
            }
        });
    }
}


// 初始化
document.addEventListener('DOMContentLoaded', loadWishList);



// 旅行计划编辑
document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const item = this.closest('.plan-item');
        const action = item.querySelector('.action');
        const newText = prompt('修改计划:', action.textContent);
        if (newText) action.textContent = newText;
    });
});

// 留言功能
document.querySelector('.submit-btn').addEventListener('click', function() {
    const input = document.querySelector('.comment-input');
    if (input.value.trim()) {
        const comment = document.createElement('div');
        comment.className = 'comment';
        comment.innerHTML = `
            <span class="user">游客${Math.floor(Math.random()*1000)}：</span>
            <span class="text">${input.value}</span>
        `;
        document.querySelector('.comment-list').prepend(comment);
        input.value = '';
    }
});

// 保存留言
function saveComments() {
    const comments = [...document.querySelectorAll('.comment')].map(c => c.innerHTML);
    localStorage.setItem('wedding-comments', JSON.stringify(comments));
}


// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    initTimeline();
    initGallery();
    initWishlist();
});


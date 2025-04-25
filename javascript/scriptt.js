// 设置特效容器的z-index低于功能窗口
document.getElementById('effects-container').style.zIndex = '10'; 

// 或者如果使用我的特效代码：
const effects = document.createElement('div');
effects.id = 'effects-container';
effects.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 10; /* 低于功能窗口的50 */
`;
document.body.prepend(effects);

// ===== 1. 鼠标轨迹 =====
const trail = document.getElementById('mouse-trail');
let particles = [];

document.addEventListener('mousemove', (e) => {
    createParticle(e.clientX, e.clientY);
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'mouse-particle';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // 随机属性
    const size = Math.random() * 6 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    trail.appendChild(particle);
    
    // 粒子动画
    setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = `translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px)`;
        setTimeout(() => particle.remove(), 500);
    }, 50);
}

// ===== 2. 爱心雨 =====
function createHearts() {
    const container = document.getElementById('hearts-rain');
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 3 + 3}s`;
        heart.style.fontSize = `${Math.random() * 20 + 15}px`;
        
        container.appendChild(heart);
        
        // 动画结束后移除
        setTimeout(() => heart.remove(), 8000);
    }, 500);
}

// ===== 3. 雪花效果 =====
function createSnow() {
    const container = document.getElementById('snowfall');
    const symbols = ['❄', '❅', '❆', '✻'];
    
    setInterval(() => {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        flake.style.left = `${Math.random() * 100}vw`;
        flake.style.animationDuration = `${Math.random() * 5 + 3}s`;
        
        container.appendChild(flake);
        setTimeout(() => flake.remove(), 15000);
    }, 100);
}

// ===== 初始化所有效果 =====
window.addEventListener('load', () => {
    createHearts();
    createSnow();
});
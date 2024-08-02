// 获取所有按钮和对话框相关元素
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalButton = document.getElementById('modalClose');

// 绑定打开对话框的按钮
const openModalButtons = document.querySelectorAll('#openModalButton, #openModal1, #openModal2, #openModal3, #consult-button');
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.style.display = 'block';
        modalOverlay.style.display = 'block';
    });
});

// 关闭对话框
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
});

modalOverlay.addEventListener('click', () => {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
});

// 粒子效果
var end = Date.now() + (3 * 1000);
var colors = ['#bb0000', '#ffffff'];

(function frame() {
    confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
    });
    confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
    });

    if (Date.now() < end) {
        requestAnimationFrame(frame);
    }
}());

// 动态计数器
function animateValue(id, start, end, duration) {
    let obj = document.getElementById(id);
    let range = end - start;
    let minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    let startTime = new Date().getTime();
    let endTime = startTime + duration;
    let timer;

    function run() {
        let now = new Date().getTime();
        let remaining = Math.max((endTime - now) / duration, 0);
        let value = Math.round(end - (remaining * range));
        obj.innerHTML = value;
        if (value == end) {
            clearInterval(timer);
        }
    }

    timer = setInterval(run, stepTime);
    run();
    obj.classList.add('counting');
}

window.onload = function () {
    animateValue("fans", 0, 1664, 2000);
    animateValue("reviews", 0, 1747, 2000);
    animateValue("questions", 0, 16889, 2000);
    animateValue("tutorials", 0, 31, 2000);
};

// 页面加载后执行
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        document.getElementById('notice-banner').classList.add('show');
    }, 500); // 500ms后显示提醒

    document.getElementById('close-notice').addEventListener('click', function () {
        document.getElementById('notice-banner').classList.remove('show');
    });

    // 点击 consult-button 显示对话框
    document.getElementById('consult-button').addEventListener('click', function (e) {
        e.preventDefault();
        modal.style.display = 'block';
        modalOverlay.style.display = 'block';
    });
});

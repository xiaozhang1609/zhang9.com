document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contactModal');
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModalButton = document.querySelector('.modal-close');
    const modalBackground = document.querySelector('.modal-background');
    const faqItems = document.querySelectorAll('.faq-item');
    const backToTopButton = document.getElementById('backToTop');

    function toggleModal() {
        modal.classList.toggle('is-active');
    }

    openModalButtons.forEach(button => button.addEventListener('click', toggleModal));
    closeModalButton.addEventListener('click', toggleModal);
    modalBackground.addEventListener('click', toggleModal);

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });

    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        const range = end - start;
        const minTimer = 50;
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
            if (value === end) {
                clearInterval(timer);
            }
        }

        timer = setInterval(run, stepTime);
        run();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const values = {
                    fans: 3664,
                    reviews: 1747,
                    questions: 17889,
                    tutorials: 31
                };
                animateValue(id, 0, values[id], 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('#fans, #reviews, #questions, #tutorials').forEach(el => {
        observer.observe(el);
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 动态生成评论
    const reviews = [
        { name: "山东 dahefa", rating: 5, content: "服务很好，问题都解决了，还提供了视频教学，好评！", date: "2024-05-18" },
        { name: "宁夏 流云", rating: 5, content: "非常有耐心，因为我的错误操作导致问题复杂，但还是耐心解决了。", date: "2024-05-18" },
        { name: "云南 江流儿", rating: 5, content: "非常快速解决了我的问题，好评。", date: "2024-05-18" },
        { name: "北京 小李", rating: 5, content: "专业水平很高，解决问题快速准确。", date: "2024-05-19" },
        { name: "上海 阿强", rating: 5, content: "服务态度很好，解答很详细。", date: "2024-05-20" },
        { name: "广州 小美", rating: 5, content: "不厌其烦地解答了我很多问题，非常感谢！", date: "2024-05-21" }
    ];

    const reviewsContainer = document.getElementById('reviewsContainer');
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'column is-4';
        reviewElement.innerHTML = `
            <div class="card customer-review">
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <div class="has-background-primary has-text-white is-flex is-justify-content-center is-align-items-center"
                                    style="width: 48px; height: 48px; border-radius: 50%;">
                                    ${review.name[0]}
                                </div>
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">${review.name}</p>
                            <p class="subtitle is-6">${'★'.repeat(review.rating)}</p>
                        </div>
                    </div>
                    <div class="content">
                        ${review.content}
                        <br>
                        <time datetime="${review.date}">${review.date}</time>
                    </div>
                </div>
            </div>
        `;
        reviewsContainer.appendChild(reviewElement);
    });

    // 更新版权年份
    const currentYearElement = document.getElementById('currentYear');
    currentYearElement.textContent = new Date().getFullYear();
});
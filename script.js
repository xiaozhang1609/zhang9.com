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
                    fans: 1664,
                    reviews: 1747,
                    questions: 16889,
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
        if (window.pageYOffset > 300) {
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
});
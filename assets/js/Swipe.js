document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    let startX;
    let currentIndex = 0;

    function handleTouchStart(event) {
        startX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        if (!startX) return;

        const currentX = event.touches[0].clientX;
        const diffX = startX - currentX;

        if (diffX > 50) {
            // Swipe sinistra
            nextSlide();
            startX = null;
        } else if (diffX < -50) {
            // Swipe destra
            prevSlide();
            startX = null;
        }
    }

    function nextSlide() {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateSlide();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlide();
        }
    }

    function updateSlide() {
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    carouselInner.addEventListener('touchstart', handleTouchStart);
    carouselInner.addEventListener('touchmove', handleTouchMove);
});
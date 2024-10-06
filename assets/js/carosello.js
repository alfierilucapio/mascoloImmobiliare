document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    setInterval(() => {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % items.length;
        document.querySelector('.carousel-inner').style.transform = `translateX(-${currentIndex * 100}%)`;
        items[currentIndex].classList.add('active');
    }, 5000); // Cambia immagine ogni 5 secondi
});
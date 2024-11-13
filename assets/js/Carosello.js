document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.carousel-item');
    const carouselInner = document.querySelector('.carousel-inner');
    const prevButton = document.querySelector('.carousel-control-prev');
    const nextButton = document.querySelector('.carousel-control-next');
    let currentIndex = 0;
    let autoSlideInterval;

    // Funzione per aggiornare la slide
    function updateSlide(newIndex) {
        items[currentIndex].classList.remove('active'); // Rimuovi classe attiva dalla slide corrente
        currentIndex = (newIndex + items.length) % items.length; // Calcola il nuovo indice con ciclo continuo
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`; // Scorri alla nuova slide
        items[currentIndex].classList.add('active'); // Aggiungi classe attiva alla nuova slide
    }

    // Funzione per avviare lo scorrimento automatico
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            updateSlide(currentIndex + 1); // Avanza alla slide successiva
        }, 5000); // Cambia immagine ogni 5 secondi
    }

    // Funzione per resettare lo scorrimento automatico
    function resetAutoSlide() {
        clearInterval(autoSlideInterval); // Ferma l’intervallo corrente
        startAutoSlide(); // Avvia un nuovo intervallo
    }

    // Eventi per i pulsanti di navigazione
    prevButton.addEventListener('click', () => {
        updateSlide(currentIndex - 1); // Vai alla slide precedente
        resetAutoSlide(); // Reset del timer
    });

    nextButton.addEventListener('click', () => {
        updateSlide(currentIndex + 1); // Vai alla slide successiva
        resetAutoSlide(); // Reset del timer
    });

    // Imposta la prima slide come attiva e avvia lo scorrimento automatico al caricamento del DOM
    items[currentIndex].classList.add('active');
    startAutoSlide();
});
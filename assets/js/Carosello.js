document.addEventListener('DOMContentLoaded', () => {
    const items = Array.from(document.querySelectorAll('.carousel-item'));
    const carouselInner = document.querySelector('.carousel-inner');
    const prevButton = document.querySelector('.carousel-control-prev');
    const nextButton = document.querySelector('.carousel-control-next');
    let currentIndex = 1; // Iniziamo con il primo elemento "vero"
    let autoSlideInterval;

    // Duplica la prima e l'ultima slide per creare un effetto di continuità
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);

    firstClone.classList.add('clone');
    lastClone.classList.add('clone');

    carouselInner.appendChild(firstClone);
    carouselInner.insertBefore(lastClone, items[0]);

    // Aggiungi le slide clonate al nodo `items`
    const extendedItems = Array.from(document.querySelectorAll('.carousel-item'));

    // Imposta la trasformazione iniziale per iniziare sulla prima slide reale
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Funzione per aggiornare la slide con gestione del ciclo continuo
    function updateSlide(newIndex) {
        carouselInner.style.transition = 'transform 0.5s ease-in-out';
        currentIndex = newIndex;

        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Gestione del loop dopo l'animazione
        carouselInner.addEventListener('transitionend', () => {
            if (currentIndex === 0) {
                // Se siamo all'inizio, salta alla fine reale
                carouselInner.style.transition = 'none';
                currentIndex = extendedItems.length - 2;
                carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
            } else if (currentIndex === extendedItems.length - 1) {
                // Se siamo alla fine, salta all'inizio reale
                carouselInner.style.transition = 'none';
                currentIndex = 1;
                carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
        });
    }

    // Funzione per avviare lo scorrimento automatico
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            updateSlide(currentIndex + 1);
        }, 4000);
    }

    // Funzione per resettare lo scorrimento automatico
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Eventi per i pulsanti di navigazione
    prevButton.addEventListener('click', () => {
        updateSlide(currentIndex - 1);
        resetAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        updateSlide(currentIndex + 1);
        resetAutoSlide();
    });

    // Imposta la prima slide come attiva e avvia lo scorrimento automatico
    extendedItems[currentIndex].classList.add('active');
    startAutoSlide();
});
// Durata della GIF in millisecondi (esempio: 5 secondi)
let gifDuration = 1710;
let pageLoaded = false;

// Funzione per mostrare la GIF di caricamento
function mostraGifCaricamento() {
    const videoCaricamento = document.getElementById('video_caricamento');
    if (videoCaricamento) {
        videoCaricamento.style.display = 'block';
        // Esegui la funzione al termine della durata della GIF
        setTimeout(onGifEnd, gifDuration);
    } else {
        console.warn("Elemento 'video_caricamento' non trovato.");
    }
}

// Funzione per nascondere la schermata di caricamento
function nascondiSchermataCaricamento() {
    const divCaricamento = document.getElementById('schermata_caricamento');
    const tour = document.getElementById('tourVirtuale');
    if (divCaricamento) {
        divCaricamento.classList.add('hidden');
        tour.style.display = 'block';
        setTimeout(() => {
            divCaricamento.style.display = 'none';
        }, 500); // Tempo di transizione in millisecondi
    } else {
        console.warn("Elemento 'schermata_caricamento' non trovato.");
    }
}

// Funzione da eseguire al termine della GIF
function onGifEnd() {
    if (pageLoaded) {
        nascondiSchermataCaricamento();
    } else {
        gifDuration += 1710; // Aumenta la durata e riattiva il timeout
        setTimeout(onGifEnd, gifDuration);
    }
}

// Evento DOMContentLoaded per indicare che la pagina è caricata
document.addEventListener("DOMContentLoaded", () => {
    mostraGifCaricamento();
    verificaCaricamentoImmaginiLeggere(); // Chiamata alla funzione per verificare il caricamento delle immagini leggere
});

// Evento load per indicare che tutte le risorse della pagina sono caricate
window.addEventListener("load", () => {
    pageLoaded = true;
    nascondiSchermataCaricamento();
});

// Funzione per verificare il caricamento delle immagini leggere
function verificaCaricamentoImmaginiLeggere() {
    const immaginiLeggere = document.querySelectorAll('img[data-leggero="true"]');
    let immaginiCaricate = 0;

    immaginiLeggere.forEach((img) => {
        if (img.complete) {
            immaginiCaricate++;
        } else {
            img.addEventListener('load', () => {
                immaginiCaricate++;
                if (immaginiCaricate === immaginiLeggere.length) {
                    nascondiSchermataCaricamento();
                }
            });
        }
    });

    if (immaginiCaricate === immaginiLeggere.length) {
        nascondiSchermataCaricamento();
    }
}
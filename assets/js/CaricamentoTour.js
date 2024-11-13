// Durata della GIF in millisecondi (esempio: 1.71 secondi)
let gifDuration = 1710;
let pageLoaded = false;
let videoLoaded = false;
let imgLoaded = false;

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
    if (pageLoaded && videoLoaded && imgLoaded) {
        nascondiSchermataCaricamento();
    } else {
        // Mantiene il loop finché tutte le risorse non sono caricate
        setTimeout(onGifEnd, gifDuration);
    }
}

// Evento DOMContentLoaded per indicare che la pagina è caricata
document.addEventListener("DOMContentLoaded", () => {
    mostraGifCaricamento();
    pageLoaded = true;

    const video = document.getElementById('videoProgetto');

    video.addEventListener('loadeddata', () => {
        videoLoaded = true;
        console.log('Il video è stato caricato completamente.');
    });

    video.addEventListener('error', (e) => {
        console.error('Errore durante il caricamento del video:', e);
    });

    verificaCaricamentoImmaginiLeggere(); // Verifica il caricamento delle immagini leggere
});

// Funzione per verificare il caricamento delle immagini leggere
function verificaCaricamentoImmaginiLeggere() {
    const immaginiLeggere = document.querySelectorAll('[data-leggero="true"]');
    let immaginiCaricate = 0;

    console.log(`Trovate ${immaginiLeggere.length} immagini leggere.`);

    immaginiLeggere.forEach((img) => {
        if (img.complete) {
            immaginiCaricate++;
            console.log(`Immagine già caricata: ${img.src}`);
        } else {
            img.addEventListener('load', () => {
                immaginiCaricate++;
                console.log(`Immagine caricata: ${img.src}`);
                if (immaginiCaricate === immaginiLeggere.length) {
                    imgLoaded = true;
                }
            });
        }
    });

    if (immaginiCaricate === immaginiLeggere.length) {
        imgLoaded = true;
    }
}
// Durata della GIF in millisecondi (1.71 secondi)
let gifDuration = 1710;
let pageLoaded = false;
let videoLoaded = false;
let imgLoaded = false;

// Funzione per mostrare la GIF di caricamento
function mostraGifCaricamento() {
    const videoCaricamento = document.getElementById('video_caricamento');
    if (videoCaricamento) {
        videoCaricamento.style.display = 'block';
        setTimeout(onGifEnd, gifDuration); // Controlla il caricamento alla fine della GIF
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
        // Se le condizioni non sono ancora soddisfatte, riprova dopo gifDuration
        setTimeout(onGifEnd, gifDuration);
    }
}

// Evento DOMContentLoaded per indicare che la pagina è caricata
document.addEventListener("DOMContentLoaded", () => {
    mostraGifCaricamento();
    pageLoaded = true;

    const video = document.getElementById('videoProgetto');
    const overlayTourVirtuale = document.getElementById('overlayTourVirtuale');

    // Controlla se il video è già pronto o aspetta il caricamento
    if (video.readyState >= 3) {  // readyState >= 3 indica che il video è caricato
        videoLoaded = true;
    } else {
        video.addEventListener('loadeddata', () => {
            videoLoaded = true;
            console.log('Il video è stato caricato completamente.');
        });
    }

    // Aggiungi un listener per l'evento 'ended' del video
    video.addEventListener('ended', () => {
        overlayTourVirtuale.style.opacity = '1';
        console.log("La riproduzione del video è terminata.");
    });

    video.addEventListener('error', (e) => {
        console.error('Errore durante il caricamento del video:', e);
    });

    verificaCaricamentoImmaginiLeggere(); // Controlla il caricamento delle immagini leggere
});

// Funzione per verificare il caricamento delle immagini leggere
function verificaCaricamentoImmaginiLeggere() {
    const immaginiLeggere = document.querySelectorAll('[data-leggero="true"]');
    let immaginiCaricate = 0;

    console.log(`Trovate ${immaginiLeggere.length} immagini leggere.`);

    immaginiLeggere.forEach((img) => {
        if (img.complete) {
            immaginiCaricate++;
        } else {
            img.addEventListener('load', () => {
                immaginiCaricate++;
                if (immaginiCaricate === immaginiLeggere.length) {
                    imgLoaded = true;
                }
            });
        }
    });

    // Se tutte le immagini sono già caricate
    if (immaginiCaricate === immaginiLeggere.length) {
        imgLoaded = true;
    }
}
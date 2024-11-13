// Durata della GIF in millisecondi (1.71 secondi)
const gifDuration = 1710;

// Funzione per mostrare la GIF di caricamento
function mostraGifCaricamento() {
    const videoCaricamento = document.getElementById('video_caricamento');
    if (videoCaricamento) {
        videoCaricamento.style.display = 'block';
        setTimeout(onGifEnd, gifDuration); // Avvia la verifica dopo il primo ciclo GIF
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

// Funzione da eseguire al termine della GIF, verificando le risorse caricate
function onGifEnd() {
    Promise.all([domReady, videoReady, immaginiLeggereCaricate]).then(() => {
        nascondiSchermataCaricamento();
    }).catch(() => {
        // Se una risorsa non è pronta, riavvia il controllo alla fine del prossimo ciclo GIF
        setTimeout(onGifEnd, gifDuration);
    });
}

// Promise per il caricamento del DOM
const domReady = new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", () => {
        mostraGifCaricamento();
        resolve(true);
    });
});

// Promise per il caricamento del video
const videoReady = new Promise((resolve, reject) => {
    const video = document.getElementById('videoProgetto');
    if (video.readyState >= 3) {  // Controlla se il video è già caricato
        resolve(true);
    } else {
        video.addEventListener('loadeddata', () => resolve(true));
        video.addEventListener('error', (e) => {
            console.error('Errore durante il caricamento del video:', e);
            reject(false);
        });
    }
});

// Promise per il caricamento delle immagini leggere
const immaginiLeggereCaricate = new Promise((resolve) => {
    const immaginiLeggere = document.querySelectorAll('[data-leggero="true"]');
    let immaginiDaCaricare = immaginiLeggere.length;
    immaginiLeggere.forEach((img) => {
        if (img.complete) {
            immaginiDaCaricare--;
        } else {
            img.addEventListener('load', () => {
                immaginiDaCaricare--;
                if (immaginiDaCaricare === 0) {
                    resolve(true);
                }
            });
        }
    });

    // Se tutte le immagini sono già caricate
    if (immaginiDaCaricare === 0) {
        resolve(true);
    }
});
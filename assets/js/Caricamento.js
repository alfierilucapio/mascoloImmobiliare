// Funzione per precaricare l'immagine
function preloadImage(url) {
    var img = new Image();
    img.src = url;
}

// Precarica l'immagine prima che il DOM sia completamente caricato
preloadImage('/assets/images/CaricamentoMascoloImmobiliare-transparente.gif');

// Durata della GIF in millisecondi
const gifDuration = 1810;
let pageLoaded = false;

document.addEventListener("DOMContentLoaded", () => {
    pageLoaded=true;
});

// Funzione da eseguire al termine della GIF
function onGifEnd() {
    if(pageLoaded){
        const div = document.getElementById('schermata_caricamento');
        div.classList.add('hidden');
        setTimeout(() => {
            div.style.display = 'none';
        }, 500); // Tempo di transizione in millisecondi
    }else{
        gifDuration = gifDuration + 1810;
    }
}

// Esegui la funzione al termine della durata della GIF
setTimeout(onGifEnd, gifDuration)
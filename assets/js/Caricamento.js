// Durata della GIF in millisecondi (esempio: 5 secondi)
const gifDuration = 1710;
let pageLoaded = false;

document.addEventListener("DOMContentLoaded", () => {
    pageLoaded=true;
    document.getElementById('video_caricamento').style.display = 'block';
});

// Funzione da eseguire al termine della GIF
function onGifEnd() {
    if(pageLoaded){
        const div = document.getElementById('schermata_caricamento');
        const tour = document.getElementById('tourVirtuale');
        div.classList.add('hidden');
        tour.style.display = 'block';
        setTimeout(() => {
            div.style.display = 'none';
        }, 500); // Tempo di transizione in millisecondi
    }else{
        gifDuration = gifDuration + 1710;
    }
}

// Esegui la funzione al termine della durata della GIF
setTimeout(onGifEnd, gifDuration)
// Durata della GIF in millisecondi
const gifDuration = 1810;
let pageLoaded = false;
let DOMContentLoaded = false;

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");
    DOMContentLoaded = true;
});

window.onload = function() {
    console.log("window.onload");
    pageLoaded = true;
}

// Funzione da eseguire al termine della GIF
function onGifEnd() {
    console.log("onGifEnd");
    if (pageLoaded && DOMContentLoaded) {
        const div = document.getElementById('schermata_caricamento');
        div.classList.add('hidden');
        setTimeout(() => {
            div.style.display = 'none';
        }, 500); // Tempo di transizione in millisecondi
    } else {
        console.log("Ritardo aggiuntivo");
        setTimeout(onGifEnd, gifDuration); // Esegui di nuovo la funzione dopo la durata della GIF
    }
}

// Esegui la funzione al termine della durata della GIF
setTimeout(onGifEnd, gifDuration);
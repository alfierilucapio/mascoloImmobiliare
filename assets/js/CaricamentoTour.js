document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById("schermata_caricamento");
    const loadingGif = document.getElementById("video_caricamento");
    const videoProgetto = document.getElementById("videoProgetto");
    const immaginiLeggere = document.querySelectorAll("img[data-leggero='true']");

    // Funzione per verificare che tutte le immagini siano caricate
    function immaginiCaricate() {
        return Array.from(immaginiLeggere).every(img => img.complete && img.naturalHeight !== 0);
    }

    // Funzione per verificare tutte le condizioni richieste
    function controllaCaricamento() {
        if (document.readyState === "complete" && immaginiCaricate() && videoProgetto.readyState === 4) {
            loadingScreen.style.display = "none";
            videoProgetto.play();
        }
    }

    // Monitoraggio del video di caricamento
    loadingGif.addEventListener("ended", function() {
        if (!loadingScreen.hidden) {
            controllaCaricamento();
        }
    }, true);

    // Monitoraggio del video progetto
    videoProgetto.addEventListener("loadeddata", function() {
        controllaCaricamento();
    });

    // Controllo delle immagini e stato DOM alla fine del caricamento
    window.addEventListener("load", controllaCaricamento);
});
document.addEventListener("DOMContentLoaded", function () {
    const videoCaricamento = document.getElementById("video_caricamento");
    const schermataCaricamento = document.getElementById("schermata_caricamento");
    const videoProgetto = document.getElementById("videoProgetto");

    let domCaricato = false;
    let immaginiLeggereCaricate = false;
    let videoCaricato = false;

    // Funzione per verificare se tutte le condizioni sono soddisfatte
    function verificaCondizioni() {
        if (domCaricato && immaginiLeggereCaricate && videoCaricato) {
            schermataCaricamento.style.display = "none";
            videoProgetto.play();
        }
    }

    // Verifica se tutte le immagini con data-leggero="true" sono caricate
    function verificaImmaginiLeggere() {
        const immaginiLeggere = document.querySelectorAll('img[data-leggero="true"]');
        immaginiLeggereCaricate = Array.from(immaginiLeggere).every(img => img.complete);
        verificaCondizioni();
    }

    // Evento di caricamento del video
    videoProgetto.addEventListener("loadeddata", function () {
        videoCaricato = true;
        verificaCondizioni();
    });

    // Evento di fine loop della GIF di caricamento
    videoCaricamento.addEventListener("ended", function () {
        domCaricato = true;
        verificaImmaginiLeggere();
    });

    // Attiva il loop sulla GIF di caricamento
    videoCaricamento.loop = true;
    videoCaricamento.play();
});  
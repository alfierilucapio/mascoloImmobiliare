document.addEventListener("DOMContentLoaded", function() {
    const schermataCaricamento = document.getElementById("schermata_caricamento");
    const videoCaricamento = document.getElementById("video_caricamento");
    const videoProgetto = document.getElementById("videoProgetto");
  
    // Flag di controllo per il caricamento delle risorse
    let domCaricato = false;
    let immaginiLeggereCaricate = false;
    let videoCaricato = false;
  
    // Funzione per verificare se tutte le condizioni sono soddisfatte
    function verificaCondizioni() {
      if (domCaricato && immaginiLeggereCaricate && videoCaricato) {
        // Nascondiamo la schermata di caricamento e avviamo il video
        schermataCaricamento.style.display = "none";
        videoProgetto.play();
      }
    }
  
    // Impostiamo domCaricato a true subito dopo il caricamento del DOM
    domCaricato = true;
  
    // Funzione per verificare il caricamento delle immagini con data-leggero="true"
    function verificaImmaginiLeggere() {
      const immaginiLeggere = document.querySelectorAll('img[data-leggero="true"]');
      let tutteCaricate = true;
  
      immaginiLeggere.forEach((img) => {
        if (!img.complete) {
          tutteCaricate = false;
          img.addEventListener("load", verificaImmaginiLeggere);
        }
      });
  
      if (tutteCaricate) {
        immaginiLeggereCaricate = true;
        verificaCondizioni();
      }
    }
  
    // Verifica il caricamento completo del video
    videoProgetto.addEventListener("loadeddata", function() {
      videoCaricato = true;
      verificaCondizioni();
    });
  
    // Evento di fine riproduzione per la GIF di caricamento
    videoCaricamento.addEventListener("ended", function() {
      videoCaricamento.loop = true; // Abilita il loop della GIF di caricamento
      verificaImmaginiLeggere();
      verificaCondizioni();
    });
  
    // Attiva il loop sulla GIF di caricamento e avvia la riproduzione
    videoCaricamento.loop = true;
    videoCaricamento.play();
  });  
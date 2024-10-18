document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById("videoProgetto");
    video.play().catch(function(error) {
        console.error("Errore durante l'avvio del video:", error);
    });
});

/* let lastScrollPosition = 0;
let ticking = false;

document.addEventListener('scroll', () => {
    lastScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateVideoFrame(lastScrollPosition);
            ticking = false;
        });
        ticking = true;
    }
});

function updateVideoFrame(scrollPos) {
    const videos = document.querySelectorAll('.videoScrolling');
    const windowHeight = window.innerHeight;

    videos.forEach(video => {
        const rect = video.parentElement.getBoundingClientRect();
        const videoSectionHeight = video.parentElement.offsetHeight;

        // Calcola la posizione dello scroll rispetto alla sezione del video
        const startScroll = video.parentElement.offsetTop - windowHeight / 2;
        const endScroll = startScroll + videoSectionHeight - windowHeight;
        const scrollRange = endScroll - startScroll;

        // Verifica che video.duration sia un numero valido
        if (!isFinite(video.duration) || video.duration === 0) {
            return; // Salta questo video se la durata non è valida
        }

        // Verifica se la sezione del video è visibile
        if (scrollPos >= startScroll && scrollPos <= endScroll) {
            // Calcola il progresso relativo allo scroll nella sezione del video
            const scrollProgress = (scrollPos - startScroll) / scrollRange;

            // Calcola il tempo del video basato sulla percentuale di avanzamento
            const targetTime = video.duration * scrollProgress;

            // Imposta il tempo corrente del video solo se il valore è finito
            if (isFinite(targetTime)) {
                video.currentTime = targetTime;

                // Mostra l'overlay quando il video è negli ultimi 5 secondi
                const overlay = document.getElementById(`video-overlay-${video.dataset.videoId}`);
                if (video.duration - video.currentTime <= 5) {
                    if (overlay) {
                        overlay.classList.add('show'); // Aggiungi la classe per mostrare l'overlay
                    }
                } else {
                    if (overlay) {
                        overlay.classList.remove('show'); // Rimuovi la classe per nascondere l'overlay
                    }
                }
            }
        } else {
            // Nascondi l'overlay se il video non è visibile
            const overlay = document.getElementById(`video-overlay-${video.dataset.videoId}`);
            if (overlay) {
                overlay.classList.remove('show'); // Rimuovi la classe per nascondere l'overlay
            }
        }
    });
} */
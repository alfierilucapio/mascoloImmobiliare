window.onload = function () {
    var video = document.getElementById("videoProgetto");
    var overlay = document.getElementById("overlayTourVirtuale");

    video.onended = function () {
        overlay.style.opacity = 1;
    };
};
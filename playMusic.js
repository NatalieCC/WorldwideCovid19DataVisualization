document.addEventListener('DOMContentLoaded', function () {
    setTimeout(addVolumeListener, 0);
    // addVolumeListener();
});
// document.getElementById("volume").addEventListener('click', (e) => {
//     song = document.getElementById("music");
//     song.volume = 0.5;
//     if (song.paused) {
//         song.volume = 0.5;
//         song.play();
//         song.classList.remove("volume-color");
//     } else {
//         song.classList.add("volume-color");
//         song.pause();
//     }
// });

function addVolumeListener() {
    // song = document.getElementById("music");
    // song.volume = 0.5;
    // song.play();
    // let volume = document.getElementById("volume");
    //console.log(88);
    document.getElementById("volume").addEventListener('click', function () {
        song = document.getElementById("music");
        if (song.paused) {
            song.volume = 0.5;
            song.play();
            song.classList.remove("volume-color");
        } else {
            song.classList.add("volume-color");
            song.pause(); 
        }
        // if (song.playing)
    });

}
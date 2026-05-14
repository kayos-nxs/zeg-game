// there is a debug stuff that will be shown
// in console whenever i need to (when pressed k key)

// fps stuff
const times = [];
let fps;

function showFps() { // thank you stackoverflow
    // will refresh fps var every second and
    // show it in console
    function refreshLoop() {
    window.requestAnimationFrame(() => {
        const now = performance.now(); // get current timestamp
        while (times.length > 0 && times[0] <= now - 1000) { // remove timestamps that are older than 1 second
            times.shift(); // remove the oldest timestamp
        }
        times.push(now); // add current timestamp
        fps = times.length; 
        refreshLoop();
    });
    }

    refreshLoop();
    console.log("fps: " + fps);

}

setInterval(() => {  // checks if debug is enabled and if it is,
    if (debug) { 
        console.log("x: " + player.x + ", y: " + player.y); // then show x and y coordinates in console
        showFps(); // and show fps in console
    }
}, 1000);





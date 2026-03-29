window.addEventListener("keydown", function(e) {           // track down key that are being pressed

    if (e.key === "k") {           // will enable debug stuff, that will show 
        debug = !debug;            // for example x and y coordinates
        console.log("debug mode: " + debug);
        document.getElementById("debug").style.visibility = debug ? "visible" : "hidden";
    }

    if (e.key === "w") {           // player movement
        wPressed = true;
    }
    if (e.key === "a") {
        aPressed = true;
    }
    if (e.key === "s") {
        sPressed = true;
    }
    if (e.key === "d") {
        dPressed = true;
    }
});

window.addEventListener("keyup", function(e) {           // track down key that are being released

    if (e.key === "w") {           // player movement
        wPressed = false;
    }
    if (e.key === "a") {
        aPressed = false;
    }
    if (e.key === "s") {
        sPressed = false;
    }
    if (e.key === "d") {
        dPressed = false;
    }
});



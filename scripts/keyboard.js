// keyboard handling and stuff

// track down key that are being pressed
window.addEventListener("keydown", function(e) {           

    if (e.key === "k") { // will enable debug stuff, that will show 
        debug = !debug;  // for example x and y coordinates
        console.log("debug mode: " + debug);
        document.getElementById("debug").style.visibility = debug ? "visible" : "hidden";
    }


    // player movement
    if (e.key === "w") { 
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

    // PLACEHOLDER!!
    if (e.key === "r") {
        // guess who's finally getting his powers! he-he..
    }
    if (e.key === "e") {
        // are you sure?
    }
    if (e.key === "-") {
        // pretty sure.. threw a trashbag into space, at work
    }
    if (e.key === "=") {
        // well, son that's great!
    }
});

// track down key that are being released
window.addEventListener("keyup", function(e) { 
    
    // player movement
    if (e.key === "w") { 
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
    
    // PLACEHOLDER!!
    if (e.key === "r") {
        // guess who's finally getting his powers! he-he..
    }
    if (e.key === "e") {
        // are you sure?
    }
    if (e.key === "-") {
        // pretty sure.. threw a trashbag into space, at work
    }
    if (e.key === "=") {
        // well, son that's great!
    }

});



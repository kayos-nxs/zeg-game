// keyboard handling and stuff

// track down key that are being pressed
window.addEventListener("keydown", (event) => {    
    switch(event.key) {
        case "k": {debug = !debug; break;}
        case 'ArrowUp': {upPressed = true; break;}
        case 'ArrowLeft': {leftPressed = true; break;}
        case 'ArrowDown': {downPressed = true; break;}
        case 'ArrowRight': {rightPressed = true; break;}
    }
});

// track down key that are being released
window.addEventListener("keyup", (event) => {
    switch(event.key) { // player movement
        case 'ArrowUp': {upPressed = false; break;}
        case 'ArrowLeft': {leftPressed = false; break;}
        case 'ArrowDown': {downPressed = false; break;}
        case 'ArrowRight': {rightPressed = false; break;}
    }
});



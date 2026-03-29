// canvas
const c = document.getElementById("myCanvas");           // get canvas from html
const ctx = c.getContext("2d");

// debug variables
let debug = false;           // for x and y coordinates to be shown in console

// keyboard variables
let wPressed = false;
let aPressed = false;
let sPressed = false;
let dPressed = false;

class Player {                                                                                             
    x;
    y;
    speed;
    w;
    h;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.w = 50;
        this.h = 50;
    }
}

let player = new Player(c.width/2, c.height/2);

function update() {           // canvas updating every frame
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillRect(player.x, player.y, player.w, player.h);

    if (wPressed) {           // player movement
        player.y -= player.speed;
    }
    if (aPressed) {
        player.x -= player.speed;
    }
    if (sPressed) {
        player.y += player.speed;
    }
    if (dPressed) {
        player.x += player.speed;
    }

    requestAnimationFrame(update);
}

update();





setInterval(() => {           // checks if debug is enabled and if it is,
    if (debug) {              // then show x and y coordinates in console
        console.log("x: " + player.x);
        console.log("y: " + player.y);
    }
}, 1000);
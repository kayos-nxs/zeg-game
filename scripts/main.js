// FILES:
// *     player.js --> for player class
// *     main.js --> main game stuff
// *     keyboard.js --> keyboard input handling and etc.
// *     map.js --> map maker
// *     entity.js --> player and enemies

// TODO:
// *     map generator ----> X
// *     add player movement ----> X
// *     add background music ----> X
//       ________________________________________________________________________________________________________________________________________
// *     add win ----> X and gameover screen
// *     add camera close to player, maybe it will show 80x80 tiles instead of 20, 
//                 don't show any other tile beside the ones you can actually see ----> X
// *     add cutscenes
// *     add limited vision ----> X
// *     add final boss
// *     add 6 slots for items
// *     add fighting mechanics
// *     add items: healers, keys, weapons (knife, rock you can pick from the ground)


// CANVAS
const c = document.getElementById("myCanvas"); // get canvas from html
const ctx = c.getContext("2d");

c.width = 820;
c.height = 820;

// DEBUG
let debug = false; // for x and y coordinates to be shown in console

// KEYBOARD
let upPressed = false;  
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

// SFX
const music = new Audio('assets/SC.mp3');
music.loop = true;
// music.play();
// music.playbackRate = 2;
// music.pause();

// MAP
createMap();

// OBJECTS
const player = new Player(100, 100, TILE_SIZE/2, TILE_SIZE/2, "blue"); // create player object
const cantSee = new Image(); // create image for limited vision
cantSee.src = "assets/cant see.png"; // set source for limited vision image

// GAME IMAGE
const limitVision = new Image(); // create image object
limitVision.src = "assets/cant see.png"; // set image source


// this variable will be used to forbid player to move
// during cutscene or other stuff
let playerCanMove = true; 

function youWon() {
    // console.log("you won!"); // placeholder for you won cutscene
    playerCanMove = false; // forbid player to move
    music.pause(); // stop music
    const wonScreen = new Image(); // create image object
    wonScreen.src = "assets/have passed.png"; // set image source
    ctx.drawImage(wonScreen, c.width/2 - wonScreen.width/2, c.height/2 - wonScreen.height/2);

}



function update() { // main game loop will be called every frame
    console.log("update"); // for testing, will be removed later
    ctx.clearRect(0, 0, c.width, c.height); // clear canvas

    // CAMERA
    ctx.save();
    const offsetX = -player.x + c.width / 2 - player.width / 2; // calculate offset for camera center X 
    const offsetY = -player.y + c.height / 2 - player.height / 2; // calculate offset for camera center Y
    ctx.translate(offsetX, offsetY); // move camera with player by XY                                                          

    // MAP
    drawMap(); 

    // PLAYER
    if (playerCanMove) { // if player can move, then move player
        player.move(); // move player
    }
    player.draw(); // draw player
    
    // CANVAS AND STUFF
    ctx.restore();
    
    // LIMITED VISION
    if (!debug) { // if debug mode is off, then show limited vision
        ctx.drawImage(limitVision, c.width/2 - limitVision.width/2, c.height/2 - limitVision.height/2);
    }

    // if (debug) {
    //     youWon();
    // }

    if (youWonGame) {
        youWon();
    }

    requestAnimationFrame(update); // call game loop again
}

// START GAME LOOP
function startGame() {
    console.log("Game started!");
    music.play(); // start music
    update();

}

// html can access this function ^^^
window.startGame = startGame; 


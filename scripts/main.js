// FILES:
// *     player.js --> for player class
// *     main.js --> main game stuff
// *     keyboard.js --> keyboard input handling and etc.
// *     map.js --> map maker
// *     entity.js --> player and enemies
// *     cutscene_handler.js --> handle cutscenes, start the one you need

// TODO:
// *     map generator: X
// *     add player movement: X
//       ________________________________________________________________________________________________________________________________________
// *     add win and gameover screen
// *     add camera close to player, maybe it will show 80x80 tiles instead of 20, don't show any other tile beside the ones you can actually see
// *     add cutscenes
// *     add limited vision
// *     add final boss
// *     add 6 slots for items
// *     add fighting mechanics
// *     add items: healers, keys, weapons (knife, rock you can pick from the ground)

// canvas
const c = document.getElementById("myCanvas"); // get canvas from html
const ctx = c.getContext("2d");

c.width = COLS * TILE_SIZE;
c.height = ROWS * TILE_SIZE;

// debug variables
let debug = false; // for x and y coordinates to be shown in console

// keyboard variables
let wPressed = false;
let aPressed = false;
let sPressed = false;
let dPressed = false;

// map LOL
createMap(); 

// entity variables/objects
const player = new Player(20, 20, 20, 20, "blue"); // create player object

function update() { // main game loop, will be called every frame
    ctx.clearRect(0, 0, c.width, c.height); // clear canvas

    drawMap(); // guess what it does
        
    player.move(); // move player
    player.draw(); // draw player

    requestAnimationFrame(update); // call game loop again
}

update(); // start game loop


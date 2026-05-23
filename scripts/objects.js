const TILE_SIZE = 80;

// objects to render
const render = [];
const sleep = ms => new Promise(r => setTimeout(r, ms));

// footstep audio
const footstepsAudio = new Audio("assets/footsteps.mp3");
footstepsAudio.loop = true;
footstepsAudio.volume = 0.5;

// camera position
let cameraX = 0;
let cameraY = 0;

// movement flags 
let goingUp = false;
let goingDown = false;
let goingLeft = false;
let goingRight = false;
let debug = false;

let digitPressed;

var endLevel = false;   // flag to check if level is finished

// check for pressed keys and set movement flags
window.addEventListener('keydown', function(e) {
    if (e.code === 'KeyW') {
        goingUp = true;
    } else if (e.code === 'KeyA') {
        goingLeft = true;
    } else if (e.code === 'KeyS') {
        goingDown = true;
    } else if (e.code === 'KeyD') {
        goingRight = true;
    } else if (e.code === 'KeyF') {
        debug = !debug;
    } else if (e.code === 'Digit1') {
        digitPressed = 1;
    } else if (e.code === 'Digit2') {
        digitPressed = 2;
    } else if (e.code === 'Digit3') {
        digitPressed = 3;
    } else if (e.code === 'Digit4') {
        digitPressed = 4;
    }
    // } else if (e.code === 'Digit5') {
        
    // }
});

window.addEventListener('keyup', function(e) {
    if (e.code === 'KeyW') {
        goingUp = false;
    } else if (e.code === 'KeyA') {
        goingLeft = false;
    } else if (e.code === 'KeyS') {
        goingDown = false;
    } else if (e.code === 'KeyD') {
        goingRight = false;
    }
});

let jokeTileWalkedOn = false;

function activateJoke(map) {
    // for map3
    if (jokeTileWalkedOn) return; // prevent re-activating the joke if already activated
    if (!jokeTileWalkedOn) console.log("Activated joke tile!");
    jokeTileWalkedOn = true;

    map[7][8] = 4;
    
}

// map class to store map data and draw it
class Map {
    rows=14;
    cols=14;

    // 2 - start    0 - empty   6 - purple key      4 - yellow key   
    // 3 - finish   1 - wall    7 - purple door     5 - yellow door
    // 9 - jk
    map1 = [   
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 5, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 4, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 3],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    map2 = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 6, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 7, 3],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    map3 = [    // 7x8
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 0, 9, 5, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 6, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 7, 3],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

    maps = [this.map1, this.map2, this.map3];
    curMapIndex = 2;
    curMap = this.maps[this.curMapIndex]     // to set different maps in the future

    draw() {
        let curColor;
        for (let i = 0; i<this.rows; i++) {               // loop through map array
            for (let j = 0; j<this.cols; j++) {
                if (this.curMap[i][j] === 1) {            // if wall, set color to black
                    curColor = "black";
                } else if (this.curMap[i][j] === 3) {     // if finish, set color to red
                    curColor = "red";
                } else if (this.curMap[i][j] === 2){      // if start, set color to green
                    curColor = "green";
                } else if (this.curMap[i][j] === 4){     
                    curColor = "rgb(255, 254, 169)";
                } else if (this.curMap[i][j] === 5){      
                    curColor = "yellow";
                } else if (this.curMap[i][j] === 6){     
                    curColor = "rgb(168, 121, 221)";
                } else if (this.curMap[i][j] === 7){      
                    curColor = "purple";
                } else if (this.curMap[i][j] === 9){      
                    curColor = "gray";
                
                } else {
                    curColor = "gray";
                }

                // add to render array with camera offset
                render.push({x: j * TILE_SIZE - cameraX, y: i * TILE_SIZE - cameraY, color: curColor, w: TILE_SIZE, h: TILE_SIZE});     
        

                // ctx.fillRect(j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }

    drawGrid(cW, cH) {
        const startY = Math.floor(cameraY / TILE_SIZE) * TILE_SIZE;     // calculate starting grid line based on camera position
        const startX = Math.floor(cameraX / TILE_SIZE) * TILE_SIZE;

        for (let y = startY; y < startY + cH + TILE_SIZE; y += TILE_SIZE) {     // draw horizontal grid lines  
            ctx.beginPath();
            ctx.moveTo(0, y - cameraY);
            ctx.lineTo(cW, y - cameraY);
            ctx.stroke();
        }

        for (let x = startX; x < startX + cW + TILE_SIZE; x += TILE_SIZE) {     // draw vertical grid lines
            ctx.beginPath();
            ctx.moveTo(x - cameraX, 0);
            ctx.lineTo(x - cameraX, cH);
            ctx.stroke();
        }
    }
}

// base entity class for player and enemies
class Entity {
    x;
    y;
    hp;
    w;
    h;
    speed;
    color;

    constructor(x,y,hp,w,h,speed,color) {
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.w = w;
        this.h = h;
        this.speed = speed;
        this.color = color;
    }
}

// let items_img = 

class Player extends Entity {
    selectedItem;
    obtainedYellowKey = false;
    obtainedPurpleKey = false;

    constructor(x,y,hp,w,h,speed,color) {
        super(x,y,hp,w,h,speed,color);
        this.items = [];
        this.speed = 4;
    }


    move() {
        if (debug) {
            this.obtainedPurpleKey = true; 
            this.obtainedYellowKey = true;
        
        }
        let newX = this.x;      // set the value of current X and Y
        let newY = this.y;

        if (goingUp) newY -= this.speed;                        // update new X and Y based on movement flags using player's speed
        if (goingDown) newY += this.speed;
        if (goingLeft) newX -= this.speed;
        if (goingRight) newX += this.speed;

        const tileRow1 = Math.floor(newY / TILE_SIZE);          // calculate tile coordinates for collision detection
        const tileRow2 = Math.floor((newY + this.h - 1) / TILE_SIZE);
        const tileCol1 = Math.floor(newX / TILE_SIZE);
        const tileCol2 = Math.floor((newX + this.w - 1) / TILE_SIZE);
        

        // 2 - start    0 - empty   6 - purple key      4 - yellow key   
        // 3 - finish   1 - wall    7 - purple door     5 - yellow door

        const moved = newX !== this.x || newY !== this.y;       // check if player is really moving and not standing still
        let canMove = true;
        for (let r = tileRow1; r <= tileRow2; r++) {            // check all tiles the player would occupy after moving
            for (let c = tileCol1; c <= tileCol2; c++) {
                if (map.curMap[r][c] === 1) {                   // if any of those tiles is a wall - he can't move
                    if (!debug) canMove = false;
                }
                if (map.curMap[r][c] === 3) {                   // if any of those tiles is a finish - end the level
                    if (!endLevel) {
                        // set endLevel and block movement immediately (synchronous)
                        endLevel = true;
                        canMove = false;                        // prevent player from moving after reaching finish until level changes
                    }
                }
                if (map.curMap[r][c] == 4) {
                    this.obtainedYellowKey = true;
                    map.curMap[r][c] = 0;                       // remove key from map
                }
                if (map.curMap[r][c] == 6) {
                    this.obtainedPurpleKey = true;
                    map.curMap[r][c] = 0;                       // remove key from map
                }
                if (map.curMap[r][c] == 9) {
                    activateJoke(map.curMap);
                }
                if (map.curMap[r][c] == 7) {
                    if (this.obtainedPurpleKey) {
                        map.curMap[r][c] = 0;                   // remove door from map
                        this.obtainedPurpleKey = false;         // use up the key
                    } else {
                        canMove = false;
                    }
                }
                if (map.curMap[r][c] == 5) {
                    if (this.obtainedYellowKey) {
                        map.curMap[r][c] = 0;                   // remove door from map
                        this.obtainedYellowKey = false;         // use up the key
                        this.items = this.items.filter(item => item !== "yellow key"); // remove from inventory
                    } else {
                        canMove = false;
                    }
                }
            }
        }

        // if no walls, update player's position and play footsteps sounds
        if (canMove && moved) {  
            this.x = newX;
            this.y = newY;

            if (footstepsAudio.paused && !endLevel) footstepsAudio.play().catch(() => {});
        } else {
            if (!footstepsAudio.paused) {
                footstepsAudio.pause();
                footstepsAudio.currentTime = 0;
            }
        }

        // add player to render array with camera offset
        render.push({x: c.width/2 - this.w/2, y: c.height/2 - this.h/2, color: this.color, w: this.w, h: this.h});
    }
}



function renderAll() {
    // this function renders everything from the render array to the canvas each frame

    // console.log("renderAll() xddddddd");
    ctx.clearRect(0, 0, c.width, c.height);     // clear canvas before drawing  
    ctx.fillStyle = "black";                    // background color behind the map
    ctx.fillRect(0, 0, c.width, c.height);

    for (const obj of render) {     // draw every object in the render array
        ctx.fillStyle = obj.color;
        ctx.fillRect(obj.x, obj.y, obj.w, obj.h);   
    }
}
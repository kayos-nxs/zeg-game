const TILE_SIZE = 80;

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
let debug = false;      // for enabling/disabling debug
let pressedE = false;   // for hitting enemy
let holdingE = false;   // for checking if player is holding E key
let pressedK = false;   // game over screen

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
    } else if (e.code === 'KeyE' && !holdingE) {
        pressedE = true;
        holdingE = true;
    } else if (e.code === 'Digit1') {
        digitPressed = 1;
    } else if (e.code === 'Digit2') {
        digitPressed = 2;
    } else if (e.code === 'Digit3') {
        digitPressed = 3;
    } else if (e.code === 'Digit4') {
        digitPressed = 4;
    }
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
    } else if (e.code === 'KeyE') {
        holdingE = false;
    } else if (e.code === 'KeyK') {
        pressedK = true;
    }
});

// joke tile is a hidden trigger/tile that adds a key on map where it 
// should be, so player has to go back :D
let jokeTileWalkedOn = false;
function activateJoke(map) {
    // for map3
    if (jokeTileWalkedOn) return; 
    if (!jokeTileWalkedOn) console.log("player pressed the hidden button");
    jokeTileWalkedOn = true;

    map[7][8] = 4;
    
}

// map class to store map data and draw it
class Map {
    rows=14;
    cols=14;

    // 2 - start    0 - empty   6 - purple key      4 - yellow key   
    // 3 - finish   1 - wall    7 - purple door     5 - yellow door
    // 9 - jk       -1 - HP
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
        [2, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 0, -1, 1],
        [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 8, 1],
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

    map3 = [    
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

    // mapTest = [
    //     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    //     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,8,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    //     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

    // ];

    maps = [this.map1, this.map2, this.map3];
    curMapIndex = 1;
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
                } else if (this.curMap[i][j] === 7){      // purple door
                    curColor = "purple";
                } else if (this.curMap[i][j] === 5){      // yellow door
                    curColor = "yellow";
                } else if (this.curMap[i][j] === 9){      // trigger/tile
                    curColor = "gray";
                } else {
                    curColor = "gray";
                }

                ctx.fillStyle = curColor;
                ctx.fillRect(j * TILE_SIZE - cameraX, i * TILE_SIZE - cameraY, TILE_SIZE, TILE_SIZE);
            
                if (this.curMap[i][j] === 4){      // yellow key
                    if (keyImgLoaded) ctx.drawImage(keyImg, j * TILE_SIZE - cameraX, i * TILE_SIZE - cameraY);
                } else if (this.curMap[i][j] === 6){      // purple key
                    if (purpleKeyImgLoaded) ctx.drawImage(purpleKeyImg, j * TILE_SIZE - cameraX, i * TILE_SIZE - cameraY);
                } else if (this.curMap[i][j] === 8){      // sword
                    if (swordLoaded) ctx.drawImage(swordImg, j * TILE_SIZE - cameraX, i * TILE_SIZE - cameraY);
                } else if (this.curMap[i][j] === -1){      // sword
                    if (hpIMGLoaded) ctx.drawImage(hpIMG, j * TILE_SIZE - cameraX, i * TILE_SIZE - cameraY);
                }
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
    distanceEnt;
    destroyed = false;

    constructor(x,y,w,h,speed,color) {
        this.x = x;
        this.y = y;
        this.hp = 3;
        this.w = w;
        this.h = h;
        this.speed = speed;
        this.color = color;
    }


    canMoveTo(newX, newY) {
        const tileRow1 = Math.floor(newY / TILE_SIZE);
        const tileRow2 = Math.floor((newY + this.h - 1) / TILE_SIZE);
        const tileCol1 = Math.floor(newX / TILE_SIZE);
        const tileCol2 = Math.floor((newX + this.w - 1) / TILE_SIZE);

        for (let r = tileRow1; r <= tileRow2; r++) {
            for (let c = tileCol1; c <= tileCol2; c++) {
                if (!map.curMap[r] || map.curMap[r][c] === undefined) return false;
                if (map.curMap[r][c] === 1) {
                    return false;
                }
                if (map.curMap[r][c] === 7 || map.curMap[r][c] === 5) {
                    return false;
                }
            }
        }

        return true;
    }

    move(target) {
        if (this.destroyed) return;

        let newX = this.x;
        let newY = this.y;

        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.hypot(dx, dy);
        this.distanceEnt = distance;

        if (target) {
            if (debug) console.log("enemy distance to player:", distance);
            
            if (distance > 0) {
                const step = Math.min(this.speed, distance);
                newX += dx / distance * step;
                newY += dy / distance * step;
            }
        } else {
            newX += 2;
            newY += 2;
        }

        if (pressedE && player.selectedItem == 3) {
            if (distance <= 100) {
                newX += 20;
                newY += 20;
                this.hp -= 1;
            }
        }

        if (this.canMoveTo(newX, newY)) {
            this.x = newX;
            this.y = newY;
        }

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - cameraX, this.y - cameraY, this.w, this.h);
    }



}

class Player extends Entity {
    selectedItem;
    obtainedYellowKey = false;
    obtainedPurpleKey = false;
    obtainedSword = false;
    obtainedHP = false;

    constructor(x,y,w,h,speed,color) {
        super(x,y,hp,w,h,speed,color);
        this.speed = 4;
        this.hp = 5;
    }

    move() {
        if (debug) {
            this.obtainedPurpleKey = true; 
            this.obtainedYellowKey = true;
            this.obtainedSword = true;
            this.obtainedHP = true;
            console.log(this.x, this.y);
        }

        // set the value of current X and Y
        let newX = this.x;      
        let newY = this.y;

        // update new X and Y based on movement flags using player's speed
        if (goingUp) newY -= this.speed;                        
        if (goingDown) newY += this.speed;
        if (goingLeft) newX -= this.speed;
        if (goingRight) newX += this.speed;

        // calculate tile coordinates for collision detection
        const tileRow1 = Math.floor(newY / TILE_SIZE);          
        const tileRow2 = Math.floor((newY + this.h - 1) / TILE_SIZE);
        const tileCol1 = Math.floor(newX / TILE_SIZE);
        const tileCol2 = Math.floor((newX + this.w - 1) / TILE_SIZE);

        // now check what tile player has stepped it
        const moved = newX !== this.x || newY !== this.y;       // check if player is really moving and not standing still
        let canMove = true;
        for (let r = tileRow1; r <= tileRow2; r++) {            // check all tiles the player would occupy after moving
            for (let c = tileCol1; c <= tileCol2; c++) {
                if (map.curMap[r][c] === 1) {                   // if any of those tiles is a wall - he can't move
                    if (!debug) canMove = false;
                }
                if (map.curMap[r][c] === 3) {                   // if any of those tiles is a finish - end the level
                    if (!endLevel) {
                        endLevel = true;
                        canMove = false;                        // prevent player from moving after reaching finish until level changes
                    }
                }
                if (map.curMap[r][c] === 4) {
                    this.obtainedYellowKey = true;
                    map.curMap[r][c] = 0;                       // remove key from map
                }
                if (map.curMap[r][c] === 6) {
                    this.obtainedPurpleKey = true;
                    map.curMap[r][c] = 0;                       // remove key from map
                }
                if (map.curMap[r][c] === -1) {
                    this.obtainedHP = true;
                    map.curMap[r][c] = 0;                       // remove hp bottle from map
                }
                if (map.curMap[r][c] === 9) {
                    activateJoke(map.curMap);
                }
                
                if (map.curMap[r][c] === 7) {
                    if (this.obtainedPurpleKey) {
                        map.curMap[r][c] = 0;                   // remove door from map
                        this.obtainedPurpleKey = false;         // use up the key
                    } else {
                        canMove = false;
                    }
                }
                if (map.curMap[r][c] === 8) {                    // pick up sword and remove from map
                    this.obtainedSword = true;
                    document.getElementById("rectangle_title").textContent = "Żeby uderzyć naciśnij E";
                    setTimeout(() => {
                        document.getElementById("rectangle_title").textContent = "Zeg Game";
                    }, 2000);
                    map.curMap[r][c] = 0;                       // remove key from map
                }
                if (map.curMap[r][c] === 5) {
                    if (this.obtainedYellowKey) {
                        map.curMap[r][c] = 0;                   // remove door from map
                        this.obtainedYellowKey = false;         // use up the key
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

        ctx.fillStyle = this.color;
        ctx.fillRect(c.width/2 - this.w/2, c.height/2 - this.h/2, this.w, this.h);
    }
}

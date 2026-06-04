const TILE_SIZE = 80;

// footstep audio for player movement
const footstepsAudio = new Audio("assets/footsteps2.mp3");
footstepsAudio.loop = true;
footstepsAudio.volume = 0.5;

// camera position tracking
let cameraX = 0;
let cameraY = 0;

// movement and input state flags
let goingUp = false;
let goingDown = false;
let goingLeft = false;
let goingRight = false;
let debug = false;
let pressedE = false;
let holdingE = false;
let pressedK = false;

let digitPressed;

var endLevel = false;

// track pressed keys and set movement flags
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
    }
    
    // track number keys for item selection
    if (e.code === 'Digit1') {
        digitPressed = 1;
    } else if (e.code === 'Digit2') {
        digitPressed = 2;
    } else if (e.code === 'Digit3') {
        digitPressed = 3;
    } else if (e.code === 'Digit4') {
        digitPressed = 4;
    }
});

// track key releases
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

// hidden trigger tile that adds a key on map
let jokeTileWalkedOn = false;
function activateJoke(map) {
    // for map3 only
    if (jokeTileWalkedOn) return;
    if (!jokeTileWalkedOn) console.log("player pressed the hidden button");
    jokeTileWalkedOn = true;

    map[7][8] = 4;
    
}

// map data and rendering
class Map {
    rows=14;
    cols=14;

    // tile codes: 2=start 3=finish 1=wall 0=empty 4=yellow key 5=yellow door 6=purple key 7=purple door 8=sword 9=hidden trigger -1=hp bottle
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
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 6, 1],
        [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 0, 9, 5, 1, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1],
        [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1],
        [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 7, 3],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    map3 = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 0, -1, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 8, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 6, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 3],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    // list of all game maps for easy switching
    maps = [this.map1, this.map2, this.map3];
    curMapIndex = 0;
    curMap = this.maps[this.curMapIndex];

    // render map based on tile values
    draw() {
        if (this.curMapIndex === 1) {this.rows=17; this.cols=17;}
        else if (this.curMapIndex === 2) {this.rows=20; this.cols=20;}
        let curColor;
        // iterate through map array
        for (let i = 0; i<this.rows; i++) {
            for (let j = 0; j<this.cols; j++) {
                // set color based on tile type
                if (this.curMap[i][j] === 1) {
                    curColor = "black";
                } else if (this.curMap[i][j] === 3) {
                    curColor = "red";
                } else if (this.curMap[i][j] === 2){
                    curColor = "green";
                } else if (this.curMap[i][j] === 7){
                    curColor = "purple";
                } else if (this.curMap[i][j] === 5){
                    curColor = "yellow";
                } else if (this.curMap[i][j] === 9){
                    curColor = "gray";
                } else {
                    curColor = "gray";
                }

                ctx.fillStyle = curColor;
                ctx.fillRect(j * TILE_SIZE - cameraX, i * TILE_SIZE - cameraY, TILE_SIZE, TILE_SIZE);
            
                // draw interactive item icons
                if (this.curMap[i][j] === 4){
                    if (keyImgLoaded) ctx.drawImage(keyImg, j * TILE_SIZE - cameraX, i * TILE_SIZE - cameraY);
                } else if (this.curMap[i][j] === 6){
                    if (purpleKeyImgLoaded) ctx.drawImage(purpleKeyImg, j * TILE_SIZE - cameraX, i * TILE_SIZE - cameraY);
                } else if (this.curMap[i][j] === 8){
                    if (swordLoaded) ctx.drawImage(swordImg, j * TILE_SIZE - cameraX, i * TILE_SIZE - cameraY);
                } else if (this.curMap[i][j] === -1){
                    if (hpIMGLoaded) ctx.drawImage(hpIMG, j * TILE_SIZE - cameraX, i * TILE_SIZE - cameraY);
                }
            }
        }
    }
}

// base class for player and enemies
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

    constructor(x,y,color) {
        this.x = x;
        this.y = y;
        this.hp = 3;
        this.w=40;
        this.h=40;
        this.speed = 3;
        this.color = color;
    }

    // check if entity can move to new position
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

    // move entity towards target with collision checking
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

        // damage player when sword equipped
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

// door trigger states
let activatedYellowDoor = false;
let activatedPurpleDoor = false;

// player class
class Player extends Entity {
    selectedItem;
    obtainedYellowKey = false;
    obtainedPurpleKey = false;
    obtainedSword = false;
    obtainedHP = false;

    constructor(x,y,color) {
        super(x,y,color);
        this.speed = 5;
        this.hp = 6;
        this.w=40;
        this.h=40;
    }

    // handle player movement and item collection
    move() {
        if (debug) {
            this.obtainedPurpleKey = true; 
            this.obtainedYellowKey = true;
            this.obtainedSword = true;
            this.obtainedHP = true;
            console.log(this.x, this.y);
        }

        if (!mathQuizActive) {
            // calculate new position
            let newX = this.x;      
            let newY = this.y;

            // update based on input
            if (goingUp) newY -= this.speed;                        
            if (goingDown) newY += this.speed;
            if (goingLeft) newX -= this.speed;
            if (goingRight) newX += this.speed;

            // get tiles player occupies
            const tileRow1 = Math.floor(newY / TILE_SIZE);          
            const tileRow2 = Math.floor((newY + this.h - 1) / TILE_SIZE);
            const tileCol1 = Math.floor(newX / TILE_SIZE);
            const tileCol2 = Math.floor((newX + this.w - 1) / TILE_SIZE);

            // check movement validity
            const moved = newX !== this.x || newY !== this.y;
            let canMove = true;
            
            // iterate through all tiles player would occupy
            for (let r = tileRow1; r <= tileRow2; r++) {
                for (let c = tileCol1; c <= tileCol2; c++) {
                    // check for walls
                    if (map.curMap[r][c] === 1) {
                        if (!debug) canMove = false;
                    }
                    // check for finish
                    if (map.curMap[r][c] === 3) {
                        if (!endLevel) {
                            endLevel = true;
                            canMove = false;
                        }
                    }
                    // collect yellow key
                    if (map.curMap[r][c] === 4) {
                        this.obtainedYellowKey = true;
                        map.curMap[r][c] = 0;
                    }
                    // collect purple key
                    if (map.curMap[r][c] === 6) {
                        this.obtainedPurpleKey = true;
                        map.curMap[r][c] = 0;
                    }
                    // collect health potion
                    if (map.curMap[r][c] === -1) {
                        this.obtainedHP = true;
                        map.curMap[r][c] = 0;
                    }
                    // trigger hidden joke tile
                    if (map.curMap[r][c] === 9) {
                        activateJoke(map.curMap);
                    }
                    // interact with purple door
                    if (map.curMap[r][c] === 7) {
                        if (this.obtainedPurpleKey) {
                            map.curMap[r][c] = 0;
                            activatedPurpleDoor = true;
                            this.obtainedPurpleKey = false;
                        } else {
                            canMove = false;
                        }
                    }
                    // collect sword
                    if (map.curMap[r][c] === 8) {
                        this.obtainedSword = true;
                        document.getElementById("rectangle_title").textContent = "Żeby uderzyć naciśnij E";
                        setTimeout(() => {
                            document.getElementById("rectangle_title").textContent = "Zeg Game";
                        }, 2000);
                        map.curMap[r][c] = 0;
                    }
                    // interact with yellow door
                    if (map.curMap[r][c] === 5) {
                        if (this.obtainedYellowKey) {
                            map.curMap[r][c] = 0;
                            activatedYellowDoor = true;
                            this.obtainedYellowKey = false;
                        } else {
                            canMove = false;
                        }
                    }
                }
            }

            // update position and play sound
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
        }

        // draw player at center of screen
        ctx.fillStyle = this.color;
        ctx.fillRect(c.width/2 - this.w/2, c.height/2 - this.h/2, this.w, this.h);
    }
}

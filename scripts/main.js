//////////////////////////////////////////////////////////////////////////////////
// CANVAS                                                                        /
//////////////////////////////////////////////////////////////////////////////////
const c = document.getElementById("myCanvas"); 
const ctx = c.getContext("2d");

//////////////////////////////////////////////////////////////////////////////////
// OBJECTS                                                                       /
//////////////////////////////////////////////////////////////////////////////////
const map = new Map();  // create map object

//                        x   y  hp  w   h   s   color  
const player = new Player(80, 80, 5, 40, 40, 5, "blue");   // create player object
player.selectedItem = 1;

//////////////////////////////////////////////////////////////////////////////////
// TEXTURES                                                                      /
//////////////////////////////////////////////////////////////////////////////////
const finishImage = new Image();        // FINISH LEVEL TEXTURE
finishImage.src = "assets/have passed_pl.png";
let finishImageLoaded = false;
finishImage.onload = () => {
    finishImageLoaded = true;
};
let levelChanging = false;

const invImg = new Image();             // INVENTORY GRID TEXTURE
invImg.src = "assets/gui/inv.png";
let invImgLoaded = false;
invImg.onload = () => {
    invImgLoaded = true;
};

const keyImg = new Image();             // YELLOW KEY TEXTURE
keyImg.src = "assets/gui/key.png";
let keyImgLoaded = false;
keyImg.onload = () => {
    keyImgLoaded = true;
};

const purpleKeyImg = new Image();       // PURPLE KEY TEXTURE
purpleKeyImg.src = "assets/gui/purple_key.png";
let purpleKeyImgLoaded = false;
purpleKeyImg.onload = () => {
    purpleKeyImgLoaded = true;
};

const selectedInvImg = new Image();     // SELECTED ITEM TEXTURE
selectedInvImg.src = "assets/gui/selected.png";
let selectedInvImgLoaded = false;
selectedInvImg.onload = () => {
    selectedInvImgLoaded = true;
};

const visionLimit = new Image();     // VISION LIMIT TEXTURE
visionLimit.src = "assets/cant see.png";
let visionLimitLoaded = false;
visionLimit.onload = () => {
    visionLimitLoaded = true;
};

let selY = 27;

//////////////////////////////////////////////////////////////////////////////////
// DRAWING                                                                       /
//////////////////////////////////////////////////////////////////////////////////
function drawGUI() {
    // LIMITED VISION
    if (!visionLimitLoaded) {
        console.log("can't load vision limit image!!!!!!\n path: " + visionLimit.src + "\n");
        return;
    }

    // ctx.drawImage(visionLimit, c.width/2 - visionLimit.width/2 - 20, c.height/2 - visionLimit.height/2);

    // INVENTORY
    if (!invImgLoaded || !selectedInvImgLoaded) {
        console.log("can't load inventory images!!!!!!\n paths: " + invImg.src + "\n" + selectedInvImg.src + "\n");
        return;
    }

    ctx.drawImage(invImg, 30, 30, invImg.width/1.5, invImg.height/1.5);
    ctx.drawImage(selectedInvImg, 27, selY, selectedInvImg.width/1.5, selectedInvImg.height/1.5);

    if (!keyImgLoaded || !purpleKeyImgLoaded) {
        console.log("can't load inventory items!!!!!!\n paths: " + keyImg.src + "\n" + purpleKeyImg.src + "\n");
        return;
    }
    
    if (player.obtainedYellowKey) {
        ctx.drawImage(keyImg, (invImg.width/1.5)/2 + 5, 30, keyImg.width/1.5, keyImg.height/1.5);
    }
    if (player.obtainedPurpleKey) {
        ctx.drawImage(purpleKeyImg, (invImg.width/1.5)/2 + 5, 83, purpleKeyImg.width/1.5, purpleKeyImg.height/1.5);
    }

    
}


//////////////////////////////////////////////////////////////////////////////////
// CHECK EVERY FRAME                                                             /
//////////////////////////////////////////////////////////////////////////////////
function checkDigitPressed() {
    if (digitPressed === 1) {
        selY = 27;
    } else if (digitPressed === 2) {
        selY = 80;
    } else if (digitPressed === 3) {
        selY = 132;
    } else if (digitPressed === 4) {
        selY = 185;
    }
}

//////////////////////////////////////////////////////////////////////////////////
// FINISH AND LOAD MAP                                                           /
//////////////////////////////////////////////////////////////////////////////////
function finish() {
    if (!finishImageLoaded) return;
    // always draw the image while ending so it's visible each frame
    ctx.drawImage(finishImage, c.width/2 - finishImage.width/2, c.height/2 - finishImage.height/2);

    if (map.curMapIndex === map.maps.length - 1) {
        map.curMapIndex = null;
        return;
    }

    if (levelChanging) return;
    levelChanging = true;

    // wait a short moment, then advance the level and reset state
    sleep(1000).then(() => {
        map.curMapIndex++;
        if (map.curMapIndex >= map.maps.length) map.curMapIndex = 0; // wrap or stop at end
        map.curMap = map.maps[map.curMapIndex];

        // reposition player to the start tile (value 2)
        for (let i = 0; i < map.rows; i++) {
            for (let j = 0; j < map.cols; j++) {
                if (map.curMap[i][j] === 2) {
                    player.x = j * TILE_SIZE;
                    player.y = i * TILE_SIZE;
                }
            }
        }

        endLevel = false;
        levelChanging = false;
    });
}


//////////////////////////////////////////////////////////////////////////////////
// UPDATE                                                                        /
//////////////////////////////////////////////////////////////////////////////////
function update() { 
    if (map.curMapIndex === null) return;

    player.selectedItem = digitPressed; // update selected item based on last digit key pressed
    console.log("Selected item:", player.selectedItem, "Obtained yellow key:", player.obtainedYellowKey, "Obtained purple key:", player.obtainedPurpleKey);

    checkDigitPressed();

    render.length = 0; // clear render array each frame

    // adjust camera position
    cameraX = player.x - c.width/2 + player.w/2;
    cameraY = player.y - c.height/2 + player.h/2;

    map.draw();     // draw map first so player is on top

    // map.drawGrid(c.width, c.height);    // draw a map grid
    if (!endLevel) player.move();  // run checks for player movement (disabled while ending)
                    // disables checks for collision if debug (F) key is pressed, but still if you touch finish (red) square it will finish the level.
                    // will read garbage data if go out of bounds, you don't want to go out of bounds, don't ya? -K

    renderAll();    // render everything from array

    drawGUI(); 

    if (endLevel) finish();


    requestAnimationFrame(update); // call game loop again
}

// update();
//////////////////////////////////////////////////////////////////////////////////
// CANVAS                                                                        /
//////////////////////////////////////////////////////////////////////////////////
const c = document.getElementById("myCanvas"); 
const ctx = c.getContext("2d");

var backgroundSFX = new Audio('assets/background.mp3'); 
backgroundSFX.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);


let resetPressed = false;
let lastEnemyDamageTime = 0;

// for checking if user pressed "play" button
// because if he double click it, the game will speedup
let updatePressed = false;  
                            
let levelChanging = false;
let selY = 27;

//////////////////////////////////////////////////////////////////////////////////
// OBJECTS                                                                       /
//////////////////////////////////////////////////////////////////////////////////
const map = new Map();  // create map object

const player = new Player(80, 80, 40, 40, 10, "blue");   // create player object
player.selectedItem = 1;

const enemy = new Entity(10000, 0, 40, 40, 1, "red");   // create enemy object
// if (map.curMapIndex === 1 || map.curMapIndex === 2) {    
//     enemy.x = 920;
//     enemy.y = 974;
//     console.log("spawned enemy at: ", enemy.x, " and ", enemy.y);
// }

//////////////////////////////////////////////////////////////////////////////////
// DRAWING                                                                       /
//////////////////////////////////////////////////////////////////////////////////
function drawGUI() {
    // LIMITED VISION
    if (!visionLimitLoaded) {
        console.log("can't load vision limit image!!!!!!\n path: " + visionLimit.src + "\n");
        return;
    }

    ctx.drawImage(visionLimit, c.width/2 - visionLimit.width/2 - 20, c.height/2 - visionLimit.height/2);

    // INVENTORY
    if (!invImgLoaded || !selectedInvImgLoaded) {
        console.log("can't load inventory images!!!!!!\n paths: " + invImg.src + "\n" + selectedInvImg.src + "\n");
        return;
    }

    ctx.drawImage(invImg, 30, 30, invImg.width/1.5, invImg.height/1.5);
    ctx.drawImage(selectedInvImg, 27, selY, selectedInvImg.width/1.5, selectedInvImg.height/1.5);

    if (!keyImgLoaded || !purpleKeyImgLoaded || !swordLoaded) {
        console.log("can't load inventory items!!!!!!\n paths: " + keyImg.src + "\n" + purpleKeyImg.src + "\n" + swordImg.src + "\n");
        return;
    }
    
    if (player.obtainedYellowKey) {
        ctx.drawImage(keyImg, (invImg.width/1.5)/2 + 5, 30, keyImg.width/1.5, keyImg.height/1.5);
    }
    if (player.obtainedPurpleKey) {
        ctx.drawImage(purpleKeyImg, (invImg.width/1.5)/2 + 5, 83, purpleKeyImg.width/1.5, purpleKeyImg.height/1.5);
    }
    if (player.obtainedSword) {
        ctx.drawImage(swordImg, (swordImg.width/1.5)/2 - 10, 120);
    }
    if (player.obtainedHP) {
        ctx.drawImage(hpIMG, (hpIMG.width/1.5)/2 + 5, 190, hpIMG.width/1.5, hpIMG.height/1.5);
    }
}


//////////////////////////////////////////////////////////////////////////////////
// CHECK EVERY FRAME                                                             /
//////////////////////////////////////////////////////////////////////////////////
function checkKeysPressed() {
    if (digitPressed === 1) {
        selY = 27;
    } else if (digitPressed === 2) {
        selY = 80;
    } else if (digitPressed === 3) {
        selY = 132;
    } else if (digitPressed === 4) {
        selY = 185;
    }

    if (pressedE && debug) {
        console.log("E key is pressed!"); 
    }

    if (pressedE && player.selectedItem === 4) {
        if (player.hp < 5) player.hp+=30;
        if (player.hp > 5) player.hp=5;
    }
}


function runEnemyChecks() {
    if (enemy.hp <= 0) {
        enemy.destroyed = true;
    }
    
    enemy.move(player);

    if ((enemy.distanceEnt <= 40 && enemy.distanceEnt >= 0) && Date.now() - lastEnemyDamageTime >= 1000) {
        player.hp -= 1;
        lastEnemyDamageTime = Date.now();
    }
}

//////////////////////////////////////////////////////////////////////////////////
// UPDATE                                                                        /
//////////////////////////////////////////////////////////////////////////////////
function startGame() {
    if (updatePressed) return;

    backgroundSFX.play();
    updatePressed = true;
    requestAnimationFrame(update);
}

function update() { 
    if (!updatePressed) return;

    // it wont load any map if index is null. (0-2)
    if (map.curMapIndex === null) return;

    // update selected item based on last digit key pressed
    player.selectedItem = digitPressed; 

    checkKeysPressed();

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, c.width, c.height);

    // adjust camera position
    cameraX = player.x - c.width/2 + player.w/2;
    cameraY = player.y - c.height/2 + player.h/2;

    map.draw();     // draw map first so player is on top

    if (!endLevel) {
        if (!player.destroyed) player.move();  // run checks for player movement (disabled while ending)
                        // disables checks for collision if debug (F) key is pressed, but still if you touch finish (red) square it will finish the level.
                        // will read garbage data if go out of bounds, you don't want to go out of bounds, don't ya? -K

        if (!enemy.destroyed) runEnemyChecks();
    }
    
    drawGUI(); 

    if (player.hp <= 0 || pressedK) gameOver();
    if (endLevel) finish();
    

    pressedE = false;

    if (debug) console.log(map.curMapIndex);

    requestAnimationFrame(update); // call game loop again
}

// update();

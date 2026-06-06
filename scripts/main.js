// canvas and context setup
const c = document.getElementById("myCanvas"); 
const ctx = c.getContext("2d");

// utility sleep function for delays
const sleep = ms => new Promise(r => setTimeout(r, ms));



// math quiz variables
let mathQuizActive = false;
let mathQuiz_a, mathQuiz_b, mathQuiz_answer, user_input;

// game state tracking
let resetPressed = false;
let lastEnemyDamageTime = 0;

// prevents double-click speedup on play button
let updatePressed = false;  
                            
// level progression
let levelChanging = false;
let selY = 27;

// game objects
const map = new Map();
const player = new Player(80, 80, "blue");
player.selectedItem = 1;
const enemy = new Entity(10000, 0, "red");

// initialize math quiz with random numbers
function startMathQuiz() {
    document.getElementById("rectangle_title").textContent = "Jak wpiszesz odpowiedź to naciśnij ENTER!";
    setTimeout(() => {
        document.getElementById("rectangle_title").textContent = "Zeg Game";
    }, 2000);

    mathQuizActive = true;
    footstepsAudio.pause();

    mathQuiz_a = Math.floor(Math.random() * 10 + 2);
    mathQuiz_b = Math.floor(Math.random() * 10 + 2);
    mathQuiz_answer = mathQuiz_a * mathQuiz_b;
    user_input = "";
}

// end quiz and reset door states
function finishMathQuiz() {
    mathQuizActive = false;
    activatedYellowDoor = false;
    activatedPurpleDoor = false;
    user_input = "";
    opendoorAudio.currentTime = 0;
    opendoorAudio.play();
}

// render quiz overlay with math problem
function drawMathQuiz() {
    const text = `${mathQuiz_a} * ${mathQuiz_b} = ${user_input}`;

    // semi-transparent background
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.font = "bold 40px sans-serif";
    ctx.fillText(text, centerX, centerY);
}

// handle number input and backspace during quiz
function handleMathQuizKeydown(event) {
    if (!mathQuizActive) return;

    if (event.key === "Backspace") {
        event.preventDefault();
        user_input = user_input.slice(0, -1);
    } else if (event.key === "Enter") {
        if (Number(user_input) === mathQuiz_answer) finishMathQuiz();
        else {
            user_input = "źle!";
            // wrongAnswerAudio.stop();
            wrongAnswerAudio.play();

            setTimeout(() => {
                user_input = "";
            }, 500);
        }
    } else if (/^[0-9]$/.test(event.key)) {
        user_input += event.key;

        // if (Number(user_input) === mathQuiz_answer) finishMathQuiz();
    }
}

window.addEventListener("keydown", handleMathQuizKeydown);

// render all ui elements on screen
function drawGUI() {
    // limited vision overlay
    if (!visionLimitLoaded) {
        console.log("can't load vision limit image!!!!!!\n path: " + visionLimit.src + "\n");
        return;
    }

    if (!debug) ctx.drawImage(visionLimit, c.width/2 - visionLimit.width/2 - 20, c.height/2 - visionLimit.height/2);
    
    // inventory grid ui
    if (!invImgLoaded || !selectedInvImgLoaded) {
        console.log("can't load inventory images!!!!!!\n paths: " + invImg.src + "\n" + selectedInvImg.src + "\n");
        return;
    }

    ctx.drawImage(invImg, 30, 30, invImg.width/1.5, invImg.height/1.5);
    ctx.drawImage(selectedInvImg, 27, selY, selectedInvImg.width/1.5, selectedInvImg.height/1.5);

    // inventory item icons
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

    // hp bottle icon
    if (player.obtainedHP) {
        ctx.drawImage(hpIMG, (hpIMG.width/1.5)/2 + 5, 190, hpIMG.width/1.5, hpIMG.height/1.5);  
    }

    // health hearts display
    if (!heartLoaded || !halfHeartLoaded || !heartBrokenLoaded) {
        console.log("can't load heart images!!!!!!\n paths: " + heartIMG.src + "\n" + halfHeartIMG.src + "\n" + heartBrokenIMG.src + "\n");
        return;
    }

    for (let i = 0; i < 3; i++) {
        const hpForHeart = player.hp - i * 2;
        let heartToDraw = heartBrokenIMG;

        if (hpForHeart >= 2) {
            heartToDraw = heartIMG;
        } else if (hpForHeart === 1) {
            heartToDraw = halfHeartIMG;
        }

        ctx.drawImage(heartToDraw, 420 + i * 60, 30, heartToDraw.width / 1.5, heartToDraw.height / 1.5);
    }

    // trigger quiz when entering door
    if ((activatedYellowDoor || activatedPurpleDoor) && !mathQuizActive) startMathQuiz();
    if (mathQuizActive) drawMathQuiz();
   
}


// handle digit and debug key presses
function checkKeysPressed() {
    if (!mathQuizActive) {
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

    if (pressedE && debug) {
        console.log("E key is pressed!"); 
    }

    // use health potion when E pressed with item 4
    if (pressedE && player.selectedItem === 4) {
        if (player.hp < 5) player.hp+=30;
        if (player.hp > 5) player.hp=5;
    }
}


// manage enemy behavior and damage
function runEnemyChecks() {
    if (enemy.hp <= 0) {
        enemy.destroyed = true;
    }
    
    enemy.move(player);

    // apply damage if enemy is close enough and cooldown passed
    if ((enemy.distanceEnt <= 40 && enemy.distanceEnt >= 0) && Date.now() - lastEnemyDamageTime >= 1000) {
        player.hp -= 1;
        lastEnemyDamageTime = Date.now();
    }
}


// center of screen for drawing
const centerX = c.width / 2;
const centerY = c.height / 2;


// begin game loop
function startGame() {
    if (updatePressed) return;

    backgroundSFX.play();
    updatePressed = true;
    requestAnimationFrame(update);
}

// main game loop
function update() { 
    // prevent double-click speedup
    if (!updatePressed) return;

    // skip if no valid map
    if (map.curMapIndex === null) return;

    // sync selected item with digit key input
    player.selectedItem = digitPressed; 

    checkKeysPressed();

    // clear and fill background
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, c.width, c.height);

    // center camera on player
    cameraX = player.x - c.width/2 + player.w/2;
    cameraY = player.y - c.height/2 + player.h/2;

    // draw map first so player renders on top
    map.draw();     

    // game logic when level is active
    if (!endLevel) {
        if (!player.destroyed) player.move();  
        if (!enemy.destroyed) runEnemyChecks();
    }
    
    // render ui on top
    drawGUI(); 

    // check if player is dead or if level is finished
    if (player.hp <= 0 || pressedK) gameOver();
    if (endLevel) finish();

    pressedE = false;

    // display current level number
    ctx.textAlign = 'center';    
    ctx.textBaseline = 'middle'; 
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText("Poziom: " + (map.curMapIndex+1), centerX, 50);    

    // continue loop
    requestAnimationFrame(update); 
}


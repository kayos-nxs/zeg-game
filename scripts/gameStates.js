// when player finished map, the game will end
// and after a short moment, it will load the next map
function finish() {
    backgroundSFX.pause();
    if (!finishImageLoaded) return;

    // draw finish screen each frame
    ctx.drawImage(finishImage, c.width/2 - finishImage.width/2, c.height/2 - finishImage.height/2);

    if (levelChanging) return;
    levelChanging = true;

    // wait then advance to next level
    sleep(1000).then(() => {
        map.curMapIndex++;
        if (map.curMapIndex >= map.maps.length) map.curMapIndex = 0;
        map.curMap = map.maps[map.curMapIndex];

        // find start tile and reposition player
        for (let i = 0; i < map.rows; i++) {
            for (let j = 0; j < map.cols; j++) {
                if (map.curMap[i][j] === 2) {
                    player.x = j * TILE_SIZE;
                    player.y = i * TILE_SIZE;
                }
            }
        }

        // spawn enemy on harder levels
        if (map.curMapIndex === 1 || map.curMapIndex === 2) {    
            enemy.x = 920;
            enemy.y = 974;
            if (debug) console.log("spawned enemy at: ", enemy.x, " and ", enemy.y);
        }

        // reset keys
        player.obtainedYellowKey = false;
        player.obtainedPurpleKey = false;

        backgroundSFX.play();    
        endLevel = false;
        levelChanging = false;
    });
}

// reset all game variables to initial state
function resetGame() {
    if (debug) console.log("reset!");
    resetPressed = true;
    map.curMapIndex = 0;

    // restore map1 layout
    if (debug) console.log("change map1 back");
    map.map1 = [   
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

    if (debug) console.log("change map2 back");
    map.map2 = [
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

    // restore map3 layout
    if (debug) console.log("change map3 back");
    map.map3 = [
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

    // bind all maps together
    if (debug) console.log("setting up maps");
    map.maps = [map.map1, map.map2, map.map3, map.mapTest];
    map.curMap = map.maps[map.curMapIndex];

    // restore player state
    if (debug) console.log("change player back");
    player.x = 80;
    player.y = 80;
    player.hp = 6;
    player.distanceEnt = undefined;
    player.selectedItem = 1;
    player.obtainedYellowKey = false;
    player.obtainedPurpleKey = false;
    player.obtainedSword = false;
    player.destroyed = false;

    // restore enemy state
    console.log("change enemy back");
    enemy.x = 10000;
    enemy.y = 0;
    enemy.hp = 3;
    enemy.distanceEnt = undefined;
    enemy.destroyed = false;

    // reset keyboard input flags
    if (debug) console.log("change keyboard back");
    goingUp = false;
    goingDown = false;
    goingLeft = false;
    goingRight = false;
    pressedE = false;
    holdingE = false;
    digitPressed = 1;

    // reset game state variables
    if (debug) console.log("change other vars back");
    selY = 27;
    endLevel = false;
    levelChanging = false;
    jokeTileWalkedOn = false;
    lastEnemyDamageTime = 0;

    // reset camera position
    if (debug) console.log("change camera back");
    cameraX = player.x - c.width/2 + player.w/2;
    cameraY = player.y - c.height/2 + player.h/2;

    // reset audio state
    if (debug) console.log("change footsteps back");
    if (!footstepsAudio.paused) {
        footstepsAudio.pause();
        footstepsAudio.currentTime = 0;
    }

    if (debug) console.log("start");
    backgroundSFX.play();
    startGame();

}

// show game over screen and freeze game state
function gameOver() {
    if (!gameOverImgLoaded) return;
    backgroundSFX.pause();
    
    if (!resetPressed) {
        ctx.drawImage(gameOverImg, c.width/2 - gameOverImg.width/2, c.height/2 - gameOverImg.height/2);
        enemy.destroyed = true;
        player.destroyed = true;

    }

}
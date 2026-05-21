// get canvas and context
const c = document.getElementById("myCanvas"); 
const ctx = c.getContext("2d");

const map = new Map();  // create map object

//                        x  y hp w  h  s it  color
const player = new Player(80,80,5,40,40,5,[],"blue");   // create player object


const finishImage = new Image();
finishImage.src = "assets/have passed_pl.png";
let finishImageLoaded = false;
finishImage.onload = () => {
    finishImageLoaded = true;
};
let levelChanging = false;

   // for future level loading system, will be used to set map.curMap to the right map in map.maps array

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

function update() { 
    if (map.curMapIndex === null) return;


    render.length = 0; // clear render array each frame

    // console.log(map.curMapIndex);

    // adjust camera position
    cameraX = player.x - c.width/2 + player.w/2;
    cameraY = player.y - c.height/2 + player.h/2;

    map.draw();     // draw map first so player is on top

    // map.drawGrid(c.width, c.height);    // draw a map grid
    if (!endLevel) player.move();  // run checks for player movement (disabled while ending)
                    // disables checks for collision if debug (F) key is pressed, but still if you touch finish (red) square it will finish the level.
                    // will read garbage data if go out of bounds, you don't want to go out of bounds, don't ya? -K

    renderAll();    // render everything from array

    if (endLevel) finish();


    requestAnimationFrame(update); // call game loop again
}

// update();
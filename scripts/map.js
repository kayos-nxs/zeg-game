// a map handler and stuff! here map will be created

const COLS = 41;
const ROWS = 41;
const TILE_SIZE = 20;

// array for map:
// *    0 - empty
// *    1 - wall
// *    3 - start 
// *    4 - exit
// at least 3 maps

let maze = Array(ROWS) // fill array with walls and empty cells
    .fill()
    .map(() => Array(COLS).fill(1));

// console.log(maze);


// thank you, some random C tutorials and guy from Youtube
function createMap() { // create map
    const startRow = 1;
    const startCol = 1;
    const endRow = ROWS - 2;
    const endCol = COLS - 2;

    for (let row = 0; row < ROWS; row++) { // it will help for regenerating, because it will
                                           // use reset the array and fill it with 1s (walls)
        for (let col = 0; col < COLS; col++) {
            maze[row][col] = 1; // fill the maze with walls
        }
    }

    // set start cell
    maze[startRow][startCol] = 0;
    carvePassage(startRow, startCol);

    // place start number in array for player spawn
    maze[startRow][startCol] = 3;

    let finishRow = endRow;
    let finishCol = endCol;

    // it will check if end cell is in walls, if it is
    // then clear the wall out to create a normal path to it
    if (maze[finishRow][finishCol] == 1) {
        for (let row = endRow; row >= 1; row--) {
            for (let col = endCol; col >= 1; col--) {
                if (maze[row][col] == 0) {
                    finishRow = row;
                    finishCol = col;
                    row = -1; // break outer
                    break;
                }
            }
        }
    }

    // place finish number in array for finish point
    maze[finishRow][finishCol] = 4;
}

function carvePassage(row, col) {
    const directions = [
        [-2, 0], // left
        [0, 2], // down
        [2, 0], // right
        [0, -2] // up
    ];

    directions.sort(() => Math.random() - 0.5); // make directions random for map being different

    for (let [dr, dc] of directions) { // for each direction check if there is a wall and if there is, 
                                       // then clear it and move to that cell

        const newRow = row + dr; // new row and col that we want to move to
        const newCol = col + dc;


        if (
            newRow > 0 && newRow < ROWS - 1 && // check if new row and col are in bounds
            newCol > 0 && newCol < COLS - 1 && // check if there is a wall in new row and col
            maze[newRow][newCol] == 1
        ) {
            maze[newRow][newCol] = 0; // clear the wall in new row and col
            maze[row + dr / 2][col + dc / 2] = 0; // clear the wall between current cell and new cell
            carvePassage(newRow, newCol); // move to new cell and repeat the process
        }
    }
}


function drawMap() { // draw the map on canvas
    ctx.clearRect(0, 0, c.width, c.height); 

    for (let row = 0; row < ROWS; row++) { // for each row and col check if there is 
                                           // a wall or empty cell and draw it
        for (let col = 0; col < COLS; col++) {
            ctx.fillStyle = "black" // by default it will paint walls with black
            
            if (maze[row][col] == 0) { // empty space with paint with gray
                ctx.fillStyle = "gray";
            }

            if (maze[row][col] == 3) { // start point will be painted with green
                ctx.fillStyle = "green";
            }

            if (maze[row][col] == 4) { // finish point will be painted with red
                ctx.fillStyle = "red";
            }

            ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
}


// main entity class, here i can create
// enemies and players, maybe other entities
// and stuff

class Entity { // main class for handling every entity
    x;
    y;
    speed;
    width;
    height;
    color;

    constructor(x, y, width, height, color, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
    }

    draw() { // in game loop (update()) is called for entity being drawn every frame
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}

class Player extends Entity { // player class that uses entity class as a base
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.speed = 1;
        this.moveDelay = 8; 
        this.moveTimer = 0;
    }

    // returns current cell coordinates of player based on x and y position
    getCell(x, y) {
        return {
            col: Math.floor(x / TILE_SIZE),
            row: Math.floor(y / TILE_SIZE)
        };
    }

    runCheckMove(nextRow, nextCol) { // checks for next cell for player to move to
        if ((wPressed || aPressed || sPressed || dPressed) && maze[nextRow][nextCol] != 1) {
            this.x = nextCol * TILE_SIZE; // if there is no wall, then move
            this.y = nextRow * TILE_SIZE;
            this.moveTimer = this.moveDelay; // adjust move timer
        }
        if ((wPressed || aPressed || sPressed || dPressed) && maze[nextRow][nextCol] == 4) {
            alert("PLACEHOLDER: you won!");
            // ToDo:
            // * go to another level

        }
    }

    move() {
        const current = this.getCell(this.x, this.y);
        let nextRow = current.row;
        let nextCol = current.col;

        if (wPressed) nextRow = current.row - 1;
        if (sPressed) nextRow = current.row + 1;
        if (aPressed) nextCol = current.col - 1;
        if (dPressed) nextCol = current.col + 1;

        // moveTimer will help to make player move not every frame,
        // but with a delay, so it will be more smooth and not too fast
        if (this.moveTimer > 0) {
            this.moveTimer -= 1;
            return;
        }

        // check if player is trying to move and if he can move to that cell, then move him
        if (!debug) {
            this.runCheckMove(nextRow, nextCol); // i made it into another function,
                                                 // so it will be easier to read i guess
        } else {
            this.x = nextCol * TILE_SIZE;
            this.y = nextRow * TILE_SIZE;
            this.moveTimer = this.moveDelay; 
        }
    }
}


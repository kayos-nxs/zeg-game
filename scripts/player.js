pressedUp = false;                  // some ugly variables to track which keys are pressed
pressedDown = false;
pressedLeft = false;
pressedRight = false;

class Player {
    x;
    y;
    speed=6;       
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    
    update() {                      // updates every frame and makes player move
        if (pressedUp) {
            this.y -= this.speed;
        }
        if (pressedDown) {
            this.y += this.speed;
        }
        if (pressedLeft) {
            this.x -= this.speed;
        }
        if (pressedRight) {
            this.x += this.speed;
        }
    }

    create() {                      // creates player as a white rectangle (square)
        fill(255);
        rect(this.x, this.y, 50, 50);

    }

}


function keyPressed() {             // that checks if something was pressed on keyboard
    if (keyCode === UP_ARROW) {
        pressedUp = true;
    }
    if (keyCode === DOWN_ARROW) {
        pressedDown = true;
    }
    if (keyCode === LEFT_ARROW) {
        pressedLeft = true;
    }
    if (keyCode === RIGHT_ARROW) {
        pressedRight = true;
    }
}


function keyReleased() {            // tracks keys that were released for player stopping movement
    if (keyCode === UP_ARROW) {
        pressedUp = false;
    }
    if (keyCode === DOWN_ARROW) {
        pressedDown = false;
    }
    if (keyCode === LEFT_ARROW) {
        pressedLeft = false;
    }
    if (keyCode === RIGHT_ARROW) {
        pressedRight = false;
    }
}
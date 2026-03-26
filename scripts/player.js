// some ugly variables to track which keys are pressed
pressedUp = false;
pressedDown = false;
pressedLeft = false;
pressedRight = false;


class Player {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // ... well, that thing makes player move, duh
    update() {
        if (pressedUp) {
            this.y -= 5;
        }
        if (pressedDown) {
            this.y += 5;
        }
        if (pressedLeft) {
            this.x -= 5;
        }
        if (pressedRight) {
            this.x += 5;
        }
    }

    create() {
        fill(255);
        rect(this.x, this.y, 50, 50);
    }
}

// that checks if something was pressed on keyboard
function keyPressed() {
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

// i mean.. i could add some fighting keys here later..
function keyReleased() {
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
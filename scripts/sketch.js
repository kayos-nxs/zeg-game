// that thing creates canvas and creates player
function setup() {
    createCanvas(1200, 900);
    player = new Player(width/2, height/2);
}

// that thing updates every frame and
// draws everything on screen
function draw() {
    background(51);             // clear every frame
    
    fill(0);                    // make text black
    textSize(100);
    text("Hello World", 100, 100);

    player.update();            // player movement
    player.create();            // create player
}
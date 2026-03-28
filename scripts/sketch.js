function setup() {                                                  // that thing creates canvas and here you
                                                                    // can define variables and stuff
    createCanvas(1201, 900);    
    player = new Player(100/2 + 150, 2450);
    level = new Level("Limbo");                                     // level names:
                                                                    // Limbo
                                                                    // Lust 
                                                                    // Gluttony
                                                                    // Greed
                                                                    // Wrath
                                                                    // Heresy
                                                                    // Violence
                                                                    // Fraud
                                                                    // Treachery
}

function draw() {                                                   // that thing updates every frame and draws everything on screen
    background(51);                                                 // clear every frame

    push();                                                         // HERE STARTS SOME CAMERA LOGIC!!!11!
    translate(width / 2 - player.x, height / 2 - player.y);         // makes camera move

    level.drawLevel();                                              // draws the level

    player.update();                                                // player movement
    player.create();                                                // create player
    pop();                                                          // HERE ENDS CAMERA LOGIC!11!!!!!

    fill(0);                                                        // make text black
    textSize(60);
    text(level.name, -5,44);

    

    
}

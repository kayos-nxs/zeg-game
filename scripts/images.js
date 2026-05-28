const finishImage = new Image();        // FINISH LEVEL TEXTURE
finishImage.src = "assets/gui/have passed_pl.png";
let finishImageLoaded = false;
finishImage.onload = () => {
    finishImageLoaded = true;
};


const gameOverImg = new Image();        // GAME OVER TEXTURE
gameOverImg.src = "assets/gui/game over_pl.png";
let gameOverImgLoaded = false;
gameOverImg.onload = () => {
    gameOverImgLoaded = true;
};

const invImg = new Image();             // INVENTORY GRID TEXTURE
invImg.src = "assets/gui/inv.png";
let invImgLoaded = false;
invImg.onload = () => {
    invImgLoaded = true;
};

const keyImg = new Image();             // YELLOW KEY TEXTURE
keyImg.src = "assets/gui/key.png";
let keyImgLoaded = false;
keyImg.onload = () => {
    keyImgLoaded = true;
};

const purpleKeyImg = new Image();       // PURPLE KEY TEXTURE
purpleKeyImg.src = "assets/gui/purple_key.png";
let purpleKeyImgLoaded = false;
purpleKeyImg.onload = () => {
    purpleKeyImgLoaded = true;
};

const selectedInvImg = new Image();     // SELECTED ITEM TEXTURE
selectedInvImg.src = "assets/gui/selected.png";
let selectedInvImgLoaded = false;
selectedInvImg.onload = () => {
    selectedInvImgLoaded = true;
};

const visionLimit = new Image();     // VISION LIMIT TEXTURE
visionLimit.src = "assets/gui/cant see.png";
let visionLimitLoaded = false;
visionLimit.onload = () => {
    visionLimitLoaded = true;
};

const swordImg = new Image();          // SWORD TEXTURE
swordImg.src = "assets/gui/sword.png";
let swordLoaded = false;
swordImg.onload = () => {
    swordLoaded = true;
};

const hpIMG = new Image();          // HP BOTTLE TEXTURE
hpIMG.src = "assets/gui/hpBottle.png";
let hpIMGLoaded = false;
hpIMG.onload = () => {
    hpIMG = true;
};
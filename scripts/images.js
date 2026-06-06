// UI texture images
const finishImage = new Image();
finishImage.src = "assets/gui/have passed_pl.png";
let finishImageLoaded = false;
finishImage.onload = () => {
    finishImageLoaded = true;
};

const gameOverImg = new Image();
gameOverImg.src = "assets/gui/game over_pl.png";
let gameOverImgLoaded = false;
gameOverImg.onload = () => {
    gameOverImgLoaded = true;
};

// inventory ui
const invImg = new Image();
invImg.src = "assets/gui/inv.png";
let invImgLoaded = false;
invImg.onload = () => {
    invImgLoaded = true;
};

const selectedInvImg = new Image();
selectedInvImg.src = "assets/gui/selected.png";
let selectedInvImgLoaded = false;
selectedInvImg.onload = () => {
    selectedInvImgLoaded = true;
};

const visionLimit = new Image();
visionLimit.src = "assets/gui/cant see.png";
let visionLimitLoaded = false;
visionLimit.onload = () => {
    visionLimitLoaded = true;
};

// item textures
const keyImg = new Image();
keyImg.src = "assets/gui/key.png";
let keyImgLoaded = false;
keyImg.onload = () => {
    keyImgLoaded = true;
};

const purpleKeyImg = new Image();
purpleKeyImg.src = "assets/gui/purple_key.png";
let purpleKeyImgLoaded = false;
purpleKeyImg.onload = () => {
    purpleKeyImgLoaded = true;
};

const swordImg = new Image();
swordImg.src = "assets/gui/sword.png";
let swordLoaded = false;
swordImg.onload = () => {
    swordLoaded = true;
};

const hpIMG = new Image();
hpIMG.src = "assets/gui/hpBottle.png";
let hpIMGLoaded = false;
hpIMG.onload = () => {
    hpIMGLoaded = true;
};

// health textures
const heartIMG = new Image();
heartIMG.src = "assets/gui/heart.png";
let heartLoaded = false;
heartIMG.onload = () => {
    heartLoaded = true;
};

const heartBrokenIMG = new Image();
heartBrokenIMG.src = "assets/gui/heartBroken.png";
let heartBrokenLoaded = false;
heartBrokenIMG.onload = () => {
    heartBrokenLoaded = true;
};

const halfHeartIMG = new Image();
halfHeartIMG.src = "assets/gui/heartHalf.png";
let halfHeartLoaded = false;
halfHeartIMG.onload = () => {
    halfHeartLoaded = true;
};

const doorIMG = new Image();
doorIMG.src = "assets/yellow_door.png";
let doorImgLoaded = false;
doorIMG.onload = () => {
    doorImgLoaded = true;
};

const purpleDoorIMG = new Image();
purpleDoorIMG.src = "assets/purple_door.png";
let purpleDoorImgLoaded = false;
purpleDoorIMG.onload = () => {
    purpleDoorImgLoaded = true;
};

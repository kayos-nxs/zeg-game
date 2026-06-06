// background music that loops
const backgroundSFX = new Audio('assets/sfx/background.mp3'); 
backgroundSFX.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

// footstep audio for player movement
const footstepsAudio = new Audio("assets/sfx/footsteps2.mp3");
footstepsAudio.loop = true;
footstepsAudio.volume = 0.5;

// the sound of a door opening for yellow and purple doors
const opendoorAudio = new Audio("assets/sfx/opendoor.mp3");
opendoorAudio.volume = 0.5;

// key interaction sound (pickup / use / selection)
const keySoundAudio = new Audio("assets/sfx/keySound.mp3");
keySoundAudio.volume = 0.7;

// potion pickup sound
const pickupPotionAudio = new Audio("assets/sfx/pickupPotion.mp3");
pickupPotionAudio.volume = 0.7;

// sword pickup sound
const swordPickupAudio = new Audio("assets/sfx/swordPickup.mp3");
swordPickupAudio.volume = 0.9;

// sword swing/attack sound
const swordSwingAudio = new Audio("assets/sfx/swordSwing.mp3");
swordSwingAudio.volume = 0.7;

// debug/test music or sound
const debugAudio = new Audio("assets/sfx/debugSong.mp3");
debugAudio.volume = 0.1;

// sound when enemy takes damage
const damageToEnemyAudio = new Audio("assets/sfx/damageToEnemy.mp3");
damageToEnemyAudio.volume = 0.5;

// drinking potion sound 
const drinkingSoundAudio = new Audio("assets/sfx/drinkingSound.mp3");
drinkingSoundAudio.volume = 0.7;

// next level transition sound
const nextLevelAudio = new Audio("assets/sfx/nextLevel.mp3");
nextLevelAudio.volume = 0.5;

// wrong answer
const wrongAnswerAudio = new Audio("assets/sfx/wrong.mp3");
wrongAnswerAudio.volume = 0.5;
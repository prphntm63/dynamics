var constants = {
    animateInterval : 4,
    windowWidth : window.innerWidth - 64,
    jumpVelocity : 35,
    accelX : 1.5,
    decelX : 3,
    accelY : 2,
    maxVeloX : 20,
    maxVeloY : 40,
}

let x0v0 = [100,0]; //Initial position. We want to 'drop down' into the level
let y0v0 = [250,0];
let frame = 0;
let clock = 0;
let onBlock = false; //We don't start on a block

var keys = {
    rightKey : false,
    leftKey : false,
    upKey : false,
    downKey : false,
    bonusKey : false,
    upKeyReset : 0,
    xKeyReset : true
}

function main() {
    generateObstacles();

    var sprite = document.getElementById('box');

    requestAnimationFrame(animate); //Start the animation

    function animate(timestamp) { //Repeat to animate each frame

        x0v0 = getPosX(x0v0); //Calculate X and Y positions
        y0v0 = getPosY(y0v0);

        onBlock = false; //Reset block physics. Assume we are not on a block. This is overridden in 'checkCollision()' if on a block

        let spritePos = { //Calculate new sprite position
            left: x0v0[0],
            right: x0v0[0] + parseInt(sprite.offsetWidth),
            bottom: y0v0[0],
            top: y0v0[0] + parseInt(sprite.offsetHeight),
            height: sprite.offsetHeight,
            width: sprite.offsetWidth
        }

        checkCollision(spritePos, obstacles); //Determine if there is an obstacle nearby, and if so, if a collision occurs.

        animateSprite(keys, sprite); //Update sprite animations and update sprite position in window
        requestAnimationFrame(animate); //Restart animation

        clock += 1; //Cycle clock
    }

}


    
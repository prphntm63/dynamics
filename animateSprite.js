;(function () {

function animateSprite () {
    let sprite = SPRITE.dom;
    let keys = window.INPUT.keys;
    let constants = window.LEVEL.constants;
    let x0v0 = XY.x0v0;
    let y0v0 = XY.y0v0;

    // Map walking sprites to an array per their sequence
    let walkSprites = ['url("/sprites/walk1.gif")', 'url("/sprites/walk2.gif")', 'url("/sprites/walk3.gif")', 'url("/sprites/walk2.gif")'];

    // Change direction of sprite when we press the left or right keys accordingly
    if (keys.leftKey) {
        sprite.style.transform = 'scaleX(-1)'
    } else if (keys.rightKey) {
        sprite.style.transform = 'scaleX(1)'
    }

    // Check for special conditions such as ducking or jumping. 
    // Note that we do need x0v0, y0v0, frame, onBlock, and clock to be document scoped (which they are)
    if (keys.downKey) {
        sprite.style.backgroundImage = 'url("/sprites/duck.gif")';
    } else if (y0v0[0] > 0 && !LEVEL.variables.onBlock) {
        sprite.style.backgroundImage = 'url("/sprites/jump.gif")';
    } else if ((x0v0[1]>0 && keys.leftKey) || (x0v0[1]<0 && keys.rightKey)) {
        sprite.style.backgroundImage = 'url("/sprites/skid.gif")';
    } else if (x0v0[1] == 0) {
        sprite.style.backgroundImage = 'url("sprites/stand.gif")';
    } else {
        let animateTransition = LEVEL.variables.clock % LEVEL.constants.animateInterval;
        if (animateTransition == 0) {
            sprite.style.backgroundImage = walkSprites[LEVEL.variables.frame%3];
            LEVEL.variables.frame += 1;
        }
    }

    // Update sprite position in window
    sprite.style.left = x0v0[0] + 'px';
    sprite.style.bottom = y0v0[0] + 'px';

    // Update input keys in window
    document.getElementById('left').style.backgroundColor = keys.leftKey?'red':'black';
    document.getElementById('right').style.backgroundColor = keys.rightKey?'red':'black';
    document.getElementById('up').style.backgroundColor = keys.upKey?'red':'black';
    document.getElementById('down').style.backgroundColor = keys.downKey?'red':'black';
    document.getElementById('bonus').style.backgroundColor = keys.bonusKey?'yellow':'black';

}

// **********  EXPORTS  **********
window.ANIMATE = window.ANIMATE || {}
window.ANIMATE.animateSprite = animateSprite

})()
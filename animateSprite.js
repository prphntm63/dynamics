;(function () {

function animateSprite () {
    let DOMsprite = SPRITE.dom;
    let keys = window.INPUT.keys;
    let constants = window.LEVEL.constants;
    let x0v0 = XY.x0v0;
    let y0v0 = XY.y0v0;

    // Map walking sprites to an array per their sequence
    let walkSprites = [window.location.href + 'url("/sprites/walk1.gif")', window.location.href + 'url("/sprites/walk2.gif")', window.location.href + 'url("/sprites/walk3.gif")', window.location.href + 'url("/sprites/walk2.gif")'];

    // Change direction of DOMsprite when we press the left or right keys accordingly
    if (keys.leftKey) {
        DOMsprite.style.transform = 'scaleX(-1)'
    } else if (keys.rightKey) {
        DOMsprite.style.transform = 'scaleX(1)'
    }

    // Check for special conditions such as ducking or jumping. 
    // Note that we do need x0v0, y0v0, frame, onBlock, and clock to be document scoped (which they are)
    // if (keys.downKey) {
    //     DOMsprite.style.backgroundImage = 'url(window.location.href + "/sprites/duck.gif")';
    // } else if (y0v0[0] > 0 && !LEVEL.variables.onBlock) {
    //     DOMsprite.style.backgroundImage = 'url(window.location.href + "/sprites/jump.gif")';
    // } else if ((x0v0[1]>0 && keys.leftKey) || (x0v0[1]<0 && keys.rightKey)) {
    //     DOMsprite.style.backgroundImage = 'url(window.location.href + "/sprites/skid.gif")';
    // } else if (x0v0[1] == 0) {
    //     DOMsprite.style.backgroundImage = 'url(window.location.href + "sprites/stand.gif")';
    // } else {
    //     let animateTransition = LEVEL.variables.clock % LEVEL.constants.animateInterval;
    //     if (animateTransition == 0) {
    //         DOMsprite.style.backgroundImage = walkSprites[LEVEL.variables.frame%3];
    //         LEVEL.variables.frame += 1;
    //     }
    // }

    DOMsprite.style.backgroundImage = 'url(window.location.href + "/sprites/spriteSheet.gif")'
    // DOMsprite.style.bottom = '90px';
    walkSprites = ['-142px', '-270px', '-24px', '-270px']

    if (keys.downKey) {
        DOMsprite.style.backgroundPositionX = '-836px';
    } else if (y0v0[0] > 0 && !LEVEL.variables.onBlock) {
        DOMsprite.style.backgroundPositionX = '-408px';
    } else if (y0v0[0] < 0 && !LEVEL.variables.onBlock) {
        DOMsprite.style.backgroundPositionX = '-512px';
    } else if ((x0v0[1]>0 && keys.leftKey) || (x0v0[1]<0 && keys.rightKey)) {
        DOMsprite.style.backgroundPositionX = '-944px';
    } else if (x0v0[1] == 0) {
        DOMsprite.style.backgroundPositionX = '-24px';
    } else {
        let animateTransition = LEVEL.variables.clock % LEVEL.constants.animateInterval;
        if (animateTransition == 0) {
            DOMsprite.style.backgroundPositionX = walkSprites[LEVEL.variables.frame%3];
            LEVEL.variables.frame += 1;
        }
    }

    // Update DOMsprite position in window
    DOMsprite.style.left = x0v0[0] + 'px';
    DOMsprite.style.bottom = y0v0[0] + 'px';

    // Update input keys in window
    document.getElementById('left').style.backgroundColor = keys.leftKey?'red':'black';
    document.getElementById('right').style.backgroundColor = keys.rightKey?'red':'black';
    document.getElementById('up').style.backgroundColor = keys.upKey?'red':'black';
    document.getElementById('down').style.backgroundColor = keys.downKey?'red':'black';
    document.getElementById('bonus').style.backgroundColor = keys.bonusKey?'yellow':'black';

}

class blockAnimateClass {
    constructor(block) {
        this.block = block;
        this.animationList = [0, 9, 18, 25, 30, 25, 18, 9, 0, 0, 0];
        this.animationFrame = 0;
        ANIMATE.blockAnimations.push(this)
    }

    updateAnimation() {
        
        if (this.animationFrame === 0 && this.block.type === 'block') {
            let newCoin = document.createElement('div');
            newCoin.classList.add('coin');
            newCoin.style.bottom = this.block.bottom + 'px';
            newCoin.style.left = this.block.left + 'px';
            newCoin.id = this.block.id + 'coin'
            document.getElementById('level-container').appendChild(newCoin)
        }

        let animationObject = document.getElementById(this.block.id)
        animationObject.style.bottom = parseInt(parseInt(this.block.bottom) + this.animationList[this.animationFrame]) + 'px'

        if (this.block.type === 'block') {
            var coinObject = document.getElementById(this.block.id + 'coin')
            coinObject.style.bottom = parseInt(this.block.bottom + 80*Math.sqrt(this.animationFrame)) + 'px'
        }

        if (this.animationFrame <= this.animationList.length) {
            this.animationFrame++
        } else {
            ANIMATE.blockAnimations.splice(ANIMATE.blockAnimations.indexOf(this), 1)
            if (this.block.type === 'block') {
                animationObject.classList.add('used')
                coinObject.parentElement.removeChild(coinObject)
            }
        }
    }
}

function animateBlocks() {
    if (ANIMATE.blockAnimations.length) {
        ANIMATE.blockAnimations.forEach(block => {
            block.updateAnimation()
        })
    }
}

// **********  EXPORTS  **********
window.ANIMATE = window.ANIMATE || {}
window.ANIMATE.animateSprite = animateSprite
window.ANIMATE.blockAnimations = [];
window.ANIMATE.blockAnimateClass = blockAnimateClass
window.ANIMATE.handleBlocks = animateBlocks


})()

;(function () {

function animateSprite () {
    let DOMsprite = SPRITE.dom;
    let keys = window.INPUT.keys;
    let constants = window.LEVEL.constants;
    let x0v0 = XY.x0v0;
    let y0v0 = XY.y0v0;

    // Change direction of DOMsprite when we press the left or right keys accordingly
    if (keys.leftKey) {
        DOMsprite.style.transform = 'scaleX(-1)'
    } else if (keys.rightKey) {
        DOMsprite.style.transform = 'scaleX(1)'
    }

    DOMsprite.style.backgroundImage = 'url("./sprites/sprites.png")'
    const animateTransition = LEVEL.variables.clock % LEVEL.constants.animateInterval;
    const walkSprites = ['-266px', '-330px', '-394px', '-458px', '-522px', '-586px']
    const typeSprites = ['-643px', '-707px']

    if (keys.downKey) {
        DOMsprite.style.backgroundPositionX = '-202px';
        LEVEL.variables.frame = 0;
    } else if (y0v0[0] > 0 && !LEVEL.variables.onBlock) {
        DOMsprite.style.backgroundPositionX = '-138px';
        LEVEL.variables.frame = 0;
    } else if (y0v0[0] < 0 && !LEVEL.variables.onBlock) {
        DOMsprite.style.backgroundPositionX = '-74px';
        LEVEL.variables.frame = 0;
    } else if ((x0v0[1]>0 && keys.leftKey) || (x0v0[1]<0 && keys.rightKey)) {
        DOMsprite.style.backgroundPositionX = '-138px';
        LEVEL.variables.frame = 0;
    } else if (x0v0[1] == 0 && keys.bonusKey) {
        if (animateTransition == 0) {
            DOMsprite.style.backgroundPositionX = typeSprites[0.5*LEVEL.variables.frame%(typeSprites.length)];
            LEVEL.variables.frame += 1;
        }
    } else if (x0v0[1] == 0) {
        DOMsprite.style.backgroundPositionX = '-10px';
        LEVEL.variables.frame = 0;
    }  else {
        if (animateTransition == 0) {
            DOMsprite.style.backgroundPositionX = walkSprites[LEVEL.variables.frame%(walkSprites.length)];
            LEVEL.variables.frame += 1;
        }
    }

    if (x0v0[1] == 0 && keys.bonusKey && !LEVEL.variables.editingLevel) {
        DOMsprite.style.width = "60px"
        LEVEL.variables.editLevelFrameTimer += 1

        if (LEVEL.variables.editLevelFrameTimer > LEVEL.constants.editLevelFrameTimerThreshold) {
            editLevel()
            LEVEL.variables.editLevelFrameTimer = 0
        }
    } else {
        DOMsprite.style.width = "48px"
        LEVEL.variables.editLevelFrameTimer = 0
    }

    // Update DOMsprite position in window
    DOMsprite.style.left = x0v0[0] + 'px';
    DOMsprite.style.bottom = y0v0[0] + 'px';
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
            coinObject.style.bottom = parseInt(this.block.bottom + 50*Math.sqrt(this.animationFrame)) + 'px'
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

function animateGoalbar() {
    const goalbarSpeed = 5

    if (window.LEVEL.variables.goalbarBroken) {
        if (document.getElementById('goalBar').getAttribute("src").includes('dust')) return

        document.getElementById('goalBar').setAttribute("src", "textures/goalposts_dust_once.gif")
        return
    }

    if ((window.LEVEL.variables.goalbarDirection * goalbarSpeed) + window.LEVEL.variables.goalbarHeight > 512) {
        window.LEVEL.variables.goalbarHeight = 512
        window.LEVEL.variables.goalbarDirection *= -1
    } else if ((window.LEVEL.variables.goalbarDirection * goalbarSpeed) + window.LEVEL.variables.goalbarHeight < 0 ) {
        window.LEVEL.variables.goalbarHeight = 0
        window.LEVEL.variables.goalbarDirection *= -1
    } else {
        window.LEVEL.variables.goalbarHeight += (window.LEVEL.variables.goalbarDirection * goalbarSpeed)
    }

    document.getElementById('goalBar').style.bottom = window.LEVEL.variables.goalbarHeight + 'px'
}

// **********  EXPORTS  **********
window.ANIMATE = window.ANIMATE || {}
window.ANIMATE.animateSprite = animateSprite
window.ANIMATE.blockAnimations = [];
window.ANIMATE.blockAnimateClass = blockAnimateClass
window.ANIMATE.handleBlocks = animateBlocks
window.ANIMATE.goalbar = animateGoalbar

})()

;(function() {
    window.INPUT = window.INPUT || {}

    INPUT.keys = {
        allowInput: true,
        rightKey : false,
        leftKey : false,
        upKey : false,
        downKey : false,
        bonusKey : false,
        upKeyReset : 0,
        xKeyReset : true
    }

    window.LEVEL = window.LEVEL || {}

    LEVEL.constants = {
        screens : 4,
        animateInterval : 4,
        windowWidth : undefined,
        levelWidth: undefined,
        goalpostWidth: 500,
        jumpVelocity : 35,
        accelX : 1,
        decelX : 3,
        accelY : 2,
        maxVeloX : 17,
        maxVeloY : 40,
        x0v0 : [screen.width/4,0], //Initial position. We want to 'drop down' into the level
        y0v0 : [screen.height*.8,0],
        animationFrame : undefined,
        fpsInterval : 1000 / 60,
        skyChangeInterval : 60 * 10
    }

    LEVEL.variables = {
        frame : 0,
        clock : 0,
        onBlock : false, //We don't start on a block
        handlingAnimation : false,
        currentPipe : undefined,
        outputPipe : undefined,
        counter : 0,
        animationCase : 0,
        scrollCounter : 30,
        editingLevel: false,
        mouseScrollCounter: 0,
        currentGradient: 8,
        lastGradientClock : 0,
        lastGradientIndex : 0,
        goalbarHeight: 0,
        goalbarDirection: 1,
        goalbarBroken: false
    }

    window.SPRITE = window.SPRITE || {}

    SPRITE.dom = undefined;
    SPRITE.spritePos = getSpritePos;

    function getSpritePos() {
        return {
            left: XY.x0v0[0],
            right: XY.x0v0[0] + parseInt(SPRITE.dom.offsetWidth, 10),
            bottom: XY.y0v0[0],
            top: XY.y0v0[0] + parseInt(SPRITE.dom.offsetHeight, 10),
            height: SPRITE.dom.offsetHeight,
            width: SPRITE.dom.offsetWidth
        }
    }

    LEVEL.animate = animate

    let tLast = Date.now()

    function animate(timestamp) { //Repeat to animate each frame
        let tNow = Date.now()
        elapsed = tNow - tLast

        if (elapsed > LEVEL.constants.fpsInterval) {     

            window.XY.updatePosX(); //Calculate X and Y positions
            window.XY.updatePosY();

            LEVEL.variables.onBlock = false; //Reset block physics. Assume we are not on a block. This is overridden in 'checkCollision()' if on a block

            if (LEVEL.variables.handlingAnimation) {
                ANIMATE.handlePipe();
            } else {
                ANIMATE.checkCollision(SPRITE.spritePos(), obstacles); //Determine if there is an obstacle nearby, and if so, if a collision occurs.
                ANIMATE.animateSprite(); //Update sprite animations and update sprite position in window
                ANIMATE.handleBlocks();
                ANIMATE.scroll(); //Update scroll position, if necessary
                ANIMATE.goalbar();
            }

            // window.SKY.gradient(); //update sky

            tLast = tNow - (elapsed % LEVEL.constants.fpsInterval)
        }

        LEVEL.constants.animationFrame = requestAnimationFrame(LEVEL.animate); //Restart animation
        LEVEL.variables.clock += 1; //Cycle clock
    }

    window.EDIT = window.EDIT || {}
    
    EDIT.editing = false;
    EDIT.selectedObstacle = 'block';
    EDIT.mouseDown = undefined;
    EDIT.mouseUp = undefined;

})()

function main() {
    LEVEL.constants.levelWidth = document.getElementById('level-container').getBoundingClientRect();
    SPRITE.dom = document.getElementById('sprite');

    generateLevel();

    document.getElementById('bonus2').addEventListener('click', editLevel) //Add event handlers
    document.getElementById('left').addEventListener('click', ANIMATE.scrollScreenLeft)
    document.getElementById('right').addEventListener('click', ANIMATE.scrollScreenRight)

    document.body.addEventListener('keydown', INPUT.keyEvents.keyPress)
    document.body.addEventListener('keyup', INPUT.keyEvents.keyRelease)
    document.body.addEventListener('mousedown', getMouseDown)
    document.body.addEventListener('mouseup', getMouseUp)
    
    // TODO: Put this in settings
    // window.addEventListener('wheel', event => {
    //     LEVEL.variables.mouseScrollCounter += Math.sign(event.deltaY)
    //     if (LEVEL.variables.mouseScrollCounter === 15) {
    //         ANIMATE.scrollScreenRight(event);
    //         LEVEL.variables.mouseScrollCounter = 0;
    //     } else if (LEVEL.variables.mouseScrollCounter === -15) {
    //         ANIMATE.scrollScreenLeft(event);
    //         LEVEL.variables.mouseScrollCounter = 0;
    //     }
    // })

    document.getElementById('edit-block').addEventListener('mousedown', selectBlock)
    document.getElementById('edit-platform').addEventListener('mousedown', selectPlatform)
    document.getElementById('edit-platform2').addEventListener('mousedown', selectPlatform2)
    document.getElementById('edit-brick').addEventListener('mousedown', selectBrick)
    document.getElementById('done-editing-button').addEventListener('mousedown', editLevel)
    
    setTimeout(function() { //Wait 200ms to start to avoid lag
        LEVEL.constants.animationFrame = requestAnimationFrame(LEVEL.animate); //Start the animation
    }, 200)
};

function generateLevel() {
    LEVEL.constants.windowWidth = window.innerWidth;
    LEVEL.constants.levelWidth = parseInt(LEVEL.constants.screens*LEVEL.constants.windowWidth) + LEVEL.constants.goalpostWidth
    
    renderHtmlInTargetScreen(0, generateMainLogoContent())
    renderHtmlInTargetScreen(1, generateMattScreenContent(), "bottom")
    renderHtmlInTargetScreen(1, generateBioTitleContent(), 15)
    renderHtmlInTargetScreen(2, generateBrewingTitleContent(), 5)
    renderHtmlInTargetScreen(3, generateCodeTitleContent(), 10)

    generateMessageBox(obstacles, 1, "Testing 123 <a href=https://google.com>Test link here</a> and more stuff")
    generateMessageBox(obstacles, 2, "Brewing text here <a href=https://google.com>Test link here</a> and more stuff")
    generateMessageBox(obstacles, 3, "Code text here <a href=https://google.com>Test link here</a> and more stuff")
    
    generateNavPipes(obstacles);
    renderBrewingScreenContent(obstacles)
    renderCodeScreenContent(obstacles)
    generateObstacles();
    generateGoalposts()
    

    document.getElementById('level-container').style.width = parseInt(LEVEL.constants.windowWidth * LEVEL.constants.screens + LEVEL.constants.goalpostWidth + 1) + 'px';
    document.getElementById('background-container').style.width = parseInt(0.75 * LEVEL.constants.windowWidth * LEVEL.constants.screens + 1) + 'px';
}

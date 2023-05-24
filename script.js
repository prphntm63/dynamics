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
        scaleFactor: 1,
        goalpostWidth: 500,
        jumpVelocity : 35,
        accelX : 1,
        decelX : 3,
        accelY : 2,
        maxVeloX : 17,
        maxVeloY : 40,
        x0v0 : [window.innerWidth/4,0], //Initial position. We want to 'drop down' into the level
        y0v0 : [screen.height*1.1,0],
        animationFrame : undefined,
        fpsInterval : 1000 / 60,
        skyChangeInterval : 60 * 10,
        editLevelFrameTimerThreshold: 150
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
        goalbarBroken: false,
        editLevelFrameTimer: 0
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

        if (!LEVEL.variables.editingLevel) {
            LEVEL.constants.animationFrame = requestAnimationFrame(LEVEL.animate); //Restart animation
            LEVEL.variables.clock += 1; //Cycle clock
        }

        // Update navbar path based on current screen
        const pagePaths = ['/', '/bio', '/brew', '/code']
        const currentPath = window.location.pathname
        const currentScreen = Math.floor(XY.x0v0[0] / LEVEL.constants.windowWidth)
        if (currentScreen < 0 ) {
            window.history.pushState({}, "", window.location.origin + '/' )
        } else if (currentScreen >= pagePaths.length) {
            window.history.pushState({}, "", window.location.origin + pagePaths[pagePaths.length - 1] )
        } else if (pagePaths[currentScreen] !== currentPath) {
            window.history.pushState({}, "", window.location.origin + pagePaths[currentScreen] )
        }
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

    // Check which page we are on and start on the proper screen
    let levelContainer = document.getElementById('level-container');
    let backgroundContainer = document.getElementById('scenery-container');
    const pagePaths = ['/bio', '/brew', '/code']
    const selectedPageIndex = pagePaths.indexOf(window.location.pathname)
    if (selectedPageIndex >= 0) {
        const offset = parseInt(-1*((1+selectedPageIndex) * LEVEL.constants.scaleFactor * window.innerWidth))
        levelContainer.style.left = offset + 'px'
        backgroundContainer.style.left = parseInt(0.5*offset) + 'px'

        const pipeNumber = (selectedPageIndex + 2)*10 + (selectedPageIndex + 2)
        const navPipe = obstacles.find(obstacle => obstacle.input === pipeNumber && obstacle.output === pipeNumber)
        const pipeCenter = parseInt(navPipe.left) + parseInt(navPipe.width)/2 - 32;

        XY.x0v0 = [pipeCenter,0]
        XY.y0v0 = [navPipe.height-125,0]

        LEVEL.variables.handlingAnimation = pipeNumber
        LEVEL.variables.counter = 64
        LEVEL.variables.animationCase = 3
    }
    
    setTimeout(function() { //Wait 200ms to start to avoid lag
        LEVEL.constants.animationFrame = requestAnimationFrame(LEVEL.animate); //Start the animation
    }, 200)
};

function generateLevel() {
    LEVEL.constants.scaleFactor = ( window.innerWidth <= 800 || window.innerHeight <= 400) ? 2 : ( window.innerWidth <= 1200 || window.innerHeight <= 600) ? 1.5 : 1
    LEVEL.constants.windowWidth = LEVEL.constants.scaleFactor * window.innerWidth;
    LEVEL.constants.levelWidth = parseInt(LEVEL.constants.screens*LEVEL.constants.windowWidth) + ( LEVEL.constants.scaleFactor * LEVEL.constants.goalpostWidth )
    
    renderHtmlInTargetScreen(0, generateMainLogoContent())
    generateAboutMeObstacles(obstacles)
    renderHtmlInTargetScreen(1, generateBioTitleContent(), 15)
    renderHtmlInTargetScreen(2, generateBrewingTitleContent(), 5)
    renderHtmlInTargetScreen(3, generateCodeTitleContent(), 10)

    generateMessageBox(obstacles, 1, "Hey! I’m Matt!<br><br>I’m a Mechanical-turned-Software engineer who absolutely loves to solve problems (no matter how big or small). <br><br> I would consider my forte to be Typescript and Javascript using React/Redux, Angular, and NodeJS. However, I have a great working knowledge of Python and Golang along with popular frameworks. I’m also pretty handy when it comes to DevExp, with some substantial experience with Docker, Kubernetes, and Google Cloud Platform! <br><br>All that being said, sometimes pure, unadaulterated Javascript can be fun too, so that’s why I made this website! <br><br>P.S.: Your character can hack the site if you can figure out how to use your laptop! Maybe try to <em>Shift</em> your perspective for a few seconds...")
    generateMessageBox(obstacles, 2, "One of my favorite pastimes is homebrewing. I am deeply involved in the local community, have won multiple awards for my recipes, and am an experienced <a target=_blank  class=underline href=https://www.bjcp.org/> BJCP judge</a>. <br><br> One thing I particularly love to do is integrate IoT technology into my workflow; every step of the process is measured and digitalized so I can keep accurate measurements.<br><br>Here is a list of what I currently have on tap - if you want to see all my recipes, you can check out my <a target=_blank  class=underline href=https://www.brewersfriend.com/homebrew/brewer/224060/matlab->BrewersFriend</a> page!")
    generateMessageBox(obstacles, 3, "I really do love doing passion projects in my spare time. It is a great way to learn new technologies and to give back to the communities you are a part of.<br><br>I have included a few of my favorite projects here; however, this is by no means an complete list of the projects I have contributed to.<br><br>Feel free to check out my <a target=_blank  class=underline href=https://github.com/prphntm63>Github Profile</a> for a more detailed view of my current and past work.")
    
    generateNavPipes(obstacles);
    renderBrewingScreenContent(obstacles)
    renderCodeScreenContent(obstacles)
    generateObstacles();
    generateGoalposts()

    document.getElementById('level-container').style.width = parseInt(LEVEL.constants.windowWidth * LEVEL.constants.screens + LEVEL.constants.goalpostWidth + 1) + 'px';
    document.getElementById('background-container').style.width = parseInt(0.75 * LEVEL.constants.windowWidth * LEVEL.constants.screens + 1) + 'px';
}

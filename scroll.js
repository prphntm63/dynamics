;(function() {

function scroll() {
    let spritePos = SPRITE.spritePos()
    let levelContainer = document.getElementById('level-container');
    let backgroundContainer = document.getElementById('scenery-container');
    let mapDiv = levelContainer.getBoundingClientRect();

    const innerWidth = LEVEL.constants.scaleFactor * window.innerWidth
    const innerHeight = LEVEL.constants.scaleFactor * window.innerHeight

    let leftScroll = -mapDiv.left + 0.2*parseInt(innerWidth);
    let rightScroll = -mapDiv.left + 0.8*parseInt(innerWidth);

    if (ANIMATE.scrollToScreen) {
        let targetScreen = ANIMATE.scrollToScreen - 1
        XY.x0v0 = [(targetScreen+.21) * innerWidth, 0]
        XY.y0v0 = [innerHeight + 150, 0]
        INPUT.keys.allowInput = false;
        // LEVEL.variables.handlingAnimation = true;
        if (-targetScreen * innerWidth < mapDiv.left - 16) {
            levelContainer.style.left = parseInt(mapDiv.left - LEVEL.variables.scrollCounter) + 'px';
            backgroundContainer.style.left = 0.5*parseInt(mapDiv.left - LEVEL.variables.scrollCounter) + 'px';
        } else if (-targetScreen* innerWidth > mapDiv.left + 16) {
            levelContainer.style.left = parseInt(mapDiv.left + LEVEL.variables.scrollCounter) + 'px';
            backgroundContainer.style.left = 0.5*parseInt(mapDiv.left + LEVEL.variables.scrollCounter) + 'px';
        } else {
            levelContainer.style.left = parseInt(-targetScreen * innerWidth) + 'px';
            backgroundContainer.style.left = 0.5*parseInt(-targetScreen * innerWidth) + 'px';
            ANIMATE.scrollToScreen = undefined;
            // LEVEL.variables.handlingAnimation = false;
            INPUT.keys.allowInput = true;
            LEVEL.variables.mouseScrollCounter = 0;
            if (LEVEL.variables.currentPipe) {
                XY.x0v0[0] = LEVEL.variables.outputPipe[0].left+32;
                LEVEL.variables.animationCase = 3;
            }
        }
    }

    if (spritePos.left < leftScroll) {
        if ( !(-mapDiv.left < 0) && (XY.x0v0[1] < 0)) {
            levelContainer.style.left = parseInt(mapDiv.left - XY.x0v0[1]) + 'px';
            backgroundContainer.style.left = 0.5*parseInt(mapDiv.left - XY.x0v0[1]) + 'px';
        } 
    } else if (spritePos.right > rightScroll) {
        if ( !(innerWidth - mapDiv.left > mapDiv.width) && (XY.x0v0[1] > 0)) {
            levelContainer.style.left = parseInt(mapDiv.left - XY.x0v0[1]) + 'px';
            backgroundContainer.style.left = 0.5*parseInt(mapDiv.left - XY.x0v0[1]) + 'px';
        } 
    }


    if (-mapDiv.top > 0) {
        levelContainer.style.top = '0px'
    } else if ((spritePos.top >= mapDiv.bottom - (0.2*window.innerHeight)) && XY.y0v0[1] > 0) {
        levelContainer.style.top = parseInt(parseInt(mapDiv.top) + 10) + 'px'

    } else if ((spritePos.bottom <= mapDiv.bottom - (0.7*window.innerHeight))) {
        let newCalcValue = parseInt(parseInt(mapDiv.top) - 25)
        newCalcValue = (newCalcValue <= 0) ? 0 : newCalcValue
        levelContainer.style.top = newCalcValue + 'px'
    }

}

function scrollScreenLeft(event) {
    event.stopPropagation()
    let mapDiv = document.getElementById('level-container').getBoundingClientRect()
    let currentScreen = Math.floor(-mapDiv.left / innerWidth) + 1  
    
    ANIMATE.scrollToScreen = (currentScreen == 1) ? undefined : currentScreen - 1;
    LEVEL.variables.handlingAnimation = 11*ANIMATE.scrollToScreen
    LEVEL.variables.animationCase = 1;
    ANIMATE.handlePipe()
    
}

function scrollScreenRight(event) {
    event.stopPropagation()
    const innerWidth = LEVEL.constants.scaleFactor * innerWidth

    let mapDiv = document.getElementById('level-container').getBoundingClientRect()
    let currentScreen = Math.floor(-mapDiv.left / innerWidth) + 1
    ANIMATE.scrollToScreen =  (currentScreen == Math.floor(mapDiv.width / innerWidth)) ? undefined : currentScreen + 1; //Make sure we don't go too far

    LEVEL.variables.handlingAnimation = 11*ANIMATE.scrollToScreen
    LEVEL.variables.animationCase = 1;
    ANIMATE.handlePipe()
}

// **********  EXPORTS  **********
window.ANIMATE = window.ANIMATE || {}
ANIMATE.scroll = scroll
ANIMATE.scrollScreenLeft = scrollScreenLeft
ANIMATE.scrollScreenRight = scrollScreenRight
ANIMATE.scrollToScreen = undefined

})()


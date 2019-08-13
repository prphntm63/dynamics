;(function () {

function handlePipe() {

    let pipes = obstacles.filter(obstacle => {
        return (obstacle.type == 'pipe') ? true : false;
    })

    LEVEL.variables.currentPipe = pipes.filter(pipe => {
        return (pipe.input === LEVEL.variables.handlingAnimation) ? true : false;
    })

    LEVEL.variables.outputPipe = pipes.filter(pipe => {
        return (pipe.input === LEVEL.variables.currentPipe[0].output) ? true : false;
    })

    INPUT.keys.allowInput = false;
    INPUT.keys.downKey = false;

    LEVEL.variables.onBlock = true;

    let pipeCenter = parseInt(LEVEL.variables.currentPipe[0].left) + parseInt(LEVEL.variables.currentPipe[0].width)/2 - 32;

    if (LEVEL.variables.animationCase == 0) {
        if (parseInt(sprite.style.left) > pipeCenter + 5) {
            XY.x0v0 = [XY.x0v0[0]-3,0];
            ANIMATE.animateSprite();

        } else if (parseInt(sprite.style.left) < pipeCenter - 5) {
            XY.x0v0 = [XY.x0v0[0]+3,0];
            ANIMATE.animateSprite();

        } else {
            if (LEVEL.variables.counter < 125) {
                XY.y0v0 = [(parseInt(LEVEL.variables.currentPipe[0].height) - LEVEL.variables.counter), 0];
                ANIMATE.animateSprite();
                LEVEL.variables.counter+=2;
            } else {
                LEVEL.variables.animationCase = 1;
            }
        }
    } else if (LEVEL.variables.animationCase == 1) {
        XY.x0v0[0] = parseInt(LEVEL.variables.outputPipe[0].left) + parseInt(LEVEL.variables.outputPipe[0].width)/2 - 32;
        XY.y0v0 = [parseInt(LEVEL.variables.outputPipe[0].height) - 125, 0];
        ANIMATE.animateSprite();
        LEVEL.variables.counter = 125;
        LEVEL.variables.animationCase = 2;
    } else if (LEVEL.variables.animationCase == 2) {
        let levelContainer = document.getElementById('level-container');
        let backgroundContainer = document.getElementById('background-container');
        let mapDiv = levelContainer.getBoundingClientRect();
        let leftScroll = -mapDiv.left + 0.2*parseInt(screen.width);
        // let rightScroll = -mapDiv.left + 0.8*parseInt(screen.width);

        if (XY.x0v0[0] < leftScroll-16) {
            levelContainer.style.left = parseInt(mapDiv.left + LEVEL.variables.scrollCounter) + 'px';
            backgroundContainer.style.left = 0.5*parseInt(mapDiv.left + LEVEL.variables.scrollCounter) + 'px';
            // scrollCounter += 5;
        } else if (XY.x0v0[0] > leftScroll+16) {
            levelContainer.style.left = parseInt(mapDiv.left - LEVEL.variables.scrollCounter) + 'px';
            backgroundContainer.style.left = 0.5*parseInt(mapDiv.left - LEVEL.variables.scrollCounter) + 'px';
            // scrollCounter += 5;
        } else {
            LEVEL.variables.scrollCounter = 30;
            LEVEL.variables.animationCase = 3;   
        }
    } else if (LEVEL.variables.animationCase == 3) {
        if (LEVEL.variables.counter > 0) {
            XY.y0v0 = [(parseInt(LEVEL.variables.outputPipe[0].height) - LEVEL.variables.counter), 0];
            ANIMATE.animateSprite();
            LEVEL.variables.counter-=2;
        } else {
            XY.y0v0 = [parseInt(LEVEL.variables.outputPipe[0].height)+1, 0];
            ANIMATE.animateSprite();
            LEVEL.variables.animationCase = 0;
            INPUT.keys.allowInput = true;
            LEVEL.variables.handlingAnimation = false;
            LEVEL.variables.onBlock = true;
            LEVEL.variables.currentPipe = undefined;
            LEVEL.variables.outputPipe = undefined;
        }
    }

}

window.ANIMATE = window.ANIMATE || {}
ANIMATE.handlePipe = handlePipe

})()
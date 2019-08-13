function editLevel(evt) {
    evt.stopPropagation()

    if (LEVEL.variables.handlingAnimation) {return}; //Exit function if handling external animation

    LEVEL.variables.editingLevel = !LEVEL.variables.editingLevel; //Toggle level editing state

    if (LEVEL.variables.editingLevel) {    //Check to see if we are editing level
        SPRITE.dom.classList.toggle('sprite-hidden', LEVEL.variables.editingLevel) ;
        document.body.classList.toggle('body-edit', LEVEL.variables.editingLevel)
        document.getElementById('edit-container').classList.remove('hidden')
        document.getElementById('grid-container').classList.add('hidden')


        window.cancelAnimationFrame(LEVEL.constants.animationFrame); //Pause animation when editing level
        
        console.log('editing! ' + EDIT.selectedObstacle)
    } else if (!LEVEL.variables.editingLevel) {

        XY.y0v0[0] = parseInt(window.innerHeight + 150);

        SPRITE.dom.classList.toggle('sprite-hidden', LEVEL.variables.editingLevel);
        document.body.classList.toggle('body-edit', LEVEL.variables.editingLevel)
        document.getElementById('edit-container').classList.add('hidden')
        document.getElementById('grid-container').classList.remove('hidden')

        LEVEL.constants.animationFrame = window.requestAnimationFrame(LEVEL.animate); //Resume animation
        
        console.log('done editing!')
    }

    

    
}

function selectBlock(event) {
    event.stopPropagation()
    document.querySelector('.selected').classList.remove('selected')
    document.getElementById('edit-block').classList.add('selected')
    EDIT.selectedObstacle = 'block'
}
function selectPlatform(event) {
    event.stopPropagation()
    document.querySelector('.selected').classList.remove('selected')
    document.getElementById('edit-platform').classList.add('selected')
    EDIT.selectedObstacle = 'platform'
}
function selectPlatform2(event) {
    event.stopPropagation()
    document.querySelector('.selected').classList.remove('selected')
    document.getElementById('edit-platform2').classList.add('selected')
    EDIT.selectedObstacle = 'platform2'
}
function selectBrick(event) {
    event.stopPropagation()
    document.querySelector('.selected').classList.remove('selected')
    document.getElementById('edit-brick').classList.add('selected')
    EDIT.selectedObstacle = 'brick'
}

function getMouseDown(event) {
    event.stopPropagation()
    if (!LEVEL.variables.editingLevel) return //Don't allow mouse selection events on body if we are not editing
    EDIT.mouseDown = [event.clientX, event.clientY]
}
function getMouseUp(event) {
    if (EDIT.mouseDown == undefined) return //Don't allow mouse selection events on body if we are not editing
    if (!LEVEL.variables.editingLevel) return //Don't allow mouse selection events on body if we are not editing

    let mapDiv = document.getElementById('level-container').getBoundingClientRect()

    EDIT.mouseUp = [event.clientX, event.clientY]

    let obstacleBottom = window.innerHeight - Math.ceil(Math.max(EDIT.mouseDown[1], EDIT.mouseUp[1])/64)*64
    let obstacleLeft = Math.floor( (parseInt(Math.min(EDIT.mouseDown[0], EDIT.mouseUp[0])- parseInt(mapDiv.left))/64)  ) * 64
    let obstacleWidth = Math.ceil(Math.abs((EDIT.mouseDown[0] - EDIT.mouseUp[0]) + 1)/64 )*64 -1
    let obstacleHeight = Math.ceil(Math.abs((EDIT.mouseDown[1] - EDIT.mouseUp[1]) + 1)/64 )*64 -1

    if (EDIT.selectedObstacle == 'block') {
        obstacleLeft = Math.floor((EDIT.mouseUp[0]- parseInt(mapDiv.left))/64)*64;
        obstacleBottom =  window.innerHeight - Math.ceil(EDIT.mouseUp[1]/64)*64;
        obstacleWidth = 63;
        obstacleHeight = 63;
    }

    if (obstacleWidth < 32 || obstacleHeight < 32) return //Remove zero width/height elements

    obstacles.push( //Add new obstacle to array
        {
            type: EDIT.selectedObstacle,
            collision: (EDIT.selectedObstacle == 'platform' || EDIT.selectedObstacle == 'platform2') ? 'top' : 'all',
            left : obstacleLeft,
            bottom: obstacleBottom,
            height: obstacleHeight,
            width: obstacleWidth
        }
    )

    generateObstacles(); //Regen obstacles

    EDIT.mouseDown = undefined; //Reset mouse events
    EDIT.mouseUp = undefined;
}
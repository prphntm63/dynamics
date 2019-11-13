const {combineReducers} = Redux;

// ****************************************
// *****     LEVEL STATE REDUCERS     *****
// ****************************************

function level(state = defaultLevelState, action) {

}

// *****************************************
// *****     SPRITE STATE REDUCERS     *****
// *****************************************

const defaultSpriteStatus = {
    "x0v0" : [0,0], 
    "y0v0" : [0,0],
    "spritePos" : {
        "left" : 0,
        "right" : 0,
        "bottom" : 0,
        "top" : 0,
        "height" : 0,
        "width" : 0
    },
    "onBlock" : false
}

// function sprite(state = defaultSpriteStatus, action) {
//     let newState = {...state}

//     if (action.type === "UPDATE_SPRITE_POSITION") {
//         ax = getXAcceleration(newState)
//         vx = getXVelocity(ax, newState)
//         newState.sprite.x0v0 = getXPosition(ax, vx, newState)

//         ay = getYAcceleration(newState)
//         vy = getYVelocity(ay, newState)
//         newState.sprite.y0v0 = getYPosition(ay, vy, newState)

//         newState.spritePos.width = newState.level.const.spriteWidth
//         newState.spritePos.height = newState.input.keys.downKey ? newState.level.const.spriteHeight : newState.level.const.spriteHeight/2
//         newState.spritePos.left = newState.sprite.x0v0[0]
//         newState.spritePos.right = newState.sprite.x0v0[0] + parseInt(newState.spritePos.width, 10)
//         newState.spritePos.bottom = newState.sprite.y0v0[0]
//         newState.spritePos.top = newState.sprite.y0v0[0] + parseInt(newState.spritePos.height, 10)

//         return newState;
    
//     } else if (action.type === 'CHECK_SPRITE_COLLISION') {
//         checkCollision(newState)
//     }
// }

// ***************************************
// *****     USER INPUT REDUCERS     *****
// ***************************************

const defaultInputState = {
    "keys" : {
        "rightKey" : false,
        "leftKey" : false,
        "upKey" : false,
        "downKey" : false,
        "bonusKey" : false,
    },
    "var" : {
        "allowInput": true,
        "upKeyReset" : 0,
        "xKeyReset" : true
    }
}

function input(state = defaultInputState, action) {
    let newState = {...state}

    switch (action.type) {
        case 'UPDATE_KEYPRESS_STATUS':
            switch (action.payload.key) {
                case 'upKey':
                    newState.keys.upKey = action.payload.keyState
                    return newState
                case 'downKey':
                    newState.keys.downKey = action.payload.keyState
                    return newState
                case 'leftKey':
                    newState.keys.leftKey = action.payload.keyState
                    return newState
                case 'rightKey':
                    newState.keys.rightKey = action.payload.keyState
                    return newState
                case 'bonusKey':
                    newState.keys.bonusKey = action.payload.keyState
                    return newState
                default:
                    return newState
            }
        case 'UPDATE_KEY_ALLOW_INPUT':
                newState.var.allowInput = action.payload
                return newState
            case 'UPDATE_UP_KEY_RESET':
                newState.var.allowInput = action.payload
                return newState
            case 'UPDATE_X_KEY_RESET':
                newState.var.allowInput = action.payload
                return newState
            default:
                return newState
    }
}

const reduxState = combineReducers({
  input,
})

// ****************************************************
// ************* HELPER FUNCTIONS *********************
// ****************************************************

function getXAcceleration(newState) {
    let v0 = newState.sprite.x0v0[0] //initial velocity
    if (newState.input.keys.downKey) {
        ax = (v0 >= 0) ? -0.5*newState.level.constants.accelX : 0.5*newState.level.constants.accelX ;
    } else if (newState.input.keys.rightKey && (newState.input.keys.xKeyReset)) {
        ax = (v0 <= newState.level.constants.maxVeloX) ? newState.level.constants.accelX : 0;
    } else if (newState.input.keys.leftKey && (newState.input.keys.xKeyReset)) {
        ax = (v0 >= -newState.level.constants.maxVeloX) ? -newState.level.constants.accelX : 0;
    } else if (v0 > 0 && (newState.input.keys.xKeyReset)) {
        ax = -newState.level.constants.decelX;
    } else if (v0 < 0 && (newState.input.keys.xKeyReset)) {
        ax = newState.level.constants.decelX;
    } else if (newState.input.keys.rightKey) {
        ax = (v0 <= newState.level.constants.maxVeloX) ? 0.3*newState.level.constants.accelX : 0;
    } else if (newState.input.keys.leftKey) {
        ax = (v0 >= -newState.level.constants.maxVeloX) ? -0.3*newState.level.constants.accelX : 0;
    } else {
        ax = 0;
    }

    return ax
}

function getXVelocity(ax, newState) {
    let vx = newState.sprite.x0v0[1] + ax;
    if (vx * x0v0[1] < 0) {
        vx = 0;
    }
    return vx
}

function getXPosition(ax, vx, newState) {
    let levelWidth = newState.level.constants.levelWidth;
    let x0 = newState.sprite.x0v0[0];
    let posX = x0 + vx + ax;
    if (posX <= 0) {
        posX = x0v0[0];
        vx = 0;
    } else if ((posX) >= (levelWidth-64)) {
        posX = x0v0[0];
        vx = 0;
    }

    return [Math.round(posX), vx]
}

function getYAcceleration(newState) {
    if (newState.sprite.y0v0[1] <= -newState.level.constants.maxVeloY) {
        ay = 0;
    } else if (newState.sprite.onBlock) {
        ay = 0;
    } else {
        ay = -newState.level.constants.accelY;
    }
    return ay
}

function getYVelocity(ay, newState) {
    let vy = newState.sprite.y0v0[1] + ay;
    if (newState.input.keys.upKey && (newState.input.keys.upKeyReset < 2)) {
        newState.sprite.onBlock = false;
        vy += (newState.input.keys.upKeyReset == 0) ? newState.level.constants.jumpVelocity : newState.level.constants.jumpVelocity / 3;
        newState.input.keys.upKey = false;
        newState.input.keys.upKeyReset++;
    }

    return vy
}

function getYPosition(ay, vy, newState) {
    let y0 = newState.sprite.y0v0[0];
    let posY = y0 + vy + ay;
    if (posY <= 0 || newState.sprite.onBlock) {
        newState.input.keys.upKeyReset = 0;
        newState.input.keys.xKeyReset = true;
    } else {
        newState.input.keys.xKeyReset = false;
    }

    return[posY, vy]
}

function checkCollision(newState) {
    let obstacles = newState.level.obstacles
    let spritePos = newState.sprite.spritePos
    let preventSideCollision = false;
    let bottomCollisionPosition = [];

    for (obstacleKey in obstacles) {
        let obstacle = obstacles[obstacleKey];
        obstacle.bottom = parseInt(obstacle.bottom);
        obstacle.left = parseInt(obstacle.left);
        obstacle.top = parseInt(obstacle.bottom) + parseInt(obstacle.height);
        obstacle.right = parseInt(obstacle.left) + parseInt(obstacle.width);

        if ((spritePos.right > obstacle.left) && (spritePos.left < obstacle.right)) {

            switch (obstacle.collision) {
                case 'all': //Check for collisions on all sides
                        if (spritePos.top > obstacle.bottom) {
                            if ((spritePos.bottom <= obstacle.top) && (spritePos.bottom >= Number(obstacle.top + newState.sprite.y0v0[1] - 2.0)) && (spritePos.top > obstacle.top)) { //Check for top collision
                                newState.sprite.y0v0 = [Math.round(obstacle.top), 0]
                                newState.sprite.onBlock = true;

                                if ((obstacle.type == 'pipe') && (newState.input.keys.keys.downKey)) { // Check to see if we are on top of a pipe
                                    newState.level.variables.handlingAnimation = obstacle.input;
                                    newState.input.keys.keys.downKey = false;
                                }

                                preventSideCollision = true;

                            } else if ((spritePos.bottom < obstacle.bottom) && (spritePos.top <= Number(obstacle.bottom + newState.sprite.y0v0[1] + 1)) ) { //Check for bottom collision
                                // newState.sprite.y0v0 = [obstacle.bottom - parseInt(spritePos.height)-2, 0];
                                if (((obstacle.type == 'block' && !obstacle.used) || obstacle.type == 'brick') && (spritePos.left > obstacle.left - 48 && spritePos.right < obstacle.right + 48 )) {
                                    obstacle.used = true;
                                    let myBlock = new ANIMATE.blockAnimateClass(obstacle)
                                }

                                preventSideCollision = true;
                                bottomCollisionPosition.push(Number(obstacle.bottom - parseInt(spritePos.height))) 

                            } else if (((spritePos.bottom > obstacle.bottom && spritePos.bottom < obstacle.top) || (spritePos.top > obstacle.bottom && spritePos.top < obstacle.top) || (spritePos.bottom < obstacle.bottom && spritePos.top > obstacle.top)) && !preventSideCollision) { // check for Left/Right side collision
                                if (spritePos.right > obstacle.left && spritePos.left < obstacle.left) { // Check for LH collision
                                    newState.sprite.x0v0 = [obstacle.left - parseInt(spritePos.width), 0]
                                } else if (spritePos.left < obstacle.right && spritePos.right > obstacle.right) { //Check for RH collision
                                    newState.sprite.x0v0 = [obstacle.right, 0];
                                }

                            } 
                        }
                    break;

                case 'top': //Check for collision on top side only. Side and bottom allow pass-through
                    if (spritePos.top > obstacle.bottom) {
                        if ((spritePos.bottom <= obstacle.top) && (spritePos.bottom >= Number(obstacle.top + newState.sprite.y0v0[1] - 2.0)) && (spritePos.top > obstacle.top)) { //Check for top collision
                            newState.sprite.y0v0 = [Math.round(obstacle.top), 0]
                            newState.sprite.onBlock = true;
                        }
                    }
                    break;

                case 'none': //Do not check for collisions
                    break;

                default: //Default is top-only collision
                    if (spritePos.top > obstacle.bottom) {
                        if ((spritePos.bottom <= obstacle.top) && (spritePos.bottom >= Number(obstacle.top + newState.sprite.y0v0[1] - 2.0)) && (spritePos.top > obstacle.top)) { //Check for top collision
                            newState.sprite.y0v0 = [Math.round(obstacle.top), 0]
                            newState.sprite.onBlock = true;
                        }
                    }    
                    break;
            }

            
        }
    }

    if (bottomCollisionPosition.length) {
        newState.sprite.y0v0 = [Math.min(parseInt(bottomCollisionPosition)-2), 0];
        newState.sprite.onBlock = false;
    };

    return newState
}
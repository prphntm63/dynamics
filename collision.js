;(function() {

//Check for collisions
function checkCollision(spritePos, obstacles) {
    let preventSideCollision = false;
    let bottomCollisionPosition = [];

    // Check for goalpost collision
    const goalbarPosition = (LEVEL.constants.screens * LEVEL.constants.windowWidth) + 248
    if (spritePos.right > goalbarPosition) {
        LEVEL.variables.goalbarBroken = true
    }

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
                            if ((spritePos.bottom <= obstacle.top) && (spritePos.bottom >= Number(obstacle.top + XY.y0v0[1] - 2.0)) && (spritePos.top > obstacle.top)) { //Check for top collision
                                XY.y0v0 = [Math.round(obstacle.top), 0]
                                LEVEL.variables.onBlock = true;

                                if ((obstacle.type == 'pipe') && (INPUT.keys.downKey)) { // Check to see if we are on top of a pipe
                                    LEVEL.variables.handlingAnimation = obstacle.input;
                                    INPUT.keys.downKey = false;
                                }

                                preventSideCollision = true;

                            } else if ((spritePos.bottom < obstacle.bottom) && (spritePos.top <= Number(obstacle.bottom + XY.y0v0[1] + 1)) ) { //Check for bottom collision
                                // XY.y0v0 = [obstacle.bottom - parseInt(spritePos.height)-2, 0];
                                if (((obstacle.type == 'block' && !obstacle.used) || obstacle.type == 'brick' || obstacle.type == 'messagebox' || obstacle.type === 'github' || obstacle.type === 'linkedin' || obstacle.type === 'mail') && (spritePos.left > obstacle.left - 48 && spritePos.right < obstacle.right + 48 )) {
                                    obstacle.used = true;
                                    let myBlock = new ANIMATE.blockAnimateClass(obstacle)

                                    if (obstacle.activate) {
                                        obstacle.activate()
                                    }
                                }

                                preventSideCollision = true;
                                bottomCollisionPosition.push(Number(obstacle.bottom - parseInt(spritePos.height))) 

                            } else if (((spritePos.bottom > obstacle.bottom && spritePos.bottom < obstacle.top) || (spritePos.top > obstacle.bottom && spritePos.top < obstacle.top) || (spritePos.bottom < obstacle.bottom && spritePos.top > obstacle.top)) && !preventSideCollision) { // check for Left/Right side collision
                                if (spritePos.right > obstacle.left && spritePos.left < obstacle.left) { // Check for LH collision
                                    XY.x0v0 = [obstacle.left - parseInt(spritePos.width), 0]
                                } else if (spritePos.left < obstacle.right && spritePos.right > obstacle.right) { //Check for RH collision
                                    XY.x0v0 = [obstacle.right, 0];
                                }

                            } 
                        }
                    break;

                case 'top': //Check for collision on top side only. Side and bottom allow pass-through
                    if (spritePos.top > obstacle.bottom) {
                        if ((spritePos.bottom <= obstacle.top) && (spritePos.bottom >= Number(obstacle.top + XY.y0v0[1] - 2.0)) && (spritePos.top > obstacle.top)) { //Check for top collision
                            XY.y0v0 = [Math.round(obstacle.top), 0]
                            LEVEL.variables.onBlock = true;
                        }
                    }
                    break;

                case 'none': //Do not check for collisions
                    break;

                default: //Default is top-only collision
                    if (spritePos.top > obstacle.bottom) {
                        if ((spritePos.bottom <= obstacle.top) && (spritePos.bottom >= Number(obstacle.top + XY.y0v0[1] - 2.0)) && (spritePos.top > obstacle.top)) { //Check for top collision
                            XY.y0v0 = [Math.round(obstacle.top), 0]
                            LEVEL.variables.onBlock = true;
                        }
                    }    
                    break;
            }

            
        }
    }

    if (bottomCollisionPosition.length) {
        XY.y0v0 = [Math.min(parseInt(bottomCollisionPosition)-2), 0];
        LEVEL.variables.onBlock = false;
    };
}

window.ANIMATE = window.ANIMATE || {}
ANIMATE.checkCollision = checkCollision
})()

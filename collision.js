;(function() {

//Check for collisions
function checkCollision(spritePos, obstacles) {
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
                                    LEVEL.variables.handlingAnimation = obstacle.id;
                                    INPUT.keys.downKey = false;
                                }

                            } else if ((spritePos.bottom < obstacle.bottom) && (spritePos.top <= Number(obstacle.bottom + XY.y0v0[1] + 2.0)) ) { //Check for bottom collision
                                XY.y0v0 = [obstacle.bottom - parseInt(spritePos.height), 0];
                            } else if ((spritePos.bottom > obstacle.bottom && spritePos.bottom < obstacle.top) || (spritePos.top > obstacle.bottom && spritePos.top < obstacle.top) || (spritePos.bottom < obstacle.bottom && spritePos.top > obstacle.top)) { // check for Left/Right side collision
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
}

window.ANIMATE = window.ANIMATE || {}
ANIMATE.checkCollision = checkCollision
})()

var constants = {
    animateInterval : 4,
    windowWidth : window.innerWidth - 64,
    jumpVelocity : 35,
    accelX : 1.5,
    decelX : 3,
    accelY : 2,
    maxVeloX : 20,
    maxVeloY : 40,
}

let walkSprites = ['url("/sprites/walk1.gif")', 'url("/sprites/walk2.gif")', 'url("/sprites/walk3.gif")', 'url("/sprites/walk2.gif")'];

let x0v0 = [0,0];
let y0v0 = [0,0];
let frame = 0;
let clock = 0;
let onBlock = false;

var keys = {
    rightKey : false,
    leftKey : false,
    upKey : false,
    downKey : false,
    bonusKey : false,
    upKeyReset : 0,
    xKeyReset : true
}

window.onload = function() {
    generateObstacles();

    var sprite = document.getElementById('box');

    requestAnimationFrame(animate);

    function animate(timestamp) {

        let previousPosition = [x0v0[0], y0v0[0]]

        x0v0 = getPosX(x0v0);
        y0v0 = getPosY(y0v0);

        let spritePos = {
            left: x0v0[0],
            right: x0v0[0] + parseInt(sprite.offsetHeight),
            bottom: y0v0[0],
            top: y0v0[0] + parseInt(sprite.offsetHeight)
        }

        //Check for collisions
        for (obstacleKey in obstacles) {
            let obstacle = obstacles[obstacleKey];
            obstacle.bottom = parseInt(obstacle.bottom);
            obstacle.left = parseInt(obstacle.left);
            obstacle.top = parseInt(obstacle.bottom) + parseInt(obstacle.height);
            obstacle.right = parseInt(obstacle.left) + parseInt(obstacle.width);

            if ((spritePos.right > obstacle.left) && (spritePos.left < obstacle.right)) {
                if (obstacleKey == 'floor') {
                    console.log(spritePos.bottom + ' ' + obstacle.top + ' ' + onBlock)
                }
                if (spritePos.top > obstacle.bottom) {
                    if (Math.round(spritePos.bottom) <= Math.round(obstacle.top)) {
                        y0v0 = [Math.round(obstacle.top), 0]
                        onBlock = true;
                    } else if (spritePos.bottom < obstacle.bottom) {
                        y0v0 = [obstacle.bottom - parseInt(sprite.offsetHeight), 0];
                        onBlock = false;
                    } else {
                        onBlock = false;
                    }
                }
            }
        }

        if (keys.leftKey) {
            sprite.style.transform = 'scaleX(-1)'
        } else if (keys.rightKey) {
            sprite.style.transform = 'scaleX(1)'
        }

        if (keys.downKey) {
            sprite.style.backgroundImage = 'url("/sprites/duck.gif")';
        } else if (y0v0[0] > 0 && !onBlock) {
            sprite.style.backgroundImage = 'url("/sprites/jump.gif")';
        } else if ((x0v0[1]>0 && keys.leftKey) || (x0v0[1]<0 && keys.rightKey)) {
            sprite.style.backgroundImage = 'url("/sprites/skid.gif")';
        } else if (x0v0[1] == 0) {
            sprite.style.backgroundImage = 'url("sprites/stand.gif")';
        } else {
            let animateTransition = clock % constants.animateInterval;
            if (animateTransition == 0) {
                sprite.style.backgroundImage = walkSprites[frame%3];
                frame += 1;
            }
        }

        sprite.style.left = x0v0[0] + 'px';
        sprite.style.bottom = y0v0[0] + 'px';

        document.getElementById('left').style.backgroundColor = keys.leftKey?'red':'black';
        document.getElementById('right').style.backgroundColor = keys.rightKey?'red':'black';
        document.getElementById('up').style.backgroundColor = keys.upKey?'red':'black';
        document.getElementById('down').style.backgroundColor = keys.downKey?'red':'black';
        document.getElementById('bonus').style.backgroundColor = keys.bonusKey?'yellow':'black';
        requestAnimationFrame(animate);

        clock += 1;
    }

    function getAccelX(x0v0) {
        let v0 = x0v0[1];
        if (keys.rightKey && (keys.xKeyReset)) {
            ax = (v0 <= constants.maxVeloX) ? constants.accelX : 0;
        } else if (keys.leftKey && (keys.xKeyReset)) {
            ax = (v0 >= -constants.maxVeloX) ? -constants.accelX : 0;
        } else if (v0 > 0 && (keys.xKeyReset)) {
            ax = -constants.decelX;
        } else if (v0 < 0 && (keys.xKeyReset)) {
            ax = constants.decelX;
        } else {
            ax = 0;
        }
        return ax;
    }

    function getVeloX(x0v0) {
        let ax = getAccelX(x0v0);
        let vx = x0v0[1] + ax;
        if (vx * x0v0[1] < 0) {
            vx = 0;
        }
        return vx;
    }

    function getPosX(x0v0) {
        let x0 = x0v0[0];
        let ax = getAccelX(x0v0);
        let vx = getVeloX(x0v0);
        let posX = x0 + vx + ax;

        if (posX <= 0) {
            posX = x0v0[0];
            vx = 0;
        } else if (posX >= constants.windowWidth) {
            posX = x0v0[0];
            vx = 0;
        }

        return [Math.round(posX), vx] // x0v0
    }

    function getAccelY(y0v0) {
        // if (y0v0[0] <= 0) {
        //     y0v0[0] = 0;
        //     ay = 0;
        // } else 
        if (y0v0[1] <= -constants.maxVeloY) {
            ay = 0;
        } else if (onBlock) {
            ay = 0;
        } else {
            ay = -constants.accelY;
        }
        return ay;
    }

    function getVeloY(y0v0) {
        let ay = getAccelY(y0v0);
        let vy = y0v0[1] + ay;
        if (keys.upKey && (keys.upKeyReset < 2)) {
            onBlock = false;
            vy += constants.jumpVelocity / (keys.upKeyReset + 1);
            keys.upKey = false;
            keys.upKeyReset++;
        }
        return vy;
    }

    function getPosY(y0v0) {
        let y0 = y0v0[0];
        let vy = getVeloY(y0v0);
        let ay = getAccelY(y0v0);
        let posY = y0 + vy + ay;
        if (posY <= 0 || onBlock) {
            // posY = 0;
            // vy = 0;
            keys.upKeyReset = 0;
            keys.xKeyReset = true;
        } else {
            keys.xKeyReset = false;
        }
        return([posY, vy]) // y0v0
    }

}

function keyPress(event) {
    if ((event.key == 'a')||(event.key == 'A')||(event.key == 'ArrowLeft')) {
        keys.leftKey = true;
    } else if ((event.key == 'd')||(event.key == 'D')||(event.key == 'ArrowRight')) {
        keys.rightKey = true;
    }

    if ((event.key == 'w')||(event.key == 'W')||(event.key == 'ArrowUp')||(event.key == ' ')) {
        keys.upKey = true;
    } else if ((event.key == 's')||(event.key == 'S')||(event.key == 'ArrowDown')) {
        keys.downKey = true;
    }

    if ((event.key == 'f')||(event.key == 'F')||(event.key == 'Shift')) {
        keys.bonusKey = true;
    }
}

function keyRelease(event) {
    if ((event.key == 'a')||(event.key == 'A')||(event.key == 'ArrowLeft')) {
        keys.leftKey = false;
    } else if ((event.key == 'd')||(event.key == 'D')||(event.key == 'ArrowRight')) {
        keys.rightKey = false;
    }

    if ((event.key == 'w')||(event.key == 'W')||(event.key == 'ArrowUp')||(event.key == ' ')) {
        keys.upKey = false;
    } else if ((event.key == 's')||(event.key == 'S')||(event.key == 'ArrowDown')) {
        keys.downKey = false;
    }

    if ((event.key == 'f')||(event.key == 'F')||(event.key == 'Shift')) {
        keys.bonusKey = false;
    }
}
    
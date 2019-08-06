function getAccelX(x0v0) {
    let v0 = x0v0[1];
    
    if (keys.downKey) {
        ax = (v0 >= 0) ? -0.5*constants.accelX : 0.5*constants.accelX ;
    } else if (keys.rightKey && (keys.xKeyReset)) {
        ax = (v0 <= constants.maxVeloX) ? constants.accelX : 0;
    } else if (keys.leftKey && (keys.xKeyReset)) {
        ax = (v0 >= -constants.maxVeloX) ? -constants.accelX : 0;
    } else if (v0 > 0 && (keys.xKeyReset)) {
        ax = -constants.decelX;
    } else if (v0 < 0 && (keys.xKeyReset)) {
        ax = constants.decelX;
    } else if (keys.rightKey) {
        ax = (v0 <= constants.maxVeloX) ? 0.3*constants.accelX : 0;
    } else if (keys.leftKey) {
        ax = (v0 >= -constants.maxVeloX) ? -0.3*constants.accelX : 0;
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
        vy += (keys.upKeyReset == 0) ? constants.jumpVelocity : constants.jumpVelocity / 3;
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
        keys.upKeyReset = 0;
        keys.xKeyReset = true;
    } else {
        keys.xKeyReset = false;
    }
    return([posY, vy]) // y0v0
}
;(function() {

    function getAccelX(x0v0) {
        let v0 = x0v0[1];
        
        if (window.INPUT.keys.downKey) {
            ax = (v0 >= 0) ? -0.5*window.LEVEL.constants.accelX : 0.5*window.LEVEL.constants.accelX ;
        } else if (window.INPUT.keys.rightKey && (window.INPUT.keys.xKeyReset)) {
            ax = (v0 <= window.LEVEL.constants.maxVeloX) ? window.LEVEL.constants.accelX : 0;
        } else if (window.INPUT.keys.leftKey && (window.INPUT.keys.xKeyReset)) {
            ax = (v0 >= -window.LEVEL.constants.maxVeloX) ? -window.LEVEL.constants.accelX : 0;
        } else if (v0 > 0 && (window.INPUT.keys.xKeyReset)) {
            ax = -window.LEVEL.constants.decelX;
        } else if (v0 < 0 && (window.INPUT.keys.xKeyReset)) {
            ax = window.LEVEL.constants.decelX;
        } else if (window.INPUT.keys.rightKey) {
            ax = (v0 <= window.LEVEL.constants.maxVeloX) ? 0.3*window.LEVEL.constants.accelX : 0;
        } else if (window.INPUT.keys.leftKey) {
            ax = (v0 >= -window.LEVEL.constants.maxVeloX) ? -0.3*window.LEVEL.constants.accelX : 0;
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
        let levelWidth = window.LEVEL.constants.levelWidth;
        let x0 = x0v0[0];
        let ax = getAccelX(x0v0);
        let vx = getVeloX(x0v0);
        let posX = x0 + vx + ax;

        if (posX <= 0) {
            posX = x0v0[0];
            vx = 0;
        } else if (posX >= levelWidth.width-64) {
            posX = x0v0[0];
            vx = 0;
        }

        return [Math.round(posX), vx] // x0v0
    }

    function getAccelY(y0v0) {
        if (y0v0[1] <= -window.LEVEL.constants.maxVeloY) {
            ay = 0;
        } else if (LEVEL.variables.onBlock) {
            ay = 0;
        } else {
            ay = -window.LEVEL.constants.accelY;
        }
        return ay;
    }

    function getVeloY(y0v0) {
        let ay = getAccelY(y0v0);
        let vy = y0v0[1] + ay;
        if (window.INPUT.keys.upKey && (window.INPUT.keys.upKeyReset < 2)) {
            LEVEL.variables.onBlock = false;
            vy += (window.INPUT.keys.upKeyReset == 0) ? window.LEVEL.constants.jumpVelocity : window.LEVEL.constants.jumpVelocity / 3;
            window.INPUT.keys.upKey = false;
            window.INPUT.keys.upKeyReset++;
        }
        return vy;
    }

    function getPosY(y0v0) {
        let y0 = y0v0[0];
        let vy = getVeloY(y0v0);
        let ay = getAccelY(y0v0);
        let posY = y0 + vy + ay;
        if (posY <= 0 || LEVEL.variables.onBlock) {
            window.INPUT.keys.upKeyReset = 0;
            window.INPUT.keys.xKeyReset = true;
        } else {
            window.INPUT.keys.xKeyReset = false;
        }
        return([posY, vy]) // y0v0
    }

    // ********  EXPORTS  ************ 
    window.XY = window.XY || {}
    XY.x0v0 = window.LEVEL.constants.x0v0, //Default values
    XY.y0v0 = window.LEVEL.constants.y0v0
    XY.getPosY = getPosY;
    XY.getPosX = getPosX;
    XY.updatePosX = function() {
        XY.x0v0 = XY.getPosX(XY.x0v0);
    }
    XY.updatePosY = function() {
        XY.y0v0 = XY.getPosY(XY.y0v0);
    }

})()
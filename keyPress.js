;(function () {

    function helper() {

    }

    function keyPress(event) {
        if (window.INPUT.keys.allowInput) {
            if ((event.key === 'a')||(event.key === 'A')||(event.key === 'ArrowLeft')) {
                window.INPUT.keys.leftKey = true;
            } else if ((event.key === 'd')||(event.key === 'D')||(event.key === 'ArrowRight')) {
                window.INPUT.keys.rightKey = true;
            }

            if ((event.key === 'w')||(event.key === 'W')||(event.key === 'ArrowUp')||(event.key === ' ')) {
                window.INPUT.keys.upKey = true;
            } else if ((event.key === 's')||(event.key === 'S')||(event.key === 'ArrowDown')) {
                window.INPUT.keys.downKey = true;
            }

            if ((event.key === 'f')||(event.key === 'F')||(event.key === 'Shift')) {
                window.INPUT.keys.bonusKey = true;
            }
        }
    }

    function keyRelease(event) {
        if ((event.key === 'a')||(event.key === 'A')||(event.key === 'ArrowLeft')) {
            window.INPUT.keys.leftKey = false;
        } else if ((event.key === 'd')||(event.key === 'D')||(event.key === 'ArrowRight')) {
            window.INPUT.keys.rightKey = false;
        }

        if ((event.key === 'w')||(event.key === 'W')||(event.key === 'ArrowUp')||(event.key === ' ')) {
            window.INPUT.keys.upKey = false;
        } else if ((event.key === 's')||(event.key === 'S')||(event.key === 'ArrowDown')) {
            window.INPUT.keys.downKey = false;
        }

        if ((event.key === 'f')||(event.key === 'F')||(event.key === 'Shift')) {
            window.INPUT.keys.bonusKey = false;
        }
    }

    window.INPUT = window.INPUT || {};
    INPUT.keyEvents = {};
    INPUT.keyEvents.keyPress = keyPress;
    INPUT.keyEvents.keyRelease = keyRelease;


})()

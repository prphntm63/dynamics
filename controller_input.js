;(function () {

    function resetKeys() {
        window.INPUT.keys = {
            ...window.INPUT.keys,
            leftKey: false,
            rightKey: false,
            upKey: false,
            downKey: false,
            bonusKey: false
        }
    }

    function keyPress(event) {
        // Pressing escape key should close the message box
        if (event.key === 'Escape' && document.getElementById('messageOverlay').classList.contains('active')) {
            document.getElementById('messageOverlay').classList.remove('active')
            document.getElementById('messageBox').classList.remove('active')
            document.getElementById('formSubmitButton').style.visibility = 'hidden'
            window.INPUT.keys.allowInput=true
        }

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
    INPUT.keyEvents.resetKeys = resetKeys

})()

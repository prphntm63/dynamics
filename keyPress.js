;(function () {

    function helper() {

    }

    function keyPress(event) {
        if (window.INPUT.keys.allowInput) {
            if ((event.key === 'a')||(event.key === 'A')||(event.key === 'ArrowLeft')) {
                window.INPUT.keys.leftKey = true;
                store.dispatch(updateKeypressStatus('leftKey', true))
            } else if ((event.key === 'd')||(event.key === 'D')||(event.key === 'ArrowRight')) {
                window.INPUT.keys.rightKey = true;
                store.dispatch(updateKeypressStatus('rightKey', true))
            }

            if ((event.key === 'w')||(event.key === 'W')||(event.key === 'ArrowUp')||(event.key === ' ')) {
                window.INPUT.keys.upKey = true;
                store.dispatch(updateKeypressStatus('upKey', true))
            } else if ((event.key === 's')||(event.key === 'S')||(event.key === 'ArrowDown')) {
                window.INPUT.keys.downKey = true;
                store.dispatch(updateKeypressStatus('downKey', true))
            }

            if ((event.key === 'f')||(event.key === 'F')||(event.key === 'Shift')) {
                window.INPUT.keys.bonusKey = true;
                store.dispatch(updateKeypressStatus('bonusKey', true))
            }
        }
    }

    function keyRelease(event) {
        if ((event.key === 'a')||(event.key === 'A')||(event.key === 'ArrowLeft')) {
            window.INPUT.keys.leftKey = false;
            store.dispatch(updateKeypressStatus('leftKey', false))
        } else if ((event.key === 'd')||(event.key === 'D')||(event.key === 'ArrowRight')) {
            window.INPUT.keys.rightKey = false;
            store.dispatch(updateKeypressStatus('rightKey', false))
        }

        if ((event.key === 'w')||(event.key === 'W')||(event.key === 'ArrowUp')||(event.key === ' ')) {
            window.INPUT.keys.upKey = false;
            store.dispatch(updateKeypressStatus('upKey', false))
        } else if ((event.key === 's')||(event.key === 'S')||(event.key === 'ArrowDown')) {
            window.INPUT.keys.downKey = false;
            store.dispatch(updateKeypressStatus('downKey', false))
        }

        if ((event.key === 'f')||(event.key === 'F')||(event.key === 'Shift')) {
            window.INPUT.keys.bonusKey = false;
            store.dispatch(updateKeypressStatus('bonusKey', false))
        }
    }

    window.INPUT = window.INPUT || {};
    INPUT.keyEvents = {};
    INPUT.keyEvents.keyPress = keyPress;
    INPUT.keyEvents.keyRelease = keyRelease;


})()

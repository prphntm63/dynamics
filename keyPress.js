function keyPress(event) {
    if (keys.allowInput) {
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
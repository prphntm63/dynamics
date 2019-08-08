let currentPipe;
let outputPipe;
let counter = 0;
let animationCase = 0;

function handlePipe() {

    let pipes = obstacles.filter(obstacle => {
        return (obstacle.type == 'pipe') ? true : false;
    })

    currentPipe = pipes.filter(pipe => {
        return (pipe.id === handlingAnimation) ? true : false;
    })

    outputPipe = pipes.filter(pipe => {
        return (pipe.id === currentPipe[0].output) ? true : false;
    })

    keys.allowInput = false;
    keys.downKey = false;

    onBlock = true;

    let pipeCenter = parseInt(currentPipe[0].left) + parseInt(currentPipe[0].width)/2 - 32;

    if (animationCase == 0) {
        if (parseInt(sprite.style.left) > pipeCenter + 5) {
            x0v0 = [x0v0[0]-3,0];
            animateSprite(keys, sprite);

        } else if (parseInt(sprite.style.left) < pipeCenter - 5) {
            x0v0 = [x0v0[0]+3,0];
            animateSprite(keys, sprite);

        } else {
            if (counter < 125) {
                y0v0 = [(parseInt(currentPipe[0].height) - counter), 0];
                animateSprite(keys, sprite)
                counter+=2;
            } else {
                animationCase = 1;
            }
        }
    } else if (animationCase == 1) {
        x0v0[0] = parseInt(outputPipe[0].left) + parseInt(outputPipe[0].width)/2 - 32;
        y0v0 = [parseInt(outputPipe[0].height) - 125, 0];
        animateSprite(keys, sprite);
        counter = 125;
        animationCase = 2;
    } else if (animationCase == 2) {
        if (counter > 0) {
            y0v0 = [(parseInt(outputPipe[0].height) - counter), 0];
            animateSprite(keys, sprite)
            counter-=2;
        } else {
            y0v0 = [parseInt(outputPipe[0].height)+1, 0];
            animateSprite(keys, sprite);
            animationCase = 0;
            keys.allowInput = true;
            handlingAnimation = false;
            onBlock = true;
        }
    }

}
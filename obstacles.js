obstacles = [

    {
        type: 'platform',
        collision: 'top',
        left : '550',
        bottom: '0',
        height: '350',
        width: '900'
    },

    {
        type: 'platform2',
        collision: 'top',
        left : '250',
        bottom: '0',
        height: '150',
        width: '400'
    },

    {
        type: 'platform2',
        collision: 'top',
        left : '1250',
        bottom: '0',
        height: '250',
        width: '500'
    },

    {
        type: 'brick',
        collision: 'all',
        left : '700',
        bottom: '550',
        height: '64',
        width: '500'
    },

    {
        type: 'brick',
        collision: 'all',
        left : '300',
        bottom: '650',
        height: '64',
        width: '100'
    },

    {
        type: 'brick',
        collision: 'all',
        left : '1300',
        bottom: '750',
        height: '64',
        width: '64'
    },

    {
        type: 'brick',
        collision: 'all',
        left : '1450',
        bottom: '900',
        height: '64',
        width: '64'
    },

    {
        type: 'brick',
        collision: 'all',
        left : '1600',
        bottom: '750',
        height: '64',
        width: '64'
    },

    {
        type: 'brick',
        collision: 'all',
        left : '1750',
        bottom: '600',
        height: '64',
        width: '64'
    },

    {
        type: 'floor',
        left : '0',
        bottom: '-40',
        height: '50',
        width: '10000'
    },

    {
        type: 'pipe',
        input: 1,
        output: 2,
        collision: 'all',
        left: '740',
        bottom: '638',
        height: '150',
        width: '140'
    },

    {
        type: 'pipe',
        input: 2,
        output: 1,
        collision: 'all',
        left: '3040',
        bottom: '0',
        height: '350',
        width: '140'
    }
]

function generateObstacles() {
    let levelContainer = document.getElementById('level-container');
    obstacleList = levelContainer.querySelectorAll('.obstacle')

    obstacleList.forEach(obstacle => { //Delete all obstacles to avoid duplicates
        obstacle.parentElement.removeChild(obstacle);
    })

    let idCounter = 0;
    let newBlockObstacles = []

    let filteredObstacles = obstacles.filter(obstacle => {
        if (obstacle.type === 'brick') {
            obstacle.left = Math.round(obstacle.left/64)*64 +1
            obstacle.bottom = Math.round(obstacle.bottom/64)*64 +1
            obstacle.width = Math.ceil(obstacle.width/64)*64 - 2
            obstacle.height = Math.ceil(obstacle.height/64)*64 -2

            let widthNumberBlocks = Math.ceil(obstacle.width/64)
            let heightNumberBlocks = Math.ceil(obstacle.height/64)

            if (widthNumberBlocks > 1 || heightNumberBlocks > 1) {
                for (let widthIdx = 0; widthIdx < widthNumberBlocks; widthIdx++) {
                    for (let heightIdx = 0; heightIdx < heightNumberBlocks; heightIdx++) {
                        newBlockObstacles.push(
                            {
                                type: 'brick',
                                collision: 'all',
                                left : parseInt(obstacle.left) + parseInt(widthIdx*64),
                                bottom: parseInt(obstacle.bottom) + parseInt(heightIdx*64),
                                height: '64',
                                width: '64'
                            }
                        )
                    }
                }
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }

    })

    obstacles = filteredObstacles.concat(newBlockObstacles)

    obstacles.forEach(obstacle => {

        if ((obstacle.type != 'pipe') && (obstacle.type != 'floor')) {
            // console.log(obstacle.type)
            obstacle.left = Math.round(obstacle.left/64)*64 +1
            obstacle.bottom = Math.round(obstacle.bottom/64)*64 +1
            obstacle.width = Math.ceil(obstacle.width/64)*64 - 2
            obstacle.height = Math.ceil(obstacle.height/64)*64 -2
        }

        let newObstacle = document.createElement('div');
        newObstacle.classList.add(obstacle.type);
        if (obstacle.used) newObstacle.classList.add('used')
        newObstacle.classList.add('obstacle');
        obstacle.id = 'obstacle' + idCounter;
        newObstacle.id = obstacle.id;
        newObstacle.style.position = 'absolute';
        newObstacle.style.left = obstacle.left + 'px';
        newObstacle.style.bottom = obstacle.bottom + 'px';
        newObstacle.style.width = obstacle.width + 'px';
        newObstacle.style.height = obstacle.height + 'px';

        if (obstacle.type === 'pipe') {
            let pipeDivElements
            if (obstacle.color === 'blue') {
                pipeDivElements = [
                    {width:3, color:'66b'},
                    {width:2, color:'99c'},
                    {width:2, color:'bbe'},
                    {width:3, color:'fff'},
                    {width:5, color:'bbe'},
                    {width:4, color:'99c'},
                    {width:1, color:'66b'},
                    {width:1, color:'99c'},
                    {width:7, color:'66b'},
                ]
            } else if (obstacle.color === 'gray') {
                pipeDivElements = [
                    {width:3, color:'666'},
                    {width:2, color:'999'},
                    {width:2, color:'bbb'},
                    {width:3, color:'fff'},
                    {width:5, color:'bbb'},
                    {width:4, color:'999'},
                    {width:1, color:'666'},
                    {width:1, color:'999'},
                    {width:7, color:'666'},
                ]
            } else {
                pipeDivElements = [
                    {width:3, color:'060'},
                    {width:2, color:'090'},
                    {width:2, color:'0b0'},
                    {width:3, color:'fff'},
                    {width:5, color:'0b0'},
                    {width:4, color:'090'},
                    {width:1, color:'060'},
                    {width:1, color:'090'},
                    {width:7, color:'060'},
                ]
            }
            

            let pipeTop = document.createElement('div');
            pipeTop.classList.add('pipe-top');
            generatePipeDivs(pipeDivElements, pipeTop);
            if (obstacle.text) {
                let pipeTopText = document.createElement('div')
                pipeTopText.innerText = obstacle.text;
                pipeTopText.classList.add('pipe-top-text')
                pipeTop.appendChild(pipeTopText)
            }
            newObstacle.appendChild(pipeTop)

            let pipeBottom = document.createElement('div');
            pipeBottom.classList.add('pipe-bottom');
            generatePipeDivs(pipeDivElements, pipeBottom);
            if (obstacle.warp) {
                newObstacle.addEventListener('click', function() {
                    LEVEL.variables.animationCase = 1;
                    LEVEL.variables.handlingAnimation = obstacle.input;
                    INPUT.keys.downKey = false;
                })
            }
            newObstacle.appendChild(pipeBottom)
            
            // console.log(obstacle.input + '=> ' + obstacle.output + ',' + obstacle.warp)
        } 

        levelContainer.append(newObstacle);
        idCounter++;
    })
    // console.log(obstacles)
}

function generatePipeDivs(widthColorArray, parent) {
    widthColorArray.forEach(widthColor => {
        let subDiv = document.createElement('div');
        subDiv.style.height = '100%';
        subDiv.style.backgroundColor = `#${widthColor.color}`;
        subDiv.style.flexGrow = widthColor.width;
        parent.appendChild(subDiv);
    })

}

function generateNavPipes(obstacleList) {
    for (let i=0; i<LEVEL.constants.screens; i++) {
        for (let j=0; j<LEVEL.constants.screens; j++) {
            let navLinks = ['Home', 'About', 'Brewing', 'Work', 'Blog']
            let pipesWidth = 0.7*parseInt(LEVEL.constants.windowWidth)
            let pipesOffset = pipesWidth/(LEVEL.constants.screens)
            
            let newPipe = {
                text: `${navLinks[j]}`,
                type: 'pipe',
                warp: (j+1),
                input: 10*(i+1) + (j+1),
                output: 11*(j+1),
                collision: 'all',
                left: `${i*LEVEL.constants.windowWidth + .3*pipesWidth + j*pipesOffset - 70}`,
                bottom: '0',
                height: '100',
                width: '140',
                color: (i === j) ? 'blue' : 'gray'
            }

            obstacleList.push(newPipe)
        }
    }
}

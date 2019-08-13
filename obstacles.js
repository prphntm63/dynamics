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
        bottom: '0',
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

    obstacles.forEach(obstacle => {
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

        if (obstacle.type == 'pipe') {
            let pipeDivElements = [
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

            let pipeTop = document.createElement('div');
            pipeTop.classList.add('pipe-top');
            generatePipeDivs(pipeDivElements, pipeTop);
            newObstacle.appendChild(pipeTop)

            let pipeBottom = document.createElement('div');
            pipeBottom.classList.add('pipe-bottom');
            generatePipeDivs(pipeDivElements, pipeBottom);
            newObstacle.appendChild(pipeBottom)
        } 

        levelContainer.append(newObstacle);
        idCounter++;
    })
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
obstacles = {
    block : {
        type: 'platform',
        left : '450',
        bottom: '200',
        height: '50',
        width: '500'
    },

    floor : {
        type: 'floor',
        left : '0',
        bottom: '-15',
        height: '20',
        width: '2000'
    }
}

function generateObstacles() {
    for (obstacle in obstacles) {
        console.log(obstacle)
        let newObstacle = document.createElement('div');
        newObstacle.classList.add(obstacles[obstacle].type);
        newObstacle.style.position = 'fixed';
        newObstacle.style.left = obstacles[obstacle].left + 'px';
        newObstacle.style.bottom = obstacles[obstacle].bottom + 'px';
        newObstacle.style.width = obstacles[obstacle].width + 'px';
        newObstacle.style.height = obstacles[obstacle].height + 'px';
        document.body.append(newObstacle);
    }
}
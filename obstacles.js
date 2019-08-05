obstacles = [
    {
        type: 'platform',
        left : '450',
        bottom: '200',
        height: '150',
        width: '500'
    },

    {
        type: 'platform',
        left : '700',
        bottom: '550',
        height: '150',
        width: '500'
    },

    {
        type: 'platform',
        left : '300',
        bottom: '650',
        height: '80',
        width: '80'
    },

    {
        type: 'floor',
        left : '0',
        bottom: '-40',
        height: '50',
        width: '2000'
    }
]

function generateObstacles() {

    obstacles.forEach(obstacle => {
        let newObstacle = document.createElement('div');
        newObstacle.classList.add(obstacle.type);
        newObstacle.style.position = 'fixed';
        newObstacle.style.left = obstacle.left + 'px';
        newObstacle.style.bottom = obstacle.bottom + 'px';
        newObstacle.style.width = obstacle.width + 'px';
        newObstacle.style.height = obstacle.height + 'px';
        document.body.append(newObstacle);
    })
}
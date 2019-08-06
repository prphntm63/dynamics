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
        type: 'block',
        collision: 'all',
        left : '700',
        bottom: '550',
        height: '50',
        width: '500'
    },

    {
        type: 'block',
        collision: 'all',
        left : '300',
        bottom: '650',
        height: '50',
        width: '100'
    },

    {
        type: 'block',
        collision: 'all',
        left : '1300',
        bottom: '750',
        height: '50',
        width: '50'
    },

    {
        type: 'block',
        collision: 'all',
        left : '1450',
        bottom: '900',
        height: '50',
        width: '50'
    },

    {
        type: 'block',
        collision: 'all',
        left : '1600',
        bottom: '750',
        height: '50',
        width: '50'
    },

    {
        type: 'block',
        collision: 'all',
        left : '1750',
        bottom: '600',
        height: '50',
        width: '50'
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
        newObstacle.style.position = 'absolute';
        newObstacle.style.left = obstacle.left + 'px';
        newObstacle.style.bottom = obstacle.bottom + 'px';
        newObstacle.style.width = obstacle.width + 'px';
        newObstacle.style.height = obstacle.height + 'px';
        document.getElementById('level-container').append(newObstacle);
    })
}
function scroll(spritePos) {
    let levelContainer = document.getElementById('level-container');
    let backgroundContainer = document.getElementById('background-container');
    let mapDiv = levelContainer.getBoundingClientRect();
    let leftScroll = -mapDiv.left + 0.2*parseInt(screen.width);
    let rightScroll = -mapDiv.left + 0.8*parseInt(screen.width);

    if (spritePos.left < leftScroll) {
        if ( !(-mapDiv.left < 0) && (x0v0[1] < 0)) {
            levelContainer.style.left = parseInt(mapDiv.left - x0v0[1]) + 'px';
            backgroundContainer.style.left = 0.5*parseInt(mapDiv.left - x0v0[1]) + 'px';
        }
    } else if (spritePos.right > rightScroll) {
        if ( !(screen.width - mapDiv.left > mapDiv.width) && (x0v0[1] > 0)) {
            levelContainer.style.left = parseInt(mapDiv.left - x0v0[1]) + 'px';
            backgroundContainer.style.left = 0.5*parseInt(mapDiv.left - x0v0[1]) + 'px';
        }
    }

}
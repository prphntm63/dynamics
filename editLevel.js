function editLevel(evt) {
    evt.stopPropagation()

    if (LEVEL.variables.handlingAnimation) {return}; //Exit function if handling external animation

    LEVEL.variables.editingLevel = !LEVEL.variables.editingLevel; //Toggle level editing state

    if (LEVEL.variables.editingLevel) {    //Check to see if we are editing level
        SPRITE.dom.classList.toggle('sprite-hidden', LEVEL.variables.editingLevel) ;
        document.body.classList.toggle('body-edit', LEVEL.variables.editingLevel)

        window.cancelAnimationFrame(LEVEL.constants.animationFrame); //Pause animation when editing level
        
        console.log('editing!')
    } else if (!LEVEL.variables.editingLevel) {

        SPRITE.dom.classList.toggle('sprite-hidden', LEVEL.variables.editingLevel);
        document.body.classList.toggle('body-edit', LEVEL.variables.editingLevel)

        LEVEL.constants.animationFrame = window.requestAnimationFrame(LEVEL.animate); //Resume animation
        
        console.log('done editing!')
    }

    
}
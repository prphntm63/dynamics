/*
 * action types
 */

// export const UPDATE_X_POS = 'UPDATE_X_POS'
// export const UPDATE_Y_POS = 'UPDATE_Y_POS'
// export const SET_ONBLOCK = 'SET_ONBLOCK'
 const SET_ANIMATION = 'SET_ANIMATION'
// export const CHECK_COLLISION = 'CHECK_COLLISION'
// export const UPDATE_SPRITE_POS = 'UPDATE_SPRITE_POS'
// export const UPDATE_BLOCK_STATUS = 'UPDATE_BLOCK_STATUS'
// export const UPDATE_SCROLL_STATUS = 'UPDATE_SCROLL_STATUS'
// export const UPDATE_CLOCK = 'UPDATE_CLOCK'
const CREATE_OBSTACLE = 'CREATE_OBSTACLE'
const DELETE_OBSTACLE = 'DELETE_OBSTACLE'
const MARK_OBSTACLE_USED = 'MARK_OBSTACLE_USED'

const UPDATE_SPRITE_POSITION = 'UPDATE_SPRITE_POSITION'
const CHECK_SPRITE_COLLISION = 'CHECK_SPRITE_COLLISION'

const UPDATE_KEYPRESS_STATUS = 'UPDATE_KEYPRESS_STATUS'
const UPDATE_KEY_ALLOW_INPUT = 'UPDATE_KEY_ALLOW_INPUT'
const UPDATE_UP_KEY_RESET = 'UPDATE_UP_KEY_RESET'
const UPDATE_X_KEY_RESET = 'UPDATE_X_KEY_RESET'

const UPDATE_LEVEL = 'UPDATE_LEVEL'

/*
 * other constants
 */


/*
 * action creators
 */

// ****************************************
// *****     LEVEL STATE ACTIONS     ******
// ****************************************

function createObstacle(obstacle) {
    return {type: CREATE_OBSTACLE, obstacle}
}

function deleteObstacle(obstacleId) {
    return {type: DELETE_OBSTACLE, obstacleId}
}

function markObstacleUsed(obstacleId) {
    return {type: MARK_OBSTACLE_USED, obstacleId}
}

// ****************************************
// *****     SPRITE STATE ACTIONS     *****
// ****************************************

function updateSpritePosition(frame) {
    return {type: UPDATE_SPRITE_POSITION, frame}
}

function checkSpriteCollision(frame) {
    return {type: CHECK_SPRITE_COLLISION, frame}
}

// **************************************
// *****     USER INPUT ACTIONS     *****
// **************************************

function updateKeypressStatus(key, keyState) {
    let payload = {
        "key" : key,
        "keyState" : keyState
    }
    return {type: UPDATE_KEYPRESS_STATUS, payload}
}

function updateKeyAllowInput(payload) {
    return {type: UPDATE_KEY_ALLOW_INPUT, payload}
}

function updateUpKeyReset(payload) {
    return {type: UPDATE_UP_KEY_RESET, payload}
}

function updateXKeyReset(payload) {
    return {type: UPDATE_X_KEY_RESET, payload}
}

// ***** LEVEL INPUT ACTIONS *****

function updateLevel(payload) {
    return {type: UPDATE_LEVEL, payload}
}
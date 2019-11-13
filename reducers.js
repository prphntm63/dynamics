// import { combineReducers } from 'redux'
// import {
//   SET_ANIMATION,
//   UPDATE_KEYPRESS_STATUS,
//   UPDATE_KEY_ALLOW_INPUT,
//   UPDATE_UP_KEY_RESET,
//   UPDATE_X_KEY_RESET,
//   UPDATE_LEVEL
// } from './actions'

const {combineReducers} = Redux;

const defaultKeyState = {
    "input" : {
        "keys" : {
            "rightKey" : false,
            "leftKey" : false,
            "upKey" : false,
            "downKey" : false,
            "bonusKey" : false,
        }
    }
}

function keypressStatus(state = defaultKeyState, action) {
    if (action.type != UPDATE_KEYPRESS_STATUS) return state

    let newState = {...state}
    newState.input = newState.input || {}
    newState.input.keys = newState.input.keys || {}

    switch (action.payload.key) {
        case 'upKey':
            newState.input.keys.upKey = action.payload.keyState
            return newState
        case 'downKey':
            newState.input.keys.downKey = action.payload.keyState
            return newState
        case 'leftKey':
            newState.input.keys.leftKey = action.payload.keyState
            return newState
        case 'rightKey':
            newState.input.keys.rightKey = action.payload.keyState
            return newState
        case 'bonusKey':
            newState.input.keys.bonusKey = action.payload.keyState
            return newState
        default:
            return newState
    }
}

const defaultKeyCounterState = {
    "input" : {
        "var" : {
            "allowInput": true,
            "upKeyReset" : 0,
            "xKeyReset" : true
        }
    }
}

function keypressCounters(state = defaultKeyCounterState, action) {
    let newState = {...state}
    newState.input = newState.input || {}
    newState.input.var = newState.input.var || {}

    switch (action.type) {
        case 'UPDATE_KEY_ALLOW_INPUT':
            newState.input.var.allowInput = action.payload
            return newState
        case 'UPDATE_UP_KEY_RESET':
            newState.input.var.allowInput = action.payload
            return newState
        case 'UPDATE_X_KEY_RESET':
            newState.input.var.allowInput = action.payload
            return newState
        default:
            return newState
    }
}

const reduxState = combineReducers({
  keypressStatus,
  keypressCounters
})

// export default reduxState
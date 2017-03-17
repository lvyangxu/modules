import {combineReducers} from 'redux';
import {TOGGLE_PANEL, HIDE_PANEL} from '../actions/action';

let panelToggle = (state = {isPanelShow: true}, action)=> {
    let newState;
    switch (action.type) {
        case TOGGLE_PANEL:
            newState = {isPanelShow: !state.isPanelShow};
            break;
        case HIDE_PANEL:
            newState = {isPanelShow: false};
            break;
        default:
            newState = Object.assign({}, state);
            break;
    }
    return newState;
};

module.exports = combineReducers({panelToggle});
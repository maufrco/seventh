import * as actionsTypes from '../../app/actions/actionsTypes';

export function host(state = null, action) {
    console.log("reducer", action.type)
    switch (action.type) {
        case actionsTypes.GET_MONITOR:
            return action.host;    
        default:
            return state;
    }
}
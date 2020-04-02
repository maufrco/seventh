import * as actionsTypes from '../../app/actions/actionsTypes';

export function newHost(state = null, action) {
    switch (action.type) {
        case actionsTypes.GET_MONITOR:
            return action.newHost;    
        default:
            return state;
    }
}
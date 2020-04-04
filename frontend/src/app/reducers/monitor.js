import * as actionsTypes from '../../app/actions/actionsTypes';

export function host(state = null, action) {
    switch (action.type) {
        case actionsTypes.GET_MONITOR:
            return action.host;    
        default:
            return state;
    }
}
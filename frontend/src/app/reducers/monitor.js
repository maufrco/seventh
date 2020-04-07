import { List } from 'immutable';
import * as actionsTypes from '../../app/actions/actionsTypes';

const INITIAL_STATE = {
    hosts: new List(),
    monitor:{}
}

const reducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionsTypes.GET_MONITOR:
            return { ...state, monitor: action.monitor };    
        case actionsTypes.REFRESH_HOSTS:
            return { ...state, hosts: new List(action.hosts)};
        case actionsTypes.GET_HOSTS:
            return { ...state, hosts: new List(action.hosts)};
        case actionsTypes.DELETE_HOST:
            return { ...state, hosts: new List(state.hosts.filter( (item) => item['id'] !==  action.hosts['id']))};     
        case actionsTypes.ADD_HOST:
            return { ...state, hosts: new List(state.hosts.push(action.hosts))};
        
            
        default:
            return state;
    }
    console.log(state)
}
export {reducers}

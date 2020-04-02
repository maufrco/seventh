import { List } from 'immutable';
import * as actionsTypes from '../../app/actions/actionsTypes';

export function hosts(state = new List(), action) {
    switch (action.type) {
        case actionsTypes.GET_HOSTS:
            return new List(action.hosts);
        case actionsTypes.GET_HOST:
            return new List(action.host);
        case actionsTypes.DELETE_HOST:
            return new List(action.host);
        case actionsTypes.ADD_HOST:
            return new List(action.host);
        default:
            return state;
    }
}
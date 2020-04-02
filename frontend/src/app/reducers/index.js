import { combineReducers } from 'redux';
import { hosts } from './hosts';
import { newHost } from './monitor';

const rootReducer = combineReducers({ hosts,  newHost });

export default rootReducer;
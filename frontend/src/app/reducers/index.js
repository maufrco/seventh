import { combineReducers } from 'redux';
import { hosts } from './hosts';
import { host } from './monitor';

const rootReducer = combineReducers({ hosts,  host });

export default rootReducer;
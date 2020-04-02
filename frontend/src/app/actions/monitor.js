import * as SeventhApi from '../../api/SeventhApi';
import * as actionsTypes from './actionsTypes';

export function getMonitor(newHost) {
    console.log("call getMonitor", newHost)
    return dispatch => {
            SeventhApi.getMonitor(newHost)
            .then(metric => {
                console.log(metric)
                    dispatch({ type: actionsTypes.GET_MONITOR, newHost: metric.data })
                    return metric.data;
                }
            ).catch(error => {
                console.log(error)
            });
    }
}

import * as SeventhApi from '../../api/SeventhApi';
import * as actionsTypes from './actionsTypes';

export function getMonitor(host) {
    console.log("call getMonitor", host)
    return dispatch => {
            SeventhApi.getMonitor(host)
            .then(metric => {
                console.log(metric)
                    dispatch({ type: actionsTypes.GET_MONITOR, host: metric.data })
                    return metric.data;
                }
            ).catch(error => {
                console.log(error)
            });
    }
}

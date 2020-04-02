import * as SeventhApi from '../../api/SeventhApi';
import * as actionsTypes from './actionsTypes';

export function getHosts() {
    return dispatch => {
        SeventhApi.getHosts()
            .then(hosts => {
                    dispatch({ type: actionsTypes.GET_HOSTS, hosts: hosts.data })
                    return hosts.data;
                }
            ).catch(error => {
                console.log(error)
            });
    }
}
export function addHost(host) {
    return dispatch => {
        SeventhApi.postHost(host)
            .then(metric =>{
                console.log('action add')
                console.log(metric)
                dispatch({ type: actionsTypes.ADD_HOST, hosts: metric.data })
            }  
            );
    };
}
export function setHost(host) {
    return dispatch => {
        SeventhApi.getMonitor(host)
            .then(hosts => {
                    dispatch({ type: actionsTypes.SET_HOST, hosts: hosts.data })
                    return hosts.data;
                }
            ).catch(error => {
                console.log(error)
            });
    }
}
export function deleteHost(host) {
    return dispatch => {
        SeventhApi.deleteHost(host)
            .then(metric => {
                    console.log('action delete')
                    console.log(metric)
                    dispatch({ type: actionsTypes.DELETE_HOST, hosts: metric.data })
                    return metric.data;
                }
            ).catch(error => {
                console.log(error)
            });
    }
}



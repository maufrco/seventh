import { List } from 'immutable';
import * as SeventhApi from '../../api/SeventhApi';
import * as actionsTypes from './actionsTypes';

export function getHosts() {
    return dispatch => {
        SeventhApi.getHosts()
            .then(hosts => {
                    dispatch({ type: actionsTypes.GET_HOSTS, hosts: new List(hosts.data) })
                    return new List(hosts.data);
                }
            ).catch(error => {
                console.log(error)
            });
    }
}
export function addHost(host) {
     host["protocol"] =  host["ssl"] ? "https://":"http://";
    delete host.ssl
    return dispatch => {
        SeventhApi.postHost(host)
            .then(metric =>{
                dispatch({ type: actionsTypes.ADD_HOST, hosts: new List(metric.data) })
                new List(metric.data)
            }).catch(error => {
                console.log(error)
            });
    };
}
export function deleteHost(host) {
    return dispatch => {
        SeventhApi.deleteHost(host) 
            .then(metric => {
                    dispatch({ type: actionsTypes.DELETE_HOST, hosts: new List(metric.data) })
                    new List(metric.data)
                }
            ).catch(error => {
                console.log(error)
            });
    }
}



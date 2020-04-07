import * as SeventhApi from '../../api/SeventhApi';
import * as actionsTypes from './actionsTypes';


const actions = { 
    refreshHost: (hosts) =>{
        return dispatch =>{
          return  dispatch({ type: actionsTypes.REFRESH_HOSTS, hosts: hosts })
        }
    },
    getMonitor: (host) =>{
        console.log( "ACTION getMonitor")
        return dispatch => {
            SeventhApi.getMonitor(host)
                .then(host => {
                   return dispatch({ type: actionsTypes.GET_MONITOR, monitor: host.data })
                });
        }
    },
    getHosts :() => {
        console.log( "ACTION getHosts")
        return dispatch => {
            SeventhApi.getHosts()
                .then(hosts => {
                    console.log(actions)
                    return dispatch({ type: actionsTypes.GET_HOSTS, hosts: hosts.data })
                    }
                ).catch(error => {
                    console.log(error)
                });
        }
    },
    addHost : (host) => {
        console.log( "ACTION addHosts")
        host["protocol"] =  host["ssl"] ? "https://":"http://";
       delete host.ssl
       return dispatch => {
           SeventhApi.postHost(host)
               .then(metric =>{
                   console.log(metric)
                return dispatch({ type: actionsTypes.ADD_HOST, hosts: metric.data })
               }).catch(error => {
                   console.log(error)
               });
       };
   },
   deleteHost: (host) => {
    console.log( "ACTION deleteHosts")
        return dispatch => {
            SeventhApi.deleteHost(host) 
            .then(metric => {
                console.log(metric)
                return  dispatch({ type: actionsTypes.DELETE_HOST, hosts: metric.data  })
                }
            ).catch(error => {
                console.log(error)
            });
        }
    }
}
export {actions}


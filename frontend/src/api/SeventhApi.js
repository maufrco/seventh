import axios from 'axios';
import * as env from '../environments/environments';
//baseURL: env.SERVER_URL,
const seventhApi = axios.create({
  baseURL: env.SERVER_URL,
  timeout: env.DEFAULT_TIMEOUT
});
export function getHosts() {
  console.log('GET')
  return seventhApi.get("/host");
}

export function deleteHost(host) {
  console.log('DELETE',host)
  let id = 0
  try{
    if(host['ID'])
      id = host['ID']
  }catch(e){
    console.log(e)
  } 
  if(host){
    return seventhApi.delete("/host/"+id).then(()=>getHosts())
    .catch(err => console.error(err));;
  }
      
    
}
export function postHost(host) {
  console.log('POST',host)
  try{
    if(host){
    return seventhApi.post("/host", host)
            .then(()=>getHosts())
            .catch(err => console.error(err));
    }
  }catch(e){
    console.log(e)
  } 
}


export function getMonitor(host) {
  console.log('GET getMonitor',host)
  let id = 0
  try{
    if(host['ID'])
      id = host['ID']
  }catch(e){
    console.log(e)
  } 
  console.log(host)
  if(host)
    return seventhApi.get("/monitor/"+id);
}
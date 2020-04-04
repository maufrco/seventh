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
  try{
    if(!host['ID']){
      return getHosts()
    }else{  
      return seventhApi.delete("/host/"+host['ID'])
            .then( () => getHosts() )
            .catch(err => {
                console.log(err);
                return getHosts()
            });
          }
  }catch(e){
    console.log(e)
    return getHosts()
  }   
}
export function postHost(host) {
  console.log('POST',host)
  try{
    if(!host){
      return getHosts()
    }else{
        return seventhApi.post("/host", host)
            .then(()=> getHosts() )
            .catch(err => {
              console.error(err);
              return getHosts();
            });
    }
  }catch(e){
    console.log(e)
    return getHosts()
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
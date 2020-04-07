import React from 'react';
import { actions } from '../../actions/monitor';
import { useDispatch, useSelector } from "react-redux";
import { Item, Button, Text } from './styles';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import {selectors} from '../utils/selectors';

const HostItem = (props)=> {
    
    const hosts = useSelector(selectors.hosts)

    const dispatch = useDispatch();
    const host = useSelector(state => props.host)

    function deleteHost(host){
        dispatch(actions.deleteHost(host))
    }

    function selectItem(host){
        dispatch(actions.getMonitor(host))
        const newHosts = hosts.map(item => {

            console.log(item['id'],host['id'])
            return item['id'] === host['id'] ? { ...item, selected: true } : { ...item, selected: false }
        })
        dispatch(actions.refreshHost(newHosts))
        
    }
    return(
        <Item className={host.selected && "active"} >

            <Text onClick={()=> selectItem(host)}>{host.name} </Text>
            <Button
                type="button"
                title="Deletar host"
                data-toggle="modal"
                data-target="#metricModal"
                onClick={() => deleteHost(host)}>
                <HighlightOffOutlinedIcon fontSize="small" />
            </Button>
        </Item>   
    )
}
export default HostItem;


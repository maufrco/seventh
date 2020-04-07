import React, { Fragment, useEffect } from 'react';
import { actions } from '../../actions/monitor';
import { useDispatch, useSelector } from "react-redux";
import { List } from './styles';
import HostItem from '../HostItem';
import Monitor from '../Monitor';
import HostAdd from '../HostAdd';
import {selectors} from '../utils/selectors'



const HostList = ()=> {
    const hosts = useSelector(selectors.hosts)
    const dispatch = useDispatch();
        
    useEffect(() => dispatch(actions.getHosts()),[]);

    return (
        <Fragment>
            <Monitor />
            <HostAdd />
            <List>
                { 
                    hosts.map((result, index) => (
                        <HostItem key={index} host={result} />
                    ))
                }
            </List>          
        </Fragment>
    )
}
export default HostList;
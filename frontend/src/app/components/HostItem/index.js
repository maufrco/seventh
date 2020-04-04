import React, { Component } from 'react';
import { getMonitor } from '../../actions/monitor';
import { deleteHost } from '../../actions/hosts';
import { connect } from 'react-redux';
import { Item, Button, Text } from './styles';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

class HostItem extends Component {
    constructor(props){
        super(props);     
    }
     render() {
        const { host, deleteHost, getMonitor }  = this.props;
        return (
            <Item>
                <Text onClick={()=>getMonitor(host)} >{host.name}</Text>
                <Button
                    type="button"
                    title="Deletar host"
                    data-toggle="modal"
                    data-target="#metricModal"
                    onClick={()=>deleteHost(host)}>
                    <HighlightOffOutlinedIcon fontSize="small" />
                </Button>
            </Item>           
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getMonitor: (list) => dispatch(getMonitor(list)),
        deleteHost: (host) => dispatch(deleteHost(host)),
    };
}
const HostItemContainer = connect(null, mapDispatchToProps)(HostItem);
export default HostItemContainer;
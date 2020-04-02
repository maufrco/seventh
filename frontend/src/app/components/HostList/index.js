import React, { Component, Fragment } from 'react';
import { getHosts } from '../../actions/hosts';
import { connect } from 'react-redux';
import { List } from './styles';
import HostItem from '../HostItem';
import Monitor from '../Monitor';
import HostAdd from '../HostAdd';

class HostList extends Component {
    componentDidMount() {
        this.props.getHosts();
    }
    render() {
        const { hosts } = this.props;
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
}

const mapStateToProps = ({ hosts }) => {
    return { hosts };
}

const mapDispatchToProps = dispatch => {
    return {
        getHosts: () => dispatch(getHosts())
    };
}

const HostListContainer = connect(mapStateToProps, mapDispatchToProps)(HostList);
export default HostListContainer;
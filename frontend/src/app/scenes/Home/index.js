import React, { Component } from 'react';
import { Container } from './styles';
import Header from '../../components/Header';
import HostList from '../../components/HostList';


class Home extends Component {
    render() {
        return (
            <Container>
                <Header />
                <HostList />
            </Container>
        )
    }
}

export default Home;
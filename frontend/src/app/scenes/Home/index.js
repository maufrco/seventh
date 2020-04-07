import React from 'react';
import { Container } from './styles';
import Header from '../../components/Header';
import HostList from '../../components/HostList';

const Home = ()=> {
        return (
            <Container>
                <Header />
                <HostList />
            </Container>
        )
}
export default Home;
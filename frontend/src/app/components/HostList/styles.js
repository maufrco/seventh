import styled from 'styled-components';

export const List = styled.ul`
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    padding: 0 3px;
    margin: 0;
    list-style: none;
    @media(max-width: 600px) {
        justify-content: center;
    }
`

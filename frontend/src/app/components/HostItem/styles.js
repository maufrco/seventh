import styled from 'styled-components';

export const Item = styled.li`
    margin: 6px;
    border-radius: 6px;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.07), 0 1px 1px 0 rgba(0, 0, 0, 0.16);
    background-color: #EFEFEF;
    transition: all 0.5s ease-out;
    display: flex;
    
    .active {
        background-color: #4a6097;
        color:#FFFFFF;
        box-shadow: 0 0 2px 2px rgba(0,0,0,0.07), 0 2px 2px 0 rgba(0,0,0,0.16);
    }
    :hover {
        background-color: #FFF;
        box-shadow: 0 0 2px 2px rgba(0,0,0,0.07), 0 2px 2px 0 rgba(0,0,0,0.16);
    }
`


export const Button = styled.button`
    cursor: pointer;
    border-radius: 6px;
    background-color: transparent;
    border: none;
    color: #999999;
    text-transform: capitalize;
    transition: all 0.3s ease-out;
    padding: 2px 4px;
    text-align: center;

    
    :hover{
        color: #ff6961;
    }
    
`
export const Text = styled.span`
    cursor: pointer;
    line-height: 30px;
    background-color: transparent;
    border: none;
    padding: 0 15px;
    color: #666;
    text-transform: capitalize;
    font-size: 13px;
    transition: all 0.3s ease-out;

   
`
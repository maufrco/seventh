import styled from 'styled-components';

export const Label = styled.label`
    color: #666;
    font-size: 14px;
    margin-right:10px;
    margin-left:5px;

`
export const Row = styled.span`
    color: #666;
    font-size: 14px;
    margin: 5px;
`
export const Err = styled.span`
    color: #aa3535;
    font-size: 10px;
    line-height: 36px;
    font-weight: 600;
    margin-left: 10px;
`
export const Form = styled.form`
    margin:10px;
    flex-wrap: wrap;
    display:flex;
    padding: 0 15px;
    border-radius: 6px;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.07), 0 1px 1px 0 rgba(0, 0, 0, 0.16);
    background-color: #eeeeee;
    font-size: 12px;
`
export const Btn = styled.input`
    padding: 0 9px;
    margin: 5px;
    cursor: pointer;
    color: #999999;
    font-size: 14px;
    justify-content: center;
    text-align: center;
    transition: all 0.3s ease-out;
    :hover {
        color: #333333;
    }
`


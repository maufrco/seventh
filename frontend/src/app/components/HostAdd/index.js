import React from "react";
import { Form, Row , Btn, Label, Err} from './styles';
import {actions} from '../../actions/monitor';
import useForm from './useForm';
import validate from './validationRules';
import { useDispatch } from "react-redux";

const HostAdd = ()=> {
    const dispatch = useDispatch();
    const {values, errors, handleChange, handleSubmit, clearState } = useForm(submitHost, validate);
    
    function submitHost(){
      dispatch(actions.addHost(values))
      clearState()
    }
    
    return (
      <Form onSubmit={handleSubmit} noValidate>
        <Row>
          Nome: <input type="text"  name="name" value={values.name || ''} onChange={handleChange} />
        </Row>
        <Row>
            <Label>SSL <input type="checkbox" name="ssl" checked={values.ssl} onChange={handleChange}  /></Label>
        </Row>
        <Row>
           <input placeholder="Domínio" type="text" name="domain" onChange={handleChange}  value={values.domain || ''} required />
        </Row>
        <Row>
           <input placeholder="Path"  type="text" name="path" onChange={handleChange}  value={values.path || ''} />
        </Row>        
        <Btn type="submit" value=" + adicionar novo host" />
        {errors.domain && (<Err>* {errors.domain}</Err>)}
      </Form>
    );
}
export default HostAdd;
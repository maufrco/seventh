import React, {useState} from "react";
import { connect } from 'react-redux';
import { Form, Row , Btn, Label, Err} from './styles';
import {addHost} from '../../actions/hosts';
import useForm from './useForm';
import validate from './validationRules';

const HostAdd = (props)=> {

    const {values, errors, handleChange, handleSubmit } = useForm(submitForm, validate);
    
    const [items] = useState([
      {label: "http",  value: "http://" },
      { label: "https", value: "https://" }       
    ]); 
    

    function submitForm(){
      props.addHost(values);
    }

      
    return (
      <Form onSubmit={handleSubmit} noValidate>
        <Row>
          Nome: <input type="text"  name="name" value={values.name || ''} onChange={handleChange} />
        </Row>
        
        <Row>
            {items.map(({ label, value }) => (
              
            <span key={label}><input type="radio" name="protocol" value={value} id={label}  onChange={handleChange}  /><Label htmlFor={label}>{value}</Label></span>
            ))}
        </Row>

        <Row>
           <input placeholder="Domínio" type="text" name="domain" onChange={handleChange}  value={values.domain || ''} required />
        </Row>
        <Row>
           <input placeholder="Path"  type="text" name="path" onChange={handleChange}  value={values.path || ''} />
        </Row>
        
        <Btn type="submit" value=" + adicionar novo host" />

        {errors.domain && (<Err>* {errors.domain}</Err>)}
        {errors.protocol && (<Err>* {errors.protocol}</Err>)}
      </Form>
    );
  }

  function mapStateToProps({ hosts }) {
    return { hosts }
}

function mapDispatchToProps(dispatch) {
    return {
        addHost: (newHost) => dispatch(addHost(newHost))
      }
    }
export default connect(mapStateToProps, mapDispatchToProps)(HostAdd);
export default function validate(values) {
    let errors = {};

    if (!values.domain) {
        errors.domain = 'Campo domínio é obrigatório';
      }else if(!/\S+.\S+\.\S+/.test(values.domain)){
        errors.domain = 'Insira um domínio válido';
      }else if(values.domain.length < 7 || values.domain.length > 63) {
        errors.domain = 'Numero de caracteres invalido para um domínio';
    } 
    if (!values.name) {
        errors.name = 'Defina um nome';
    }

    return errors;
  };
import React, { useState } from "react";
//const { value:name, bind:bindName, reset:resetName } = useInput('');
export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  };
};



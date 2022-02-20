import React from "react";

function TextInput(props) {

  return (
    <div className='input-container'>
      {props.label ? <label>{props.label}</label> : null}
      <input type='text' className='input__default' onChange={props.onChange} placeholder={props.placeholder} />
    </div>

  );
}

export default TextInput;
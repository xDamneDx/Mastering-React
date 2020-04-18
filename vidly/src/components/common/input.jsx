import React from 'react';

const Input = ({ name, label, value, errors, onChange }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        name={name}
        id={name}
        type='text'
        className='form-control'
      />
      {errors && <div className='alert alert-danger'>{errors}</div>}
    </div>
  );
};

export default Input;

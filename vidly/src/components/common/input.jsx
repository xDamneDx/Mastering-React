import React from 'react';

const Input = ({ name, label, value, errors, onChange, type }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        name={name}
        id={name}
        type={type}
        className='form-control'
      />
      {errors && <div className='alert alert-danger'>{errors}</div>}
    </div>
  );
};

export default Input;

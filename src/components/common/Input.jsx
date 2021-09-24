import React from "react";

const Input = ({
  id,
  name,
  type = "text",
  label,
  onChange,
  value,
  placeholder,
  errors,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="form-control"
        placeholder={placeholder}
      />
      {errors && <div className="mt-2 validation-color">{errors}</div>}
    </div>
  );
};

export default Input;

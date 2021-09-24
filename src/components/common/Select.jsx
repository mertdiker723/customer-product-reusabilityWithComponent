import React from "react";

const Select = ({ name, label, options, onChange, errors, value }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select
        id={name}
        name={name}
        onChange={onChange}
        className="form-control"
        value={value}
      >
        <option value="">Select a Country</option>
        {options.map((option) => {
          return (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          );
        })}
      </select>
      {errors && <div className="mt-2 validation-color">{errors}</div>}
    </div>
  );
};

export default Select;

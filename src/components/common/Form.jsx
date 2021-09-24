import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";

class Form extends Component {
  validate = () => {
    const { data } = this.state;
    const { error } = Joi.validate(data, this.schema, {
      abortEarly: false,
    });
    if (!error) {
      return null;
    }

    let errors = {};

    for (let i = 0; i < error.details.length; i++) {
      let detail = error.details[i];
      errors[detail.path[0]] = detail.message;
    }
    return errors;
  };

  validatePropery = (name, value) => {
    const obj = { [name]: value };
    const schemaObj = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schemaObj);
    return error ? error.details[0].message : null;
  };
  onHandleChange = ({ target: input }) => {
    const name = input.name;
    const { data: c, errors: e } = this.state;
    const errorMessage = this.validatePropery(input.name, input.value);

    const errors = { ...e };
    if (errorMessage) {
      errors[name] = errorMessage;
    } else delete errors[name];

    const data = { ...c };
    data[name] = input.value;

    this.setState({
      data,
      errors,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({
      errors: errors || {},
    });
    if (errors) {
      return;
    }

    this.submitItems();
  };

  inputRender = (name, title) => {
    const { errors, data } = this.state;

    return (
      <Input
        id={name}
        name={name}
        label={title}
        value={data[name]}
        onChange={this.onHandleChange}
        placeholder={title}
        errors={errors[name]}
      />
    );
  };

  selectRender = (name, title, options) => {
    const { errors, data } = this.state;

    return (
      <Select
        name={name}
        label={title}
        value={data[name]}
        options={options}
        onChange={this.onHandleChange}
        errors={errors[name]}
      />
    );
  };

  buttonRender = (label) => {
    return <Button label={label} className={"btn btn-primary"} />;
  };
}

export default Form;

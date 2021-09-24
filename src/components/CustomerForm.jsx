import React, { Component } from "react";
import Input from "./common/Input";
import Select from "./common/Select";
import Button from "./common/Button";
import Joi from "joi-browser";
import { getCountries } from "../services/fakeCountryService";
import { getGenders } from "../services/fakeGenderService";

class CustomerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        title: "",
        countryId: "",
        age: "",
        genderId: "",
      },
      errors: {},
      countries: [],
      genders: [],
    };
  }
  componentDidMount() {
    this.setState({
      countries: getCountries(),
      genders: getGenders(),
    });
  }

  schema = {
    title: Joi.string().required().label("Title"),
    countryId: Joi.string().required().label("Country"),
    age: Joi.number().required().label("Age"),
    genderId: Joi.string().required().label("Gender"),
  };

  validate = () => {
    const { customer } = this.state;
    const { error } = Joi.validate(customer, this.schema, {
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
    const { customer: c, errors: e } = this.state;
    const errorMessage = this.validatePropery(input.name, input.value);

    const errors = { ...e };
    if (errorMessage) {
      errors[name] = errorMessage;
    } else delete errors[name];

    const customer = { ...c };
    customer[name] = input.value;

    this.setState({
      customer,
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
    console.log(this.state.customer);
  };
  render() {
    const { errors, countries, genders, customer } = this.state;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.onSubmit}>
          <div className="row mt-3">
            <div className="col-md-6">
              <Input
                id={"title"}
                name={"title"}
                label={"Title"}
                onChange={this.onHandleChange}
                placeholder={"Title"}
                errors={errors["title"]}
              />
            </div>
            <div className="col-md-6">
              <Input
                id={"age"}
                name={"age"}
                type={"number"}
                label={"Age"}
                onChange={this.onHandleChange}
                placeholder={"Age"}
                errors={errors["age"]}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-6">
              <Select
                name={"countryId"}
                label={"Country"}
                value={customer["countryId"]}
                options={countries}
                onChange={this.onHandleChange}
                errors={errors["countryId"]}
              />
            </div>
            <div className="col-md-6">
              <Select
                name={"genderId"}
                label={"Gender"}
                value={customer["genderId"]}
                options={genders}
                onChange={this.onHandleChange}
                errors={errors["genderId"]}
              />
            </div>
          </div>

          <Button label="Send" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

export default CustomerForm;

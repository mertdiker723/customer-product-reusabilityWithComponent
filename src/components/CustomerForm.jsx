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

  validatePropery = () => {};

  onHandleChange = ({ target: input }) => {
    const name = input.name;
    const { customer: c } = this.state;
    const customer = { ...c };
    customer[name] = input.value;

    this.setState({
      customer,
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
        <form className="w-50" onSubmit={this.onSubmit}>
          <Input
            id={"title"}
            name={"title"}
            label={"Title"}
            onChange={this.onHandleChange}
            placeholder={"Title"}
            errors={errors["title"]}
          />
          <Select
            name={"countryId"}
            label={"Country"}
            value={customer["countryId"]}
            options={countries}
            onChange={this.onHandleChange}
            errors={errors["countryId"]}
          />
          <Input
            id={"age"}
            name={"age"}
            type={"number"}
            label={"Age"}
            onChange={this.onHandleChange}
            placeholder={"Age"}
            errors={errors["age"]}
          />
          <Select
            name={"genderId"}
            label={"Gender"}
            value={customer["genderId"]}
            options={genders}
            onChange={this.onHandleChange}
            errors={errors["genderId"]}
          />

          <Button label="Send" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

export default CustomerForm;

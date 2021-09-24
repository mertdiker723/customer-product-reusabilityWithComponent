import React from "react";
import Joi from "joi-browser";
import { getCountries } from "../services/fakeCountryService";
import { getGenders } from "../services/fakeGenderService";
import Form from "./common/Form";
import { getCustomer, saveCustomer } from "./../services/fakeCustomerService";
class CustomerForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
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
    const { match } = this.props;
    this.setState({
      countries: getCountries(),
      genders: getGenders(),
    });

    if (match.params.id === "new") {
      return null;
    }
    const customer = getCustomer(match.params.id);
    if (!customer) {
      return this.props.history.replace("/not-found");
    }
    this.setState({
      data: this.mapToViewModel(customer),
    });
  }

  mapToViewModel = (customer) => {
    return {
      _id: customer._id,
      title: customer.title,
      countryId: customer.country._id,
      age: customer.age,
      genderId: customer.gender._id,
    };
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    countryId: Joi.string().required().label("Country"),
    age: Joi.number().required().label("Age"),
    genderId: Joi.number().required().label("Gender"),
  };

  submitItems = () => {
    const { data } = this.state;
    saveCustomer(data);

    this.props.history.push("/customers");
  };

  render() {
    const { countries, genders } = this.state;

    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.onSubmit}>
          <div className="row mt-3">
            <div className="col-md-6">{this.inputRender("title", "Title")}</div>
            <div className="col-md-6">{this.inputRender("age", "Age")}</div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              {this.selectRender("countryId", "Country", countries)}
            </div>
            <div className="col-md-6">
              {this.selectRender("genderId", "Gender", genders)}
            </div>
          </div>
          {this.buttonRender("Send")}
        </form>
      </div>
    );
  }
}

export default CustomerForm;

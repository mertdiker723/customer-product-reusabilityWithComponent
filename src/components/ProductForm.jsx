import React from "react";
import { getBrands } from "../services/fakeBrandService";
import { getCountries } from "../services/fakeCountryService";
import Joi from "joi-browser";
import Form from "./common/Form";
import { saveProduct } from "./../services/fakeProductService";

class ProductForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: "",
        brandId: "",
        countryId: "",
      },
      errors: {},
      brands: [],
      countries: [],
    };
  }

  schema = {
    title: Joi.string().required().label("Title"),
    brandId: Joi.number().required().label("Brand"),
    countryId: Joi.string().required().label("Country"),
  };

  componentDidMount() {
    this.setState({
      brands: getBrands(),
      countries: getCountries(),
    });
  }

  submitItems = () => {
    const { data } = this.state;
    const { history } = this.props;
    saveProduct(data);

    history.push("/products");
  };
  render() {
    const { brands, countries } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="row mt-3">
            <div className="col-md-6">{this.inputRender("title", "Title")}</div>
            <div className="col-md-6">
              {this.selectRender("brandId", "Brand", brands)}
            </div>
            <div className="col-md-6">
              {this.selectRender("countryId", "Country", countries)}
            </div>
          </div>
          {this.buttonRender("Send")}
        </form>
      </React.Fragment>
    );
  }
}

export default ProductForm;

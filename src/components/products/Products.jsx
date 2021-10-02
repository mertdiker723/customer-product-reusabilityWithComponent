import React, { Component } from "react";
import ListGroup from "../common/ListGroup";
import { getProducts } from "../../services/fakeProductService";
import { getCountries } from "../../services/fakeCountryService";
import ProductsTable from "./ProductsTable";
import _ from "lodash";
import Button from "../common/Button";
import { toast, ToastContainer } from "react-toastify";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      countries: [],
      selectedCountry: undefined,
    };
  }

  componentDidMount() {
    this.setState({
      products: getProducts(),
      countries: getCountries(),
    });
  }
  filteredCountries = (data) => {
    this.setState({
      selectedCountry: data,
    });
  };
  onLike = (data) => {
    const { products } = this.state;
    const clonedProducts = _.cloneDeep(products);
    const findedIndex = clonedProducts.findIndex(
      (product) => product._id === data._id
    );
    const clonedProd = clonedProducts[findedIndex];
    clonedProd.liked = !clonedProd.liked;
    this.setState(
      {
        products: clonedProducts,
      },
      () => {
        if (clonedProd.liked) {
          toast.success(`${clonedProd.title} liked..!`);
        } else {
          toast.error(`${clonedProd.title} disliked..!`);
        }
      }
    );
  };

  onDeleteHandle = (data) => {
    const { products } = this.state;
    const deleteProduct = products.filter(
      (product) => product._id !== data._id
    );
    if (data) {
      toast.error(`${data.title} is deleted..!`);
    }
    this.setState({
      products: deleteProduct,
    });
  };
  render() {
    const { products, countries, selectedCountry } = this.state;
    const { history } = this.props;
    const filteredProducts =
      selectedCountry && selectedCountry._id
        ? products.filter(
            (product) => product.country._id === selectedCountry._id
          )
        : products;

    return (
      <div>
        <h1>Products</h1>
        <ToastContainer position="bottom-right" autoClose={2000} />
        <div className="row mt-4">
          <div className="col-md-3">
            <ListGroup
              data={countries}
              selected={selectedCountry}
              onFiltered={this.filteredCountries}
            />
            <button
              className="btn btn-primary mt-3"
              onClick={() => this.setState({ selectedCountry: undefined })}
            >
              Get All
            </button>
          </div>
          <div className="col-md-9">
            <Button
              onClick={() => history.push("/products/new")}
              className="btn btn-primary mb-3"
              label={"Add New Products"}
            />
            <ProductsTable
              data={filteredProducts}
              onLike={this.onLike}
              onDeleteHandle={this.onDeleteHandle}
              selectedCountry={selectedCountry}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Products;

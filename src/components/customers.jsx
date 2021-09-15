import React, { Component } from "react";
import CustomersTable from "./CustomersTable";
import { getCustomers } from "../services/fakeCustomerService";
import _ from "lodash";
import ListGroup from "./common/ListGroup";
import { getGenders } from "../services/fakeGenderService";
import Pagination from "./common/Pagination";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      genders: [],
      selectedGender: undefined,
      currentPage: 1,
      postPerPage: 4,
    };
  }
  componentDidMount() {
    this.setState({
      customers: getCustomers(),
      genders: getGenders(),
    });
  }
  onLike = (data) => {
    const { customers } = this.state;
    const clonedCustomers = _.cloneDeep(customers);
    const findedCustomers = clonedCustomers.findIndex(
      (x) => x._id === data._id
    );
    clonedCustomers[findedCustomers].liked =
      !clonedCustomers[findedCustomers].liked;
    this.setState({
      customers: clonedCustomers,
    });
  };

  onDeleteHandle = (data) => {
    const { customers } = this.state;
    const filteredCustomers = customers.filter(
      (customer) => customer._id !== data._id
    );
    this.setState({
      customers: filteredCustomers,
    });
  };
  filteredGenders = (item) => {
    this.setState({
      selectedGender: item,
      currentPage: 1,
    });
  };
  onPaginationChange = (item) => {
    this.setState({
      currentPage: item,
    });
  };

  render() {
    const { customers, genders, selectedGender, postPerPage, currentPage } =
      this.state;

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    const filteredCustomers =
      selectedGender && selectedGender._id
        ? customers.filter(
            (customer) => customer.gender._id === selectedGender._id
          )
        : customers;

    const currentPosts = filteredCustomers.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const lengthPerPage = Math.ceil(filteredCustomers.length / postPerPage);
    return (
      <div>
        <h1>Customers</h1>
        <div className="row mt-4">
          <div className="col-md-3">
            <ListGroup
              data={genders}
              onFiltered={this.filteredGenders}
              selected={selectedGender}
            />
            <button
              className="btn btn-primary mt-3"
              onClick={() => this.setState({ selectedGender: undefined })}
            >
              Get All
            </button>
          </div>
          <div className="col-md-9">
            <CustomersTable
              customers={currentPosts}
              onLike={this.onLike}
              onDeleteHandle={this.onDeleteHandle}
            />
            <Pagination
              lengthPerPage={lengthPerPage}
              onClick={this.onPaginationChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Customers;

import React, { Component } from "react";
import CustomersTable from "./CustomersTable";
import { getCustomers } from "../services/fakeCustomerService";
import _ from "lodash";
import ListGroup from "./common/ListGroup";
import { getGenders } from "../services/fakeGenderService";
import Button from "./common/Button";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      genders: [],
      selectedGender: undefined,
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
    });
  };

  render() {
    const { customers, genders, selectedGender } = this.state;
    const { history, location, match } = this.props;
    const filteredCustomers =
      selectedGender && selectedGender._id
        ? customers.filter(
            (customer) => customer.gender._id === selectedGender._id
          )
        : customers;

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
            <Button
              label={"Add New Customer"}
              className={"btn btn-primary mb-3"}
              onClick={() => history.push("/customers/new")}
            />
            <CustomersTable
              customers={filteredCustomers}
              onLike={this.onLike}
              onDeleteHandle={this.onDeleteHandle}
              selectedGender={selectedGender}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Customers;

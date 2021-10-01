import React, { Component } from "react";
import CustomersTable from "./CustomersTable";
import { getCustomers } from "../../services/fakeCustomerService";
import _ from "lodash";
import ListGroup from "../common/ListGroup";
import { getGenders } from "../../services/fakeGenderService";
import { ToastContainer, toast } from "react-toastify";
import Button from "../common/Button";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      genders: [],
      countries: [],
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
    const clonedCons = clonedCustomers[findedCustomers];
    clonedCons.liked = !clonedCons.liked;
    this.setState(
      {
        customers: clonedCustomers,
      },
      () => {
        if (clonedCons.liked) {
          toast.success(`${clonedCons.title} liked..!`);
        } else {
          toast.error(`${clonedCons.title} disliked..!`);
        }
      }
    );
  };

  onDeleteHandle = (data) => {
    const { customers } = this.state;
    const filteredCustomers = customers.filter(
      (customer) => customer._id !== data._id
    );
    if (data) {
      toast.error(`${data.title} is deleted..!`);
    }

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
    const { history } = this.props;
    const filteredCustomers =
      selectedGender && selectedGender._id
        ? customers.filter(
            (customer) => customer.gender._id === selectedGender._id
          )
        : customers;

    return (
      <div>
        <h1>Customers</h1>
        <ToastContainer position="bottom-right" autoClose={2000} />
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
              onClick={() => history.push("/customers/new")}
              className="btn btn-primary mb-3"
              label={"Add New Customer"}
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

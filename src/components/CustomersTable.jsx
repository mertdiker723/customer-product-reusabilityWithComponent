import React, { Component } from "react";
import Table from "./common/Table";
import Like from "./common/Like";
import { Link } from "react-router-dom";

class CustomersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          path: "title",
          label: "Title",
          content: (customer) => {
            return (
              <Link to={`/customers/${customer._id}`}>{customer.title}</Link>
            );
          },
        },
        { path: "country.name", label: "Country" },
        { path: "age", label: "Age" },
        { path: "gender.name", label: "Gender" },
        {
          key: "like",
          content: (item) => (
            <Like item={item} onLike={() => props.onLike(item)} />
          ),
        },
        {
          key: "delete",
          content: (item) => {
            return (
              <button
                className="btn btn-danger"
                onClick={() => props.onDeleteHandle(item)}
              >
                Delete
              </button>
            );
          },
        },
      ],
    };
  }
  render() {
    const { columns } = this.state;
    const { customers, selectedGender } = this.props;
    return (
      <Table columns={columns} data={customers} selectedItem={selectedGender} />
    );
  }
}

export default CustomersTable;

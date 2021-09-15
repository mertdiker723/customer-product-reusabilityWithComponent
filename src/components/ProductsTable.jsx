import React, { Component } from "react";
import Like from "./common/Like";
import Table from "./common/Table";

class ProductsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { path: "title", label: "Title" },
        { path: "brand.name", label: "Brand" },
        { path: "country.name", label: "Country" },
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
                onClick={() => props.onDeleteHandle(item)}
                className="btn btn-danger"
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
    const { data } = this.props;
    return (
      <div>
        <Table columns={columns} data={data} />
      </div>
    );
  }
}

export default ProductsTable;

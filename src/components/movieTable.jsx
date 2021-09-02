import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/Table/table";

export default class MovieTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { path: "title", label: "Title" },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
          key: "like",
          content: (item) => {
            return (
              <Like item={item.liked} onLike={() => props.onHandleLike(item)} />
            );
          },
        },
        {
          key: "delete",
          content: (item) => {
            return (
              <button
                className="btn btn-danger"
                onClick={() => props.onHandleDelete(item)}
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
    const { movies, onHandleSort, sortColumn } = this.props;
    const { columns } = this.state;
    return (
      <Table
        data={movies}
        columns={columns}
        onHandleSort={onHandleSort}
        sortColumn={sortColumn}
      />
    );
  }
}

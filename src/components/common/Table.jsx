import React, { Component } from "react";
import _ from "lodash";
import Pagination from "./Pagination";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      postPerPage: 4,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedItem !== this.props.selectedItem) {
      this.setState({
        currentPage: 1,
      });
    }
  }

  onPaginationChange = (item) => {
    this.setState({
      currentPage: item,
    });
  };

  render() {
    const { columns, data } = this.props;
    const { currentPage, postPerPage } = this.state;
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
    return (
      <React.Fragment>
        <table className="table">
          <TableHeader columns={columns} />
          <TableBody data={currentPosts} columns={columns} />
        </table>
        <Pagination
          lengthPerPage={Math.ceil(data.length / postPerPage)}
          onClick={this.onPaginationChange}
        />
      </React.Fragment>
    );
  }
}

const TableHeader = ({ columns }) => {
  return (
    <thead>
      {
        <tr>
          {columns.map((item, index) => {
            return <th key={`${index}_${item.path}`}>{item.label}</th>;
          })}
        </tr>
      }
    </thead>
  );
};

const TableBody = ({ data, columns }) => {
  const renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }
    return _.get(item, column.path);
  };

  return (
    <tbody>
      {data.map((item) => {
        return (
          <tr key={item._id}>
            {columns.map((column, index) => {
              return <td key={index}>{renderCell(item, column)}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default Table;

import React, { Component, useState } from "react";
import _ from "lodash";
import Pagination from "./Pagination";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      postPerPage: 4,
      sortColumn: { path: "", order: "asc" },
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

  onHandleSort = (sortColumn) => {
    this.setState({
      sortColumn,
    });
  };
  render() {
    const { columns, data } = this.props;
    const { currentPage, postPerPage, sortColumn } = this.state;
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    const sorted = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
    const currentPosts = sorted.slice(indexOfFirstPost, indexOfLastPost);
    return (
      <React.Fragment>
        <table className="table">
          <TableHeader
            columns={columns}
            onSort={this.onHandleSort}
            sortColumn={sortColumn}
          />
          <TableBody data={currentPosts} columns={columns} />
        </table>
        <Pagination
          lengthPerPage={Math.ceil(data.length / postPerPage)}
          onClick={this.onPaginationChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

const TableHeader = ({ columns, onSort, sortColumn: headerColumn }) => {
  const [counter, setCount] = useState(1);
  const raiseSort = (path) => {
    const sortColumn = { ...headerColumn };
    setCount(counter + 1);
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    if (counter === 3) {
      sortColumn.path = "";
      onSort(sortColumn);
      setCount(1);
    }

    onSort(sortColumn);
  };

  const renderSortIcon = (column) => {
    if (headerColumn.path !== column) {
      return null;
    }
    if (headerColumn.order === "asc") {
      return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
    }
    return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
  };

  return (
    <thead>
      <tr className="user-select-none cursor-poiner">
        {columns.map((column, index) => {
          return (
            <th
              onClick={() => raiseSort(column.path)}
              key={`${index}_${column.path}`}
            >
              {column.label} {renderSortIcon(column.path)}
            </th>
          );
        })}
      </tr>
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

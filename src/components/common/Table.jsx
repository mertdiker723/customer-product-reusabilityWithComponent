import React, { Component } from "react";
import _ from "lodash";

class Table extends Component {
  render() {
    const { columns, data } = this.props;
    return (
      <table className="table">
        <TableHeader columns={columns} />
        <TableBody data={data} columns={columns} />
      </table>
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

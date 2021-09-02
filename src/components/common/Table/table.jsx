import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

function Table({ data, columns, sortColumn, onHandleSort }) {
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        onHandleSort={onHandleSort}
        sortColumn={sortColumn}
      />
      <TableBody data={data} columns={columns} />
    </table>
  );
}

export default Table;

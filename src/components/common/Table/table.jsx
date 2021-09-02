import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

function Table({ data, columns }) {
  return (
    <table className="table">
      <TableHeader columns={columns} />
      <TableBody data={data} columns={columns} />
    </table>
  );
}

export default Table;

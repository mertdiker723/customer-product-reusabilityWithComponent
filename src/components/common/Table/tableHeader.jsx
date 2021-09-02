import React from "react";

function TableHeader({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => {
          return <th key={index}>{column.label}</th>;
        })}
      </tr>
    </thead>
  );
}

export default TableHeader;

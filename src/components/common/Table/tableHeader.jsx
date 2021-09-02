import React from "react";

function TableHeader({ columns, sortColumn, onHandleSort }) {
  const raiseSort = (path) => {
    const columns = { ...sortColumn };

    if (columns.path === path) {
      columns.order = columns.order === "asc" ? "desc" : "asc";
    } else {
      columns.path = path;
      columns.order = "desc";
    }

    onHandleSort(columns);
  };

  return (
    <thead>
      <tr className="pointer-text user-select-none">
        {columns.map((column, index) => {
          return (
            <th key={index} onClick={() => raiseSort(column.path)}>
              {column.label}{" "}
              {<RenderSortIcon column={column} sortColumn={sortColumn} />}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

const RenderSortIcon = ({ column, sortColumn }) => {
  if (sortColumn.path !== column.path) {
    return null;
  }

  if (sortColumn.order === "asc") {
    return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
  }
  return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
};

export default TableHeader;

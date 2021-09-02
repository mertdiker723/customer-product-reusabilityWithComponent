import React from "react";
import _ from "lodash";
function TableBody({ data, columns }) {
  const renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }
    return _.get(item, column.path);
  };

  const renderKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  return (
    <tbody>
      {data.map((item) => {
        return (
          <tr key={item._id}>
            {columns.map((column) => {
              return (
                <td key={renderKey(item, column)}>
                  {renderCell(item, column)}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;

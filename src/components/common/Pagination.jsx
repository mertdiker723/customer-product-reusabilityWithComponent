import React from "react";

const Pagination = ({ lengthPerPage, onClick }) => {
  let array = [];
  for (let i = 1; i <= lengthPerPage; i++) {
    array.push(i);
  }
  return (
    <ul className="pagination pagination-md">
      {array.map((item) => {
        return (
          <li
            key={item}
            className="page-item cursor-poiner"
            onClick={() => onClick(item)}
          >
            <a className="page-link">{item}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;

import React from "react";

const Pagination = ({ lengthPerPage, onClick, currentPage }) => {
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
            className={`page-item cursor-poiner ${
              currentPage === item && "active"
            }`}
            onClick={() => onClick(item)}
          >
            <p className="page-link">{item}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;

import React from "react";

const Pagination = ({ pageCount, onSelectCurrentPage, currentPage }) => {
  let paginationNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    paginationNumbers.push(i);
  }
  return (
    <ul className="pagination pagination">
      {paginationNumbers.map((item) => {
        return (
          <li
            className={`page-item pointer-text user-select-none ${
              currentPage === item ? "active" : ""
            }`}
            onClick={() => onSelectCurrentPage(item)}
            key={item}
          >
            <a className="page-link">{item}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;

import React from "react";

const ListGroup = ({ data, onFiltered, selected }) => {
  return (
    <ul className="list-group">
      {data.map((item) => {
        return (
          <li
            key={item._id}
            onClick={() => onFiltered(item)}
            className={`list-group-item ${
              item === selected ? "active" : ""
            } cursor-poiner`}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
};

export default ListGroup;

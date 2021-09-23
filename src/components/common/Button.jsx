import React from "react";

const Button = ({ onClick, label, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;

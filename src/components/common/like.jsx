import React from "react";

function Like({ item, onLike }) {
  return (
    <i
      className={`pointer-text fa fa-heart${item ? "" : "-o"}`}
      onClick={onLike}
      aria-hidden="true"
    />
  );
}

export default Like;

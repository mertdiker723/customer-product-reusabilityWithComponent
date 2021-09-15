import React from "react";

function Like({ item, onLike }) {
  return (
    <i
      className={`cursor-poiner fa fa-heart${!item.liked ? "-o" : ""}`}
      onClick={onLike}
      aria-hidden="true"
    ></i>
  );
}

export default Like;

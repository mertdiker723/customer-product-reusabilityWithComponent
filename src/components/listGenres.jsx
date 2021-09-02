import React, { Component } from "react";

class ListGenres extends Component {
  render() {
    const { genres, filterGenres, selectedGenre } = this.props;
    return (
      <ul className="list-group user-select-none pointer-text">
        {genres.map((genre) => {
          return (
            <li
              key={genre._id}
              onClick={() => filterGenres(genre)}
              className={`list-group-item ${
                selectedGenre === genre ? "active" : ""
              }`}
            >
              {genre.name}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ListGenres;

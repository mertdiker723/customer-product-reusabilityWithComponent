import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import MovieTable from "./movieTable";
import ListGenres from "./listGenres";
import _, { filter } from "lodash";
import Pagination from "./common/pagination";
class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      movies: [],
      currentPage: 1,
      postPerPage: 4,
      selectedGenre: undefined,
      sortColumn: { path: "title", order: "asc" },
    };
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      genres,
      movies: getMovies(),
    });
  }

  filterGenres = (selectedGenre) => {
    this.setState({
      selectedGenre,
    });
  };

  filterMovies = (movies, selectedGenre) => {
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((movie) => movie.genre._id === selectedGenre._id)
        : movies;

    return filtered;
  };
  onHandleLike = (item) => {
    const clonedMovies = _.cloneDeep(this.state.movies);
    const findedIndex = clonedMovies.findIndex(
      (movie) => movie._id === item._id
    );
    clonedMovies[findedIndex].liked = !clonedMovies[findedIndex].liked;
    this.setState({
      movies: clonedMovies,
    });
  };

  onHandleDelete = (item) => {
    const { movies } = this.state;
    const filteredMovie = movies.filter((movie) => movie._id !== item._id);

    this.setState({
      movies: filteredMovie,
    });
  };
  onSelectCurrentPage = (currentPage) => {
    this.setState({
      currentPage,
    });
  };

  onHandleSort = (sortColumn) => {
    this.setState({
      sortColumn,
    });
  };

  refactorMovies(movies, selectedGenre, currentPage, postPerPage, sortColumn) {
    const filtered = this.filterMovies(movies, selectedGenre);
    const lastIndexOfPage = currentPage * postPerPage;
    const firstIndexOfPage = lastIndexOfPage - postPerPage;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const paginatedPage = sorted.slice(firstIndexOfPage, lastIndexOfPage);
    return { paginatedPage, filtered };
  }
  render() {
    const {
      genres,
      movies,
      selectedGenre,
      currentPage,
      postPerPage,
      sortColumn,
    } = this.state;
    const { paginatedPage, filtered } = this.refactorMovies(
      movies,
      selectedGenre,
      currentPage,
      postPerPage,
      sortColumn
    );

    return (
      <div className="row">
        <div className="col-md-2">
          <ListGenres
            genres={genres}
            filterGenres={this.filterGenres}
            selectedGenre={selectedGenre}
          />
        </div>
        <div className="col-md-10">
          <MovieTable
            movies={paginatedPage}
            onHandleLike={this.onHandleLike}
            onHandleDelete={this.onHandleDelete}
            onHandleSort={this.onHandleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            pageCount={Math.ceil(filtered.length / postPerPage)}
            onSelectCurrentPage={this.onSelectCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGoup from './common/listGroup';
import _ from 'lodash';

class Movies extends Component {
  state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      sortColumn: { path: 'title', order: 'asc' }
  }

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(stateMovie => stateMovie._id !== movie._id)
    this.setState({ movies })
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  }

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 })
  }
  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }

  render () {
    const { length: count } = this.state.movies;
    const { pageSize, sortColumn, currentPage, movies: allMovies, selectedGenre } = this.state;

    if (count === 0) {
      return <p>There are no movies in the database</p>;
    }

    const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(movie => movie.genre._id === selectedGenre._id) : allMovies;
    
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    
    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGoup 
          items={this.state.genres}
          selectedItem={this.state.selectedGenre}
          onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the database</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

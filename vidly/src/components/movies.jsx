import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGoup from './common/listGroup';
import SearchBox from './searchBox';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class Movies extends Component {
  state = {
      movies: [],
      genres: [],
      pageSize: 4,
      searchQuery: '',
      selectedGenre: null,
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
    this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 })
  }

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }

  getPagedData = () => {
    const { 
      pageSize, 
      sortColumn, 
      currentPage, 
      movies: allMovies, 
      selectedGenre,
      searchQuery 
    } = this.state;
    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter(movie => movie.genre._id === selectedGenre._id);
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, movies };
  }

  render () {
    const { length: count } = this.state.movies;
    const { pageSize, sortColumn, currentPage, genres, selectedGenre, searchQuery } = this.state;
    const { totalCount, movies } = this.getPagedData();

    if (count === 0) {
      return <p>There are no movies in the database</p>;
    }

    return (
      <div className="row">
        <div className="col-3">
          <ListGoup 
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link to='/movies/new' className="btn btn-primary" style={{ marginBottom: 20 }}>New Movie</Link>
          <p>Showing {totalCount} movies in the database</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
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

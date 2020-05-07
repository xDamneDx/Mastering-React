import React, { Component } from 'react';
import auth from '../services/authService';
import { Link } from 'react-router-dom';
import Table from './common/table';
import Like from './common/like';

class MoviesTable extends Component {
  columns = [
    { path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
        key: 'like',
        content: movie => <Like onClick={() => this.props.onLike(movie)} liked={movie.liked} />
    }
  ];

  deleteColumn = {
    key: 'delete',
    content: movie => <button onClick={() => this.props.onDelete(movie)} type='button' className='btn btn-danger btn-sm'>Delete</button>
  }

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render () {
    const { movies, onSort, sortColumn } = this.props;

    return (
        <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={movies} />
    );
  }
}

export default MoviesTable;

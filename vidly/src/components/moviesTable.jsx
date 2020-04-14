import React, { Component } from 'react';
import Table from './common/table';
import Like from './common/like';

class MoviesTable extends Component {
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
        key: 'like',
        content: movie => <Like onClick={() => this.props.onLike(movie)} liked={movie.liked} />
    },
    {
        key: 'delete',
        content: movie => <button onClick={() => this.props.onDelete(movie)} type='button' className='btn btn-danger btn-sm'>Delete</button>
    }
  ];
  render () {
    const { movies, onSort, sortColumn } = this.props;

    return (
        <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={movies} />
    );
  }
}

export default MoviesTable;

import React, { Component } from 'react';
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';
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
      <table className='table'>
        <TableHeader onSort={onSort} sortColumn={sortColumn} columns={this.columns} />
        <TableBody columns={this.columns} data={movies} />
      </table>
    );
  }
}

export default MoviesTable;

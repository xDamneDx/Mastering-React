import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';

class Movies extends Component {
  state = {
      movies: getMovies()
  }

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

  render () {
    const { length: count } = this.state.movies;

    if (count === 0) {
      return <p>There are no movies in the database</p>;
    }

    return (
      <>
        <p>Showing {this.state.movies.length} movies in the database</p>
        <table className='table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rates</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td><Like onClick={() => this.handleLike(movie)} liked={movie.liked} /></td>
                <td><button onClick={() => this.handleDelete(movie)} type='button' className='btn btn-danger btn-sm'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Movies;

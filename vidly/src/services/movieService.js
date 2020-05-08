import http from './httpService';

const apiEndpoint = '/movies';
const movieURL = (id) => {
  return `${apiEndpoint}/${id}`;
};

export const getMovies = () => {
  return http.get(apiEndpoint);
};

export const getMovie = (movieId) => {
  return http.get(movieURL(movieId));
};

export const saveMovie = (movie) => {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieURL(movie._id), body);
  }

  return http.post(apiEndpoint, movie);
};

export const deleteMovie = (movieId) => {
  return http.delete(movieURL(movieId));
};

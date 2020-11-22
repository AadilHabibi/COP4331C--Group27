import GenericService from "./GenericService";
import { USER_API_URL } from "./constants.json";

class UserService extends GenericService {
  likeMovie = (id) =>
    new Promise((resolve, reject) => {
      this.post(`${USER_API_URL}/movie/like-movie`, { imdbID: id })
        .then((response) => {
          resolve(response?.status);
        })
        .catch((err) => reject(err));
    });
  dislikeMovie = (id) =>
    new Promise((resolve, reject) => {
      this.post(`${USER_API_URL}/movie/dislike-movie`, { imdbID: id })
        .then((response) => {
          resolve(response?.status);
        })
        .catch((err) => reject(err));
    });
  deleteMovie = (id) =>
    new Promise((resolve, reject) => {
      console.log(id);
      this.delete(`${USER_API_URL}/movie/delete-movie`, {
        data: { imdbID: id },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  getMovies = () =>
    new Promise((resolve, reject) => {
      this.get(`${USER_API_URL}/movie/likes-dislikes`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    });
}
export default new UserService();

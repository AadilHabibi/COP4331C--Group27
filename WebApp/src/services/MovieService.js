import { MOVIE_API_URL } from "./constants.json";
import _ from "lodash";
class MovieService {
  search = (name) =>
    new Promise((resolve, reject) => {
      fetch(`${MOVIE_API_URL}s=${name}`)
        .then((res) => res.json())
        .then((data) => {
          resolve(data?.Search);
        })
        .catch((err) => reject(err));
    });
  movieByID = (id) =>
    new Promise((resolve, reject) => {
      fetch(`${MOVIE_API_URL}i=${id}`)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
}
export default new MovieService();

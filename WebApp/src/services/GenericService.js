import axios from "axios";
axios.defaults.headers["x-auth-token"] = localStorage.getItem("token");

export default class GenericService {
  constructor() {}
  get = (url) =>
    new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  post = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  put = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .put(url, data)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  delete = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .delete(url, data)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
}

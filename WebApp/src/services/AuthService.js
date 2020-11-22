import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";
import { USER_API_URL } from "./constants.json";
import _ from "lodash";

class AuthService extends GenericService {
  login = (data) =>
    new Promise((resolve, reject) => {
      this.post(`${USER_API_URL}/auth`, data)
        .then((response) => {
          localStorage.setItem("token", response.token);
          resolve("Logged In");
        })
        .catch((err) => reject(err));
    });
  register = (data) =>
    new Promise((resolve, reject) => {
      this.post(`${USER_API_URL}/users`, {
        ..._.pick(data, ["name", "email", "password", "gender"]),
      })
        .then((response) => {
          localStorage.setItem("token", response.token);
          resolve("Logged In");
        })
        .catch((err) => reject(err));
    });
  getName = () =>
    new Promise((resolve, reject) => {
      this.get(`${USER_API_URL}/users/name`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  editInfo = (data) =>
    new Promise((resolve, reject) => {
      if (data.password !== data.confirm_password)
        reject({
          response: { data: "Password and confirm_password not mactch!" },
        });
      else {
        this.put(`${USER_API_URL}/users/edit`, {
          ..._.pick(data, ["name", "password"]),
        })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      }
    });
  resetPwd = (data) =>
    new Promise((resolve, reject) => {
      if (data.password !== data.confirm_password)
        reject({
          response: { data: "Password and confirm_password not mactch!" },
        });
      else {
        this.put(`${USER_API_URL}/users/reset-password`, {
          ..._.pick(data, ["email", "password"]),
        })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      }
    });
  logout = () => {
    localStorage.removeItem("token");
  };
  isLoggedIn = () => {
    return localStorage.getItem("token") ? true : false;
  };
  getLoggedInUser = () => {
    try {
      const jwt = localStorage.getItem("token");
      return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
  };
}

export default new AuthService();

const axios = require("axios");

module.exports = class Users {
  static all() {
    return axios.get("/users.json").then((res) => res.data);
  }
};

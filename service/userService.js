const { sendEmail, sendSMS } = require("./messageService");
const axios = require("axios");
const API_ENDPOINT = "https://jsonplaceholder.typicode.com";

exports.register = function register(user) {
  /* DB에 회원 추가 */
  const message = "회원 가입을 환영합니다";
  sendEmail(user.email, message);
  sendSMS(user.phone, message);
};

exports.deregister = function deregister(user) {
  /* DB에 회원 삭제 */
  const message = "탈퇴 처리 되었습니다.";
  sendEmail(user.email, message);
  sendSMS(user.phone, message);
};

exports.findOne = function findOne(id) {
  return axios
    .get(`${API_ENDPOINT}/users/${id}`)
    .then((response) => response.data);
};

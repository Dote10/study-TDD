exports.sendEmail = function sendEmail(email, message) {
  /* 이메일 보낸는 코드 */
  console.log("email", email);
  console.log("message", message);
};

exports.sendSMS = function sendSMS(phone, message) {
  /* 문자를 보내는 코드 */
  console.log("phone", phone);
  console.log("message", message);
};

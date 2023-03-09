const { register, deregister } = require("../../service/userService");
const { sendEmail, sendSMS } = require("../../service/messageService");

jest.mock("../../service/messageService");

beforeEach(() => {
  sendEmail.mockClear();
  sendSMS.mockClear();
});

const user = {
  email: "test@email.com",
  phone: "012-345-6789",
};

test("register send messeges", () => {
  register(user);

  expect(sendEmail).toBeCalledTimes(1);
  expect(sendEmail).toBeCalledWith(user.email, "회원 가입을 환영합니다");

  expect(sendSMS).toBeCalledTimes(1);
  expect(sendSMS).toBeCalledWith(user.phone, "회원 가입을 환영합니다");
});

test("deregister send messeges", () => {
  deregister(user);

  expect(sendEmail).toBeCalledTimes(1);
  expect(sendEmail).toBeCalledWith(user.email, "탈퇴 처리 되었습니다.");

  expect(sendSMS).toBeCalledTimes(1);
  expect(sendSMS).toBeCalledWith(user.phone, "탈퇴 처리 되었습니다.");
});

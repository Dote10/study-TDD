const axios = require("axios");
const userService = require("../../service/userService");

test("FindOne returns a user", async () => {
  const user = await userService.findOne(1);
  expect(user).toHaveProperty("id", 1);
  expect(user).toHaveProperty("name", "Leanne Graham");
});

test("findOn ftches data from the API endpoint", async () => {
  const spyGet = jest.spyOn(axios, "get");
  await userService.findOne(1);
  expect(spyGet).toBeCalledTimes(1);
  expect(spyGet).toBeCalledWith("https://jsonplaceholder.typicode.com/users/1");
});

test("findOne returns what axios get returns", async () => {
  axios.get = jest
    .fn()
    .mockResolvedValue({ data: { id: 1, name: "surge100" } });

  const user = await userService.findOne(1);
  expect(user).toHaveProperty("id", 1);
  expect(user).toHaveProperty("name", "surge100");
});

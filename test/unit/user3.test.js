const axios = require("axios");
const Users = require("../../lib/users");

jest.mock("axios");

describe("Mocking Mocules", () => {
  test("should fetch users", async () => {
    const users = [{ name: "Bob" }];
    const res = { data: users };
    axios.get.mockResolvedValue(res);
    //아래 코드와 동일하게 동작
    //axios.get.mockImplementation(()=> Promise.resolve(res))

    const result = await Users.all();
    expect(result).toEqual(users);
  });
});

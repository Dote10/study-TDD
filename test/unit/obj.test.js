const { calculator } = require("../../lib/obj");

describe("Jest Object jest.spyOn() ", () => {
  test("spying", () => {
    const spyFn = jest.spyOn(calculator, "add");

    const result = calculator.add(2, 3);

    expect(spyFn).toBeCalledTimes(1);
    expect(spyFn).toBeCalledWith(2, 3);
    expect(result).toBe(5);
  });
});

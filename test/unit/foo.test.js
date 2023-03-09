const foo = require("../../lib/foo");

jest.mock("../../lib/foo");

//mock 함수 구현
describe("Mock Implementations", () => {
  test("test jest fn", () => {
    const myMockFn = jest.fn((callback) => callback(null, true));
    //myMockFn에 인자로 함수를 넣으면 callback이라는 이름을 갖는 함수가되고
    //해당 함수에 첫번째 인자로 null을 두번째 인자로 true를 넣은뒤 실행되고
    //실행된 함수의 결과 값이 반환 된다.

    expect(myMockFn((err, val) => val)).toBeTruthy();
  });

  test("test mock implementation", () => {
    foo.mockImplementation(() => {
      console.log("Mock implementation");
      return 77;
    });

    expect(foo()).not.toBe(42); // Actual implementation이 아닌,
    expect(foo()).toBe(77); // Mock implementation이 실행 된다.
  });
});

//일회용 mock함수
describe("Mock Implementation Once", () => {
  test("test mockImplementationOnce without default", () => {
    const myMockFn = jest
      .fn()
      .mockImplementationOnce((callback) => callback(null, true))
      .mockImplementationOnce((callback) => callback(null, false));

    const callbackFn = (err, val) => val;

    expect(myMockFn(callbackFn)).toBeTruthy();
    expect(myMockFn(callbackFn)).toBeFalsy();
    expect(myMockFn(callbackFn)).toBeUndefined();
  });
});

test("test mockImplementationOnce with default", () => {
  const myMockFn = jest
    .fn((callback) => callback(null, "default"))
    .mockImplementationOnce((callback) => callback(null, true))
    .mockImplementationOnce((callback) => callback(null, false));

  const callbackFn = (err, val) => val;

  expect(myMockFn(callbackFn)).toBeTruthy();
  expect(myMockFn(callbackFn)).toBeFalsy();
  expect(myMockFn(callbackFn)).toBe("default");
});

//Mock 체이닝
describe("Mock Return This", () => {
  test("test mockReturnThis", () => {
    const myObj = {
      myMethod: jest.fn().mockReturnThis(),
      // myMethod: jest.fn(function(){
      //   return this;
      // })
      log: jest.fn(() => "logging"),
    };

    expect(myObj.myMethod()).toEqual(myObj);
    expect(myObj.myMethod().log()).toBe("logging");
  });
});

//Mock Name
describe("Mock Name", () => {
  test("test display mock function name", () => {
    const myMockFn = jest.fn().mockName("namedMockFn");
    //myMockFn();
    expect(myMockFn).toHaveBeenCalled(); //호출이되는지 테스트
  });
});

// 이름 지정 안한 경우
// Error: expect(jest.fn()).toHaveBeenCalled()

// 이름 지정 한 경우
// Error: expect(namedMockFn).toHaveBeenCalled()

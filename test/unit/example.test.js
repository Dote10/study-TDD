beforeEach(() => {});

//mock.instance Property(속성)
describe("mock property", () => {
  const myMock = jest.fn(function (_name) {
    this.name = _name;
  });

  test("track the value of this for each call", () => {
    const a = new myMock("a function");
    const b = {};
    const bound = myMock.bind(b);
    bound("b function");

    expect(myMock.mock.instances[0]).toEqual(a);
    expect(myMock.mock.instances[1]).toEqual(b);
  });
});

//mock.calls Property 속성
describe("Test self implemented forEach function", () => {
  function forEach(items, callback) {
    for (let i = 0; i < items.length; i++) {
      callback(items[i]);
    }
  }

  const mockCallback = jest.fn((x) => 42 + x);
  forEach([0, 1], mockCallback);

  //mockCallback.mock.calls
  //[[0],[1]]
  // mockCallback 함수가 여러번 불려 질수 있으므로 불려진 횟수 만큼의 item이 있는 배열을을 가진다.
  // 함수에 인수가 여러개 일수 있으므로 불려진 횟수의 만큼의 item은 배열 값으로 존재한다.

  // 호출 횟수
  test("The mock function is called twice", () => {
    expect(mockCallback.mock.calls.length).toBe(2);
  });

  //처음 불려진 함수의 첫번째 인자
  test("The first argument of the first call to the functions was 0", () => {
    expect(mockCallback.mock.calls[0][0]).toBe(0);
  });

  //두번째 불려진 함수의 첫번째 인자
  test("The first argument of the first call to the functions was 0", () => {
    expect(mockCallback.mock.calls[1][0]).toBe(1);
  });

  //첫번째 불려진 함수의 return 값
  test("The return value of the first call the function was 42", () => {
    expect(mockCallback.mock.results[0].value).toBe(42);
  });
});

//Mock Return Values
describe("test mock return values", () => {
  const myMock = jest.fn();
  expect(myMock()).toEqual(undefined);

  myMock.mockReturnValueOnce(10).mockReturnValueOnce("x").mockReturnValue(true);

  test("test first call", () => {
    expect(myMock()).toBe(10);
  });

  test("test second call", () => {
    expect(myMock()).toBe("x");
  });

  test("test third call", () => {
    expect(myMock()).toBeTruthy();
  });

  test("test fourth call", () => {
    expect(myMock()).toBeTruthy();
  });
});

//mockReturnValueOnce
describe("coutinuation-passing style", () => {
  const filterTestFn = jest.fn();
  filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

  const result = [11, 12].filter((num) => filterTestFn(num));
  //filter는 배열을 순서대로 인자로 들어온 callback함수에 인자로 넣고
  //callback 함수가 true를 return하면 인자함수에 인자로 들어온 값을 반환하고
  //callback 함수가 false를 return하면 인자함수에 인자로 들어온 값을 반환하지 않는다.
  //배열의 .filter의 return 값은 배열 type이다.

  test("test result", () => {
    expect(result).toEqual([11]);
  });

  test("test call arguments", () => {
    expect(filterTestFn.mock.calls).toEqual([[11], [12]]);
  });
});

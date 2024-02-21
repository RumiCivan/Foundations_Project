const { service } = require("../service/service");

// create a mock function for the service function
const mockLogin = jest.fn();
const mockRegister = jest.fn();
const mockViewList = jest.fn();
const mockSubmit = jest.fn();
const mockUpdate = jest.fn();

// mock a sample ticket table
const sampleTable = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
];

test("testing service view list function", () => {
  // configure the mock function to return a fixed value
  mockViewList.mockReturnValue(sampleTable);

  // Call the calculateTotal function with the sample cart
  const res = mockViewList(sampleTable);

  // Assert that the mock function was called with the sample cart
  expect(mockViewList).toHaveBeenCalledWith(sampleTable);

  // Assert that the totalPrice mathces the expected value
  expect(res).toBe(sampleTable);
});

afterEach(() => {
  mockCalculateTotal.mockClear();
});

const { submitTicket, viewList } = require("../repository/EmployeeDAO");
const { viewPendingList, updateTicket } = require("../repository/ManagerDAO");
const { login, register } = require("../repository/AuthenticationDAO");

const service  = require("../service/service");

// mock sample tables
const sampleUser = [
  { id: 10, username: "Moria", role: "Employee" },
];
const sampleTicket = [
  { id: 1, amout: 1000, description: "Give me money!", status: "Pending", username : "Moria" },
];

// create mock functions for the DAOs function
const mockLogin = jest.fn();
const mockRegister = jest.fn();
const mockViewList = jest.fn((sampleTicket) => sampleTicket);
const mockPendingList = jest.fn()
const mockSubmit = jest.fn();
const mockUpdate = jest.fn();
const mockAuthenticateToken = jest.fn();
const mockAuthenticateAdminToken = jest.fn();

// mock?
jest.mock("../repository/EmployeeDAO", () => ({
  viewList : mockViewList,
  submitTicket : mockSubmit
}))
jest.mock("../repository/ManagerDAO", () => ({
  viewPendingList : mockPendingList,
  updateTicket : mockUpdate
}))
jest.mock("../repository/AuthenticationDAO", () => ({
  login : mockLogin,
  register : mockRegister
}))

test("testing service view list function", async() => {
  // configure the mock function to return a fixed value
  
  mockViewList.mockReturnValue(sampleTicket);

  // Call the function with the sample table
  const res = await service.viewList(sampleUser);

  // Assert that the mock function was called with the sample
  expect(mockViewList).toHaveBeenCalledWith(sampleUser);

  // Assert that the totalPrice mathces the expected value
  expect(res).toEqual(sampleTicket);
});

// describe("testing service functions", () => {
//   test("view list return a list", () => {
//       // arrange and act
//       let result = viewList();
//       let expectedRes = {};
//       // assert
//       expect(result).toBe(expectedRes);
//   });
//   test("view list return a pending list", () => {
//       // arrange and act
//       let result = viewPendingList();
//       let expectedRes = {};
//       // assert
//       expect(result).toBe(expectedRes);
//   });
//   test("testing submit ticket function", () => {
//       // arrange and act
//       let ticket = {
//         amount : 999,
//         description : "test",
//       }
//       let result = submitTicket(ticket);
//       let expectedRes = ticket
//       // assert
//       expect(result.amount).toBe(expectedRes.amount);
//       expect(result.description).toBe(expectedRes.description);
//   });
// });


afterEach(() => {
  mockLogin.mockClear();
  mockRegister.mockClear();
  mockViewList.mockClear();
  mockPendingList.mockClear();
  mockSubmit.mockClear();
  mockUpdate.mockClear();
  mockAuthenticateToken.mockClear();
  mockAuthenticateAdminToken.mockClear();
});

const employeeDAO = require("../repository/EmployeeDAO");
const managerDao = require("../repository/ManagerDAO");
const authenticationDAO = require("../repository/AuthenticationDAO");

const service  = require("../service/service");

// mock sample tables
const sampleUser = [
  { id: 10, username: "Moria", password : "nn", role: "Employee" },
];
const sampleTicket = [
  { id: 1, amout: 1000, description: "Give me money!", status: "Pending", username : "Moria" },
];

// create mock functions for the DAOs function
// const mockLogin = jest.fn();
// const mockRegister = jest.fn();
// const mockViewList = jest.fn((sampleUser) => sampleTicket);
// const mockPendingList = jest.fn()
// const mockSubmit = jest.fn();
// const mockUpdate = jest.fn();
// const mockAuthenticateToken = jest.fn();
// const mockAuthenticateAdminToken = jest.fn();

// mock?
jest.mock('../repository/EmployeeDAO');
jest.mock('../repository/ManagerDAO');
jest.mock('../repository/AuthenticationDAO');

describe('Service Test', () => {
  test("testing service view list function", async() => {
    // configure the mock function to return a fixed value
    
    employeeDAO.viewList.mockResolvedValue([])
  
    // Call the function with the sample data
    const res = await service.viewList();
  
    // Assert that the mock function was called with the sample
    expect(employeeDAO.viewList).toHaveBeenCalledTimes(1);
  
    // Assert that the result mathces the expected value
    expect(res).toEqual([]);
  });
  test("testing service submit function", async() => {
    // configure the mock function to return a fixed value
    
    employeeDAO.submitTicket.mockResolvedValue("OK")
  
    // Call the function with the sample data
    const res = await service.submitTicket({amount : 1000, description:"jest test", username: "jest"});
  
    // Assert that the mock function was called with the sample
    expect(employeeDAO.submitTicket).toHaveBeenCalledTimes(1);
  
    // Assert that the result mathces the expected value
    expect(res).toEqual("OK");
  });
  test("testing service pending list function", async() => {
    // configure the mock function to return a fixed value
    
    managerDao.viewPendingList.mockResolvedValue("OK")
  
    // Call the function with the sample data
    const res = await service.viewPendingList({Status : "Pending"});
  
    // Assert that the mock function was called with the sample
    expect(managerDao.viewPendingList).toHaveBeenCalledTimes(1);
  
    // Assert that the result mathces the expected value
    expect(res).toEqual("OK");
  });
  test("testing service login function", async() => {
    // configure the mock function to return a fixed value
    
    authenticationDAO.login.mockResolvedValue("Login Success!")
  
    // Call the function with the sample data
    const res = await service.login({username : "Rumi"});
  
    // Assert that the mock function was called with the sample
    expect(authenticationDAO.login).toHaveBeenCalledTimes(1);
  
    // Assert that the result mathces the expected value
    expect(res).toEqual("Login Success!");
  });
  test("testing service register function", async() => {
    // configure the mock function to return a fixed value
    
    authenticationDAO.register.mockResolvedValue("Registration Success!")
  
    // Call the function with the sample data
    const res = await service.register("Rumi", "000", "Manager");
  
    // Assert that the mock function was called with the sample
    expect(authenticationDAO.register).toHaveBeenCalledTimes(1);
  
    // Assert that the result mathces the expected value
    expect(res).toEqual("Registration Success!");
  });

})


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
  // mockLogin.mockClear();
  // mockRegister.mockClear();
  // mockViewList.mockClear();
  // mockPendingList.mockClear();
  // mockSubmit.mockClear();
  // mockUpdate.mockClear();
  // mockAuthenticateToken.mockClear();
  // mockAuthenticateAdminToken.mockClear();
});

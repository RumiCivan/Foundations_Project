const managerDao = require("../repository/ManagerDAO");
const employeeDAO = require("../repository/EmployeeDAO");
const authenticationDAO = require("../repository/AuthenticationDAO");
const uuid = require("uuid");

// for jwt and bcrypt
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "Misty-Freezingflame";

async function register(username, password, role){

    return authenticationDAO.register(username, password, role);
}

async function login(username, password){

    return authenticationDAO.login(username, password);
}

// for employee
async function viewList(){

    return employeeDAO.viewList();
}

async function sumbitTicket(ticket){

    return employeeDAO.submitTicket(ticket);
}

// for manager
async function viewPendingList(){

    return managerDao.viewPendingList();
}

async function updateTicket(ticketID, status) {
    // TODO prevent manager update processed ticket
    return managerDao.updateTicket(ticketID, status);
}

function validateTicket(data) {
    if(!data.amount || !data.description){
        return false;
    }
    return true;
}

// authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      res.status(401).json({ message: "Unauthorized Access" });
      return;
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        res.status(403).json({ message: "Forbidden Access" });
        return;
      }
      req.user = user;
      next();
    });
  }
  
  function authenticateAdminToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      res.status(401).json({ message: "Unauthorized Access" });
      return;
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      console.log(user.role);
      if (err || user.role !== "admin") {
        res.status(403).json({ message: "Forbidden Access" });
        return;
      }
      req.user = user;
      next();
    });
  }

module.exports = {
    register,
    login,
    sumbitTicket,
    updateTicket,
    viewList,
    viewPendingList,
    authenticateToken,
    authenticateAdminToken
}
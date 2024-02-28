const managerDao = require("../repository/ManagerDAO");
const employeeDAO = require("../repository/EmployeeDAO");
const authenticationDAO = require("../repository/AuthenticationDAO");
const uuid = require("uuid");

async function register(username, password, role){

    if(username && password && role){
      let msg = await authenticationDAO.register({
        id : uuid.v4(),
        username : username,
        password : password,
        role : role
      })
      console.log("New user registering...")
      return msg;
    }
    else{
      return "Missing Information";
    }
    
}

async function login(username){
  
  if(username){
    const data = authenticationDAO.login(username)
    return data;
  } else {
    console.log("Missing Information");
    return;
  }
  
}

// for employee
async function viewList(name){
    const item = await employeeDAO.viewList(name)
    return item;
}

async function submitTicket(data){

    if (validateTicket(data)) {
      let ticket = await employeeDAO.submitTicket({
        ticketID: uuid.v4(),
        username: data.username,
        amount: data.amount,
        description : data.description,
        status : "Pending"
      });
      console.log("Ticket transmitting to server......")
      return ticket;
    }
  
    return "Missing Infomation";
}

// for manager
async function viewPendingList(){
    const item = await managerDao.viewPendingList()
    return item;
}

async function updateTicket(data) {
    // TODO prevent manager update processed ticket
    const msg = await managerDao.updateTicket(data.ticketID, data.status)
    return msg;
}

function validateTicket(data) {
    if(!data.amount || !data.description || !data.username){
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
    submitTicket,
    updateTicket,
    viewList,
    viewPendingList,
    authenticateToken,
    authenticateAdminToken
}
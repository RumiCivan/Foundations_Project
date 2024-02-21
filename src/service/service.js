const managerDao = require("../repository/ManagerDAO");
const employeeDAO = require("../repository/EmployeeDAO");
const authenticationDAO = require("../repository/AuthenticationDAO");
const uuid = require("uuid");

async function register(username, password){

    return authenticationDAO.register(username, password);
}

async function login(username, password){

    return authenticationDAO.login(username, password);
}

// for employee
async function viewList(){

    return employeeDAO.viewList();
}

async function sumbitTicket(ticket){

    return employeeDAO.submitTicket();
}

// for manager
async function viewPendingList(){

    return managerDao.viewPendingList();
}

async function updateTicket(ticketID) {
    
    return managerDao.updateTicket();
}

function validateTicket(data) {
    if(!data.amount || !data.description){
        return false;
    }
    return true;
}

module.exports = {
    register,
    login,
    sumbitTicket,
    updateTicket,
    viewList,
    viewPendingList,
}
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
 
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");
 
const client = new DynamoDBClient({ region: "us-west-1" });
 
// getting the documentClient
const documentClient = DynamoDBDocumentClient.from(client);
//documentClient.send(GetCommand)

// TODO: create const for the list(?)

function register(username, password){
    
    // TODO: check if username already existed


    
    const newUser = {
        username,
        password
    }

    // TODO: push new user info to server

}

function login(username, password){
    // TODO: pull info from server and verify

}

function viewProcessedList(){
    // TODO: pull processed list from server and return
}

function viewPendingList(){
    // TODO: pull pending list from server and return
}

function addTicket(amount, description){
    const newTicket = {
        amount: parseFloat(price).toFixed(2),
        description,
        ticketStatus : "Pending",
    };

    // TODO: push new ticket to the server here

}

function statusUpate(index, update){
    // TODO pull ticket from server

    const newTicket = {
        amount,
        description,
        ticketStatus : update
    }
}

function ticketQueue(index){
    // moving ticket between pending list and processed list


}

module.exports = {
    register,
    login,
    addTicket,
    statusUpate,
    ticketQueue,
    viewPendingList,
    viewProcessedList
}
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
 
const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb")
 
const client = new DynamoDBClient({ region: "us-west-1" });
 
// getting the documentClient
const documentClient = DynamoDBDocumentClient.from(client);

// const getCommand = new GetCommand({
//   TableName: "userInfo",
//   Key: { userInfo_partition_key: "002" },
// });

// promise
documentClient
  .send(getCommand)
  .then((data) => console.log(data.Item))
  .catch((err) => console.error(err));

// TODO: create const for the list(?)
async function register(username, password, role){
    
    const qcommand = new QueryCommand({
        TableName: "userInfo",
        KeyConditionExpression: "#username = :username",
        ExpressionAttributeNames: { "#username": "username" },
        ExpressionAttributeValues: { ":username": { S: username } },
    });
      
    try {
        // TODO: check if username already existed
        const data = await documentClient.send(qcommand);
        if(Object.keys(data).length === 0){
            // TODO: push new user info to server
            const pcommand = new PutCommand({
                TableName: "userInfo",
                username: username,
                password : password,
                role : role
            });
            try {
                const data = await documentClient.send(pcommand);
                return JSON.stringify(`Registration Success! \n ${data}`);
            } catch (error) {
                console.error("Unable to register User. Error:", JSON.stringify(error, null, 1));
                return null;
            }           
        }
        else{
            return JSON.stringify("Username is already taken!");
        }
        
    } catch (error) {
        console.error(error);
        return null;
    }   
}

function login(username, password){
    // TODO: pull info from server and verify
    const qcommand = new QueryCommand({
        TableName: "userInfo",
        KeyConditionExpression: "#username = :username",
        ExpressionAttributeNames: { "#username": "username" },
        ExpressionAttributeValues: { ":username": { S: username } },
    });
    try {
        const data = documentClient.send(qcommand);
        if(data.username === username && data.password === password){
            return JSON.stringify(`Login Success! \n ${data}`);
        }
        else{
            return JSON.stringify(`Wrong Credentials! \n ${data}`);
        }
    } catch (error) {
        return null;
    }

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
        description : description,
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
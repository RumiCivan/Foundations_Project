const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand
} = require("@aws-sdk/lib-dynamodb")
 
const client = new DynamoDBClient({ region: "us-west-1" });
 
// getting the documentClient
const documentClient = DynamoDBDocumentClient.from(client);

// for jwt and bcrypt
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "Misty-Freezingflame";

// user data
const users = {
    
}

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
        if(!data){
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

module.exports = {
    login,
    register
}
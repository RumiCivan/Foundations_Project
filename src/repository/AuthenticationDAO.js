const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
  ScanCommand
} = require("@aws-sdk/lib-dynamodb");
const { log } = require("winston");
 
const client = new DynamoDBClient({ region: "us-west-1" });
 
// getting the documentClient
const documentClient = DynamoDBDocumentClient.from(client);

// // for jwt and bcrypt
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const secretKey = "Misty-Freezingflame";


async function register(newUser){
    console.log(newUser);
    const command = new QueryCommand({
        TableName: "Users",
        IndexName: "username-index",
        //FilterExpression: "#username = :username",
        KeyConditionExpression : "#username = :username",
        ExpressionAttributeNames: { "#username": "username" },
        ExpressionAttributeValues: { ":username": newUser.username },
    });
      
    try {
        // TODO: check if username already existed
        let data = await documentClient.send(command);

        if(data.Count === 0){
            // TODO: push new user info to server
            const pcommand = new PutCommand({
                TableName: "Users",
                Item: {
                    id : newUser.id,
                    username: newUser.username,
                    password : newUser.password,
                    role : newUser.role
                }
            });
            const user = await documentClient.send(pcommand);
            return true;       
        }
        else{
            return false;            
        }
        
    } catch (error) {
        console.error(error);
        return null;
    }   
}

async function login(username){
    // TODO: pull info from server and verify
    const command = new QueryCommand({
        TableName: "Users",
        IndexName: "username-index",
        //FilterExpression: "#username = :username",
        KeyConditionExpression : "#username = :username",
        ExpressionAttributeNames: { "#username": "username"},
        ExpressionAttributeValues: { ":username": username},
    });
    try {
        const data = await documentClient.send(command);
        let user = data;
        
        if(user.Count !== 0){
            return user.Items[0];
        }
        else{
            console.log("ERROR!");
            return false;
        }
    } catch (error) {
        return null;
    }

}

module.exports = {
    login,
    register
}
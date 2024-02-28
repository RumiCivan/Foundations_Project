const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
  ScanCommand
} = require("@aws-sdk/lib-dynamodb")
 
const client = new DynamoDBClient({ region: "us-west-1" });
 
// getting the documentClient
const documentClient = DynamoDBDocumentClient.from(client);

const userTable = "Users";
const ticketTable = "Tickets";

async function viewList(name){
    // TODO: pull list from server and return
    // const getCommand = new GetCommand({
    //     TableName : ticketTable,
    //     Key : {username : name}
    // });
    const command = new ScanCommand({
        TableName : ticketTable,
        FilterExpression: "#username = :name",
        //KeyConditionExpression : "#username = :name",
        ExpressionAttributeNames: {"#username": "username"},
        ExpressionAttributeValues: {':name': name}
    });

    try {
        const data = await documentClient.send(command);
        return data;
    } catch (error) {
        return null;
    }
}

async function submitTicket(ticket){
    const updateCommand = new PutCommand({
        TableName : ticketTable,
        Item : {
            ticketID: ticket.ticketID,
            username: ticket.username,
            amount: ticket.amount,
            description : ticket.description,
            status : "Pending"
        }
    })

    try {
        const data = await documentClient.send(updateCommand);
        console.log(data);
        return "Submit Success!";
        
    } catch (error) {
        return null;
    }
}

module.exports = {
    viewList,
    submitTicket
};

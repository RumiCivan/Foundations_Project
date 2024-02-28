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

//
async function viewPendingList(){
    // TODO: pull list from server and return

    // const getCommand = new GetCommand({
    //     TableName : ticketTable,
    //     Key : {status : "Pending"}
    // });
    const command = new ScanCommand({
        TableName : ticketTable,
        FilterExpression: "#status = :status",
        //KeyConditionExpression: "#status = :status",
        ExpressionAttributeNames: {"#status": "status"},
        ExpressionAttributeValues: {':status': "Pending" }
    });
    try {
        const data = await documentClient.send(command);
        console.log(data);
        return data;
    } catch (error) {
        return null;
    }
}

async function updateTicket(id, status) {
    const updateCommand = new UpdateCommand({
        TableName : ticketTable,
        Key : {ticketID : id},
        UpdateExpression : "set #status = :status",
        ExpressionAttributeNames : {"#status" : "status"},
        ExpressionAttributeValues:{":status" : status},
        ReturnValues : "ALL_NEW"
    });

    try {
        const data = await documentClient.send(updateCommand);
        console.log(data);
        return "Update Success!";
    } catch (error) {
        return null;
    }

}

module.exports = {
    viewPendingList,
    updateTicket
}
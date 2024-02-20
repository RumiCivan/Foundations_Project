const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-west-1"});

// getting the documentClient
const documentClient = DynamoDBDocumentClient.from(client);

const userTable = "Users";
const ticketTable = "Tickets";



async function viewList(userID){
    // TODO: pull list from server and return
    const getCommand = new GetCommand({
        TableName : ticketTable,
        Key : {userID : userID}
    });
    try {
        const data = await documentClient.send(getCommand);
        console.log(data);
    } catch (error) {
        return null;
    }
}

async function submitTicket(ticket){
    const putCommand = new PutCommand({
        TableName : ticketTable,
        Item : ticket
    })

    try {
        const data = await documentClient.send(putCommand);
        console.log(data);
        
    } catch (error) {
        return null;
    }
}

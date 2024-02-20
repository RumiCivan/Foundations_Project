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

const getCommand = new GetCommand({
  TableName: userTable,
  Key: { id : "1" },
});

// promise

documentClient
  .send(getCommand)
  .then((data) => console.log(data.Item))
  .catch((err) => console.error(err));

// async
getTickets("1");

async function getTickets(id){
    const getCommand = new GetCommand({
        TableName : ticketTable,
        Key : {ticketID : id}
    });
    try {
        const data = await documentClient.send(getCommand);
        console.log(data);
    } catch (error) {
        return null;
    }
}

//
const ticket = {
    ticketID : "2",
    amount : 11000,
    description : "I need money!",
    status : "Pending"
}

submitTicket(ticket);

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

//

updateTicket("2");

async function updateTicket(id) {
    const updateCommand = new UpdateCommand({
        TableName : ticketTable,
        Key : {ticketID : id},
        UpdateExpression : "set #status = :status",
        ExpressionAttributeNames : {"#status" : "status"},
        ExpressionAttributeValues:{
            ":status" : "Denied"
        },
        //ReturnValues : "ALL_NEW"
    });

    try {
        const data = await documentClient.send(updateCommand);
        console.log(data);
        //return data;
    } catch (error) {
        return null;
    }

}

//
deleteTicket("2")

async function deleteTicket(id){
    const deleteCommand = new DeleteCommand({
        TableName : ticketTable,
        Key : {ticketID : id},
    })
    try {
        const data = await documentClient.send(deleteCommand);
        console.log(data);
    } catch (error) {
       return null; 
    }
}

const http = require("http");
const { register,
    login,
    addTicket,
    statusUpate,
    ticketQueue,
    viewPendingList,
    viewProcessedList    
    } = require("./ticketFunctions");
    
const { parseArgs } = require("util");

const port = 3000;

const server = http.createServer((req, res) => {
    let body = "";

    req.on('data', (chunk) => {
        body += chunk;
    })
    .on('end', () => {
        body = body.length > 0 ? JSON.parse(body) : {};
        const contentType = {"Content-Type" : "application/json"};
    
        if(req.url === "/register"){
            const {username, password} = body; 
            //register(username, password);

            res.writeHead(200, contentType);
            res.end(register(username, password));
        }
        else if(req.url === "login"){
            const {username, password} = body;
            //login(username, password);

            res.writeHead(200, contentType);
            res.end(login(username, password));
        }
        // after user has entered the home page
        else if (req.url.startsWith("/home")) {

            let index = parseInt(req.url.split("/")[2]); // index for getting info from server tables
            let role = req.url.split("/")[0]; // indicate user role; employee or manager
            
            switch(req.method){
                case "GET":
                    if(role === "employee"){
                        viewProcessedList(); // get processed list
                        //res.writeHead(201, contentType);
                        //res.end(JSON.stringify({ message }));
                    }
                    else if(role === "manager"){
                        viewPendingList(); // get pending list
                        //res.writeHead(201, contentType);
                        //res.end(JSON.stringify({ message }));
                    }

                    const getMessage = "OK";
                    res.writeHead(200, contentType);
                    res.end(JSON.stringify({ getMessage }));
                    break;

                case "POST":
                    // user post new ticket
                    const {amount, description} = body;
                    addTicket(amount, description);

                    const addMessage = "Ticket Submitted";
                    res.writeHead(201, contentType);
                    res.end(JSON.stringify({ addMessage }));
                    break;

                case "PUT":
                    // manager post update on pending ticket
                    statusUpate(index);

                    const putMessage = "Ticket Updated";
                    res.writeHead(200, contentType);
                    res.end(JSON.stringify({ message, shoppingList }));
                    break;

            }
        }   
    
    })
});

server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});  

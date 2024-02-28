const express = require("express");
const router = express.Router();

const service = require("../service/service");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "Misty-Freezingflame";

// login and register
router.post("/register", async (req, res) => {
  //let { username, password, role } = req.body;
  let username = req.body.username;
  let password = req.body.password;
  let role = req.body.role;

  const saltRounds = 10;
  password = await bcrypt.hash(password, saltRounds);
  console.log(password);

  const msg = await service.register(username, password, role);
  if(msg){
    res.status(201).json({ message: "Registration Success!" });
  } else{
    res.status(400).json({ message : "Username is already taken."});
  }
});

router.post("/login", async (req, res) => {
  //const { username, password } = req.body;
  let username = req.body.username;
  let password = req.body.password;

  const user = await service.login(username);
  
  console.log(user);
 
  if (!user || !( await bcrypt.compare(password, user.password))) {
    console.log(password, user.password);
    res.status(401).json({ message: "Invalid Credentials" });
  } else {
    // generate a JWT token

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      secretKey,
      {
        expiresIn: "15m", // token expiration time (adjust as needed)
      }
    );
    res.json({ token });
  }
});

// view ticket list by employee
router.get("/lists",authenticateToken, async (req, res) => {
    const username = req.user.username;
    console.log(req.user);

  if (username) {
    const item = await service.viewList(username);
    res.status(200).json({message: `View ticket list by ${username}`, item});
  }
});
// submit ticket
router.post("/submit",authenticateToken, async (req, res) => {
  const data = req.body;
  
  if (data) {
    let message2 = await service.submitTicket(data);
    res.status(201).json({ message: "Done", message2 });
  } else {
    res.status(400).json({ message: "Failed to submit ticket", data: req.body });
  }
});

// Should be protected
// view ticket list by manager
router.get("/pending",authenticateManagerToken, async (req, res) => {

  const item = await service.viewPendingList();
  res.status(200).json({message: `View ticket list by Manager`, item});
});
// update ticket
router.put("/update", async (req, res) => {
    // TODO: authentication needed.
    const data = req.body;
    if(data) {
      let message2 = await service.updateTicket(data)
        res.status(201).json({ message : "Ticket Updating", message2 });
    } else {
        res.status(400).json({ message : "Failed to update ticket", data : req.body })
    }
})

// authentication functions
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized Access" });
    return;
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Forbidden Access" });
      return;
    }
    req.user = user;
    next();
  });
}

function authenticateManagerToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized Access" });
    return;
  }

  jwt.verify(token, secretKey, (err, user) => {
    console.log(user.role);
    if (err || user.role !== "Manager") {
      res.status(403).json({ message: "Forbidden Access" });
      return;
    }
    req.user = user;
    next();
  });
}

module.exports = router;
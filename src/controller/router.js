const express = require("express");
const router = express.Router();

const service = require("../service/service");

// login and register
router.post("/register", async (req, res) => {
  let { username, password, role } = req.body;

  //const saltRounds = 10;

  //password = await bcrypt.hash(password, saltRounds);
  //console.log(password);

  //const newUser = { username, password, role };
  //users.push(newUser);

  const newUser = await service.register(username, password, role)

  res.status(201).json({ message: "User registered successfully", newUser });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // find the user in the database
  const user = users.find((user) => user.username === username);

  const credentials = service.login(username, password);

  if (!user || !(await bcrypt.compare(password, credentials.password))) {
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

// view ticket list
router.get("/viewList", async (req, res) => {
    const username = req.query.name;
    // TODO: identify the role
    // then decide what list they can see
    // probably need to figure out hwo to use multiple parameter
  if (username) {
    const item = await service.viewList(username);
    res.status(200).json({message: `View ticket list by username ${username}`, item});
  }
});

// submit ticket
router.post("/submit", async (req, res) => {
  const data = await service.sumbitTicket(req.body);
  if (data) {
    res.status(201).json({ message: "Ticket Submitted", data });
  } else {
    res
      .status(400)
      .json({ message: "Failed to submit ticket", receivedData: req.body });
  }
});

// update ticket
router.put("/update", async (req, res) => {
    const data = await service.updateTicket(req.body);
    if(data) {
        res.status(201).json({ message : "Ticket Updated", data });
    } else {
        res.status(400).json({ message : "Failed to update ticket", data : req.body })
    }
})

module.exports = router;
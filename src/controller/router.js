const express = require("express");
const router = express.Router();

const service = require("../service/service");

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
const express = require("express");
const app = express();
const router = require("./controller/router");

app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Incoming ${req.method} : ${req.url}`);
  next();
});

const logger = require("./util/logger");

const PORT = 3000;

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

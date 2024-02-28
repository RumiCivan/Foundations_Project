const express = require("express");
const app = express();
const router = require("./src/controller/router");
const logger = require("./src/util/logger");
const PORT = 3000;

app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

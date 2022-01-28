const express = require("express");
const app = express();
const port = 7777;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

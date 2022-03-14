const express = require("express");

const mongoose = require("mongoose");
const { mongoURI } = require("./config/keys");
const app = express();

// db
// connect to
mongoose
  .connect(mongoURI)
  .then(() => console.log("mongo is ok"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello world23");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

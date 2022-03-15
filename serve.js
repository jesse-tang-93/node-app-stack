const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { mongoURI } = require("./config/keys");
const app = express();

// ----------------------------------------------------------------
const users = require("./routes/apis/users");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// db
// connect to
mongoose
  .connect(mongoURI)
  .then(() => console.log("mongo is ok"))
  .catch((err) => console.log(err));

app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello world23");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

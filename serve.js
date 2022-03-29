const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// 身份验证中间件
const passport = require("passport");
// mongo Key
const { mongoURI } = require("./config/keys");
const app = express();

// ----------------------------------------------------------------
const users = require("./routes/apis/users");

// bodyParser settings
// 使用中间件 -bodyParser 更加简单的处理body数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// db
// connect to
mongoose
  .connect(mongoURI)
  .then(() => console.log("mongo is ok"))
  .catch((err) => console.log(err));

// catch users api user分发
app.use("/api/users", users);




// start server
const port = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("hello world23");
// });

// passport 初始化
app.use(passport.initialize());

// passport 方法执行
require("./config/passport")(passport);

app.listen(port, () => {
  console.log(`192.168.0.0:${port}`);
  console.log(`Server running on port ${port}`);
});

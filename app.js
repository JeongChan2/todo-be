const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require('dotenv').config()
const cors = require('cors');
const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD
console.log("MONGNNGGNG",MONGODB_URI_PROD)
app.use(bodyParser.json());
app.use(cors());
app.use("/api", indexRouter);
const mongoURI = `mongodb+srv://jcstar55:0505@cluster0.ggqxs.mongodb.net/todo-student`;
// const mongoURI = `mongodb://localhost:27017/todo-demo`;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoose connected");
  })

  .catch((err) => {
    console.log("DB connection fail", err);
  });

app.listen(5000, () => {
  console.log("server on 5000");
});

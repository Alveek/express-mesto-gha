const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes");

const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = { id: "64307a27b1ebda664b4bfb52" };
  next();
});

app.use(router);

app.listen(3000, () => {
  console.log("start server on port 3000");
});

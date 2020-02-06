const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const router = require("./router/todoRouter");
const config = require("./config/config");
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(router);

const port = process.env.PORT || 8000;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

mongoose.connect(config.databaseURL, options).then(() => {
  console.log("Successful");
  app.listen(port);
});

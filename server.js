const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");
var cors = require("cors");

port = process.env.PORT || 3000;

const mysql = require("mysql");

// connection configurations
const mc = mysql.createConnection({
  host: "legendserver.mysql.database.azure.com",
  user: "hashtaglegend@legendserver",
  password: "P@ssw0rd",
  database: "Covid19DB",
});

// connect to database
mc.connect();

app.listen(port);

console.log("API server started on: " + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var routes = require("./app/routes/approutes"); //importing route
routes(app); //register the route

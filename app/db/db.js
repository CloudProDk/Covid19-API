"user strict";

var mysql = require("mysql");

//local mysql db connection
var connection = mysql.createConnection({
  host: "legendserver.mysql.database.azure.com",
  user: "hashtaglegend@legendserver",
  password: "P@ssw0rd",
  database: "Covid19DB",
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;

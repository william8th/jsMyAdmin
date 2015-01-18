var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'temporary',
  password: ''
});

connection.connect();

module.exports = connection;

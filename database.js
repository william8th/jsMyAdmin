var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'temporary',
  password: 'temporary'
});

connection.connect();

module.exports = connection;

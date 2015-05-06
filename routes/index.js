var _ = require('underscore');

var express = require('express');
var router = express.Router();
var db = require('../database');


/* GET home page. */
router.get('/', function(req, res, next) {
  db.query('SHOW databases;', function(err, rows, fields) {
    if (err) throw err;

    var result = _.map(rows, function(row) {
      return {database: row.Database};
    });

    res.render('index', {
      appData: JSON.stringify(result)
    });
  });
});


// Get all databases on host
// Need to transform the results from MySQL to an array of objects with 
// property 'database' containing the names of the database available. 
// The objects returned by MySQL would have an index name of 'Database'.
// Example:
//        [{Database: 'db1', Database: 'db2'}]
// transformed to:
//        [{database: 'db1', database: 'db2'}]
router.get('/database', function(req, res, next) {
  db.query('SHOW databases;', function(err, rows, fields) {
    if (err) throw err;

    var result = _.map(rows, function(row) {
      return {database: row.Database};
    });

    res.json(result);
  });
});


// Get tables from a database
// Need to transform the results from MySQL to an array of objects with
// property 'table' containing the names of the table within the database.
// The objects returned by MySQL would have an index name of 
// 'Tables_in_[databaseName].
// Example:
//        [{Tables_in_db1: 'table1', Tables_in_db1: 'table2'}]
// transformed to:
//        [{table: 'table1', table: 'table2'}]
router.get('/database/:dbname', function(req, res, next) {
  var dbName = req.params.dbname;
  
  db.query('USE ' + dbName + ';');
  db.query('SHOW tables;', function(err, rows, fields) {
    if (err) throw err; 

    var indexName = 'Tables_in_' + dbName;
    var result = _.map(rows, function(tableName) {
      return {database: dbName, scheme: tableName[indexName]};
    });

    res.json(result);
  });
});


// Get all rows from a table in a database
// No need to transform the results from a table. Return pure JSON from MySQL.
router.get('/database/:dbname/:tablename', function(req, res, next) {
  var dbName = req.params.dbname;
  var tableName = req.params.tablename;

  db.query('USE ' + dbName + ';');
  db.query('SELECT * FROM ' + tableName + ';', function(err, rows, fields) {
    if (err) throw err;
    
    res.json(rows);
  });
});

module.exports = router;

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
TYPES = require('tedious').TYPES

var config = require('../config.json');

var isConnected = false;
var connection = new Connection(config);

connection.on('connect', function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  else {
    if (process.env.NODE_ENV !== 'test') {
      console.log('Connected to db');
    }
    isConnected = true;
  }
});

function endConnection() {
  console.log('Connection closed');
  process.exit(0);
}

function executeQuery(query, parameters) {
  if (!isConnected)
    return Promise.reject({ statusCode: 503, errorMessage: 'Database not connected yet, try again in a second' });
  if (query == null
    || query.length <= 0)
    return Promise.reject({ statusCode: 400, errorMessage: 'Invalid parameter' });

  let results = [];
  return new Promise((resolve, reject) => {
    request = new Request(query, function (err, rowCount) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });

    if (parameters != null && parameters.length > 0) {
      parameters.forEach((item, index) => {
        request.addParameter(item.name, item.type, item.value);
      });
    }

    request.on('row', function (columns) {
      let item = {};
      columns.forEach(function (column) {
        item[column.metadata.colName] = column.value;
      });
      results.push(item);
    });

    connection.execSql(request);
  });
}

module.exports = {
  executeQuery, endConnection
}
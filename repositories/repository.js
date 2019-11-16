var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config = require('../config.json');

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
  }
});

function executeQuery(query) {
  let results = [];
  return new Promise((resolve, reject) => {
    request = new Request(query, function (err, rowCount) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });

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
  executeQuery
}
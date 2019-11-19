var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
TYPES = require('tedious').TYPES
var config = require('../config.json');
var isNullOrEmpty = require('../utils/validator');

isConnected = false;
connection = new Connection(config);

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
  if (isNullOrEmpty(query))
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

    if (!isNullOrEmpty(parameters)) {
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

function execInsertMeterReading(item) {
  if (!isConnected)
    return Promise.reject({ statusCode: 503, errorMessage: 'Database not connected yet, try again in a second' });
  if (isNullOrEmpty(item))
    return Promise.reject({ statusCode: 400, errorMessage: 'Invalid parameter' });

  var results = [];
  return new Promise((resolve, reject) => {
    request = new Request('dbo.InsertMeterReading', function (err, rowCount) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });

    request.addParameter('CustomerId', TYPES.VarChar, item.CustomerId);
    request.addParameter('SerialNumber', TYPES.VarChar, item.SerialNumber);
    request.addParameter('Type', TYPES.VarChar, item.Type);
    request.addParameter('MeterPointId', TYPES.VarChar, item.MeterPointId);
    request.addParameter('RegisterId', TYPES.VarChar, item.RegisterId);
    request.addParameter('Timing1', TYPES.VarChar, item.Timing1);
    request.addParameter('Value1', TYPES.VarChar, item.Value1);
    request.addParameter('Timing2', TYPES.VarChar, item.Timing2);
    request.addParameter('Value2', TYPES.VarChar, item.Value2);
    request.addParameter('ReadingDate', TYPES.DateTime, item.ReadingDate);

    request.addOutputParameter('resultMessage', TYPES.VarChar);

    request.on('returnValue', function (parameterName, value, metadata) {
      if (value !== null) {
        results.push({ parameterName, value });
      }
      else {
        results.push({ 'result': 'ok' });
      }
    });

    connection.callProcedure(request);
  });
}

module.exports = {
  endConnection
  , executeQuery
  , execInsertMeterReading
}
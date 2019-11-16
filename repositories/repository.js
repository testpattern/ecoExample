var isNullOrEmpty = require('../utils/validator');
var repository = require('./tediousRepository');
TYPES = require('tedious').TYPES

function getMeterReadings(customerId, serialNumber) {

  if (isNullOrEmpty(customerId)
    || isNullOrEmpty(serialNumber)) {
    return Promise.reject({ statusCode: 400, errorMessage: 'Invalid customerId or serialNumber' });
  }

  return new Promise((resolve, reject) => {

    var query = "select * from CustomerMeterReadingsData where CustomerId = @customerId and SerialNumber = @serialNumber";

    var params = [{
      name: 'customerId',
      type: TYPES.VarChar,
      value: customerId
    }, {
      name: 'serialNumber',
      type: TYPES.VarChar,
      value: serialNumber
    }];

    repository.executeQuery(query, params)
      .then(r => {
        resolve(r);
      })
      .catch(e => {
        reject(e);
      });
  });
}

function insertMeterReading() {
  // TODO
  // request = new Request("INSERT SalesLT.Product (Name, ProductNumber, StandardCost, ListPrice, SellStartDate) OUTPUT INSERTED.ProductID VALUES (@Name, @Number, @Cost, @Price, CURRENT_TIMESTAMP);", function (err) {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  // request.addParameter('Name', TYPES.NVarChar, 'SQL Server Express 2014');
  // request.addParameter('Number', TYPES.NVarChar, 'SQLEXPRESS2014');
  // request.addParameter('Cost', TYPES.Int, 11);
  // request.addParameter('Price', TYPES.Int, 11);
  // request.on('row', function (columns) {
  //   columns.forEach(function (column) {
  //     if (column.value === null) {
  //       console.log('NULL');
  //     } else {
  //       console.log("Product id of inserted item is " + column.value);
  //     }
  //   });
  // });
  // connection.execSql(request);
}

module.exports = { getMeterReadings, insertMeterReading };
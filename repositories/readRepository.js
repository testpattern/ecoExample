var repository = require('./repository');

function executeStatement() {
  return new Promise((resolve, reject) => {
    repository.executeQuery("select * from CustomerMeterReadingsData")
      .then(r => {
        resolve(r);
      })
      .catch(e => {
        reject(e);
      });
  });
}

// function executeStatement2() {
//   let results = [];
//   return new Promise((resolve, reject) => {
//     request = new Request("select * from CustomerMeterReadingsData", function (err, rowCount) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     });

//     request.on('row', function (columns) {
//       let item = {};
//       columns.forEach(function (column) {
//         item[column.metadata.colName] = column.value;
//       });
//       results.push(item);
//     });

//     connection.execSql(request);
//   });
// }

// function executeStatementWithParams(customerId) {
//   let results = [];
//   return new Promise((resolve, reject) => {
//     request = new Request("select * from CustomerMeterReadingsData where CustomerId = @customerId", function (err, rowCount) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     });

//     request.on('row', function (columns) {
//       let item = {};
//       columns.forEach(function (column) {
//         item[column.metadata.colName] = column.value;
//       });
//       results.push(item);
//     });

//     connection.execSql(request);
//   });
// }


module.exports = { executeStatement };
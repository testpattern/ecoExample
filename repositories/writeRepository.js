var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config =
{
  authentication: {
    options: {
      userName: 'dbuser', // update me
      password: 'Azure.and.sh1t' // update me
    },
    type: 'default'
  },
  server: 'mecdb01.database.windows.net', // update me
  options:
  {
    database: 'EcotricityExample', //update me
    encrypt: true,
    timeout: 30000
  }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function (err) {
  if (err) {
    console.log(err);
  }
  else {
    queryDatabase();
  }
});

function queryDatabase() {
  console.log('Reading rows from the Table...');

  // Read all rows from table
  var request = new Request(
    "SELECT * from CustomerMeterReadingsData",
    function (err, rowCount, rows) {
      if (err) {
        console.error('FAILED: ' + JSON.stringify(err));
        process.exit(1);
      }
      console.log(rowCount + ' row(s) returned');
      process.exit();
    }
  );

  request.on('row', function (columns) {
    columns.forEach(function (column) {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });
  connection.execSql(request);
}

function insert() {
  request = new Request("INSERT SalesLT.Product (Name, ProductNumber, StandardCost, ListPrice, SellStartDate) OUTPUT INSERTED.ProductID VALUES (@Name, @Number, @Cost, @Price, CURRENT_TIMESTAMP);", function (err) {
    if (err) {
      console.log(err);
    }
  });
  request.addParameter('Name', TYPES.NVarChar, 'SQL Server Express 2014');
  request.addParameter('Number', TYPES.NVarChar, 'SQLEXPRESS2014');
  request.addParameter('Cost', TYPES.Int, 11);
  request.addParameter('Price', TYPES.Int, 11);
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
        console.log('NULL');
      } else {
        console.log("Product id of inserted item is " + column.value);
      }
    });
  });
  connection.execSql(request);
}
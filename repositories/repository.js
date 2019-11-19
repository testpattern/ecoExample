var isNullOrEmpty = require('../utils/validator');
TYPES = require('tedious').TYPES

this.dbRepository;

class Repository {
  constructor(dbRepository) {
    this.dbRepository = dbRepository;
  }

  getMeterReadings(customerId, serialNumber) {

    if (isNullOrEmpty(customerId)
      || isNullOrEmpty(serialNumber)) {
      return Promise.reject({ statusCode: 400, errorMessage: 'Invalid customerId or serialNumber' });
    }

    return new Promise((resolve, reject) => {

      var query = "select * from dbo.CustomerMeterReadingsView where CustomerId = @customerId and SerialNumber = @serialNumber";

      var params = [{
        name: 'customerId',
        type: TYPES.VarChar,
        value: customerId
      }, {
        name: 'serialNumber',
        type: TYPES.VarChar,
        value: serialNumber
      }];

      this.dbRepository.executeQuery(query, params)
        .then(r => {
          resolve(r);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  insertMeterReading(values) {

    if (values == null
      || values.length < 1) {
      return Promise.reject({ statusCode: 400, errorMessage: 'Bad param, pass an array' });
    }

    return new Promise((resolve, reject) => {
      this.dbRepository.execInsertMeterReading(values)
        .then(r => {
          resolve(r);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}

module.exports = { Repository };
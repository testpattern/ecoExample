var express = require('express');
var router = express.Router();
var Repository = require('../repositories/repository').Repository;
var dbRepository = require('../repositories/tediousRepository');
var mapper = require('../utils/mapper');

var repository = new Repository(dbRepository);

router.get('/:customerId/:serialNumber', function (req, res, next) {

  var customerId = req.params.customerId;
  var serialNumber = req.params.serialNumber;

  repository.getMeterReadings(customerId, serialNumber)
    .then(r => {
      if (r.length > 0) {
        // map db item to json
        var json = mapper.dbToJson(r);
        res.status(200).send(json);
      }
      else {
        // its empty
        res.status(200).send(r);
      }
    }).catch(e => {
      console.error(e);
      res.status(e.statusCode).send(e.errorMessage);
    });
});

router.post('/', function (req, res, next) {

  var mappedJson = mapper.jsonToDb(req.body);

  repository.insertMeterReading(mappedJson)
    .then(r => {
      res.status(200).send(r);
    }).catch(e => {
      res.status(500).send(e);
    });
});

module.exports = router;
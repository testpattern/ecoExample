var express = require('express');
var router = express.Router();
var repository = require('../repositories/repository');
var mapper = require('../utils/mapper');

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
      res.status(e.statusCode).send(e.errorMessage);
    });
});

router.post('/', function (req, res, next) {

  var mappedJson = mapper.jsonToDb(req.body);

  repository.insertMeterReading(mappedJson)
    .then(r => {
      console.log('ok');
      res.status(200).send(r);
    }).catch(e => {
      res.status(500).send(e);
    });
});

module.exports = router;
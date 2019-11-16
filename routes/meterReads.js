var express = require('express');
var router = express.Router();
var readRepository = require('../repositories/repository');
var mapper = require('../utils/mapper');

router.get('/:customerId/:serialNumber', function (req, res, next) {

  var customerId = req.params.customerId;
  var serialNumber = req.params.serialNumber;

  readRepository.getMeterReadings(customerId, serialNumber)
    .then(r => {
      if (r.length > 0) {
        // map db item to json
        var json = mapper.flattenDbResult(r);
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
  res.send('POST');
});

module.exports = router;
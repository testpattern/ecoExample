var express = require('express');
var router = express.Router();
var repository = require('../repositories/repository');
var mapper = require('../utils/mapper');
var tediousRepository = require('../repositories/tediousRepository');

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

  var promises = [];
  var results = [];

  // // this works...
  var item = {
    CustomerId: 'customerId7'
    , SerialNumber: '3726372599'
    , Type: 'MPXN'
    , MeterPointId: '14582765'
    , RegisterId: '387376'
    , Timing1: 'NIGHT'
    , Value1: '2199'
    , Timing2: 'ANYTIME'
    , Value2: '2199'
    , ReadingDate: new Date('2017-11-20 16:15:33.000')
  };

  var succeeds = [];
  var fails = [];
  // items.forEach(item => {
  //   var p = new Promise(async (resolve, reject) => {
  tediousRepository.execInsertMeterReading(mappedJson)
    .then(r => {
      console.log('ok');
      res.status(200).send(r);
    }).catch(e => {
      res.status(500).send(e);
    });
  // mappedJson.forEach(item => {
  //   promises.push(tediousRepository.execInsertMeterReading(item));
  // });

  // Promise.all(promises)
  //   .then(r => {
  //     console.log(r);
  //     res.send(r);
  //   })
  //   .catch(e => {
  //     console.error(e);
  //     res.status(500).send(e);
  //   });

  // Promise.map(mappedJson, function (item) {
  //   return insertMeterReading(item);
  // }).then(function (allResults) {
  //   //  'allResults' now contains an array of all
  //   //  the results of 'performAsyncOperation'
  //   console.log(allResults);
  // })

  // mappedJson.forEach(i => {
  //     repository.insertMeterReading(i)
  //       .then(r => {
  //         results.push(r);
  //       })
  //       .catch(e => {
  //         results.push(e);
  //       });
  //     console.log(i);
  // });

  // console.log('waiting for promise');
  // Promise.all([p])
  //   .then(r => {
  //     console.log(r)
  //   })
  //   .catch(e => {
  //     console.error(e)
  //   });

  // setImmediate(() => {
  //   console.log(results);
  //   // res.send(results);
  // });
});

module.exports = router;
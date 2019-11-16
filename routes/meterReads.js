var express = require('express');
var router = express.Router();
var readRepository = require('../repositories/readRepository');

router.get('/', function (req, res, next) {

  // todo validate params
  
  readRepository.executeStatement()
    .then(r => {
      res.status(200).send(r);
    }).catch(e => {
      res.status(500).send(e);
    });
});

router.post('/', function (req, res, next) {
  res.send('POST');
});

module.exports = router;
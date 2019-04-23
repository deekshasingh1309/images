var express = require('express');
var router = express.Router();

var imageController = require('../controller/img.controller');

router.post('/uploadbusboy', imageController.busboy)
      .post('/uploadbase', imageController.baseUpload)


module.exports = router;



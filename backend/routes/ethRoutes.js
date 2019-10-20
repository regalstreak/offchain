const express = require('express'),
	router = express.Router();

const ethController = require('../app/controllers/ethController.js');

// @route		GET /getSms/getNonce
// @desc		will get all events
// @return	eventList(array of all events)
router.post('/getNonce',ethController.getNonce);

// @route		GET /getSms/makeTransaction
// @desc		will get all events
// @return	eventList(array of all events)
router.post('/makeTracnsaction',ethController.makeTransaction);

// @route		GET /getSms/getBalance
// @desc		will get all events
// @return	eventList(array of all events)
router.post('/getBalance',ethController.getBalance);

module.exports = router;
const express = require('express'),
	router = express.Router();

const ethController = require('../app/controllers/ethController.js');


// @route		GET /getSms/getNonce
// @desc		will get all events
// @return	eventList(array of all events)
router.getNonce('/getNonce',ethController.getNonce);

// @route		GET /getSms/makeTransaction
// @desc		will get all events
// @return	eventList(array of all events)
router.getNonce('/getNonce',ethController.makeTransaction);

// @route		GET /getSms/getBalance
// @desc		will get all events
// @return	eventList(array of all events)
router.getNonce('/getNonce',ethController.getBalance);

module.exports = router;
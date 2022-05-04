const express = require('express');
const { check } = require('express-validator');

const requestsControllers = require('../controllers/requests-controllers');

const router = express.Router();

router.get('/', requestsControllers.getRequests);


router.post(
    '/',
    requestsControllers.createRequest
);

router.patch(
    '/:id',
    requestsControllers.updateRequest
);



module.exports = router;

const express = require('express');
const { check } = require('express-validator');

const requestsControllers = require('../controllers/requests-controllers');

const router = express.Router();

router.get('/', requestsControllers.getRequests);
// router.get('/getRequests/list', requestsControllers.getRequests);


router.post(
    '/',
    // [
    //     check('title')
    //         .not()
    //         .isEmpty(),
    //     check('description').isLength({ min: 5 }),
    //     check('address')
    //         .not()
    //         .isEmpty()
    // ],
    requestsControllers.createRequest
);

router.patch(
    '/:id',
    // [
    //     check('title')
    //         .not()
    //         .isEmpty(),

    // ],
    requestsControllers.updateRequest
);



module.exports = router;

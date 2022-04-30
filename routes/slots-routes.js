const express = require('express');
const { check } = require('express-validator');

const slotsControllers = require('../controllers/slots-controllers');

const router = express.Router();

router.get('/:sellerId/:slotId', slotsControllers.getSlotById);
router.get('/:sellerId/getSlots/list', slotsControllers.getSlots);


router.post(
    '/:sellerId',
    [
        check('name')
            .not()
            .isEmpty(),
        
        check('slot')
            .not()
            .isEmpty()
    ],
    slotsControllers.createSlot
);

router.patch(
    '/:sellerId/:slotId',
    // [
    //     check('title')
    //         .not()
    //         .isEmpty(),

    // ],
    slotsControllers.rejectSlot
);





module.exports = router;

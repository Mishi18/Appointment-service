const express = require('express');
const { check } = require('express-validator');

const slotsControllers = require('../controllers/slots-controllers');

const router = express.Router();

router.get('/', slotsControllers.getAllSlots);
router.get('/:slotId', slotsControllers.getSlotById);
router.get('/:sellerId/getSlots/list', slotsControllers.getSlots);


router.post(
    '/:sellerId',
    // [
    //     check('name')
    //         .not()
    //         .isEmpty(),
        
    //     check('slot')
    //         .not()
    //         .isEmpty()
    // ],
    slotsControllers.createSlot
);

router.patch(
    '/:sellerId/:slotId',
    // [
    //     check('title')
    //         .not()
    //         .isEmpty(),

    // ],
    slotsControllers.rejectApprveSlot
);




module.exports = router;

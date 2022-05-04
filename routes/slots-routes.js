const express = require('express');
const { check } = require('express-validator');

const slotsControllers = require('../controllers/slots-controllers');

const router = express.Router();

router.get('/', slotsControllers.getAllSlots);
router.get('/:slotId', slotsControllers.getSlotById);
router.get('/:sellerId/getSlots/list', slotsControllers.getSlots);
router.delete('/:id', slotsControllers.deleteSlot )


router.post(
    '/:sellerId',
    slotsControllers.createSlot
);

router.patch(
    '/:sellerId/:slotId',
    slotsControllers.rejectApprveSlot
);




module.exports = router;

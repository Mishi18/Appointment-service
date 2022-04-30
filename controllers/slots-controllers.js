const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Slot = require('../models/slot');

const getSlotById = async (req, res, next) => {
    const slotId = req.params.slotId;
    let slot;
    try {
        slot = await Slot.findById(slotId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find a slot.',
            500
        );
        return next(error);
    }

    if (!slot) {
        const error = new HttpError(
            'Could not find a slot for the provided id.',
            404
        );
        return next(error);
    }

    res.json({ slot: slot.toObject({ getters: true }) });
};

const getSlots = async (req, res, next) => {
    let slots;
    try {
        slots = await Slot.find({ sellerId: req.params.sellerId });
    } catch (err) {
        const error = new HttpError(
            'Fetching slots failed, please try again later.',
            500
        );
        return next(error);
    }
    res.json({ slots: slots.map(slot => slot.toObject({ getters: true })) });
};



const createSlot = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const { name, slot, } = req.body;
    const sellerId = req.params.sellerId;

    const createdSlot = new Slot({
        name,
        slot,
        sellerId
    });
    try {
        await createdSlot.save(createdSlot);

    } catch (err) {

        const error = new HttpError(
            'Creating slot failed, please try again.',
            500
        );
        return next(error);
    }
    res.status(201).json({ slot: createdSlot });
};


const rejectApprveSlot = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { rejected, approved, booked } = req.body;
    const slotId = req.params.slotId;

    let slot;
    try {
        slot = await Slot.findById(slotId);
        console.log('00000000000000000000000000000000000000', slot)
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update slot.',
            500
        );
        return next(error);
    }

    slot.rejected = rejected;
    slot.approved = approved;
    slot.booked = booked;


    try {
        await slot.save();
    } catch (err) {
        console.log('------------------------------------------', err)
        const error = new HttpError(
            'Something went wrong, could not update slot.',
            500
        );
        return next(error);
    }

    res.status(200).json({ slot: slot.toObject({ getters: true }) });
};

exports.getSlotById = getSlotById;
exports.createSlot = createSlot;
exports.rejectApprveSlot = rejectApprveSlot;
exports.getSlots = getSlots;
const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Request = require('../models/requests');
const Slot = require('../models/slot');
const Status = require('../status.enum')



// CHECK EHIS
const getRequests = async (req, res, next) => {
    let requests;
    const sellerId = req.query.sellerId

    console.log('-------------------------------------------', sellerId)
    try {
        requests = await Request.find({}, { sellerId: sellerId });


    } catch (err) {
        const error = new HttpError(
            'Fetching requests failed, please try again later.',
            500
        );
        return next(error);
    }
    //res.json(requests)
    //res.json({ requests: requests.map(request => request.toObject({ getters: true })) });
    res.status(201).json({ request: requests });
};

const createRequest = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const { userId, sellerId, slotID } = req.body;
    const status = Status.BOOKED;


    const slotObject = await Slot.findById(req.body.slotID);

    const createdRequest = new Request({

        userId,
        sellerId,
        slotID,
        status

    });

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdRequest.save(createdRequest);
        slotObject.booked = true;
        await slotObject.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {

        const error = new HttpError(
            'Creating request failed, please try again.',
            500
        );
        return next(error);
    }



    res.status(201).json({ request: createdRequest });
};


const updateRequest = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { status } = req.body;
    const requestId = req.params.id;

    let request;
    try {
        request = await Request.findById(requestId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update request.',
            500
        );
        return next(error);
    }

    request.status = status;

    try {
        await request.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update request.',
            500
        );
        return next(error);
    }

    res.status(200).json({ request: request.toObject({ getters: true }) });
};



exports.createRequest = createRequest;
exports.updateRequest = updateRequest;
exports.getRequests = getRequests;
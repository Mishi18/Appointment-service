const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Request = require('../models/requests');
const Status = require('../status.enum')

// const getRequestById = async (req, res, next) => {
//     const requestId = req.params.pid;
//     let request;
//     try {
//         request = await Request.findById(requestId);
//     } catch (err) {
//         const error = new HttpError(
//             'Something went wrong, could not find a request.',
//             500
//         );
//         return next(error);
//     }

//     if (!request) {
//         const error = new HttpError(
//             'Could not find a request for the provided id.',
//             404
//         );
//         return next(error);
//     }

//     res.json({ request: request.toObject({ getters: true }) });
// };

// const getRequests = async (req, res, next) => {
//     let requests;
//     try {
//         requests = await Request.find({});
//     } catch (err) {
//         const error = new HttpError(
//             'Fetching requests failed, please try again later.',
//             500
//         );
//         return next(error);
//     }
//     //res.json(requests)
//     res.json({ requests: requests.map(request => request.toObject({ getters: true })) });
// };



const createRequest = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const { userId, sellerId, slotID } = req.body;
    const status = Status.BOOKED;
    
    const createdRequest = new Request({

        userId,
        sellerId,
        slotID,
        status

    });
    console.log(')00000000000000000000000000000000000000', createdRequest)
    try {

        await createdRequest.save(createdRequest);

    } catch (err) {
console.log('-----------------------------------------', err)
        const error = new HttpError(
            'Creating request failed, please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({ request: createdRequest });
};


// const updateRequest = async (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return next(
//             new HttpError('Invalid inputs passed, please check your data.', 422)
//         );
//     }

//     const { title, description } = req.body;
//     const requestId = req.params.pid;

//     let request;
//     try {
//         request = await Request.findById(requestId);
//     } catch (err) {
//         const error = new HttpError(
//             'Something went wrong, could not update request.',
//             500
//         );
//         return next(error);
//     }

//     request.title = title;
//     request.description = description;

//     try {
//         await request.save();
//     } catch (err) {
//         const error = new HttpError(
//             'Something went wrong, could not update request.',
//             500
//         );
//         return next(error);
//     }

//     res.status(200).json({ request: request.toObject({ getters: true }) });
// };



exports.createRequest = createRequest;
// exports.updateRequest = updateRequest;
// exports.getRequests = getRequests;
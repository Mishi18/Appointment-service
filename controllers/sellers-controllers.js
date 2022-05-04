const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Seller = require('../models/seller');

const getSellerById = async (req, res, next) => {
  const sellerId = req.params.pid;
  let seller;
  try {
    seller = await Seller.findById(sellerId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a seller.',
      500
    );
    return next(error);
  }

  if (!seller) {
    const error = new HttpError(
      'Could not find a seller for the provided id.',
      404
    );
    return next(error);
  }
  res.json({ seller: seller.toObject({ getters: true }) });
};


const getSellers = async (req, res, next) => {
  let sellers;
  try {
    sellers = await Seller.find({});
  } catch (err) {
    const error = new HttpError(
      'Fetching sellers failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ sellers: sellers.map(seller => seller.toObject({ getters: true })) });
};



const createSeller = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { title, description, address, slots } = req.body;

  const createdSeller = new Seller({
    title,
    description,
    address,
    slots

  });
  try {
    await createdSeller.save(createdSeller);
    
  } catch (err) {

    const error = new HttpError(
      'Creating seller failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ seller: createdSeller });
};


const updateSeller = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description } = req.body;
  const sellerId = req.params.pid;

  let seller;
  try {
    seller = await Seller.findById(sellerId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update seller.',
      500
    );
    return next(error);
  }

  seller.title = title;
  seller.description = description;

  try {
    await seller.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update seller.',
      500
    );
    return next(error);
  }

  res.status(200).json({ seller: seller.toObject({ getters: true }) });
};



exports.getSellerById = getSellerById;
exports.createSeller = createSeller;
exports.updateSeller = updateSeller;
exports.getSellers = getSellers;
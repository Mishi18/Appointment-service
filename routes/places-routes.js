const express = require('express');
const { check } = require('express-validator');

const placesControllers = require('../controllers/places-controllers');

const router = express.Router();

router.get('/:pid', placesControllers.getPlaceById);
router.get('/getPlaces/list', placesControllers.getPlaces);


router.post(
  '/',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address')
      .not()
      .isEmpty()
  ],
  placesControllers.createPlace
);

router.patch(
  '/:pid/:slotId',
  [
    check('title')
      .not()
      .isEmpty(),
    
  ],
  placesControllers.updatePlace
);



module.exports = router;

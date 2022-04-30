const express = require('express');
const { check } = require('express-validator');

const sellersControllers = require('../controllers/sellers-controllers');

const router = express.Router();

router.get('/:pid', sellersControllers.getSellerById);
router.get('/getSellers/list', sellersControllers.getSellers);


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
  sellersControllers.createSeller
);

router.patch(
  '/:pid/:slotId',
  [
    check('title')
      .not()
      .isEmpty(),

  ],
  sellersControllers.updateSeller
);



module.exports = router;

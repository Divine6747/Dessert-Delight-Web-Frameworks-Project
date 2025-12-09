const express = require('express');
const router = express.Router();

const ctrlAbout = require('../controllers/about');
const ctrlDesserts = require('../controllers/dessert');

// About routes for the static page and GET by id
router
  .route('/about')
  .get(ctrlAbout.aboutList);

router
  .route('/about/:id')
  .get(ctrlAbout.aboutReadOne);

// Dessert routes for the static page and the GET by id
router
  .route('/dessert')
  .get(ctrlDesserts.dessertList);

router
  .route('/dessert/:id')
  .get(ctrlDesserts.dessertReadOne);

module.exports = router;
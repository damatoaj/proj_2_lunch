const express = require('express');
const router = express.Router();
const foodCon = require('../controllers/food');
const isLoggedIn = require('../middleware/isLoggedIn');

router.post('/results', isLoggedIn, foodCon.search);
router.post('/lunch', isLoggedIn, foodCon.addUser);
router.get('/results', isLoggedIn, foodCon.results);
router.get('/foods', isLoggedIn, foodCon.display);
router.post('/foods', isLoggedIn, foodCon.addLunch);
router.delete('/foods/:fdcId', isLoggedIn, foodCon.delete);

module.exports = router;
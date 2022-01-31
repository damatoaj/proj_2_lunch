const express = require('express');
const router = express.Router();
const foodCon = require('../controllers/food');

router.post('/results', foodCon.search);
router.post('/lunch', foodCon.addUser);
router.get('/results', foodCon.results);
router.get('/foods', foodCon.display);
router.post('/foods', foodCon.addLunch);
router.delete('/foods/:fdcId', foodCon.delete);

module.exports = router;
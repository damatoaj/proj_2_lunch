const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const indexCon = require('../controllers/index');

router.get('/', indexCon.home);
router.get('/profile', isLoggedIn, indexCon.profile);
router.post('/', isLoggedIn, indexCon.profile);
router.delete('/profile/:id', isLoggedIn, indexCon.delete);
router.get('/profile/:id', isLoggedIn, indexCon.show);

module.exports = router;
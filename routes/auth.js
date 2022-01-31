const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const authCon = require('../controllers/auth');

router.get('/signup', authCon.signupPage);
router.post('/signup', authCon.signup);
router.get('/login', authCon.loginPage);
//make passport do the logins for us
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/auth/login',
  successRedirect: '/',
  failureFlash: 'Invalid Login Credentials',
  successFlash: 'Successful Login'
}));
router.get('/logout', authCon.logout);

module.exports = router;

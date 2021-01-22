const express = require('express');
const axios = require('axios');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

// POST a food item to lunch

//POST a search bar to the home bage with AXIOS that routes to the results pages

// /:fdcId GET click on the food item to reveal nutrition contents

// /:fdcId POST click on the button on the page to add the food to a lunch

// /lunch GET displays all food items associated with lunch before being saved to lunch database

// /lunch POST save all food items on the "menu" to a lunch

// /lunch DELETE take an ingredient out of the "menu"

// /profile GET render username and saved lunches (name and ingredients)

// /profile DELETE delete lunches from the profile page

module.exports = router;
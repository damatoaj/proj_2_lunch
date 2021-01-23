const express = require('express');
const axios = require('axios');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

// POST a food item to lunch
// router.post('/', (req, res) => {
//     db.food.create({
//         description: req.body.description
//     })
// }).then(food => {
//     console.log('---------add to lunch--------', food.fdcId);
//     res.redirect('/');
// });

// GET the results page
router.get('/results', (req, res) => {
    res.render('food/results')
});

//POST a search bar to the home bage with AXIOS that routes to the results pages
router.post('/results', (req, res) => {
    axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.USDA_API_KEY}&query=${req.body.description}`)
    .then(response => {
        // console.log("---------------emoji----------", response.data)
        let food = response.data;
        console.log(food.foods[0]);
        // console.log(food.score);
        // console.log(food.fdcId);
        res.render('food/results', {food:food})
    })
});

// /:fdcId GET click on the food item to reveal nutrition contents
// router.get('/:fdcId', (req, res) => {
//     db.food.findOne({
//         where: {
//             fdcId: req.params.fdcId
//         }
//     }).then (food => {
        
//     })
// })

// /:fdcId POST click on the button on the page to add the food to a lunch

// /lunch GET displays all food items associated with lunch before being saved to lunch database
router.get ('/lunch', (req, res) => {
    res.render('food/lunch')
})
// /lunch POST save all food items on the "menu" to a lunch

// /lunch DELETE take an ingredient out of the "menu"

// /profile GET render username and saved lunches (name and ingredients)

// /profile DELETE delete lunches from the profile page

module.exports = router;
const express = require('express');
const axios = require('axios');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

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
        // console.log(food.foods[0]);
        // console.log(food.score);
        // console.log(food.fdcId);
        res.render('food/results', {food:food})
    })
});

// POST a food item to lunch from the searched foods
router.post('/lunch', (req, res) => {
    db.food.create({
        description: req.body.description,
        fdcId: req.body.fdcId
    }).then((food) => {
    console.log('---------add to lunch--------', food.dataValues);
    res.redirect('/')
    })
});

// /:fdcId GET click on the food item to reveal nutrition contents

// /:fdcId POST click on the button on the page to add the food to a lunch

// /lunch GET displays all food items associated with lunch before being saved to lunch database
router.get ('/lunch', (req, res) => {
    console.log(req, '-----------------------')
    db.food.findAll()
    .then((food) => {
        res.render('food/lunch', {food})
    })
});
// /lunch POST save all food items on the "menu" to a lunch

// /lunch DELETE take an ingredient out of the "menu"
router.delete('/lunch', (req, res) => {
   db.food.destroy({
        where: {fdcId:req.params.fdcId}
   }).then((food) =>{
       console.log(rec.params.fdcId)
       res.redirect('food/lunch')
   }) 
});
// /profile GET render username and saved lunches (name and ingredients)

// /profile DELETE delete lunches from the profile page

module.exports = router;
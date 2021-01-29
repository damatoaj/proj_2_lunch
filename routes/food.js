const express = require('express');
const axios = require('axios');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

let foodData;


//POST a search bar to the home bage with AXIOS that routes to the results pages
router.post('/results', (req, res) => {
    axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.USDA_API_KEY}&query=${req.body.description}`)
    .then(response => {
        let food = response.data;
        foodData = response.data;
        res.render('food/results', {food:food})
    })
});

// POST a food item to lunch page from the searched foods
// post a food to a user (find or create the food)
//make a join table, cry
// associate the food to the user via req.user
router.post('/lunch', (req, res) => {
    db.food.findOrCreate({
        where: {description: req.body.description,
        fdcid: req.body.fdcId}
    }).then(([food, created]) => {
        food.addUser(req.user).then(relation => {
            console.log(`+++++++++++${food.description} added to ${req.user}`)
            console.log(relation)
        })
        res.render('food/results', {food:foodData})
    })
});

// GET the results page
router.get('/results', (req, res) => {
    res.render('food/results', {food:foodData})
});

// /lunch GET displays all food items favorited by the user 
router.get('/foods', (req, res) => {
    console.log('---------------------')
    req.user.getFood()
    .then(food => {
        req.user.getLunches().then(lunches => {
            res.render('food/foods', {food:food, lunches:lunches})
        })
    })
});

//add the food to a lunch
//put an id in the parameter or body, don't post to foods post to lunchesfoods
//body needs lunch_Id and food_Id
//find each of those items by Pk and then associate them
router.post('/foods', (req, res) => {
    db.lunch.findByPk(req.body.lunchId)
    .then(lunch => {
        db.food.findByPk(req.body.foodId).then(food => {
            lunch.addFood(food).then(relation => {
                res.redirect('/food/foods')
            })
        })
    })
});

// /lunch DELETE take an ingredient out of the "menu"
router.delete('/foods/:fdcId', (req, res) => {
   db.food.destroy({
        where: {fdcid:req.params.fdcId}
   }).then((food) =>{
       console.log(req.params.fdcId, '-------------delete this food-------')
       res.redirect('/food/foods')
   }) 
});

module.exports = router;
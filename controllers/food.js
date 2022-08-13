const axios = require('axios');
const db = require('../models');
let foodData;
let query;

//POST a search bar to the home bage with AXIOS that routes to the results pages
const search = (req, res) => {
    axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.USDA_API_KEY}&query=${req.body.description}`)
    .then(response => {
        let food = response.data;
        foodData = response.data;
        query = req.body.description;
        res.render('food/results', { food, query: req.body.description})
    })
    .catch(err => {
        req.flash('error', err.message);
        console.error(`In function search: ${err.message}`)
    });
};

// POST a food item to lunch page from the searched foods
// post a food to a user (find or create the food)
//make a join table, cry
// associate the food to the user via req.user
const addFoodToUser = (req, res) => {
    db.food.findOrCreate({
        where: {
            description: req.body.description,
            fdcid: req.body.fdcId
        }
    }).then(([food, created]) => {
        food.addUser(req.user).then(() => {
            console.log(`${food.description} added to ${req.user.name}`)
        })
        res.render('food/results', {food:foodData, query: query ?? ''})
    })
    .catch(err => {
        req.flash('error', err.message);
        console.error(`In function addFoodToUser: ${err.message}`)
    });
};

// GET the results page
const results = (req, res) => {res.render('food/results', {food:foodData})};

// /lunch GET displays all food items favorited by the user 
const displayFood = (req, res) => {
    if(!req.user) return 

    req.user.getFood()
    .then(food => {
        req.user.getLunches().then(lunches => {
            res.render('food/foods', { food, lunches })
        })
    })
    .catch(err => {
        req.flash('error', err.message);
        console.error(`In function displayFood: ${err.message}`)
    });
};

//add the food to a lunch
//put an id in the parameter or body, don't post to foods post to lunchesfoods
//body needs lunch_Id and food_Id
//find each of those items by Pk and then associate them
const addFoodToLunch = (req, res) => {
    db.lunch.findByPk(req.body.lunchId)
    .then(lunch => {
        db.food.findByPk(req.body.foodId).then(food => {
            lunch.addFood(food).then(() => {
                console.dir(food)
                console.dir(lunch)
                req.flash('success', `${food.description} added to ${lunch.name}`)
                res.redirect('/food/foods')
            })
        })
    })
    .catch(err => {
        req.flash('error', err.message);
        console.error(`In function addFoodToLunch: ${err.message}`)
    });
};

// /lunch DELETE take an ingredient out of the "menu"
const deleteFoodFromRecipe = (req, res) => {
   db.food.destroy({
        where: {fdcid:req.params.fdcId}
   }).then(() => {
       req.flash('success', `Successfully deleted ingredient`)
       res.redirect('/food/foods')
   }) 
   .catch(err => {
    req.flash('error', err.message);
    console.error(`In function deleteFoodFromRecipe: ${err.message}`)
   });
};

module.exports = {
    search,
    addUser:addFoodToUser,
    results,
    display:displayFood,
    addLunch:addFoodToLunch,
    delete:deleteFoodFromRecipe
}
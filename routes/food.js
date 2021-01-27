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
        // console.log("---------------emoji----------", response.data)
        let food = response.data;
        foodData = response.data;
        // console.log(food.foods[0]);
        // console.log(food.score);
        // console.log(food.fdcId);
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


// /:fdcId POST click on the button on the page to add the food to a lunch

// /lunch GET displays all food items favorited by the user 
router.get('/foods', (req, res) => {
    // 
    console.log('---------------------')
    req.user.getFood()
    .then(food => {
        console.log(food, '---------------------')
        res.render('food/foods', {food:food})
    })
});

//add the food to a lunch
//put an id in the parameter or body, don't post to foods post to lunchesfoods
//body needs lunch_Id and food_Id
//find each of those items by Pk and then associate them
router.post('/foods', (req, res) => {
    res.send(req.body)
    db.lunch.findOrCreate({
        where: {
            name: 'breakfast',
        },
        defaults: {
            userId: 1
        },
        include: [db.food]
    }).then(([lunch, create]) => {
        db.food.findOrCreate({ //change to find by Pk, the .then statement will be almost the same
            where: {
                description: 'GRANOLA'
            }
        }).then(([food, created]) => {
            lunch.addFood(food).then(relation => {
                console.log(lunch.name, '$$$$$$$$$$$$$$$$$$')
                console.log(food.description, '##################')
                console.log(`${lunch.name} includes ${food.description}`)
                res.redirect('/')
            })
        })
    })
})
                                
// when doing the DB call, pick one only and include the food/lunch relationship in the db call
// /lunch GET displays the lunches in a dropdown menu that can then be updated;syntax for associated calls?
router.get ('/lunch', (req, res) => {
    db.lunch.findAll()
    .then((lunch) => {
        res.render('food/lunch', {lunch})
    }).catch((error) => {
        console.log(error);
    })
});
                                
// /:fdcId GET click on the food item to reveal nutrition contents
router.get('/:fdcId', (req, res) => {
    db.food.findOne({
        where: {
            fdcid: req.params.fdcId
        }
    }).then(food => {
        let foodURL = `https://api.nal.usda.gov/fdc/v1/foods/${food.fdcid}`;
            axios.get(foodURL).then(apiResponse => {
            let food = apiResponse.data;
            res.render('food/show', {food});
        })
    })
})

// /lunch DELETE take an ingredient out of the "menu"
router.delete('/foods/:fdcId', (req, res) => {
   db.food.destroy({
        where: {fdcid:req.params.fdcId}
   }).then((food) =>{
       console.log(req.params.fdcId, '-------------delete this food-------')
       res.redirect('/food/foods')
   }) 
});
// /profile GET render username and saved lunches (name and ingredients)
// router.get('/profile', (req, res) => {
//     db.lunch.findAll()
//     .then((lunch) => {
//     res.render('profile');
//     })
// });

module.exports = router;
const db = require('../models');

//render home page
const home = (req, res) => {res.render('index', {user:req.user})};

const profile = (req, res) => {
    db.lunch.findAll({
        where: { userId: req.user.id}
    }).then(lunch => {
        res.render('profile', { lunch , user:req.user });
    })
    .catch(err => {
      console.error(`In function profile: ${err.message}`)
    });
};

//post a new lunch here
const newLunch = (req, res) => {
    db.lunch.create({
        name: req.body.name,
        userId: req.body.userId
    }).then((lunch) => {
        console.log(`Created ${lunch} successfully`)
        res.redirect('/')
    })
    .catch(err => {
      console.error(`In function newLunch: ${err.message}`)
    });
};

//delete a posted lunch from the user's database
const deleteLunch = (req, res) => {
  db.lunch.destroy({
    where: {id:req.params.id}
  }).then((lunch) => {
    console.log(`Deleted ${lunch} successfully`);
    res.redirect('/profile');
  })
  .catch(err => {
    console.error(`In function deleteLunch: ${err.message}`);
  });
};

//make a show page for each breakfast with the foods in it
const showFood = (req, res) => {
  db.lunch.findOne({
    where: {
      id: req.params.id
    },
    include: [db.food]
  }).then(lunch => {
    console.log(`Found ${lunch}`)
    res.render('show', {lunch})
  })
  .catch(err => {
    console.error(`In function showFood: ${err.message}`)
  });
};

module.exports = {
    home,
    profile,
    new:newLunch,
    delete:deleteLunch,
    show:showFood
}
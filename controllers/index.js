const db = require('../models');

//render home page
const home = (req, res) => {res.render('index', {user:req.user})};

const profile = (req, res) => {
    db.lunch.findAll({
        where: { userId: req.user.id}
    }).then(lunch => {
        res.render('profile', {lunch:lunch, user:req.user});
    })
};

//post a new lunch here
const newLunch = (req, res) => {
    db.lunch.create({
        name: req.body.name,
        userId: req.body.userId
    }).then((lunch) => {
        res.redirect('/')
    })
};

//delete a posted lunch from the user's database
const deleteLunch = (req, res) => {
  db.lunch.destroy({
    where: {id:req.params.id}
  }).then((lunch) => {
    console.log(req.params.id, '---------------------')
    res.redirect('/profile')
  })
};

//make a show page for each breakfast with the foods in it
const showFood = (req, res) => {
  db.lunch.findOne({
    where: {
      id: req.params.id
    },
    include: [db.food]
  }).then(lunch => {
    res.render('show', {lunch})
  })
};

module.exports = {
    home,
    profile,
    new:newLunch,
    delete:deleteLunch,
    show:showFood
}
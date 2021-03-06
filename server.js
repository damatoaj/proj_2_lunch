require('dotenv').config();
const axios = require('axios');
const express = require('express');
const layouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const helmet = require('helmet');
const session = require('express-session');
const passport = require('./config/ppConfig');
const app = express();
const db = require('./models');
const isLoggedIn = require('./middleware/isLoggedIn');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(helmet());

app.use(session({
  secret:  process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

//init passport config MUST HAPPEN AFTER SESSION CONFIG
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//write custom middleware to access the user on every response
app.use((req, res, next) => {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
})


app.get('/', (req, res) => {
    let user = req.user;
    res.render('index', {user:user});
});

app.get('/profile', isLoggedIn, (req, res) => {
  db.lunch.findAll({
    where: {
      userId: req.user.id
    }
  })
  .then((lunch) => {
    console.log(res.locals.currentUser)
    let user = req.user;
    res.render('profile', {lunch:lunch, user:user});
  })
});

//post a new lunch here
app.post('/', (req, res) => {
  db.lunch.create({
      name: req.body.name,
      userId: req.body.userId
  }).then((lunch) => {
      res.redirect('/')
  })
})

//delete a posted lunch from the user's database
app.delete('/profile/:id', (req, res) => {
  db.lunch.destroy({
    where: {id:req.params.id}
  }).then((lunch) => {
    console.log(req.params.id, '---------------------')
    res.redirect('/profile')
  })
})

//make a show page for each breakfast with the foods in it
app.get('/profile/:id', (req, res) => {
  db.lunch.findOne({
    where: {
      id: req.params.id
    },
    include: [db.food]
  }).then(lunch => {
    res.render('show', {lunch})
  })
});

app.use('/auth', require('./routes/auth'));
app.use('/food', require('./routes/food'));

var server = app.listen(process.env.PORT || 4000, ()=> console.log(`🎧You're listening to the smooth sounds of port ${process.env.PORT || 4000}🎧`));

module.exports = server;

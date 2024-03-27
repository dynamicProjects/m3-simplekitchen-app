const express= require('express');
const path = require('path');
const route = require('./routes/index');
const bodyparser = require('body-parser')

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')
app.use(bodyparser.urlencoded({extended: true}))
app.use('/', route);
app.use(express.static('public'));
// Define a route to render form.pug
app.get('/registrant', (req, res) => {
  res.render('registrant'); // This will render form.pug
});

module.exports =app;    
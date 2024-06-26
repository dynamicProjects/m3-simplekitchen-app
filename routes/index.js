const path = require('path');
const auth = require('http-auth');
// const basic = auth.basic({
//     file: path.join(__dirname, 'Shruti:{SHA}vPmCEWm2lh2heLtUFjClrKsjm7E=')
// })
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Registration = mongoose.model('Registration')
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');


router.get('/', function(req, res){
res.render('index', {title: 'Registration form'});
})

//  post document code 
router.post('/',[check('name').isLength({min:1}).withMessage('Please enter an email')], async function(req, res){
    const error = validationResult(req);
    if(error.isEmpty()){
        const registration = new Registration(req.body);
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // set user password to hashed password
        registration.password = await bcrypt.hash(registration.password, salt);
        registration.save()
        .then(() => {res.send('Thank you for registration!'); })
    }else{
        res.render('form', {title: 'Registration form',
        error: error.array(),
        data:req.body,
    });
    }
    })

    // get document code 

    router.get('/registration',(req,res) => {
        Registration.find().then((registrations) => {
            res.render('register', {title:'Listing registrations', registrations})
        })
        .catch(()=>{
            res.send('Sorry! Something went wrong.');
        })
    });

module.exports = router;
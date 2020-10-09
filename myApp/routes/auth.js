var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../model/user');


/* signup USER. */
router.post('/register', async function(req, res, next) {
   const UseremailExist = await User.findOne({ email: req.body.email });
   if (UseremailExist){
       return res.send('Email already exists');
   }
  //HashPassword
  const salt = await bcrypt.genSalt(10);
  const hasedPassword = await bcrypt.hash(req.body.password, salt)
  //create new user
  const user = new User({
      name:  req.body.name,
      email: req.body.email,
      password: hasedPassword,
      phone_number: req.body.phone_number
  });
  try{
      const savedUser = await user.save();
      res.send("successfully Registered!");
  }catch (err) {
        res.status(400).send('Invalid Email or Password');
  }
});


/* user login API. */
router.post('/api/v1/session', async function(req, res){


    //check if email exist  
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(201).send('Email or password is incorrect!');
    
    
    //validate
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(201).send('Invalid Email or Password')

    //create n assign a token
    const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token);
    res.status(200).send(token);
})


module.exports = router;
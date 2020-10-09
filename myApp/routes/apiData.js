var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const NewUser = require('../model/newUser');
const user = require('../model/user');

/* post USER Api */
router.post('/api/v1/users', async function(req, res, next) {
 const salt = await bcrypt.genSalt(10);
 const hasedPassword = await bcrypt.hash(req.body.password, salt)
 //create new user
 const newUser = new NewUser({
     name:  req.body.name,
     email: req.body.email,
     password: hasedPassword,
     phone_number: req.body.phone_number,
     created_by: req.body.created_by
 });
 try{
     const savedUser = await newUser.save();
     res.status(200).send('New User is Created!');
 }catch (err) {
       res.status(400).send(err);
 }
});

// get all createdUser Api
router.get('/api/v1/users', (req,res,next) => {
  NewUser.find()
  .then(users => {
      res.send(users)
  }).catch(err => {
      res.status(500).send("some error occured")
  })
})

// get only createdUser by single user
router.get('/api/v1/users/:id', (req,res,next) => {
  var myid = req.params.id;
  console.log('hey',myid)
  NewUser.find({created_by: myid})
  .then(users => {
      res.send(users)
  }).catch(err => {
      res.status(500).send("some error occured")
  })
})

// Delete createdUser
router.delete('/api/v1/users/:id', (req,res,next) => {
  var myid = req.params.id;
  console.log('hey',myid)
  NewUser.findByIdAndDelete({_id: myid})
  .then(users => {
      console.log(users)
      res.send('Deleted')
  }).catch(err => {
      res.status(500).send("some error occured")
  })
})

//Edit createdUser
router.put('/api/v1/users/:id', (req,res,next) => {
  var myid = req.params.id
  var name = req.body.name;
  var email = req.body.email;
  var phone_number = req.body.phone_number;
  NewUser.findByIdAndUpdate({_id: myid},{name:name, email:email, phone_number:phone_number})
  .then(users => {
      console.log(users)
      res.send('User Data updated!')
  }).catch(err => {
      res.status(500).send("some error occured")
  })
})

module.exports = router;

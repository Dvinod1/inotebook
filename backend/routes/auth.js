/* eslint-disable no-undef */
const express =require('express');
const User=require('../models/User')
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const JWT_SECRET='hellohowareyou123'

//create a user using : POST  "/api/auth/createuser".  No login required  
router.post('/createuser',[
    body('email','enter a valid name').isEmail(),
    body('name','enter a valid email').isLength({min:4}),
    body('password','password must be 4 charactor').isLength({min:4}),
],
//if there are errors , return Bad request and the errors
 async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
 }

//cheak wheather the user with this email is already exists.
try {
let user=await User.findOne({email:req.body.email});
if (user){
  return res.status(400).json({error:"Sorry a user with this email already exists"})
}

const salt =await bcrypt.genSalt(10);
 secpass= await bcrypt.hash(req.body.password, salt);

//creating a new user
user =await User.create({
    name: req.body.name,
    password: secpass,
    email: req.body.email,
  })

const data={
  user:{
    id:user.id
  }
}
const authToken=jwt.sign(data,JWT_SECRET);
console.log(authToken);
  // res.json(user)
  res.json({authToken})

} 
catch (error) {
  console.error(error.message);
  res.status(500).json("Some error occoured")
}

},)

module.exports=router
/* eslint-disable no-undef */
const express = require('express');
const User = require('../models/User')
const router = express.Router();
const {
  body,
  validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser=require('../middleware/fetchUser')

const JWT_SECRET = 'hellohowareyou123'

// Route1:create a user using : POST  "/api/auth/createuser".  No login required  
router.post('/createuser', [
    body('email', 'enter a valid name').isEmail(),
    body('name', 'enter a valid email').isLength({
      min: 4
    }),
    body('password', 'password must be 4 charactor').isLength({
      min: 4
    }),
  ],
  //if there are errors , return Bad request and the errors
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    //cheak wheather the user with this email is already exists.
    try {
      let user = await User.findOne({
        email: req.body.email
      });
      if (user) {
        let success = false

        return res.status(400).json({
           success,
          error: "Sorry a user with this email already exists"
        })
      }

      const salt = await bcrypt.genSalt(10);
      secpass = await bcrypt.hash(req.body.password, salt);

      //creating a new user
      user = await User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email,
      })

      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      let success = true
      console.log(authToken);
      res.json({success,
        authToken
      })

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }

  }, )




// Route2: Authenticate a user using : POST "/api/auth/login". no login required
router.post('/login', [
    body('email', 'enter a valid name').isEmail(),
    body('password', 'password cannot be blank').exists(),
    // body('name','enter a valid email').isLength({min:4}),
  ],
  async (req, res) => {
    let success = false

    // Erros validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const {
      email,
      password
    } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user) {
        success= false
        return res.status(400).json({
          success,
          error: "login with correct credentials"
        });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false
        return res.status(400).json({
          success,
          error: "login with correct credentials"
        });
      }

      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true
      // console.log(authToken);
      res.json({
        success,
        authToken
      })



    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

//Route 3: Get Login User detail Using  : POST "./api/auth/getuser". login required 

router.get('/getuser', fetchUser, async (req, res) => {
    try {
      userId = req.user.id
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
module.exports = router
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { request } = require('../server');
const { token } = require('morgan');
const {validationResult} = require('express-validator');



function showProfile(req, res){
    console.log("show profile function")
    // res.render("auth/signup");
}

function signup_get(req, res){
     console.log("userRoutes")
    res.render("author/add");
}


function signupPost(req, res){
    console.log(req)
    let user = new User(req.body);
    console.log(req.body);
    console.log(`this is my password ${req.body.password}`)
    let password2
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
        console.log(`this is the hash ${hash}`)
        user.password = hash
        console.log(`this is my hashed password inside hash ${user.password}`)
        user.save()

        .then(() => {
            // res.redirect('/auth/signin');
            res.json({'message': "user created successfully"})
        })
        .catch((err) => {
            console.log(err)
            if(err.code == 11000){
                res.json({'message': "email already exists"})
            }
            else
            {
              const errors = validationResult(req);
              if(!errors.isEmpty()){
    
                res.json({'message': 'validation errors', "validationErrors": errors.errors})
              }
    
              res.json({'message': err.message})
              
      
            }
    
    
        })
    });
 
    console.log(`this is my hashed password ${user.password}`)
    
    
}


async function signinPost(req, res){
   let {emailAddress, password} = req.body
    console.log(emailAddress)
   try{
       let user = await User.findOne({ emailAddress })
       console.log("01")
       console.log(user + " user after login")

       if(!user){
        console.log("02")
           return res.json({"message": "invalid email"}).status(400)
       }

       const isMatch = await bcrypt.compareSync(password, user.password)
       console.log(`this is match ${isMatch}`)

       if(!isMatch){
           return res.json({"message": "invalid password"}).status(400)
       }

       const payload = {
           user:{
               id:user._id
           }
       }
       console.log(process.env.secret)
       jwt.sign(
           payload,
           process.env.secret,
           {expiresIn: 99999999999999999999},
           (err, token) => {
               if(err) throw err;
               res.json({token}).status(200)
           }
       )
   }
   catch (error){
       console.log(error)
       res.json({"message": error.message}).status(400)
   }
}


module.exports = {signupPost, showProfile, signup_get, signinPost}
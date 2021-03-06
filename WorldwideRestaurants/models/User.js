// Dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    
    },
    lastName: {
        type: String,
        required: true,
       
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Your password should be atleast 6 characters"]
    },
    image: String,
    favRestaurants: []
}
,
    {
        timestamps: true
    })


    // verifyPassword
    userSchema.methods.verifyPassword = function(password){
        console.log(password);
        console.log(this.password);
        return bcrypt.compareSync(password, this.password);
    }

const User = mongoose.model("User", userSchema);

module.exports = User;
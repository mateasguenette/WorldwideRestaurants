const axios = require("axios");
const { findOne, findById } = require("../models/User");
const User = require('../models/User');


function showRestaurants(req, res){


    const encodedParams = new URLSearchParams();
    encodedParams.append("language", "en_US");
    encodedParams.append("limit", "5");
    encodedParams.append("location_id", "297704");
    encodedParams.append("currency", "USD")

    const options = {
        method: 'POST',
        url: 'https://worldwide-restaurants.p.rapidapi.com/search',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
          'X-RapidAPI-Key': '0346cea8afmshbc6151ff0b922f6p178b60jsnfec586a1f2d6'
        },
        data: encodedParams
      };
      
      axios.request(options).then(function (response) {
          res.json(response.data.results);
          console.log(response.data.results.data[1].name);
      }).catch(function (error) {
          console.error(error);
      });
}

function searchRestaurants(req, res){

}

async function addRestaurants(req, res){
  try{
    const user = await User.findById(req.body._id)
    console.log("this is user in addRestaurant")
    user.favRestaurants.push(req.body.favrestaurants) 
    user.save()
  
    res.json({'message': "restaurants added successfully", "user": user})
}
catch (error){
    console.log(error)
    res.json({"message": error.message})
}
}


module.exports = {showRestaurants, addRestaurants}
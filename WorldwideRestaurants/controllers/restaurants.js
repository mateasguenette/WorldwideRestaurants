const axios = require("axios");
const { findOne, findById } = require("../models/User");
const User = require('../models/User');


// let cityId = "155019"

// function cityid(req, res){
//   try{
//     // cityId = req.body.cityId
//     console.log("this is city id inside the function", cityId)
//     res.json({'message': "id has been recived successfully"})
//   }
//   catch (error){
//     console.log(error)
//     res.json({"message": error.message})
// }

   

// }

// console.log("this is city id outside the function", cityId)
function showRestaurants(req, res){
  
  const cityId = req.body.cityId
  console.log(cityId)

    const encodedParams = new URLSearchParams();
    encodedParams.append("language", "en_US");
    encodedParams.append("limit", "5");
    encodedParams.append("location_id", cityId);
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

function searchCity(req, res){
  console.log("this is req.body", req.body.city)
  const axios = require("axios");

const encodedParams = new URLSearchParams();
encodedParams.append("q", req.body.city);
encodedParams.append("language", "en_US");

const options = {
  method: 'POST',
  url: 'https://worldwide-restaurants.p.rapidapi.com/typeahead',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
    'X-RapidAPI-Key': '0346cea8afmshbc6151ff0b922f6p178b60jsnfec586a1f2d6'
  },
  data: encodedParams
};

axios.request(options).then(function (response) {
  res.json(response.data.results.data);
	console.log("response from backend search city", response.data.results);
}).catch(function (error) {
	console.error(error);
});

}



async function addRestaurants(req, res){
  try{
    console.log("33", req.body)
    let user = await User.findById(req.body.id)
    console.log("this is  in addRestaurant", req.body.restaurant.name)
    user.favRestaurants.push(req.body.restaurant.name) 
    user = await user.save()
  
    res.json({'message': "restaurants added successfully", "user": user})
}
catch (error){
    console.log(error)
    res.json({"message": error.message})
}
}


module.exports = {showRestaurants, addRestaurants, searchCity}
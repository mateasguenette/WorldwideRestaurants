var express = require('express');
var router = express.Router();
var restaurantsCtrl = require('../controllers/restaurants')
const isLoggedIn = require("../helper/isLoggedIn")

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('<h1>Worldwide Restaurants router</h1>');
// });
router.get('/', restaurantsCtrl.showRestaurants)
// router.get('/search', restaurantsCtrl.searchRestaurants)
router.post('/add', isLoggedIn, restaurantsCtrl.addRestaurants)

module.exports = router;

var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user')
const isLoggedIn = require("../helper/isLoggedIn")

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/profile',isLoggedIn, userCtrl.showProfile)
router.post('/signup', userCtrl.signupPost)
router.post('/signin', userCtrl.signinPost)
router.delete('/delete', userCtrl.deleteProfile)
router.put('/update', isLoggedIn, userCtrl.updateProfile)







module.exports = router;

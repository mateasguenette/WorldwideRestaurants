var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user')

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', userCtrl.showProfile)
router.post('/signup', userCtrl.signupPost)
router.post('/signin', userCtrl.signinPost)




module.exports = router;
